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
    add: function(financa) {
      financas.push(financa);
      $window.localStorage['Financas'] = JSON.stringify(financas);
    },
    lastId: function() {
      return $window.localStorage['idFinancas']++;
    },
    all: function() {
      return financas;
    },
    get: function(financaId) {
      // Simple index lookup
      return financas[financaId];
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
