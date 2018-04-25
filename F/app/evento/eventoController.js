(function(){
    angular.module('SGC').controller('eventoCtrl',[
        '$http',
        'msgs',
        'tabs',
        eventoController
    ])
    function eventoController($http,msgs,tabs){
        const vm = this
        const url = 'http://localhost:3003/api/evento'
    
        vm.refresh = function(){
            $http.get(url).then(function (response) {
              vm.Evento = {}
              vm.Eventos = response.data
              tabs.show(vm, {tabList: true, tabCreate: true})
            })
          }
    
          vm.create = function(){
             $http.post(url, vm.Evento).then(function(response){
                vm.Evento = {}
                 vm.refresh()
                 msgs.addSuccess('Operação realizada com sucesso!')
             }).catch(function(response){
                 msgs.addError(response.data.errors)
             })
         }
    
         vm.showTabUpdate = function(Evento){
           vm.Evento = Evento
           tabs.show(vm, {tabUpdate: true})
         }
         vm.showTabDelete = function (Evento) {
            vm.Evento = Evento
           tabs.show(vm, {tabDelete: true})
         }
    
         vm.delete = function(){
           const deleteUrl = `${url}/${vm.Evento._id}`
           $http.delete(deleteUrl, vm.Evento).then(function(response){
             vm.refresh()
             msgs.addSuccess('Operação realizada com sucesso!')
           }).catch(function(resp){
             msgs.addError(resp.data)
           })
         }
         vm.update = function () {
           const updateUrl = `${url}/${vm.Evento._id}`
           $http.put(updateUrl, vm.Evento).then(function(response){
             vm.refresh()
             msgs.addSuccess('Operação realizada com sucesso')
           }).catch(function(resp){
             msgs.addError(resp.data)
           })
         }
    
         vm.refresh()
    }
    })()