var express = require('express');
var router = express.Router();
var Face = require('../face');
var Initial = require('../initial');
var Time = require('../time');
var path = require('path');

router.get('/faces', function(req, res, next){
	Face.find()
	.sort('-time')
	.limit(1)
	.exec(function(err, faces){
		if (err) { return next(err); }
		res.json(faces);
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

router.get('/time/people/:min/:seq', function(req, res, next){
	var min = Number(req.params.min)+Number(req.params.seq);
	var today = new Date();
	var day = today.getDate();
	var hour = today.getHours();
	Time.find({'minute': min, 'hour': 3, 'day': 3})
	.exec(function(err, records){
		if (err) { return next(err); }
		res.json(records);
	})
});

router.get('/time/stay/:min/:seq', function(req, res, next){
	var min = Number(req.params.min)+Number(req.params.seq);
	var today = new Date();
	var day = today.getDate();
	var hour = today.getHours();
	var jsonData = {};
	Time.find({'minute': min, 'hour': 3, 'day': 3, 'stayTime': {"$lte": 5, "$gt": 0}})
	.exec(function(err, records){
		if (err) { return next(err); }
		jsonData.data5 = records.length;
		Time.find({'minute': min, 'hour': 3, 'day': 3, 'stayTime': {"$lte": 10, "$gt": 15}})
		.exec(function(err, records){
			if (err) { return next(err); }
			jsonData.data10 = records.length;
			Time.find({'minute': min, 'hour': 3, 'day': 3, 'stayTime': {"$lte": 15, "$gt": 10}})
			.exec(function(err, records){
				if (err) { return next(err); }
				jsonData.data15 = records.length;
				Time.find({'minute': min, 'hour': 3, 'day': 3, 'stayTime': {"$gte": 15}})
				.exec(function(err, records){
					if (err) { return next(err); }
					jsonData.data20 = records.length;
					res.json(jsonData);
				});
			});
		});
	})
});

router.get('/api/test', function(req, res, next){
  var tmp = new Time
  tmp.stayTime = 3;
  tmp.day = 3;
  tmp.hour = 3;
  tmp.minute = 43;
  tmp.save(function(err,temper){
    if(err) { return next(err) }
    else{ res.send('success'); }
  });
})

module.exports = router;
