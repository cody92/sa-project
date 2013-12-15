function testSumaProcente(field, rules, i, options) {
    "use strict";
    var param_max_sum = 100;
    var param_1 = $("#parametru_rata_estimari").val();
    var param_2 = $("#parametru_personal").val();
    var param_3 = $("#parametru_resurse_materiale").val();
    param_1 = param_1 ? param_1 : 0;
    param_2 = param_2 ? param_2 : 0;
    param_3 = param_3 ? param_3 : 0;

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

    prevTime = prevTime ? prevTime : 0;
    time = time ? time : 0;

    prevTime = parseInt(prevTime);
    time = parseInt(time);
    if (prevTime > time) {
        return 'Aceasta valoare trebuie sa fie mai mare decat: ' + prevTime;
    }
}

function generateNewChart() {
    "use strict";
    var param_1 = $("#parametru_rata_estimari").val();
    var param_2 = $("#parametru_personal").val();
    var param_3 = $("#parametru_resurse_materiale").val();
    var timpStabilit = $("#timp_stabilit").val();
    var timp1 = $("#timp_1").val();
    var procent1 = $("#procent_1").val();

    param_1 = param_1 ? param_1 : 0;
    param_2 = param_2 ? param_2 : 0;
    param_3 = param_3 ? param_3 : 0;
    timpStabilit = timpStabilit ? timpStabilit : 0;
    timp1 = timp1 ? timp1 : 0;
    procent1 = procent1 ? procent1 : 0;

    param_1 = parseInt(param_1);
    param_2 = parseInt(param_2);
    param_3 = parseInt(param_3);
    timpStabilit = parseInt(timpStabilit);
    timp1 = parseInt(timp1);
    procent1 = parseInt(procent1);
    chart();
    return false;

}

function chart(label) {
    "use strict";
    var d2 = [
        [0, 3],
        [1, 8],
        [2, 5],
        [3, 13],
        [4, 1]
    ];    
    $.plot($("#chart"), [
        {
            data: d2,
            label: label
        }
    ], {
        clickable: true,
        hoverable: true,
        series: {
            lines: {
                show: true,
                fill: true,
                fillColor: {
                    colors: [
                        {
                            opacity: 0.5
                        },
                        {
                            opacity: 0.15
                        }
            ]
                }
            },
            points: {
                show: true
            }
        }
    });
}