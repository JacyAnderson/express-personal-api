// require express and other modules
var express = require('express'),
    app = express();

// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/************
 * DATABASE *
 ************/

var db = require('./models');

/**********
 * ROUTES *
 **********/

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

// hard coded array for profile
var jacyProfile = [
  { name: "Jacy James Anderson",
    github_link: "https://github.com/JacyAnderson",
    github_profile_image: "https://avatars0.githubusercontent.com/u/26239487?v=3&s=460",
    current_city: "Denver",
    favorite_games: [{name: "Fallout 4", developer: "Bethesda"}, {name: "Skyrim", developer: "Bethesda"}, {name: "Civilization VI", developer: "Firaxis"}, {name: "Elder Scrolls Online", developer: "Bethesda"}, {name: "Elder Scrolls Legends", developer: "Dire Wolf Digital"}, {name: "Red Dead Redemption", developer: "Rockstar"}, {name: "Rocket League", developer: "Psyonix"}]
  }
]



/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 */

app.get('/api', function api_index(req, res) {
  // TODO: Document all your api endpoints below
  res.json({
    woops_i_has_forgot_to_document_all_my_endpoints: false,
    message: "Welcome to Jacy's personal api! Here's what you need to know!",
    documentation_url: "https://github.com/JacyAnderson/express-personal-api/blob/master/README.md", 
    base_url: "https://tranquil-beach-76796.herokuapp.com/", 
    endpoints: [
      {method: "GET", path: "/api", type: "array", description: "Describes all available endpoints on Jacy's personal api"},
      {method: "GET", path: "/api/profile", type: "array", description: "Check for my name, github_link/profile_image, current city, and favorite_games"}, 
      {method: "GET", path: "/api/hikes", type: "array", description: "Get all hikes information"},
      {method: "POST", path: "/api/hikes", type: "array", description: "E.g. Create a new hike by inputing name, location, website_url, and a boolean: hike_complete "} 
    ]
  })
});

////////////////////
//  ROUTES
///////////////////

// define a root route: localhost:3000/
app.get('/', function (req, res) {
  res.sendFile('views/index.html' , { root : __dirname});
});

// get all profile information 
app.get('/api/profile', function (req, res) {
  console.log("You are at Jacy's profile!");
  res.json(jacyProfile);
});

// get all hikes
app.get('/api/hikes', function (req, res) {
  // send all hikes as JSON response
  console.log('You are on the hikes pages');
  db.Hike.find()
    .exec(function(err, hikes) {
      if (err) { return console.log("index error: " + err); }
      res.json(hikes);
  });
});

// create new hike
app.post('/api/hikes', function (req, res) {

  // create new hike with data from req.body
  var newHike = new db.Hike({
    name: req.body.name,
    location: req.body.location,
    website_url: req.body.website_url,
    hike_complete: req.body.hike_complete
  });

  // save new hike to database
  newHike.save(function(err, hike) {
    if (err) {
      return console.log("save error: " + err);
    }
    console.log("saved ", hike.title);
    // send back hike to user
    res.json(hike);
  });
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
