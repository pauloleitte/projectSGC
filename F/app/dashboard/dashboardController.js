angular.module('SGC').controller('DashboardCtrl', [
  '$http',
  DashboardController
])

function DashboardController($http)
{
  const vm = this
  const value = 0
  vm.getdashboardCongregacao = function()
  {

    const url = 'http://localhost:5000/api/congregacao/count'
    $http.get(url).then(function(response)
    {
        const value = response.data.value
        vm.one = value
    })
  }
  vm.getdashboardMembro = function()
  {
    const url = 'http://localhost:5000/api/membro/count'
    $http.get(url).then(function(response)
    {
        const value = response.data.value
        vm.two = value
    })
  }

  vm.getdashboardEvento = function(){
    const url = 'http://localhost:5000/api/evento/count'
    $http.get(url).then(function(response)
    {
        const value = response.data.value
        vm.three = value
    })
  }
  vm.getdashboardCongregacao()
  vm.getdashboardMembro()
  vm.getdashboardEvento()

}
