var mongoose = require("mongoose")

function initializeDB (callback) {
  mongoose.connect('mongodb://192.168.0.38/facefinder', function (err) {
    if (err) {
      console.log('fail to connect mongodb');
      callback(err);
    } else {
      console.log('mongodb connected');
      callback();
    }
  });
}

module.exports = {
  db: mongoose,
  initialize: initializeDB
};
