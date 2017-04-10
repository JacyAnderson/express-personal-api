var mongoose = require("mongoose");
mongoose.connect( process.env.MONGODB_URI || 
                  process.env.MONGOLAB_URI || 
                  process.env.MONGOHQ_URL || 
                  "https://tranquil-beach-76796.herokuapp.com/");

// module.exports.Campsite = require("./campsite.js.example");
