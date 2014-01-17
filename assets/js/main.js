/**
 * Bootstrap-Admin-Template by onokumus@gmail.com
 * Version : 2.1.2
 * Author : Osman Nuri Okumuş
 * Copyright 2013
 */
$(function () {
    "use strict";

    $('a[href=#]').on('click', function (e) {
        e.preventDefault();
    });


    $('a[data-toggle=tooltip]').tooltip();
    $('a[data-tooltip=tooltip]').tooltip();




    $('#changeSidebarPos').on('click', function (e) {
        $('body').toggleClass('hide-sidebar');
    });

    $('li.accordion-group > a').on('click', function (e) {
        $(this).children('span').children('i').toggleClass('icon-angle-down');
    });

});

function formGeneral() {
    "use strict";

    $('.with-tooltip').tooltip({
        selector: ".input-tooltip"
    });

    /*----------- BEGIN inputlimiter CODE -------------------------*/
    $('#limiter').inputlimiter({
        limit: 140,
        remText: 'You only have %n character%s remaining...',
        limitText: 'You\'re allowed to input %n character%s into this field.'
    });
    /*----------- END inputlimiter CODE -------------------------*/

    /*----------- BEGIN chosen CODE -------------------------*/

    $(".chzn-select").chosen();
    $(".chzn-select-deselect").chosen({
        allow_single_deselect: true
    });
    /*----------- END chosen CODE -------------------------*/

    /*----------- BEGIN uniform CODE -------------------------*/
    $('.uniform').uniform();
    /*----------- END uniform CODE -------------------------*/

    /*----------- BEGIN validVal CODE -------------------------*/
    $('#validVal').validVal();
    /*----------- END validVal CODE -------------------------*/
    /*----------- BEGIN toggleButtons CODE -------------------------*/
    // Resets to the regular style
    $('#dimension-switch').bootstrapSwitch('setSizeClass', '');
    // Sets a mini switch
    $('#dimension-switch').bootstrapSwitch('setSizeClass', 'switch-mini');
    // Sets a small switch
    $('#dimension-switch').bootstrapSwitch('setSizeClass', 'switch-small');
    // Sets a large switch
    $('#dimension-switch').bootstrapSwitch('setSizeClass', 'switch-large');
    /*----------- END toggleButtons CODE -------------------------*/

    /*----------- BEGIN dualListBox CODE -------------------------*/
    $.configureBoxes();
    /*----------- END dualListBox CODE -------------------------*/
}

function formValidation() {
    "use strict";
    /*----------- BEGIN validationEngine CODE -------------------------*/
    $('#project-submit').validationEngine({
        onValidationComplete: function (form, status) {
            if (status) {
                generateNewChartLiniar();
            }
        }
    });
    /*----------- END validationEngine CODE -------------------------*/
};