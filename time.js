var db = require('./db').db;

var Face = db.model('time',{
	stayTime: { type: Number, required: true },
	day: { type: Number, required: true },
	initialHour: { type: Number, required: true },
	initialMinute: { type: Number, required: true },
	minute: { type: Number, required: true }
})

module.exports = Face