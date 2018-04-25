const Evento = require('./Evento')
const _ = require('lodash')

Evento.methods(['get', 'post', 'put', 'delete'])
Evento.updateOptions({new: true, runValidators: true})

Evento.after('post', sendErrorsOrNext).after('put', sendErrorsOrNext)

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

  Evento.route('count', function(req, res, next){
    Evento.count(function(error, value){
      if (error) {
        res.status(500).json({errors: [error]})
      } else {
        res.json({value})
      }
    })
  })

  module.exports = Evento