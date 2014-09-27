angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('Financas', function() {
  // Might use a resource here that returns a JSON array

  var id = 1;
  var financas = [{}];
//  // Some fake testing data
//  var financas = [
//    { id: 0, name: 'Salário', value: 100.01, description: 'Descrição de Salário', type: 'receita' },
//    { id: 1, name: 'Bônus', value: 10.09, description: 'Descrição de Bônus', type: 'receita' },
//    { id: 2, name: 'Hora Extra', value: 50.55, description: 'Descrição de Hora Extra', type: 'receita' },
//    { id: 3, name: '13º', value: 100.33, description: 'Descrição de Décimo Terceiro', type: 'receita' },
//    { id: 4, name: 'IR', value: 7.08, description: 'Descrição de Imposto de Renda', type: 'despesa' },
//    { id: 5, name: 'Luz', value: 9.09, description: 'Descrição de Luz Elétrica', type: 'despesa' },
//    { id: 6, name: 'Celular', value: 42.06, description: 'Descrição de Celular', type: 'despesa' }
//  ];

  return {
    add: function(financa) {
      financas.push(financa);
    },
    lastId: function() {
      return id++;
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
});
