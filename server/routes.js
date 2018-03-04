const path = require('path');
const Router = require('express').Router;
const router = new Router();

const user = require('./model/user/router');
const food = require('./model/food/router');

router.use('/api/user', user);
router.use('/api/food', food);

var User = require('./model/user/schema');
var userFacae = require('./model/user/facade');
const bodyParser = require('body-parser');


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));


router.get('/', function(req, res){
  res.render(path.resolve('client/dist/index'));
});

// show register form
router.get("/register", function(req, res){
   res.render(path.resolve('client/dist/register')); 
});

//register, add email && password to database, User
router.post('/register', function(req, res){
  let users = new User();
  users.local.email = req.body.email;
  users.local.password = users.generateHash(req.body.password);
  if(req.body.email == null || req.body.email == '' || req.body.password == null || req.body.password == ''){
    res.redirect(path.resolve('client/dist/register'));
  }
  else{
    users.save(function(err){
      if(err){
        res.send('email exist.');

      }else{
        res.render(path.resolve('client/dist/secret')); 
      }
    });
  }
});

//show login form
router.get("/login", function(req, res){
    res.render(path.resolve('client/dist/login'));
});

router.post("/login", function(req, res){
  let email = req.body.email;
  let password = req.body.password;


  
  res.send('finissh');  

});

// logout route
router.get("/logout", function(req, res){
   req.logout();
   res.redirect(path.resolve('client/dist/index'));
});

module.exports = router;
