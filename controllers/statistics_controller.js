var models = require('../models/models.js');


exports.load = function(req, res, next) {
      models.Quiz.count().then(function(npreguntas){
     	models.Comment.sum('publicado').then(function(ncomments){
     		models.Comment.sum('publicado').then(function(ncon){
        	    res.render('quizes/statistics', {ncon:ncon, npreguntas:npreguntas, ncomments : ncomments, errors:[]})});
    		})
		})
    }
          
          



