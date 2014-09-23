angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, Receitas, Despesas) {
    var despesa = Despesas.all();
    var receita = Receitas.all();

    $scope.saldo = 0;
    for (i in despesa) {
        console.log('A' + despesa[i].value);
        $scope.saldo += despesa[i].value;
    }
    console.log('1' + $scope.saldo);
    for (i in receita) {
        console.log('B' + receita[i].value);
        $scope.saldo += receita[i].value;
    }
    console.log('2' + $scope.saldo);
})

.controller('ReceitaCtrl', function($scope, Receitas) {
  $scope.receitas = Receitas.all();
})

.controller('ReceitaDetailCtrl', function($scope, $stateParams, Receitas) {
  $scope.receita = Receitas.get($stateParams.receitaId);
})

.controller('DespesaCtrl', function($scope, Despesas) {
  $scope.despesas = Despesas.all();
})

.controller('DespesaDetailCtrl', function($scope, $stateParams, Despesas) {
  $scope.despesa = Despesas.get($stateParams.despesaId);
});
