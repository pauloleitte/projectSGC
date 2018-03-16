(function () {
  angular.module('SGC').controller('membroCtrl',[
    '$http',
	  '$location',
    'msgs',
    'tabs',
    membroController
  ])
  function membroController($http, $location, msgs, tabs)
  {
    const vm = this
    const url = 'http://localhost:3003/api/Membro'

    vm.listaDeSexos = ["Masculino", "Feminino"]

    vm.refresh = function(){
    const page = parseInt($location.search().page) || 1
	  $http.get(`${url}?skip=${(page - 1) * 10}&limit=10`).then(function(response){
        vm.Membro = {dizimos:[{}]}
        vm.Membros = response.data
        vm.calculateValues()
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
               vm.Membro = {dizimos:[{}]}
               vm.refresh()
               msgs.addSuccess('Operação realizada com sucesso!')
           }).catch(function(response){
               msgs.addError(response.data.errors)
           })
       }

       vm.showTabUpdate = function(Membro){
         vm.Membro = Membro
         vm.calculateValues()
         tabs.show(vm, {tabUpdate: true})
       }
       vm.showTabDelete = function (Membro) {
         vm.Membro = Membro
         vm.calculateValues()
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
          vm.calculateValues()
         const updateUrl = `${url}/${vm.Membro._id}`
         $http.put(updateUrl, vm.Membro).then(function(responde){
           vm.refresh()
           msgs.addSuccess('Operação realizada com sucesso')
         }).catch(function(resp){
           msgs.addError(resp.data)
         })
       }

       vm.addDizimo = function(index) {
       vm.Membro.dizimos.splice(index + 1, 0, {vl_dizimo: null, mes_dizimo: null, ano_dizimo: null})
    }

  vm.cloneDizimo = function(index, {vl_dizimo, mes_dizimo, ano_dizimo}) {
    vm.Membro.dizimos.splice(index + 1, 0, {vl_dizimo, mes_dizimo,ano_dizimo})
    initDizimos()
  }
    
  vm.deleteDizimo = function(index) {
  if(vm.Membro.dizimos.length >1 )
  {
    vm.Membro.dizimos.splice(index, 1)
    initDizimos()
  }

  }


  vm.cancel = function() {
    tabs.show(vm, {tabList: true, tabCreate: true})
    vm.Membro = {}
    initDizimos()
  }

  vm.calculateValues = function() {
    vm.dizimo = 0
    if(vm.Membro) 
    {
        vm.Membro.dizimos.forEach(function({vl_dizimo}) {
        vm.dizimo += !vl_dizimo || isNaN(vl_dizimo) ? 0 : parseFloat(vl_dizimo)
      })
    }

   
  }

  var initDizimos = function() {

    if(!vm.Membro.dizimos || !vm.Membro.dizimos.length) {
      vm.Membro.dizimos = []
      vm.Membro.dizimos.push({})
    }

    vm.calculateValues()
  }
       vm.refresh()
  }
})()
