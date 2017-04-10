var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

  var HikeSchema = new Schema({
    name: String,
  	location: String,
  	website_url: String,
  	hike_complete: Boolean
  });

  var Hike = mongoose.model('Hike', HikeSchema);

  module.exports = Hike;