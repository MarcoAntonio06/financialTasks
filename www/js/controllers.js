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

.controller('OperacaoCtrl', function($scope, $state, Financas) {

    $scope.financa = { id: Financas.lastId(), name: '', value: '', description: '', type: 'despesa'};

    $scope.typeList = [
        { text: "Despesa", value: "despesa" },
        { text: "Receita", value: "receita" },
    ];

    $scope.erros = [];
    $scope.adicionaItem = function (financa, financaForm) {
        if (financaForm.name.$error.required) {
            $scope.erros.push({campo: 'Nome', descricao: 'Campo brigatório'});
        }

        if (financaForm.value.$error.required) {
            $scope.erros.push({campo: 'Valor', descricao: 'Obrigatório'});
        }

        if (financaForm.name.$error.minlength) {
            $scope.erros.push({campo: 'Nome', descricao: 'Muito Curto'});
        }

        if (financaForm.$valid) {
            Financas.add(financa);
            $state.transitionTo('tab.dash');
        }
    };
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
