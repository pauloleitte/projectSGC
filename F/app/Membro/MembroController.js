(function () {
  angular.module('SGC').controller('membroCtrl',[
    '$http',
	'$location',
    'msgs',
    'tabs',
    membroController
  ])
  function membroController($http,$location,msgs,tabs)
  {
    const vm = this
    const url = 'http://localhost:3003/api/Membro'

    

    vm.refresh = function(){
    const page = parseInt($location.search().page) || 1
	  $http.get(`${url}?skip=${(page - 1) * 10}&limit=10`).then(function(response){
        vm.Membro = {}
        vm.Membros = response.data
		$http.get(`${url}/count`).then(function(resp) {
        vm.pages = Math.ceil(resp.data.value / 10)
        tabs.show(vm, {tabList: true, tabCreate: true})
      })
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
          vm.Membro.rua = response.data.logradouro
          vm.Membro.bairro = response.data.bairro
          vm.Membro.estado = response.data.uf
          vm.Membro.cidade = response.data.localidade

                          } //end if.
                          else {
                              //CEP pesquisado não foi encontrado.
                              msgs.addError("CEP não foi encontrado!")
                              vm.Membro = {}
                          }

      }).catch(function(response){
          msgs.addError(response.data.error)
          vm.Membro = {}
        })
      }
    vm.create = function(){
           $http.post(url, vm.Membro).then(function(response){
               vm.Membro = {}
               vm.refresh()
               msgs.addSuccess('Operação realizada com sucesso!')
           }).catch(function(response){
               msgs.addError(response.data.errors)
           })
       }

       vm.showTabUpdate = function(Membro){
         vm.Membro = Membro
         tabs.show(vm, {tabUpdate: true})
       }
       vm.showTabDelete = function (Membro) {
         vm.Membro = Membro
         tabs.show(vm, {tabDelete: true})
       }

       vm.delete = function(){
         const deleteUrl = `${url}/${vm.Membro._id}`
         $http.delete(deleteUrl, vm.Membro).then(function(response){
           vm.refresh()
           msgs.addSuccess('Operação realizada com sucesso!')
         }).catch(function(resp){
           msgs.addError(resp.data)
         })
       }
       vm.update = function () {
         const updateUrl = `${url}/${vm.Membro._id}`
         $http.put(updateUrl, vm.Membro).then(function(responde){
           vm.refresh()
           msgs.addSuccess('Operação realizada com sucesso')
         }).catch(function(resp){
           msgs.addError(resp.data)
         })
       }
       vm.refresh()
  }
})()
