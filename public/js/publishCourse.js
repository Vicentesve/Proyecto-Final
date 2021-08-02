$(document).ready(function(e) { 
    
    $("#btn-publish-course").click(function(e) { 
        if(!$("#txt-course-name").val().trim()) {
            $("#icon-nameCourse").addClass("icon-validation");
            $("#wrap-course").show();
            e.preventDefault();
        } else {
            $("#icon-nameCourse").removeClass("icon-validation");
            $("#wrap-course").hide();
        }

        if(!$("#txt-course-description").val().trim()) {
            $("#icon-textarea").addClass("icon-validation");
            $("#wrap-course-description").show();
            e.preventDefault();
        } else {
            $("#icon-textarea").removeClass("icon-validation");
            $("#wrap-course-description").hide();
        }

        if ($("#image")[0].files.length === 0) {
            $("#wrap-course-img").show();
            e.preventDefault();
        } else {
            $("#wrap-course-img").hide();
           
        }
    });

});