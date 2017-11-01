angular.module('SGC').controller('DashboardCtrl', [
  '$http',
  DashboardController
])

function DashboardController($http)
{
  const vm = this
  const valor1 = 0
  vm.getdashboardCongregacao = function()
  {

    const url = 'http://localhost:3003/api/Congregacao/count'
    $http.get(url).then(function(response)
    {
        const value1 = response.data.value
        vm.one = value1
    })
  }
  vm.getdashboardMembro = function()
  {
    const url = 'http://localhost:3003/api/Membro/count'
    $http.get(url).then(function(response)
    {
        const value1 = response.data.value
        vm.two = value1
    })
  }
  vm.getdashboardCongregacao()
  vm.getdashboardMembro()

}
