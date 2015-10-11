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

.controller('OperacaoCtrl', function($scope, $state, $stateParams, Financas) {

    $scope.classErro = 'oculta';

    if (typeof $stateParams.financaId != "undefined") {
        $scope.financa = Financas.get($stateParams.financaId);
        $scope.titulo = $scope.financa.name;
    } else {
        $scope.financa = Financas.newObject();
        $scope.titulo = 'Nova Transação';
    }

    $scope.erros = [];
    $scope.adicionaItem = function (financa, financaForm) {
        $scope.erros = [];
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
        financa.type = financa.type.toLowerCase();

        if ($scope.erros.length != 0) {
            $scope.classErro = 'exibe';
        }

        if (financaForm.$valid) {
            Financas.save(financa);
            $state.go('tab.dash');
        }
    };
})

.filter('capitalize', function() {
    return function(input) {
      return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
})

.controller('FinancaCtrl', function($scope, $state, $stateParams, Financas) {
    $scope.financas = Financas.all().slice(-10);

    $scope.detalhaItem = function (id) {
        var params = {financaId : id}
        $state.go('tab.financa-detail', params);
    };
})

.controller('FinancaDetailCtrl', function($scope, $state, $stateParams, Financas) {
    $scope.financa = Financas.get($stateParams.financaId);

    $scope.editaItem = function (id) {
        var params = {financaId : id}
        $state.transitionTo('tab.operacao-update', params);
    };

    $scope.excluiItem = function (id) {
        if (!confirm('Tem certeza?')) {
            return;
        }
        if(!Financas.delete(id)) {
            alert('Erro ao excluir.');
            return;
        }
        $state.go('tab.financa');
    };
});
