var titulo = 'Quiz';
var models = require('../models/models.js');


// Autoload :id
exports.load = function(req, res, next, quizId) {
    console.log(quizId);
    models.Quiz.find(quizId).then(
        function(quiz) {
            if (quiz) {
                req.quiz = quiz;
                next();
            } else {
                next(new Error('No existe quizId=' + quizId))
            }
        }
    ).catch(function(error){next(error)});
};

exports.index = function(req, res) {
    models.Quiz.findAll().then(function(quiz){
       res.render('quizes/index', { quizes: quiz});
    });
};

exports.show = function(req, res) {
    res.render('quizes/show', { quiz: req.quiz});
};

// GET /quizes/:id/answer
exports.answer = function(req, res) {
    var resultado = 'Incorrecto';
    if (req.query.respuesta === req.quiz.respuesta) {
        resultado = 'Correcto';
    }
    res.render('quizes/answer', { quiz: req.quiz, respuesta: resultado});
};


exports.author = function(req, res) {
    res.render('quizes/author',{title:titulo,author: 'Jorge Marcial Álvarez Gago'});
};