const path = require('path');
const Router = require('express').Router;
const router = new Router();

const user = require('./model/user/router');
const food = require('./model/food/router');

router.use('/api/user', user);
router.use('/api/food', food);

//router.get('*', function(req, res) {
//  res.sendfile(path.resolve('client/dist/index.html'));
//});

router.get('/', function(req, res){
  res.render(path.resolve('client/dist/index.ejs')); //loading the index.ejs file
});

router.get('/login', function(req, res){
  res.render(path.resolve('client/dist/login.ejs'));
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
