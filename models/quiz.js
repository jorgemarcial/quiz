//Definición del modelo de Quiz

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Quiz',
        { pregunta: {
        	type: DataTypes.STRING,
        	validate: { notEmpty: {msg: "-> Falta pregunta"}}

        		},	
          respuesta: {
          	type: DataTypes.STRING,
          	validate: { notEmpty: {msg: "-> Falta respuesta"}}
        		},
          tag: {
            type: DataTypes.STRING,
            validate: { notEmpty: {msg: "-> Falta tag"}}
            }   
        }, 

        { tableName: 'Quiz'});

}