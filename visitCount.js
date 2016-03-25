var db = require('./db').db;

var VisitCount = db.model('VisitCount',{
	day: { type: Number, required: true },
	hour: { type: Number, required: true },
	minute: { type: Number, required: true },
	count: { type: Number, required: true }
})

module.exports = VisitCount