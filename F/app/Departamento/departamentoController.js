(function(){
angular.module('SGC').controller('departamentoCtrl',[
    '$http',
    'msgs',
    'tabs',
    departamentoController
])
function departamentoController($http,msgs,tabs){
    const vm = this
    const url = 'http://localhost:3003/api/Departamento'

    vm.refresh = function(){
        $http.get(url).then(function (response) {
          vm.Departamento = {}
          vm.Departamentos = response.data
          tabs.show(vm, {tabList: true, tabCreate: true})
        })
      }

      vm.create = function(){
         $http.post(url, vm.Departamento).then(function(response){
             vm.Departamento = {}
             vm.refresh()
             msgs.addSuccess('Operação realizada com sucesso!')
         }).catch(function(response){
             msgs.addError(response.data.errors)
         })
     }

     vm.showTabUpdate = function(Departamento){
       vm.Departamento = Departamento
       tabs.show(vm, {tabUpdate: true})
     }
     vm.showTabDelete = function (Departamento) {
       vm.Departamento = Departamento
       tabs.show(vm, {tabDelete: true})
     }

     vm.delete = function(){
       const deleteUrl = `${url}/${vm.Departamento._id}`
       $http.delete(deleteUrl, vm.Departamento).then(function(response){
         vm.refresh()
         msgs.addSuccess('Operação realizada com sucesso!')
       }).catch(function(resp){
         msgs.addError(resp.data)
       })
     }
     vm.update = function () {
       const updateUrl = `${url}/${vm.Departamento._id}`
       $http.put(updateUrl, vm.Departamento).then(function(responde){
         vm.refresh()
         msgs.addSuccess('Operação realizada com sucesso')
       }).catch(function(resp){
         msgs.addError(resp.data)
       })
     }

     vm.refresh()
}
})()