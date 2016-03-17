var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/commentDB');

var commentSchema = mongoose.Schema({
	Name: String,
	Comment: String
});

var Comment = mongoose.model('Comment', commentSchema);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
	console.log('Connected');
});


/* GET comments from database */
router.get('/comment',function(req,res,next){
	console.log("In the GET route?");
	Comment.find(function(err,commentList){
		if(err) return console.error(err);
		else{
			console.log(commentList);
			res.json(commentList);


		}
	});
});

/* POST home page. */
router.post('/comment', function(req,res,next){
	console.log("POST comment route");
	console.log(req.body);


	var newcomment = new Comment(req.body);
	console.log(newcomment);
	newcomment.save(function(err,post){
		if(err) return console.error(err);
		console.log(post);
		res.sendStatus(200);
	})
});

module.exports = router;
