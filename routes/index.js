var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/author', function(req,res){
	res.render('author', {title:'Quiz'});
});

module.exports = router;
