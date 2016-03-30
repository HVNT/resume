$(document).ready(function() {

    /* Background Stuff */
    var r = (180 + Math.round((Math.random() * 60)));
    var g = (180 + Math.round((Math.random() * 60)));
    var b = (180 + Math.round((Math.random() * 60)));
    var start_rgba = 'rgba(' + r + ',' + g + ',' + b + ', 1)';
    var end_rgba   = 'rgba(' + (r - 100) + ',' + (g - 100) + ',' + (b - 100) + ', 1)';

    $('body').css({'background-color': start_rgba,
        'background-image': '-moz-linear-gradient(top, ' + start_rgba + ', ' + end_rgba + ')',
        'background-image': '-webkit-gradient(linear, left top, left bottom, from(' + start_rgba +'), to(' + end_rgba + '))',
        'background-image': '-webkit-linear-gradient(top, ' + start_rgba +', ' + end_rgba + ')',
        'background-image': '-moz-linear-gradient(top, ' + start_rgba +', ' + end_rgba + ')',
        'background-image': '-ms-linear-gradient(top, ' + start_rgba +', ' + end_rgba + ')',
        'background-image': '-o-linear-gradient(top, ' + start_rgba +', ' + end_rgba + ')',
        'background-image': 'linear-gradient(to bottom, ' + start_rgba +', ' + end_rgba + ')'});
});/**
 * Created with JetBrains WebStorm.
 * User: hunterbrennick
 * Date: 3/4/13
 * Time: 11:47 PM
 * To change this template use File | Settings | File Templates.
 */
