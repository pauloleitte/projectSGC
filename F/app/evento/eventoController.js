(function () {
  angular.module('SGC').controller('eventoCtrl', [
    '$http',
    'msgs',
    'tabs',
    eventoController
  ])
  function eventoController($http, msgs, tabs) {
    const vm = this
    const url = 'http://localhost:3003/api/evento'
    const url_congregacao = 'http://localhost:3003/api/congregacao'


    vm.listaDeSexos = ["Masculino", "Feminino"]

    vm.listaDeTipos = ["Congresso", "Culto Com as Irmãs", "Culto com os Jovens", "Culto com as Criaças", "Santa Ceia"]

    vm.Congregacaos = [{}]

    vm.getCongregacao = function (){
      $http.get(url_congregacao).then(function(response){
        vm.Congregacaos = response.data
      }).catch(function(res){
        console.log(res.data.errors)
      })
    }

    vm.refresh = function () {
      $http.get(url).then(function (response) {
        vm.getCongregacao()
        vm.Evento = { participantes: [{}] }
        vm.Eventos = response.data
        tabs.show(vm, { tabList: true, tabCreate: true })
      })
    }

    vm.create = function () {
      $http.post(url, vm.Evento).then(function (response) {
        vm.Evento = { participantes: [{}] }
        vm.refresh()
        msgs.addSuccess('Operação realizada com sucesso!')
      }).catch(function (response) {
        msgs.addError(response.data.errors)
      })
    }

    vm.showTabUpdate = function (Evento) {
      vm.Evento = Evento
      console.log(Evento)
      tabs.show(vm, { tabUpdate: true })
    }
    vm.showTabDelete = function (Evento) {
      vm.Evento = Evento
      tabs.show(vm, { tabDelete: true })
    }

    vm.delete = function () {
      const deleteUrl = `${url}/${vm.Evento._id}`
      $http.delete(deleteUrl, vm.Evento).then(function (response) {
        vm.refresh()
        msgs.addSuccess('Operação realizada com sucesso!')
      }).catch(function (resp) {
        msgs.addError(resp.data)
      })
    }
    vm.update = function () {
      const updateUrl = `${url}/${vm.Evento._id}`
      $http.put(updateUrl, vm.Evento).then(function (response) {
        vm.refresh()
        msgs.addSuccess('Operação realizada com sucesso')
      }).catch(function (resp) {
        msgs.addError(resp.data)
      })
    }

    var initParcipantes = function () {

      if (!vm.Evento.participantes || !vm.Evento.participantes.length) {
        vm.Evento.participantes = []
        vm.Evento.participantes.push({})
      }
    }
    vm.addPartipante = function (index) {
      vm.Evento.participantes.splice(index + 1, 0, { nome: null, sexo: null, idade: null })
    }
    vm.clonePartipante = function (index, { valor, data_pagamento, }) {
      vm.Evento.participantes.splice(index + 1, 0, { valor, data_pagamento })
      initParcipantes()
    }
    vm.deletePartipante = function (index) {
      if (vm.Evento.participantes.length > 1) {
        vm.Evento.participantes.splice(index, 1)
        initParcipantes()
      }

    }
    vm.cancel = function () {
      tabs.show(vm, { tabList: true, tabCreate: true })
      vm.Evento = {}
      initParcipantes()
    }

    vm.refresh()
  }
})()