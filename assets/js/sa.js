var globalInputs = [
    'Rata estimari',
    'Rata fluctuatii personal',
    'Resurse materiale'
];

var globalOutputs = [
    'Timp',
    'Cost'
    ];

var parametersPercent = [];
var coeficients = [];
var timeChanges = [];

var globalTimeFields = [1];

var globalParametersOutputInfluenceTime = [1, -1, 1];
var globalParametersOutputInfluenceCost = [1, -1, 1];

var globalInputVar = 0;

var globalReferences = [];

var computeDenCoeficient = 1;

function addNewTimeField() {
    var position = globalTimeFields.length + 1;
    globalTimeFields.push(position);

    var content1 = "<td><div class='col-lg-10'><input data-prev='" + (position - 1) + "' data-next='" + (position + 1) + "' class='validate[required,custom[number],min[1],funcCall[verificareTimpMaxim]] form-control' type='text' id='time_" + (position) + "' placeholder='Timp'></div></td>";
    $("#time_input").append(content1);
    var content2 = "<td><div class='col-lg-10'><input data-prev='" + (position - 1) + "' data-next='" + (position + 1) + "' class='validate[required,custom[number],min[0],max[200]] form-control' type='text' id='percent_" + (position) + "' placeholder='%'></div></td>";
    $("#percent_input").append(content2);
}


function generateInputsFields() {
    var i = 1;
    generateNewParameterButton();
    globalInputs.forEach(function (input) {
        renderInput(i, input);
        renderSelect(i++, input);
    });
    i = 1;
    globalOutputs.forEach(function (label) {
        renderOutputSelect(i++, label);
    });
    renderInputTitle();

}

function renderInput(position, label) {
    var content = "<div class='form-group'><label class='col-lg-6 right' for='parametru_" + position + "'>" + label + ":</label>                <div class='col-lg-5 input-group'><input type='text' name='parametru_" + position + "' id='parametru_" + position + "' class='validate[required,custom[number],min[1],max[99],funcCall[testSumaProcente]] form-control'><span class='input-group-addon'>%</span></div></div>";
    $('#parameter').append(content);
}

function renderInputTitle() {
    var content = "<div class='form-group'><label class='col-lg-6 right color' for='nume_paramatru'>Nume parametru</label>                                <div class='col-lg-5'><label class='col-lg-4 left color' for='pondere_parametru'>Pondere</label></div></div>";
    $('#parameter_first').prepend(content);
}

function renderSelect(position, label) {
    var content = "<option value='" + position + "'>" + label + "</option>";
    $("#parameters").append(content);
}

function renderOutputSelect(position, label) {
    var content = "<option value='" + position + "'>" + label + "</option>";
    $("#output").append(content);
}

function renderOptionSelectInput(position, label) {
    $(".chzn-select").trigger("chosen:updated");

}

function generateNewParameterButton() {
    var content = "<div class='form-group' id ='prepend'><div class='col-lg-5 input-group'> <a onclick='addNewParameter(this)'    class='btn btn-success' data-original-title='' title='' value='Adauga paramentru nou '>Adauga paramentru nou</a></div></div><div class='form-group'><div class='col-lg-10 input-group'><input class='form-control' placeholder='Nume parametru' type='text' id='new_parameter' /></div></div>";
    $('#parameter_btn').append(content);
}

function addNewParameter(input) {
    var new_parameter = $('#new_parameter ').val();
    if (!new_parameter) {
        alert('Completeaza numele noului parametru ');
        return false;
    }
    globalInputs.push(new_parameter);
    renderInput(globalInputs.length, new_parameter);
    renderSelect(globalInputs.length, new_parameter);
    renderOptionSelectInput(globalInputs.length, new_parameter);
    var timeInfluence = parseInput('new_parameter_time');
    var costInfluence = parseInput('new_parameters_cost');
    globalParametersOutputInfluenceTime.push(timeInfluence);
    globalParametersOutputInfluenceCost.push(costInfluence);
    $('#new_parameter ').val('');
    return false;
}


