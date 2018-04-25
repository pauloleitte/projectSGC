const express = require('express')

module.exports = function(server) {

  // API routes
  const router = express.Router()
  server.use('/api', router)
  router.get('/', (req, res) => res.json({ message: 'Acesso Restrito!' }));

  // Rotas Congregacao e Membros
  const AuthService = require('../api/user/AuthService') 
  const CongregacaoService = require('../api/Congregacao/CongregacaoService')
  const MembroService = require('../api/Membro/MembroService')
  const DepartamentoService = require('../api/Departamento/DepartamentoService')
  const MembroSummaryService = require('../api/Membro/MembroSummary')
  const EventoService = require('../api/Evento/EventoService')
  EventoService.register(router,'/evento')
  CongregacaoService.register(router, '/congregacao')
  MembroService.register(router,'/membro')
  DepartamentoService.register(router,'/departamento')
  router.route('/MembroSummary').get(MembroSummaryService.getSummary)
  router.post('/login', AuthService.login)
  router.post('/signup', AuthService.signup)   

}
