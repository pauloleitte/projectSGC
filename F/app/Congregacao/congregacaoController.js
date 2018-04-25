(function () {
  angular.module('SGC').controller('congregacaoCtrl',[
    '$http',
    'msgs',
    'tabs',
    congregacaoController
  ])
  function congregacaoController($http,msgs,tabs){
    const vm = this
    const url = 'http://localhost:3003/api/congregacao'


    vm.refresh = function(){
      $http.get(url).then(function (response) {
        vm.Congregacao = {}
        vm.Congregacaos = response.data
        tabs.show(vm, {tabList: true, tabCreate: true})
      })
    }

    vm.getCep = function(cep)
    {

      var result = cep
      result = result.replace("-","");
      console.log(result)
      const viacep = "http://viacep.com.br/ws/"+result+"/json/"

      $http.get(viacep).then(function(response){

        if (!("erro" in response.data)) {
          //vm.Membro.cep = response.data.cep
          vm.Congregacao.rua = response.data.logradouro
          vm.Congregacao.bairro = response.data.bairro
          vm.Congregacao.estado = response.data.uf
          vm.Congregacao.cidade = response.data.localidade

                          } //end if.
                          else {
                              //CEP pesquisado não foi encontrado.
                              msgs.addError("CEP não foi encontrado!")
                              vm.Congregacao = {}
                          }

      }).catch(function(response){
          msgs.addError(response.data.error)
          vm.Congregacao = {}
        })
      }

    vm.create = function(){
           $http.post(url, vm.Congregacao).then(function(response){
               vm.Congregacao = {}
               vm.refresh()
               msgs.addSuccess('Operação realizada com sucesso!')
           }).catch(function(response){
               msgs.addError(response.data.errors)
           })
       }

       vm.showTabUpdate = function(Congregacao){
         vm.Congregacao = Congregacao
         tabs.show(vm, {tabUpdate: true})
       }
       vm.showTabDelete = function (Congregacao) {
         vm.Congregacao = Congregacao
         tabs.show(vm, {tabDelete: true})
       }

       vm.delete = function(){
         const deleteUrl = `${url}/${vm.Congregacao._id}`
         $http.delete(deleteUrl, vm.Congregacao).then(function(response){
           vm.refresh()
           msgs.addSuccess('Operação realizada com sucesso!')
         }).catch(function(resp){
           msgs.addError(resp.data)
         })
       }
       vm.update = function () {
         const updateUrl = `${url}/${vm.Congregacao._id}`
         $http.put(updateUrl, vm.Congregacao).then(function(responde){
           vm.refresh()
           msgs.addSuccess('Operação realizada com sucesso')
         }).catch(function(resp){
           msgs.addError(resp.data)
         })
       }

       vm.refresh()
  }
})()
