angular.module('starter.services', [])

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
      return { id: this.lastId(), name: '', value: '', description: '', type: 'despesa'};
    },
    beforeSave: function() {
      if (financas[0].id == 0 || typeof financas[0].id == "undefined") {
        financas.splice(0, 1);
      }
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
            saldo += financas[i].value;
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
            saldo += financas[i].value;
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
