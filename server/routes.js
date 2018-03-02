const path = require('path');
const Router = require('express').Router;
const router = new Router();

const user = require('./model/user/router');
const food = require('./model/food/router');

router.use('/api/user', user);
router.use('/api/food', food);

var User = require('./model/user/schema');
const bodyParser = require('body-parser');

router.get('*', function(req, res) {
  res.sendfile(path.resolve('client/dist/index.html'));
});

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', function(req, res){
  res.render(path.resolve('client/dist/index.html'));
});


//register, add email && password to database, User
router.post('/register', function(req, res){
  let users = new User();
  users.local.email = req.body.email.toLowerCase();
  users.local.password = users.generateHash(req.body.password);
  if(req.body.email == null || req.body.email == '' || req.body.password == null || req.body.password == ''){
    res.json({success: false, message: 'Email or password could not be empty.'})
  }
  else{
    users.save(function(err){
      if(err){
        res.json({success: false, message: "Error, email exists."})
      }else{
        res.send({success: true, message: 'user created'});
      }
    });
  }
});

module.exports = router;
