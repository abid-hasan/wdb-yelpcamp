var Campground = require("../models/campground");
var Comment = require("../models/comment");

var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function (req, res, next) {
  if (req.isAuthenticated()) { // if the user logged in
    Campground.findById(req.params.id, function (err, campground) {
      if (err || !campground) {
        req.flash("error", "Something went wrong");
        res.redirect("back");
      } else {
        // [campground.author.id === req.user._id] doesn't work. coz, first one is an object and second one is a string.
        if (campground.author.id.equals(req.user._id)) { // does user own the campground?
          next();
        } else {
          req.flash("error", "You don't have permission to do that");
          res.redirect("back");
        }
      }
    });
  } else { // if the user is not logged in
    req.flash("error", "You need to be logged in to do that");
    res.redirect("back");
  }
}

middlewareObj.checkCommentOwnership = function (req, res, next) {
  if (req.isAuthenticated()) {
    Comment.findById(req.params.comment_id, function (err, comment) {
      if (err || !comment) {
        req.flash("error", "Something went wrong");
        res.redirect("back");
      } else {
        if (comment.author.id.equals(req.user._id)) {
          next();
        } else {
          req.flash("error", "You don't have permission to do that");
          res.redirect("back");
        }
      }
    })
  } else {
    req.flash("error", "You need to be logged in to do that");
    res.redirect("back");
  }
}

middlewareObj.isLoggedIn = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash("error", "You need to be logged in to do that");
  res.redirect("/login");
}

module.exports = middlewareObj;