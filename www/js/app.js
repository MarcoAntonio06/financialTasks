// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('financialTasks', ['ionic'])

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('index', {
            url: '/', 
            //If in a folder, template/index.html
            templateUrl: 'index.html',
            controller: 'IndexCtrl'
        })

        .state('saldo', { 
            url: '/saldo', 
            templateUrl: 'saldo.html',
            controller: 'SaldoCtrl '
        })

        .state('receita', { 
            url: '/receita', 
            templateUrl: 'receita.html',
            controller: 'ReceitaCtrl '
        })

        .state('despesa', { 
            url: '/despesa', 
            templateUrl: 'despesa.html',
            controller: 'DespesaCtrl '
        })

    $urlRouterProvider.otherwise("/");
})

.controller('IndexCtrl', function($scope) {
    $scope.myTitle = 'Template';

    $scope.doSomething = function() {
        $scope.myTitle = $scope.myTitle + ' something';
    };
})

.controller('ReceitaCtrl', function($scope) {
    $scope.myTitle = 'Template';

    $scope.doSomething = function() {
        $scope.myTitle = $scope.myTitle + ' something';
    };
})

.controller('DespesaCtrl', function($scope) {
    $scope.myTitle = 'Template';

    $scope.doSomething = function() {
        $scope.myTitle = $scope.myTitle + ' something';
    };
})

.controller('SaldoCtrl', function($scope) {
    $scope.myTitle = 'Template';

    $scope.doSomething = function() {
        $scope.myTitle = $scope.myTitle + ' something';
    };
});