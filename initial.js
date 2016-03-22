var db = require('./db').db;

var initial = db.model('starts', {
	minute: { type: Number, required: true },
	time: { type: Date, required: true, default: Date.now} 
});

module.exports = initial