var models = require('../models/models.js');

// Autoload :id de comentarios
exports.load = function(req, res, next) {
      models.Quiz.count().then(function(npreguntas){
         //   res.render('quizes/statistics', { npreguntas : npreguntas, errors:[]})});
      models.Comment.sum('publicado').then(function(ncomments){
         //    res.render('quizes/statistics', {npreguntas:npreguntas, ncomments : ncomments, errors:[]})});
      models.Comment.count('QuizId').then(function(ncon){
            res.render('quizes/statistics', {ncon:ncon, npreguntas:npreguntas, ncomments : ncomments, errors:[]})});
      })
})
    }
          
          



