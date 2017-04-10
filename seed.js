// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require('./models');

var hikes_list = [
  {
  	name: "Barr Lake State Park",
  	location: "Brighton, CO",
  	website_url: "http://cpw.state.co.us/placestogo/parks/barrlake",
  	hike_complete: true
  },
  {
  	name: "Rocky Mountain Arsenal",
  	location: "Commerce Shitty, CO",
  	website_url: "https://www.fws.gov/refuge/rocky_mountain_arsenal/",
  	hike_complete: true
  },
  {
  	name: "North Table Mountain",
  	location: "Golden, CO",
  	website_url: "https://www.alltrails.com/trail/us/colorado/north-table-mountain-park",
  	hike_complete: true
  }
]

db.Hike.remove({}, function(err, hikes) {
	console.log("Clear pre-existing hike cache");
	db.Hike.create(hikes_list, function(err, hikes) {
		if (err){
			console.log(err);
			return;
		}
		console.log('recreated all Hikes');
		console.log('created ', hikes.length, ' hikes');
	});
});
