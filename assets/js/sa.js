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
    var labelInputArray = {
        'parametru_rata_estimari': 'Rata estimari',
        'parametru_personal': 'Rata fluctuatii personal',
        'parametru_resurse_materiale': 'Resurse materiale'
    };
    var labelOutputArray = {
        'iesire_timp': 'Timp',
        'iesire_cost': 'Cost'
    };
    var param_1 = $("#parametru_rata_estimari").val();
    var param_2 = $("#parametru_personal").val();
    var param_3 = $("#parametru_resurse_materiale").val();
    var timpStabilit = $("#timp_stabilit").val();
    var costStabilit = $("#cost_stabilit").val();

    var timp1 = $("#timp_1").val();
    var procent1 = $("#procent_1").val();
    var timp2 = $("#timp_2").val();
    var procent2 = $("#procent_2").val();
    var timp3 = $("#timp_3").val();
    var procent3 = $("#procent_3").val();
    var timp4 = $("#timp_4").val();
    var procent4 = $("#procent_4").val();
    var timp5 = $("#timp_5").val();
    var procent5 = $("#procent_5").val();
    var timp6 = $("#timp_6").val();
    var procent6 = $("#procent_6").val();


    var input = $("#parameters").val();
    var output = $("#output").val();

    param_1 = param_1 ? param_1 : 0;
    param_2 = param_2 ? param_2 : 0;
    param_3 = param_3 ? param_3 : 0;
    timpStabilit = timpStabilit ? timpStabilit : 0;
    costStabilit = costStabilit ? costStabilit : 0;

    timp1 = timp1 ? timp1 : 0;
    procent1 = procent1 ? procent1 : 0;
    timp2 = timp2 ? timp2 : 0;
    procent2 = procent2 ? procent2 : 0;
    timp3 = timp3 ? timp3 : 0;
    procent3 = procent3 ? procent3 : 0;
    timp4 = timp4 ? timp4 : 0;
    procent4 = procent4 ? procent4 : 0;
    timp5 = timp5 ? timp5 : 0;
    procent5 = procent5 ? procent5 : 0;
    timp6 = timp6 ? timp6 : 0;
    procent6 = procent6 ? procent6 : 0;

    var valOutput = (output == "iesire_timp") ? timpStabilit : ((output == "iesire_cost") ? costStabilit : 0);

    param_1 = parseInt(param_1) / 100;
    param_2 = parseInt(param_2) / 100;
    param_3 = parseInt(param_3) / 100;
    timpStabilit = parseInt(timpStabilit);

    timp1 = parseInt(timp1);
    procent1 = parseInt(procent1);
    timp2 = parseInt(timp2);
    procent2 = parseInt(procent2);
    timp3 = parseInt(timp3);
    procent3 = parseInt(procent3);
    timp4 = parseInt(timp4);
    procent4 = parseInt(procent4);
    timp5 = parseInt(timp5);
    procent5 = parseInt(procent5);
    timp6 = parseInt(timp6);
    procent6 = parseInt(procent6);

    var chart2 = [];
    chart2.push([0, 0]);
    var chart1 = [];
    chart1.push([
            0, 0
        ]);
    chart1.push([
        valOutput, 100
    ]);
    var c1 = 1;
    var c2 = 1;
    var c3 = 1;
    var cInit = c1 * param_1 + c2 * param_2 + c3 * param_3;
    var rInit = valOutput;
    var rIntermediar = cInit * timp1 * 100 / rInit;

    switch (input) {
    case "parametru_rata_estimari":
        c1 = 100 / procent1;
        break;
    case "parametru_personal":
        c2 = 100 / procent1;
        break;
    case "parametru_resurse_materiale":
        c3 = procent1 / 100;
        break;
    }
    cInit = c1 * param_1 + c2 * param_2 + c3 * param_3;
    valOutput = (valOutput - timp1) / cInit + timp1;
    if (rIntermediar > 100) {
        rIntermediar = 100;

    }
    chart2.push([timp1, rIntermediar]);
    if (!timp2 && rIntermediar < 100) {
        chart2.push([valOutput, 100]);
    } else if (rIntermediar < 100) {
        rIntermediar += cInit * (timp2 - timp1) * 100 / valOutput;

        switch (input) {
        case "parametru_rata_estimari":
            c1 = 100 / procent2;
            c2 = 1;
            c3 = 1;
            break;
        case "parametru_personal":
            c2 = 100 / procent2;
            c1 = 1;
            c3 = 1;
            break;
        case "parametru_resurse_materiale":
            c3 = procent2 / 100;
            c2 = 1;
            c1 = 1;
            break;
        }

        if (rIntermediar > 100) {
            chart2.push([100 * timp2 / rIntermediar, 100]);

        } else {
            chart2.push([timp2, rIntermediar]);
            valOutput = (valOutput - timp2) / cInit + timp2;
        }

    }
    if (rIntermediar < 100) {
        if (!timp3) {
            chart2.push([valOutput, 100]);
        } else {
            rIntermediar += cInit * (timp2 - timp1) * 100 / valOutput;
            chart2.push([timp2, rIntermediar]);
            switch (input) {
            case "parametru_rata_estimari":
                c1 = 100 / procent2;
                c2 = 1;
                c3 = 1;
                break;
            case "parametru_personal":
                c2 = 100 / procent2;
                c1 = 1;
                c3 = 1;
                break;
            case "parametru_resurse_materiale":
                c3 = procent2 / 100;
                c2 = 1;
                c1 = 1;
                break;
            }
            valOutput = (valOutput - timp2) / cInit + timp2;
        }
    }
    chart(labelInputArray[input], labelOutputArray[output], chart1, chart2);
    return false;

}

function chart(labelInput, labelOuptut, data1, data2) {
    "use strict";

    $.plot($("#chart"), [
        {
            data: data2,
            label: "Intrare: " + labelInput + "<br /> Iesire: " + labelOuptut
        },
        {
            data: data1,
            //label: "Intrare: " + labelInput + "<br /> Iesire: " + labelOuptut
            label: "Grafic initial realizabilitate/" + labelOuptut
        }


    ], {
        clickable: true,
        hoverable: true,
        series: {
            lines: {
                show: true,
                fill: false,
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
        },
        legend: {
            position: "nw"
        },
        xaxis: {
            label: labelOuptut
        },
        yaxis: {
            label: 'Realizabilitate'
        },
        grid: {
            hoverable: true,
            clickable: true
        },
        tooltip: true,
        tooltipOpts: {
            content: "Timp: %x<br /> Realizabilitate: %y",
            shifts: {
                x: -60,
                y: 25
            }
        }
    });

}