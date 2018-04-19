const express = require('express')

module.exports = function(server) {

  // API routes
  const router = express.Router()
  server.use('/api', router)
  

  // Rotas Congregacao e Membros
  const AuthService = require('../api/user/AuthService') 
  const CongregacaoService = require('../api/Congregacao/CongregacaoService')
  const MembroService = require('../api/Membro/MembroService')
  const DepartamentoService = require('../api/Departamento/DepartamentoService')
  const MembroSummaryService = require('../api/Membro/MembroSummary')
  CongregacaoService.register(router, '/Congregacao')
  MembroService.register(router,'/Membro')
  DepartamentoService.register(router,'/Departamento')
  router.route('/MembroSummary').get(MembroSummaryService.getSummary)
  router.post('/login', AuthService.login)
  router.post('/signup', AuthService.signup)   

}
