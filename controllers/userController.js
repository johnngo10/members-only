const User = require("../models/User");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const LocalStrategy = require("passport-local");

passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: "Invalid username or password." });
      }
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          // passwords match! log user in
          return done(null, user);
        } else {
          // passwords do not match!
          return done(null, false, {
            message: "Invalid username or password.",
          });
        }
      });
    });
  })
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

// Display sign up form for creating new user
exports.user_create_get = (req, res) => {
  res.render("user_form", {
    usernameError: req.flash("usernameError"),
    passwordError: req.flash("passwordError"),
  });
};

// Handle creating new user on POST
exports.user_create_post = (req, res) => {
  const { username, password, confirmPassword } = req.body;

  if (!username || !password) {
    res.send("missing required fields");
  } else {
    // Check for duplicate username
    User.findOne({ username: username }).then((user) => {
      if (user) {
        // Throw an error if username already exists
        req.flash(
          "usernameError",
          "A user has already registered with this username."
        );
        res.redirect("/sign-up");
      } else if (password !== confirmPassword) {
        // Flash an error if password does not match confirm password
        req.flash("passwordError", "Password does not match.");
        res.redirect("/sign-up");
      } else {
        // Otherwise create new user
        bcrypt.hash(password, 10, (err, hashedPassword) => {
          if (err) {
            return next(err);
          } else {
            const user = new User({
              username,
              password: hashedPassword,
            })
              .save()
              .then(() => {
                res.redirect("/");
              })
              .catch((err) => console.log(err));
          }
        });
      }
    });
  }
};

// Display log in form
exports.user_login_get = (req, res) => {
  res.render("user_login", { message: req.flash("error") });
};

// Handle logging in user on POST
exports.user_login_post = passport.authenticate("local", {
  successRedirect: "/",
  failureFlash: true,
  failureRedirect: "/login",
});

// Handle logging out user on GET
exports.user_logout_get = (req, res) => {
  req.logout();
  res.redirect("/");
};
