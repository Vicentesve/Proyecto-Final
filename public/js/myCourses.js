$(document).ready(function(){
    $('.containerCourses').on('click', '.course', function() {
        $('.courseCard').show();
        $('.containerCourses').fadeTo('fast', 0.7);
    });
});