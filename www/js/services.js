angular.module('simplefinancial.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('Financas', ['$window', function($window) {
  // Might use a resource here that returns a JSON array

    var id = 1;
    if (typeof $window.localStorage['idFinancas'] != "undefined") {
        id = $window.localStorage['idFinancas'];
    }
    $window.localStorage['idFinancas'] = id;

    var financas = JSON.parse($window.localStorage['Financas'] || '[{}]');

    return {
        newObject: function() {
            return {
                id: this.lastId(),
                title: '',
                money: '',
                description: '',
                type: 'despesa',
                created_at: new Date().toJSON().slice(0,10)
            };
        },
        beforeSave: function() {
            if (typeof financas[0] == "undefined") {
                return;
            }
            if (typeof financas[0].id == "undefined" || financas[0].id == 0) {
                financas.splice(0, 1);
            }
        },
        delete: function(id) {
            if (typeof this.get(id) == "undefined") {
                return false;
            }
            slice = 1;
            index = this.findIndexByKeyValue(financas, 'id', id);
            financas.splice(index, slice);
            $window.localStorage['Financas'] = JSON.stringify(financas);
            return true;
        },
        save: function(financa) {
            this.beforeSave();
            var slice = 0;
            var index = financa.id;
            if (typeof this.get(financa.id) != "undefined") {
                slice = 1;
                index = this.findIndexByKeyValue(financas, 'id', financa.id);
            }
            financas.splice(index, slice, financa);
            $window.localStorage['Financas'] = JSON.stringify(financas);
        },
        findIndexByKeyValue: function(obj, key, value) {
            for (var i = 0; i < obj.length; i++) {
                if (obj[i][key] == value) {
                    return i;
                }
            }
            return null;
        },
        lastId: function() {
            return $window.localStorage['idFinancas']++;
        },
        all: function() {
            return financas;
        },
        get: function(financaId) {

            var result = financas.filter(function ( result ) {
                return result.id == financaId;
            })[0];
            return result;
        },
        sumReceita: function() {
            var saldo = 0;
            for (i in financas) {
                if (financas[i].type == 'receita') {
                    saldo += financas[i].money;
                }
            }
            return saldo;
        },
        allReceitas: function() {
            var receita = [];
            for (i in financas) {
                if (financas[i].type == 'receita') {
                    receita.push(financas[i]);
                }
            }
            return receita;
        },
        sumDespesa: function() {
            var saldo = 0;
            for (i in financas) {
                if (financas[i].type == 'despesa') {
                    saldo += financas[i].money;
                }
            }
            return saldo;
        },
        allDespesas: function() {
            var despesa = [];
            for (i in financas) {
                if (financas[i].type == 'despesa') {
                    despesa.push(financas[i]);
                }
            }
            return despesa;
        },
    }
}]);