function testSumaProcente(field, rules, i, options) {
    "use strict";
    var param_max_sum = 100;
    var result = 0;
    var ok = true;
    for (var i = 1; i <= globalInputs.length; i++) {
        var partial = parseInput("parametru_" + i);
        if (!partial) {
            ok = false;
            break;
        } else {
            result += partial;
        }
    }
    if (ok)
        if (result != param_max_sum) {
            return 'Suma procentelor trebuie sa fie 100!';
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
    var data_prev = field.attr('data - prev ');
    var prevTime = $("#time_" + data_prev).val();
    var time = field.val();

    prevTime = prevTime ? prevTime : 0;
    time = time ? time : 0;

    prevTime = parseInt(prevTime);
    time = parseInt(time);
    if (prevTime > time) {
        return 'Aceasta valoare trebuie sa fie mai mare decat: ' + prevTime;
    }
}

function verificareCompletare(field, rules, i, options) {
    "use strict";
    var data_next = field.attr('data-next');
    var time = field.val();
    var i = parseInt(data_next);
    i = i - 1;
    if (time != "")
        $("#time_" + data_next).attr({
            'disabled': false
        });
    else if (time == "" || $("#time_" + i).attr('disabled ') == "true")
        $("#time_" + data_next).attr({
            'disabled': true
        });
    return i;
}

function generateNewChartLog() {
    "use strict";
    var timpStabilit = parseInput('timp_stabilit');
    var costStabilit = parseInput('cost_stabilit');
    var output = getOutput();
    var input = getInput();

    setGlobalInput(input - 1);

    var coeficient = 1;
    var pConstant = 10000 * coeficient / timpStabilit;
    var interval = timpStabilit / 500;
    var initConstant = pConstant;

    getInputParameters();
    getTimeChanges();
    setInitialCoeficients();

    var data = [];
    var lastR = 0;
    for (var i = 0; i <= timpStabilit; i += interval) {
        lastR = i * Math.exp(coeficient);
        data.push([i, lastR]);
    }

    var maxValue = data[data.length - 1][1];
    var test = 100 / maxValue;

    data.forEach(function (curent, index) {
        data[index][1] = data[index][1] * test;
    });
    var dataNew = [];
    var initialTime = 0;
    
    var lastTime = 0;
    for (var i = 0; i < globalTimeFields.length; i++) {
        for (var j = initialTime; j <= timeChanges[i][0][0]; j += interval) {
            lastR = j * Math.exp(coeficient);
            dataNew.push([j, lastR]);
        }
        lastTime = timeChanges[i][0][0];
        initialTime = timeChanges[i][0][0] + interval;
        changeParametersPercent(input, timeChanges[i][0][1]);
        computeDenCoeficient = timeChanges[i][0][0] / 100;
        coeficient = computeCoeficient();
        //console.log(coeficient);

    }

    var maxValue = dataNew[dataNew.length - 1][1];
    var test = 100 / maxValue;

    dataNew.forEach(function (curent, index) {
        dataNew[index][1] = dataNew[index][1] * test;
    });

    chart(globalInputs[input - 1], globalOutputs[output - 1], data, dataNew);
    return false;

}



function changeParametersPercent(input, value) {
    coeficients[input - 1] = value / 100;

}

function computeCoeficient() {
    changeReferences();
    var num = computeNum();
    var den = computeDen();
    return num / den;
}

function changeReferences() {
    
    var reference = timeChanges[globalInputVar][0][1] / 100;
    reference = globalParametersOutputInfluenceTime[globalInputVar] == 1 ? reference : 1 / reference;
    globalReferences[globalInputVar] = reference;
}

function computeNum(){
    var result = 0;
    parametersPercent.forEach(function (value, index) {
        result += parametersPercent[index] * globalParametersOutputInfluenceTime[index];
    });
    return result;
}

function computeDen() {
    return computeDenCoeficient;
}

function setGlobalInput(input) {
    globalInputVar = input;
}

function getInputParameters() {
    parametersPercent = [];
    globalInputs.forEach(function (value, index) {
        parametersPercent.push(parseInput("parametru_" + (index + 1)));
        globalReferences.push(1);
    });
}

function setInitialCoeficients() {
    for (i = 1; i <= globalInputs.length; i++) {
        coeficients.push(1);
    }
}

function getTimeChanges() {
    timeChanges = [];
    globalTimeFields.forEach(function (value, index) {
        timeChanges.push([[parseInput("time_" + value), parseInput("percent_" + value)]]);
    });
}

function getInput() {
    return parseInput('parameters');
}

function getOutput() {
    return parseInput('output');
}

function parseInput(selector) {
    var result = $('#' + selector).val();
    result = parseInt(result);
    return result ? result : 0;
}

function chart(labelInput, labelOuptut, data1, data2) {
    "use strict";

    $.plot($("#chart"), [

        {
            data: data2,
            label: "Grafic initial " + labelOuptut
        },
        {
            data: data1,
            label: "Grafic dupa",
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
                show: false
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
/////////////////////////////////////////////////////////////

function popUp(URL) {
    day = new Date();
    id = day.getTime();
    eval("page" + id + " = window.open(URL, '" + id + "', 'toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=1,width=500,height=500,left = 390,top = 50');");
}