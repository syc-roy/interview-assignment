const path = require('path');
const Router = require('express').Router;
const router = new Router();

const user = require('./model/user/router');
const food = require('./model/food/router');

router.use('/api/user', user);
router.use('/api/food', food);

var User = require('./model/user/schema');
const bodyParser = require('body-parser');

//router.get('*', function(req, res) {
//  res.sendfile(path.resolve('client/dist/index.html'));
//});

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', function(req, res){
  res.render(path.resolve('client/dist/index.ejs')); //loading the index.ejs file
});

router.get('/login', function(req, res){
  res.render(path.resolve('client/dist/login.ejs'));
});

router.get('/user', function(req, res, next) {
    User.find({}, function(err, result){
      res.json(result);
    })
});

router.post('/temp', function(req, res){
  var email = req.body.email;
  var password = req.body.password;
  console.log(email);
  console.log(password);
  res.send('ddd');
})

//add email && password to database, User
router.post('/user', function(req, res){
  var users = new User();
  users.local.email = 'test1@email.com';
  users.local.password = users.generateHash(123456);
    users.save(function(err){
      if(err){
        res.send("Error, email exists.")
      }else{
        res.send('user created');
      }
    });
});

router.get('/signup', function(req, res){
  res.render(path.resolve('client/dist/signup.ejs'));
});

//new to add auth later
router.get('/profile', isLoggedIn, function(req, res){
  res.render(path.resolve('client/dist/profile.ejs'));
});

router.get('/logout', function(req,res){
  req.logout();
  res.redirect('/');
});

function isLoggedIn(req, res, next){
  if(req.isAuthenticated())
    return next();
  res.redirect('/');
}

module.exports = router;
