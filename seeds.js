var mongoose = require("mongoose"),
Campground = require("./models/campground"),
Comment = require("./models/comment");

var data = [
  {
    name: "Cloud's Rest", 
    image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
    description: "Enim reprehenderit mollit occaecat pariatur fugiat eu nisi culpa elit reprehenderit. Duis id consequat est pariatur qui laboris eiusmod laborum qui officia amet. Ex cupidatat culpa consequat incididunt voluptate est eu pariatur pariatur exercitation dolore cupidatat. Ut occaecat eu aliqua aliqua sint esse Lorem commodo occaecat elit cupidatat excepteur eiusmod. Culpa incididunt tempor eu sit labore excepteur sunt esse quis consectetur in. Nostrud esse elit Lorem culpa adipisicing non qui minim quis minim. Labore reprehenderit irure magna nisi anim."
  },
  {
    name: "Desert Mesa", 
    image: "https://farm6.staticflickr.com/5487/11519019346_f66401b6c1.jpg",
    description: "Do ullamco sit consequat ad ipsum ad tempor ex tempor labore. Sunt nostrud consequat ipsum do ut cillum aliqua. Culpa adipisicing occaecat est anim. Excepteur cillum cillum ad consectetur."
  },
  {
    name: "Canyon Floor", 
    image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
    description: "Ea cupidatat sit cillum ut sunt veniam et ullamco pariatur sint nulla culpa minim irure. Aliquip dolor et nulla nostrud voluptate velit in esse est eu commodo aliquip laboris sit. Pariatur est ad fugiat in elit. Pariatur do sint ipsum ea magna. Consectetur nostrud minim non minim velit officia non adipisicing sit duis et. Cillum laboris cillum et quis et culpa cillum velit aliqua do dolor. Consequat minim aute duis excepteur sunt veniam."
  }
];

function seedDB() {
  // removing campgrounds
  Campground.deleteMany({}, function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log("removed campgrounds");
      // adding a few campgrounds
      data.forEach(function(seed) {
        Campground.create(seed, function(err, campground) {
          if(err) {
            console.log(err);
          } else {
            console.log("added a campground");
            // adding a few comments
            Comment.create({
              text: "Esse id voluptate ex officia. Nostrud reprehenderit anim non pariatur veniam aliquip consequat voluptate aliqua veniam. Cupidatat in anim commodo officia et Lorem laborum sunt in irure sint commodo eu.",
              author: "Mr. Lorem"
            }, function(err, comment) {
              if(err) {
                console.log(err);
              } else {
                campground.comments.push(comment);
                campground.save();
                console.log("added a comment");  
              }
            });
          }
        });
      });
    }
  });
}

module.exports = seedDB;