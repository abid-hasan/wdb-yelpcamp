var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");

// INDEX
router.get("/", function (req, res) {
  Campground.find({}, function (err, campgrounds) {
    if (err) {
      console.log(err);
    } else {
      res.render("campgrounds/index", { campgrounds: campgrounds });
    }
  });
});

// NEW
router.get("/new", middleware.isLoggedIn, function (req, res) {
  res.render("campgrounds/new");
});

// CREATE
router.post("/", middleware.isLoggedIn, function (req, res) {
  var name = req.body.name;
  var price = req.body.price;
  var image = req.body.image;
  var description = req.body.description;
  var author = {
    id: req.user._id,
    username: req.user.username
  };
  var newCampground = { name: name, image: image, description: description, author: author, price: price };
  Campground.create(newCampground, function (err, campground) {
    if (err) {
      console.log(err);
    } else {
      req.flash("success", "Campground has been added successfully");
      res.redirect("/campgrounds");
    }
  });
});

// SHOW
router.get("/:id", function (req, res) {
  Campground.findById(req.params.id).populate("comments").exec(function (err, campground) {
    if (err || !campground) {
      req.flash("error", "Something went wrong");
      res.redirect("back");
    } else {
      res.render("campgrounds/show", { campground: campground });
    }
  });
});

// EDIT
router.get("/:id/edit", middleware.checkCampgroundOwnership, function (req, res) {
  Campground.findById(req.params.id, function(err, campground) {
    if(err) {
      console.log(err);
    }
    else {
      res.render("campgrounds/edit", {campground: campground});
    }
  });
});

// UPDATE
router.put("/:id", middleware.checkCampgroundOwnership, function (req, res) {
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, function (err, campground) {
    if (err) {
      console.log(err);
      res.redirect("/campgrounds");
    } else {
      req.flash("success", "Campground has been updated successfully");
      res.redirect("/campgrounds/" + campground._id); // or req.params.id
    }
  });
});

// DESTROY
router.delete("/:id", middleware.checkCampgroundOwnership, function (req, res) {
  Campground.findByIdAndDelete(req.params.id, function (err) {
    if (err) {
      console.log(err);
      res.redirect("/campgrounds");
    } else {
      req.flash("success", "Campground has been deleted successfully");
      res.redirect("/campgrounds");
    }
  })
});

module.exports = router;