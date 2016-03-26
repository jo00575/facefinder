var express = require('express');
var router = express.Router();
var Face = require('../face');
var Initial = require('../initial');
var Time = require('../time');
var Visit = require('../visitCount')
var path = require('path');

router.get('/faces', function(req, res, next){
	Face.find()
	.sort('-time')
	.limit(1)
	.exec(function(err, faces){
		if (err) { console.log(err);return next(err); }
		res.json(faces);
	})
});

router.get('/totalPeople', function(req, res, next){
	Initial.find()
	.sort('-time')
	.limit(1)
	.exec(function(err, min) {
		var today = new Date();
		var day = today.getDate();
		Time.find({'initialMinute': min[0].minute, 'initialHour': min[0].hour, 'day': day})
		.exec(function(err, records){
			if (err) { return next(err); }
			res.json(records);
		})
	})
});

router.get('/initialTime', function(req, res, next){
	console.log('router in');
	Initial.find()
	.sort('-time')
	.limit(1)
	.exec(function(err, data) {
		if (err) {
			next(err);
		} else {
			if (data.length === 0) {
				res.send('not existed initialTime');
			} else {
				res.json(data);
			}
		}
	});
});

router.get('/time/people/:hour/:min/:seq', function(req, res, next){
	var initialMin = req.params.min;
	var min = Number(initialMin)+Number(req.params.seq);
	if(min>=60)
		min-=60;
	var today = new Date();
	var day = today.getDate();
	var hour = req.params.hour;
	Time.find({'minute': min, 'initialMinute':initialMin, 'initialHour': hour, 'day': day})
	.exec(function(err, records){
		if (err) { return next(err); }
		res.json(records);
	})
});

router.get('/time/stay/:hour/:min/:seq', function(req, res, next){
	var initialMin = req.params.min;
	var min = Number(initialMin)+Number(req.params.seq);
	if(min>=60)
		min-=60;
	var today = new Date();
	var day = today.getDate();
	var hour = req.params.hour;
	var jsonData = {};
	Time.find({'minute': min, 'initialMinute':initialMin, 'initialHour': hour, 'day': day, 'stayTime': {"$lte": 5, "$gt": 0}})
	.exec(function(err, records){
		if (err) { return next(err); }
		jsonData.data5 = records.length;
		Time.find({'minute': min, 'initialMinute':initialMin, 'initialHour': hour, 'day': day, 'stayTime': {"$lte": 10, "$gt": 5}})
		.exec(function(err, records){
			if (err) { return next(err); }
			jsonData.data10 = records.length;
			Time.find({'minute': min, 'initialMinute':initialMin, 'initialHour': hour, 'day': day, 'stayTime': {"$lte": 15, "$gt": 10}})
			.exec(function(err, records){
				if (err) { return next(err); }
				jsonData.data15 = records.length;
				Time.find({'minute': min, 'initialMinute':initialMin, 'initialHour': hour, 'day': day, 'stayTime': {"$gt": 15}})
				.exec(function(err, records){
					if (err) { return next(err); }
					jsonData.data20 = records.length;
					res.json(jsonData);
				});
			});
		});
	})
});

router.get('/visitCount/:min/:hour', function(req, res, next){
	var min = req.params.min;
	var hour = req.params.hour;
	var today = new Date();
	var day = today.getDate();
	var jsonData = {};

	Visit.find({'minute': min, 'hour': hour, 'day': day, 'count': 1})
	.exec(function(err, records){
		if (err) { return next(err); }
		jsonData.visit1 = records.length;
		Visit.find({'minute': min, 'hour': hour, 'day': day, 'count': 2})
		.exec(function(err, records){
			if (err) { return next(err); }
			jsonData.visit2 = records.length;
			Visit.find({'minute': min, 'hour': hour, 'day': day, 'count': {"$gte": 3}})
			.exec(function(err, records){
				if (err) { return next(err); }
				jsonData.visit3 = records.length;
				res.json(jsonData);
			});
		});
	})
});

router.get('/api/test', function(req, res, next){
	var tmp = new Visit;
	tmp.count = 3;
	tmp.day = 3;
	tmp.hour = 3;
	tmp.minute = 43;
	tmp.save(function(err,temper){
		if(err) { return next(err) }
			else{ res.send('success'); }
	});
})

module.exports = router;
