var db = require('./db').db;

var Face = db.model('faces',{
	faceNum: { type: Number, required: true },
	time: { type: Date, required: true, default: Date.now} 
})

module.exports = Face