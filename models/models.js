var path = require('path');
var pg=require('pg');

//Postgres DATABASE_URL = Postgres://user:passwd@host:port/database
//SQLite   DATABASE_URL = sqlite://:@:/
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name  = (url[6]||null);
var user     = (url[2]||null);
var pwd      = (url[3]||null);
var protocol = (url[1]||null);
var dialect   = (url[1] || null);
var port     = (url[5]||null);
var host     = (url[4]||null);
var storage  = process.env.DATABASE_STORAGE;

//Cargar modelo ORM
var Sequelize = require('sequelize');

//Usar BBDD SQLIte;
var sequelize = new Sequelize(DB_name,user,pwd,
	{dialect: dialect,
	protocol:protocol,
	port:port,
	host:host,
	storage: storage,  //solo SQLite (.env)
 	omitNull:true  //solo Postgres
 	}
	
);

//Importar la definicion de la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname,'quiz'));


// sequelize.sync() inicializa tabla de preguntas en DB
sequelize.sync().then(function() {
  // then(..) ejecuta el manejador una vez creada la tabla
  Quiz.count().then(function (count){
    if(count === 0) {   // la tabla se inicializa solo si está vacía
      Quiz.create({
          pregunta: 'Capital de Italia',   respuesta: 'Roma',
        }),
      Quiz.create({
          pregunta: 'Capital de Portugal', respuesta: 'Lisboa'
      }),
      Quiz.create({
          pregunta: 'Capital de España', respuesta: 'Madrid'
      })   
      .then(function(){console.log('Base de datos inicializada')});
    };
  });
});

//Importar definicion de la tabla Comment
var comment_path = path.join(__dirname,'comment');
var Comment = sequelize.import(comment_path);

Comment.belongsTo(Quiz); //Un comentario pertenece a una pregunta
Quiz.hasMany(Comment); //Una pregunta puede tener muchos comentarios

exports.Quiz = Quiz; //Exportar definicion de tabla quiz
exports.Comment = Comment;
