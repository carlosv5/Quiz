var models = require('../models/models.js');


exports.load = function(req, res, next) {
	models.Quiz.findAll().then(function(quizes){
		var nPreguntas = quizes.length;
		models.Comment.findAll().then(function(comments){
			var nComments = comments.length;
			var nCommentsPub=0;
			if(nComments!==0){
				var media = Math.round(nComments/nPreguntas*100)/100;
			}
			else{
				media = 0;
			}
			var nConComments=0;
			var nConCommentsPub=0;
			var cuenta=[]; //Lo estamos creando al vuelo
			var cuentaPub=[]; //Lo estamos creando al vuelo
			var i;
			for(i=0;i<nComments;i++){
					if(cuenta[comments[i].QuizId]){
						cuenta[comments[i].QuizId]++;
						if(comments[i].publicado===true){
							nCommentsPub++;
							cuentaPub[comments[i].QuizId]++;
						}
					}
					else{
						cuenta[comments[i].QuizId]=1;
						if(comments[i].publicado===true){
							nCommentsPub++;
							cuentaPub[comments[i].QuizId]=1;
						}
					}
			}
			if(cuenta.length !== 0){
				for(i=1;i<=nPreguntas;i++){
					if(cuenta[i]){
						nConComments++;
					}
				}
			}
			else{
				nConComments=0;
			}
			if(cuentaPub.length !== 0){
				for(i=1;i<=nPreguntas;i++){
					if(cuentaPub[i]){
						nConCommentsPub++;
					}
				}
			}
			else{
				nConCommentsPub=0;
			}
			var nSinComments=nPreguntas-nConComments;
			var nSinCommentsPub=nPreguntas-nConCommentsPub;

			if(nCommentsPub!==0){
			var mediaPub= Math.round(nCommentsPub/nPreguntas*100)/100;
		} else{mediaPub=0;}
        res.render('quizes/statistics', {quizes:quizes,nPreguntas:nPreguntas,
         nComments:nComments, media:media,nConComments:nConComments,
         nSinComments:nSinComments,nCommentsPub:nCommentsPub,
         nConCommentsPub:nConCommentsPub,nSinCommentsPub:nSinCommentsPub,
         mediaPub:mediaPub, errors:[]});
    		}).catch(function(error){next(error);})
		}).catch(function(error){next(error);})

    };
          
          



