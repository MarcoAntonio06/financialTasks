angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('Receitas', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var receitas = [
    { id: 0, name: 'Salário', value: 100.01, description: 'Descrição de Salário' },
    { id: 1, name: 'Bônus', value: 10.09, description: 'Descrição de Bônus' },
    { id: 2, name: 'Hora Extra', value: 50.55, description: 'Descrição de Hora Extra' },
    { id: 3, name: '13º', value: 100.33, description: 'Descrição de Décimo Terceiro' }
  ];

  return {
    all: function() {
      return receitas;
    },
    get: function(receitaId) {
      // Simple index lookup
      return receitas[receitaId];
    },
  }
})
.factory('Despesas', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var despesas = [
    { id: 0, name: 'IR', value: -7.08, description: 'Descrição de Imposto de Renda' },
    { id: 1, name: 'Luz', value: -9.09, description: 'Descrição de Luz Elétrica' },
    { id: 2, name: 'Celular', value: -42.06, description: 'Descrição de Celular' }
  ];

  return {
    all: function() {
      return despesas;
    },
    get: function(despesaId) {
      // Simple index lookup
      return despesas[despesaId];
    },
  }
});
