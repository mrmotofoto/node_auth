var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({dest: './uploads'});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Register' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

router.post('/register', upload.single('profileImage'), function(req, res, next) {
  var name = req.body.name;
  var email = req.body.email;
  var username = req.body.username;
  var password = req.body.password;
  var password2 = req.body.password2;
  if(req.file) {
    console.log('Uploading File...');
    var profileImage = req.file.filename;
  } else {
    console.log('There was a problem uploading the file');
    var profileImage = "noimage.jpg";
  }
  //FORM VALIDATION-------------------------------------------------------------
  req.checkBody('name', 'Name Field Is Required').notEmpty();
  req.checkBody('email', 'Email Field Is Required').notEmpty();
  req.checkBody('email', 'Email is not valid').isEmail();
  req.checkBody('username', 'Username Field Is Required').notEmpty();
  req.checkBody('password', 'Password Field Is Required').notEmpty();
  req.checkBody('password2', 'Passwords Do Not Match').equals(req.body.password);
  
  //CHECK ERRORS----------------------------------------------------------------
  var errors = req.validationErrors();
  
  if(errors) {
    res.render('register', {
      errors: errors
    });
  } else {
    console.log('No Errors');
  }

});
module.exports = router;





