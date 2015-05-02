var path = require('path');

//Cargar modelo ORM
var Sequelize = require('sequelize');

//Usar BBDD SQLIte;
var sequelize = new Sequelize(null,null,null,
	{dialect: "sqlite", storage: "quiz.squlite"}
	);

//Importar la definicion de la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname,'quiz'));

exports.Quiz = Quiz; //Exportar definicion de tabla quiz

// sequelize.sync() inicializa tabla de preguntas en DB
sequelize.sync().then(function() {
  // then(..) ejecuta el manejador una vez creada la tabla
  Quiz.count().then(function (count){
    if(count === 0) {   // la tabla se inicializa solo si está vacía
      Quiz.create( {
         pregunta: 'Capital de Italia',
           respuesta: 'Roma'
         })
      .then(function(){console.log('Base de datos inicializada')});
    };
  });
});