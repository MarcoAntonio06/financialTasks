angular.module('simplefinancial.controllers', [])

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

.controller('OperacaoCtrl', function($scope, $state, $stateParams, Financas, $localForage) {

    if (typeof $stateParams.financaId != "undefined") {
        $scope.financa = Financas.get($stateParams.financaId);
        $scope.titulo = $scope.financa.name;
    } else {
        $scope.financa = Financas.newObject();
        $scope.titulo = 'Nova Transação';
    }

    $scope.typeList = [
        { text: "Despesa", value: "despesa" },
        { text: "Receita", value: "receita" },
    ];

    $scope.erros = [];
    $scope.adicionaItem = function (financa, financaForm) {
        if (financaForm.date.$error.required) {
            $scope.erros.push({campo: 'Data', descricao: 'Campo obrigatório'});
        }

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

.controller('FinancaCtrl', function($scope, $state, $stateParams, Financas) {
    $scope.financas = Financas.all();

    $scope.detalhaItem = function (id) {
        var params = {financaId : id}
        $state.go('tab.financa-detail', params);
    };
})

.controller('FinancaDetailCtrl', function($scope, $state, $stateParams, Financas, $localForage) {
    //$scope.financa = Financas.get($stateParams.financaId);

    $localForage.getItem($stateParams.financaId).then(function(data) {
        $scope.financa = data;
    });


    $scope.editaItem = function (id) {
        var params = {financaId : id}
        $state.transitionTo('tab.operacao-update', params);
    };
});
