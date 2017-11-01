const express = require('express')

module.exports = function(server) {

  // API routes
  const router = express.Router()
  server.use('/api', router)

  // Rotas Congregacao e Membros
  const CongregacaoService = require('../api/Congregacao/CongregacaoService')
  const MembroService = require('../api/Membro/MembroService')
  const DepartamentoService = require('../api/Departamento/DepartamentoService')
  CongregacaoService.register(router, '/Congregacao')
  MembroService.register(router,'/Membro')
  DepartamentoService.register(router,'/Departamento')


}
