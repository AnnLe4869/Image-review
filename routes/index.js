const router = require("express").Router();
const User = require("../models/user");
const passport = require("passport");

// Root route
router.get("/", (req, res) => {
  res.render("landing");
});

// Sign up routes
router.get("/signup", (req, res) => res.render("users/new"));
router.post("/signup", (req, res) => {
  User.register(
    new User({ username: req.body.username }),
    req.body.password,
    (err, user) => {
      console.log(user);
      if (err) {
        req.flash("error", err.message);
        return res.redirect("/signup");
      }
      passport.authenticate("local")(req, res, () => {
        req.flash("success", "Welcome to YelpCamp" + user.username);
        res.redirect("/campgrounds");
      });
    }
  );
});

// Sign in routes
router.get("/signin", (req, res) => res.render("users/signin"));
router.post(
  "/signin",
  passport.authenticate("local", {
    failureRedirect: "/signin",
    successRedirect: "/campgrounds"
  })
);

// Sign out route
router.get("/signout", (req, res) => {
  req.flash("success", "Logged you out");
  req.logout();
  res.redirect("/campgrounds");
});

module.exports = router;
