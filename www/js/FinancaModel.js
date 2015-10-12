angular.module('simplefinancial.FinancaModel', [])

.factory('FinancaModel',[ function(){
    var self = this;
    self.tableName = 'financas';

    self.setService = function(wSQL) {
        this.wSQL = wSQL;
    };

    self.newObject = function() {
        return {
            title: '',
            money: '',
            type: 'despesa',
            created_at: new Date().toJSON().slice(0,10)
        };
    };

    self.saldo = function() {
        var select = "(SUM(CASE WHEN type = 'receita' THEN money ELSE 0 END) - SUM(CASE WHEN type = 'despesa' THEN money ELSE 0 END)) as money";
        return this.wSQL.select(select)
            .from(this.tableName)
            .query()
            .then(function(d){
                var data = d.shift();
                return data.money || 0;
            });
    }

    self.sumReceita = function() {
        return 0;
    };

    self.sumDespesa = function() {
        return 0;
    };

    self.delete = function(id) {
        return this.wSQL.delete(this.tableName)
            .where("id", id)
            .query()
            .then(function(data){
                return true;
            },function(error){
                return false;
            });
    };

    self.all = function() {
        return this.wSQL.select()
            .from(this.tableName)
            .order_by('created_at DESC')
            .query()
            .then(function(d){
                return d;
            });
    };

    self.get = function(id) {
        return this.wSQL.select()
            .from(this.tableName)
            .where('id', id)
            .query()
            .then(function(d){
                return d.shift();
            });
    };

    self.insert = function(financa) {
        return this.wSQL.insert(this.tableName, financa)
            .then(function(data){
                return true;
            },function(error){
                return false;
            });
    };

    self.update = function(financa) {
        return this.wSQL.update(this.tableName, financa)
            .where('id', financa.id)
            .query()
            .then(function(data){
                return true;
            },function(error){
                return false;
            });
    };

    self.save = function(financa) {
        if (financa.id != undefined) {
            return this.update(financa);
        }
        return this.insert(financa);
    };

    return self;
}]);