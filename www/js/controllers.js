angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, Financas) {

    $scope.typeList = [
        { text: "Despesa", value: "despesa" },
        { text: "Receita", value: "receita" },
    ];

    $scope.data = {
        defaultType: 'despesa'
    };

    $scope.saldo = Financas.sumReceita() - Financas.sumDespesa();

    $scope.classeSaldo = '';
    if ($scope.saldo > 0) {
        $scope.classeSaldo = 'balanced';
    }
    if ($scope.saldo < 0) {
        $scope.classeSaldo = 'assertive';
    }
})

.controller('OperacaoCtrl', function($scope) {

    $scope.typeList = [
        { text: "Despesa", value: "despesa" },
        { text: "Receita", value: "receita" },
    ];

    $scope.data = {
        defaultType: 'despesa'
    };
console.log('4|OperacaoCtrl');
})

.controller('ReceitaCtrl', function($scope, Financas) {
  $scope.receitas = Financas.allReceitas();
})

.controller('ReceitaDetailCtrl', function($scope, $stateParams, Financas) {
  $scope.receita = Financas.get($stateParams.financaId);
})

.controller('DespesaCtrl', function($scope, Financas) {
  $scope.despesas = Financas.allDespesas();
})

.controller('DespesaDetailCtrl', function($scope, $stateParams, Financas) {
  $scope.despesa = Financas.get($stateParams.financaId);
});
