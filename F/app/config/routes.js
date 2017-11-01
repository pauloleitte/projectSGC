angular.module('SGC').config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    $stateProvider.state('dashboard', {
      url: "/dashboard",
      templateUrl: "dashboard/dashboard.html"
    }).state('congregacao', {
      url: "/Congregacao",
      templateUrl: "Congregacao/tabs.html"
    }).state('membros',{
      url: "/Membros?page",
      templateUrl: "Membro/tabs.html"
    }).state('departamentos',{
      url: "/Departamentos",
      templateUrl: "Departamento/tabs.html"
    })

    $urlRouterProvider.otherwise('/dashboard')
}])
