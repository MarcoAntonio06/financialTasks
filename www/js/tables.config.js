angular.module('wSQL.config', [])
.constant("W_SQL_CONFIG", {
    PARAMS: {
        name: "financialTasksDb",
        version: "1.0",
        sub_name: "my_db_sub_name",
        size: 1000000
    },
    TABLES_SQL: {
        "financas"    :   [
            'id integer primary key',
            'title text',
            'money float',
            'type text',
            'created_at date'
        ],
    },
//    CLEAR: true

});