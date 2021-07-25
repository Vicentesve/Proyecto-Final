$(document).ready(function() {
    
    $( "#create-account" ).click(function(e) {
        e.preventDefault();
        $( ".login-form" ).hide();
        $( ".signup-form" ).show();
    });

    $( "#log-in" ).click(function() {
        $( ".login-form" ).show();
        $( ".signup-form" ).hide();
    });

    /* ========== Validations for sign in ========== */

    $("#btn-sign-in").click(function(e) {
        e.preventDefault();

        if(!$("#txt-email").val().trim()) {
            $("#icon-email").addClass("icon-validation");
            $("#wrap-email").show();
            return;
        } else {
            $("#icon-email").removeClass("icon-validation");
            $("#wrap-email").hide();
        }

        if(!$("#txt-password").val().trim()) {
            $("#icon-password").addClass("icon-validation");
            $("#wrap-password").show();
            return;
        } else {
            $("#icon-password").removeClass("icon-validation");
            $("#wrap-password").hide();
        }

    });

    /* ========== Validations for sign in ========== */

    /* ========== Validations for signup ========== */

    $("#btn-sign-up").click(function(e) {
        e.preventDefault();

        if(!$("#txt-name").val().trim()) {
            $("#icon-name").addClass("icon-validation");
            $("#wrap-name").show();
            return;
        } else {
            $("#icon-name").removeClass("icon-validation");
            $("#wrap-name").hide();
        }

        if(!$("#txt-last-name").val().trim()) {
            $("#icon-lastName").addClass("icon-validation");
            $("#wrap-lastName").show();
            return;
        } else {
            $("#icon-lastName").removeClass("icon-validation");
            $("#wrap-lastName").hide();
        }

        if(!$("#txt-email-signup").val().trim()) {
            $("#icon-email-signup").addClass("icon-validation");
            $("#wrap-email-signup").show();
            return;
        } else {
            $("#icon-email-signup").removeClass("icon-validation");
            $("#wrap-email-signup").hide();
        }

        if(!$("#txt-password-signup").val().trim()) {
            $("#icon-password-signup").addClass("icon-validation");
            $("#wrap-password-signup").show();
            return;
        } else {
            $("#icon-password-signup").removeClass("icon-validation");
            $("#wrap-password-signup").hide();
        }

        if(!$("#txt-confPassword").val().trim()) {
            $("#icon-confPassword").addClass("icon-validation");
            $("#wrap-confPassword").show();
            return;
        } else {
            $("#icon-confPassword").removeClass("icon-validation");
            $("#wrap-confPassword").hide();
        }

        if($("#txt-confPassword").val().trim() != $("#txt-password-signup").val().trim()) {
            $("#icon-confPassword").addClass("icon-validation");
            $("#wrap-samePassword").show();
            return;
        } else {
            $("#icon-confPassword").removeClass("icon-validation");
            $("#wrap-samePassword").hide();
        }

    });

    /* ========== Validations for signup ========== */
});