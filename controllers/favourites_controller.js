var models = require('../models/models.js');

//GET /user/:userId/favourites
exports.index = function(req, res, next){
	req.user.getFavourites().then(function(favourites){
		favourites.forEach(function(favourites){
			//favourite.favourite = true;
		});
		res.render('user/favourites.ejs', {
			favourites: favourites,
			errors: []
		});
	})
	.catch(function(error) {
		next(error);
	});
};

//PUT /user/:userId/favourites/:quizId
exports.add=function(req,res,next){
	req.user.addFavourite(req.quiz).then(function(){
        res.redirect('/quizes');// redirección a path anterior a login
	}).catch(function(error) {
		next(error);
	});
};

//DELETE /user/:userId/favourites/:quizId
exports.delete=function(req,res,next){
	req.user.removeFavourite(req.quiz).then(function(){
		res.redirect('.');
	}).catch(function(error) {
		next(error);
	});
};

