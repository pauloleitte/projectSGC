const Departamento = require('./Departamento')
const _ = require('lodash')

Departamento.methods(['get', 'post', 'put', 'delete'])
Departamento.updateOptions({new: true, runValidators: true})

Departamento.after('post', sendErrorsOrNext).after('put', sendErrorsOrNext)

function sendErrorsOrNext(req, res, next) {
  const bundle = res.locals.bundle

  if (bundle.errors) {
    var errors = parseErrors(bundle.errors)
    res.status(500).json({errors})
  } else {
    next()
  }
}

function parseErrors(nodeRestfulErrors){
  const errors = []
  _.forIn(nodeRestfulErrors, error => errors.push(error.message))
  return errors
}

Departamento.route('count', function(req, res, next){
    Departamento.count(function(error, value){
    if (error) {
      res.status(500).json({errors: [error]})
    } else {
      res.json({value})
    }
  })
})

module.exports = Departamento