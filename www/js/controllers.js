angular.module('simplefinancial.controllers', [])

.controller('DashCtrl', function($scope, FinancaModel, wSQL) {

    $scope.typeList = [
        { text: "Despesa", money: "despesa" },
        { text: "Receita", money: "receita" },
    ];

    $scope.data = {
        defaultType: 'despesa'
    };

    FinancaModel.setService(wSQL);
    FinancaModel.saldo().then(function(result){
        $scope.saldo = result;
        $scope.classeSaldo = '';
        if ($scope.saldo > 0) {
            $scope.classeSaldo = 'balanced';
        }
        if ($scope.saldo < 0) {
            $scope.classeSaldo = 'assertive';
        }
    });
})

.controller('OperacaoCtrl', function($scope, $state, $stateParams, FinancaModel, wSQL) {

    FinancaModel.setService(wSQL);

    $scope.classErro = 'oculta';

    if (typeof $stateParams.financaId != "undefined") {
        FinancaModel.get($stateParams.financaId).then(function(financa){
            $scope.financa = financa;
            $scope.titulo = $scope.financa.title;
        });
    } else {
        $scope.financa = FinancaModel.newObject();
        $scope.titulo = 'Nova Transação';
    }

    $scope.erros = [];
    $scope.adicionaItem = function (financa, financaForm) {
        $scope.erros = [];
        if (financaForm.created_at.$error.required) {
            $scope.erros.push({campo: 'Data', descricao: 'Campo obrigatório'});
        }

        if (financaForm.title.$error.required) {
            $scope.erros.push({campo: 'Nome', descricao: 'Campo obrigatório'});
        }

        if (financaForm.money.$error.required) {
            $scope.erros.push({campo: 'Valor', descricao: 'Campo obrigatório'});
        }

        if (financaForm.title.$error.minlength) {
            $scope.erros.push({campo: 'Nome', descricao: 'Muito Curto'});
        }
        financa.type = financa.type.toLowerCase();

        if ($scope.erros.length != 0) {
            $scope.classErro = 'exibe';
        }

        if (financaForm.$valid) {
            FinancaModel.save(financa);
            $state.go('tab.dash');
        }
    };
})

.filter('capitalize', function() {
    return function(input) {
      return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
})

.controller('FinancaCtrl', function($scope, $state, $stateParams, FinancaModel, wSQL) {

    FinancaModel.setService(wSQL);

    //$scope.financas = FinancaModel.all().slice(-10);
    FinancaModel.all().then(function(data){
        $scope.financas = data;
    });

    $scope.showInfo = function(financa) {
        if (financa.id != undefined) {
            $scope.info = financa.id + ': ' + financa.title + ' carregado!';
        }
    };

    $scope.detalhaItem = function (id) {
        var params = {financaId : id}
        $state.go('tab.financa-detail', params);
    };
})

.controller('FinancaDetailCtrl', function($scope, $state, $stateParams, FinancaModel, wSQL) {

    FinancaModel.setService(wSQL);

    FinancaModel.get($stateParams.financaId).then(function(financa){
        $scope.financa = financa;
    });

    $scope.editaItem = function (id) {
        var params = {financaId : id}
        $state.transitionTo('tab.operacao-update', params);
    };

    $scope.excluiItem = function (id) {
        if (!confirm('Tem certeza?')) {
            return;
        }
        if(!FinancaModel.delete(id)) {
            alert('Erro ao excluir.');
            return;
        }
        $state.go('tab.financa');
    };
});
