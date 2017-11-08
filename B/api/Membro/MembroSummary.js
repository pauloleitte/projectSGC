const _ = require('lodash')
const Membro = require('../Membro/Membro')

// Mais uma função middleware
function getSummary(req, res) {
  Membro.aggregate({
    $project: {dizimo: {$sum: "$dizimos.vl_dizimo"}}
  }, {
    $group: {_id: null, dizimo: {$sum: "$dizimo"}}
  }, {
    $project: {_id: 0, dizimo: 1}
  }, function(error, result) {
    if(error) {
      res.status(500).json({errors: [error]})
    } else {
      res.json(_.defaults(result[0], {dizimo: 0}))
    }
  })
}

module.exports = { getSummary }