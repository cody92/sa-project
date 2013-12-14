function testSumaProcente(field, rules, i, options) {
    "use strict";
    var param_max_sum = 100;
    var param_1 = $("#parametru_rata_estimari").val();
    var param_2 = $("#parametru_personal").val();
    var param_3 = $("#parametru_resurse_materiale").val();
    param_1 = param_1 ? param_1 : 0;
    param_2 = param_2 ? param_2 : 0;
    param_3 = param_3 ? param_3 : 0;
    alert(field.attr('data-next'));
    param_1 = parseInt(param_1);
    param_2 = parseInt(param_2);
    param_3 = parseInt(param_3);
    if (param_1 + param_2 + param_3 > param_max_sum) {
        return 'Suma procentelor nu poate fi mai mare decat 100!';
    }
}