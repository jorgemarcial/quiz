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

exports.new = function(req, res) {
    var quiz = models.Quiz.build(
        {
            pregunta: "Pregunta", respuesta : "Respuesta"
        }
    );
    res.render('quizes/new', {quiz:quiz});
};

exports.create = function(req, res) {
    console.log(req.body);

    var quiz = models.Quiz.build( req.body.quiz );

    quiz.save({ fields: ["pregunta", "respuesta"] }).then(function(){
        res.redirect('/quizes');
    });
};

exports.index = function(req, res) {

    search = req.query.search;
    if (search != null ) {
        models.Quiz.findAll({where: ["pregunta like ?", "%"+search+"%"]}).then(function(quizes){
            res.render('quizes/index', { quizes: quizes});
        });
    } else {
        models.Quiz.findAll().then(function(quizes){
            res.render('quizes/index', { quizes: quizes});
        });
    }
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