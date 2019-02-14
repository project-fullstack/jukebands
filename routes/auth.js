require('dotenv').config();
const express = require("express");
const passport = require('passport');
const router = express.Router();
const uploadCloud = require('../options/cloudinary.js');
const User = require("../models/User");
const mongoose     = require('mongoose');
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
  const contact = req.body.contact;
  const localization = req.body.localization;
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
      localization,
      discography:"",
      rider:"",
      img:"",
      place:{lat:0, lng:0}
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

router.post("/profile-band/", (req, res, next) => {
let lat= req.body.lat
let lng= req.body.lng
User.findByIdAndUpdate(req.user.id, {$set:{place:{lat,lng}}},{new:true}).then(user=>{
})


}); 
router.get('/profile-band/getCurrentMarket',(req,res,next)=>{
  //res.send(JSON.stringify({hola:'hola'}))
  User.findById(req.user.id)
    .then((user) => {
      let place=user.place;
      res.send(JSON.stringify({place}))
    })
})

router.get('/profile-band/:id', (req, res, next) => {
  User.findById(req.user.id)
    .then(editUser => {
      res.render('auth/edit-band', {editUser})
    })
    .catch(err => {
      console.log(err);
    })
})
router.post("/profile-band/:id", uploadCloud.single('photo'), (req, res, next) => {
  
  User.findByIdAndUpdate(req.params.id, 
    { $set: 
      {
      style: req.body.style,
      description:req.body.description,
      price: req.body.price,
      localization: req.body.localization,
      discography: req.body.discography,
      rider: req.body.rider,
      imgPath: req.file.url,
      imgName: req.file.originalname
    }})

      .then((user) =>{
        res.redirect('/auth/profile-band/')
      })
      .catch(err => {
        console.log(err);
        next();
      });
});




router.post('/profile-band/:id/delete', (req, res, next) => {
  User.findByIdAndRemove(req.params.id)
      .then(() => {
        res.redirect("/")
      })
      .catch(err => {
        console.log(err);
        next();
  });
})


router.get("/search", (req, res, next) => {
  res.render("auth/search");
});

router.get("/search/bands", (req, res, next) => {
  let usersArray = []
  User.find()

    .then((bd) => {
      bd.forEach((user) => {
        const places = user.place;
        usersArray.push(user)
        // 
      })
      res.send(JSON.stringify({usersArray}))
    })
});

router.get("/search/band-info/:id", (req, res, next) => {
  console.log(req.user)
  User.findById(req.user.id)
  .then((user) => {
    res.render("auth/band-info", {user: req.user})
  })
  
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;