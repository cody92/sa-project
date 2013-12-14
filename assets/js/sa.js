function testSumaProcente(field, rules, i, options) {
    "use strict";
    var param_max_sum = 100;
    var param_1 = $("#parametru_rata_estimari").val();
    var param_2 = $("#parametru_personal").val();
    var param_3 = $("#parametru_resurse_materiale").val();
    param_1 = param_1 ? param_1 : 0;
    param_2 = param_2 ? param_2 : 0;
    param_3 = param_3 ? param_3 : 0;
    //alert(field.attr('data-next'));
    param_1 = parseInt(param_1);
    param_2 = parseInt(param_2);
    param_3 = parseInt(param_3);
    if (param_1 + param_2 + param_3 > param_max_sum) {
        return 'Suma procentelor nu poate fi mai mare decat 100!';
    }
}

function verificareTimpMaxim(field, rules, i, options) {
    "use strict";
    var timpMax = $("#timp_stabilit").val();
    var camp = field.val();
    timpMax = timpMax ? timpMax : 0;
    camp = camp ? camp : 0;
    //alert(field.attr('data-next'));
    timpMax = parseInt(timpMax);
    camp = parseInt(camp);
    if (timpMax == 0) {
        return 'Completati mai intai campul Timp stabilit!';
    }
    if (timpMax < camp) {
        return 'Timpul selectat trebuie sa fie mai mic decat: ' + timpMax;
    }
}

function verificarePerioadaTimp(field, rules, i, options) {
    "use strict";
    var data_prev = field.attr('data-prev');
    var prevTime = $("#timp_" + data_prev).val();
    var time = field.val();
    //alert(data_prev + " " + prevTime + " " + time);
    prevTime = prevTime ? prevTime : 0;
    time = time ? time : 0;

    prevTime = parseInt(prevTime);
    time = parseInt(time);
    if (prevTime > time) {
        return 'Aceasta valoare trebuie sa fie mai mare decat: ' + prevTime;
    }
}