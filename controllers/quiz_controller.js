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
    res.render('quizes/new', {quiz:quiz , errors: []});
};

exports.edit = function(req, res) {
    var quiz = req.quiz;

    res.render('quizes/edit', {quiz: quiz, errors:[]});
}

//POST /quizes/create
exports.create = function (req, res){
    var quiz = models.Quiz.build( req.body.quiz );
    console.log(quiz);
    quiz
    .validate()
    .then(
        function (err){
            if (err) {
                res.render('quizes/new', {quiz: quiz, errors: err.errors});
            } else {
            quiz
            .save({fields: ["pregunta","respuesta"]})
            .then(function(){ res.redirect('/quizes')})
            }
        }
    );
};

// PUT /quizes/:id
exports.update = function(req, res) {
  req.quiz.pregunta  = req.body.quiz.pregunta;
  req.quiz.respuesta = req.body.quiz.respuesta;

  req.quiz
  .validate()
  .then(
    function(err){
      if (err) {
        res.render('quizes/edit', {quiz: req.quiz, errors: err.errors});
      } else {
        req.quiz     // save: guarda campos pregunta y respuesta en DB
        .save( {fields: ["pregunta", "respuesta"]})
        .then( function(){ res.redirect('/quizes');});
      }     // Redirección HTTP a lista de preguntas (URL relativo)
    }
  ).catch(function(error){next(error)});
};


// DELETE /quizes/:id
exports.destroy = function(req, res) {
    req.quiz.destroy().then( function() {
        res.redirect('/quizes');
    }).catch(function(error){next(error)});
};


exports.index = function(req, res) {

    if (req.query.search != null ) {
        query = {where: ["pregunta like ?", "%"+req.query.search+"%"]};
    } else {
        query = {}
    }

    models.Quiz.findAll(query).then(function(quizes){
        res.render('quizes/index', { quizes: quizes, errors: []});
    });
};

exports.show = function(req, res) {
    res.render('quizes/show', { quiz: req.quiz, errors: []});
};

// GET /quizes/:id/answer
exports.answer = function(req, res) {
    var resultado = 'Incorrecto';
    if (req.query.respuesta === req.quiz.respuesta) {
        resultado = 'Correcto';
    }
    res.render('quizes/answer', { quiz: req.quiz, respuesta: resultado, errors: []});
};


exports.author = function(req, res) {
    res.render('quizes/author',{title:titulo,author: 'Jorge Marcial Álvarez Gago', errors: []});
};