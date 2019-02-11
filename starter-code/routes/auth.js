const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;


router.get("/login-band/", (req, res, next) => {
  res.render("auth/login-band", { "message": req.flash("error") });
});

router.post("/login-band/", passport.authenticate("local", {
  successRedirect: "/auth/profile-band/",
  failureRedirect: "/auth/login-band",
  failureFlash: true,
  passReqToCallback: true
}));


router.get("/signup-band", (req, res, next) => {
  res.render("auth/signup-band");
});

router.post("/signup-band", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const contact = req.body.contact
  if (username === "" || password === "") {
    res.render("auth/signup-band", { message: "Indicate username and password" });
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.render("auth/signup-band", { message: "The username already exists" });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      password: hashPass,
      contact,
      style:"",
      description:"",
      price: 0,
      localization:"",
      discography:"",
      rider:"",
      img:""
    });

    newUser.save()
    .then(() => {
      res.redirect("/auth/profile-band");
    })
    .catch(err => {
      res.render("auth/signup-band", { message: "Something went wrong" });
    })
  });
});


router.get("/profile-band/", (req, res, next) => {
    res.render("auth/profile-band", { user: req.user });
});

router.get('/profile-band/:id', (req, res, next) => {
  User.findById(req.user.id)
    .then(editUser => {
      res.render('auth/edit-band', {editUser})
    })
    .catch(err => {
      console.log(err);
    })
})

router.post("/profile-band/:id", (req, res, next) => {
  console.log(req.body)
  User.findByIdAndUpdate(req.params.id, 
    { $set: 
      {
      style: req.body.style,
      description:req.body.description,
      price: req.body.price,
      localization: req.body.localization,
      discography: req.body.discography,
      rider: req.body.rider,
      // img: req.body.img
    }})

      .then((user) =>{
        console.log("AAA" + user)
        res.redirect('/auth/profile-band/')
      })
      .catch(err => {
        console.log(err);
        next();
      });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("auth/edit-band");
});

module.exports = router;
