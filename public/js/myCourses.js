$(document).ready(function(){
    $('.containerCourses').on('click', '.course', function() {
        var cn = $(this).find('p').text();
        var ccn = $('.courseCard').find('p').text(cn);
        $('.courseCard').show();
        $('.containerCourses').fadeTo('fast', 0.7);
    });
});