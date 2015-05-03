//Definimos el modelo de Quiz
module.exports = function(sequelize, dataTypes) {
	return sequelize.define(
		'Quiz',
	{
			pregunta: {
				type: dataTypes.STRING,
				validate: { notEmpty: {msg: "=> Falta pregunta"}}
			},
			respuesta: {
				type: dataTypes.STRING,
				validate: { notEmpty: {msg: "=> Falta respuesta"}}
			}
		}
	);
}