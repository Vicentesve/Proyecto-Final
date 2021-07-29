$(document).ready(function(){

    $('.containerCourses').on('click', '.course', function() {
        var cn = $(this).find('p').text();
        $('.courseCard').find('p').text(cn);
        $('.courseCard').show();
        $('.containerCourses').fadeTo('fast', 0.7);
    });

    $('.courseCard').on('click', '.fa-times-circle', function() {
        $('.courseCard').hide();
        $('.containerCourses').fadeTo('fast', 1);
    });

});