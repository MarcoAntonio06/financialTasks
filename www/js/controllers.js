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

.controller('OperacaoCtrl', function($scope, $state, $stateParams, Financas) {

    if (typeof $stateParams.financaId != "undefined") {
        $scope.financa = Financas.get($stateParams.financaId);
    } else {
        $scope.financa = Financas.newObject();
    }

    $scope.typeList = [
        { text: "Despesa", value: "despesa" },
        { text: "Receita", value: "receita" },
    ];

    $scope.erros = [];
    $scope.adicionaItem = function (financa, financaForm) {
        if (financaForm.name.$error.required) {
            $scope.erros.push({campo: 'Nome', descricao: 'Campo obrigatório'});
        }

        if (financaForm.value.$error.required) {
            $scope.erros.push({campo: 'Valor', descricao: 'Campo obrigatório'});
        }

        if (financaForm.name.$error.minlength) {
            $scope.erros.push({campo: 'Nome', descricao: 'Muito Curto'});
        }

        if (financaForm.$valid) {
            Financas.save(financa);
            $state.transitionTo('tab.dash');
        }
    };
})

.controller('ReceitaCtrl', function($scope, Financas) {
  $scope.receitas = Financas.allReceitas();
})

.controller('ReceitaDetailCtrl', function($scope, $state, $stateParams, Financas) {
  $scope.receita = Financas.get($stateParams.financaId);

    $scope.editaItem = function (id) {
        var params = {financaId : id}
        $state.transitionTo('tab.operacao-update', params);
    };
})

.controller('DespesaCtrl', function($scope, Financas) {
  $scope.despesas = Financas.allDespesas();
})

.controller('DespesaDetailCtrl', function($scope, $state, $stateParams, Financas) {
    $scope.despesa = Financas.get($stateParams.financaId);

    $scope.editaItem = function (id) {
        var params = {financaId : id}
        $state.transitionTo('tab.operacao-update', params);
    };
});
