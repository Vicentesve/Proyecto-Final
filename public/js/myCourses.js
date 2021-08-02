$(document).ready(function(){

    $('.containerCourses').on('click', '.course', function() {
        var cn = $(this).find('.courseName').text();
        var id = $(this).find('.id').text();
        $('.courseCard').show();
        $('.courseCard').find('.id').text(id);
        $('.courseCard').find('.courseNameEdit').text(cn);
        var linkDel = '/deleteCourse/' + id;
        var linkUpdate = '/editCourse/' + id;
        $('.courseCard').find('.linkDelete').attr('href',linkDel.trim());
        $('.courseCard').find('.courseForm').attr('action',linkUpdate.trim());
        $('.containerCourses').fadeTo('fast', 0.7);
    });

    $('.courseCard').on('click', '.fa-times-circle', function() {
        $('.courseCard').hide();
        $('.containerCourses').fadeTo('fast', 1);
    });

    /* $('.btn-delete').on('click', function(){
        var id = $('.courseCard').find('.id').text();
        console.log(id);
        var linkDel = '/deleteCourse/' + id;
        $.get(linkDel);
    }) */

});