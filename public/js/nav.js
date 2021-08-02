$(document).ready(function(){

    $('#wrap-btn-menu').on('click', function() {
        $(".wrap-nav").css("display", "flex");
        $("#wrap-btn-menu").css("display", "none");
    });

    $('#wrap-btn-menu2').on('click', function() {
        $(".wrap-nav").css("display", "none");
        $("#wrap-btn-menu").css("display", "flex");
    });
});