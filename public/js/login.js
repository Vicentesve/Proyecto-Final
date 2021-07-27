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
        

        if(!$("#txt-email").val().trim()) {
            $("#icon-email").addClass("icon-validation");
            $("#wrap-email").show();
            e.preventDefault();
        } else {
            $("#icon-email").removeClass("icon-validation");
            $("#wrap-email").hide();
        }

        if(!$("#txt-password").val().trim()) {
            $("#icon-password").addClass("icon-validation");
            $("#wrap-password").show();
            e.preventDefault();
        } else {
            $("#icon-password").removeClass("icon-validation");
            $("#wrap-password").hide();
        }

        e.preventDefault();

        var user = {
            email: $("#txt-email").val().trim().trim(),
            password: $("#txt-password").val().trim(),
        };

        $.post('/home', user)
        /*.then(function(pUser) {
            if (pUser.email === null){
                alert('Usuario o contraseña incorrecto');
            }else{
                redirect()
            }
            
        });*/

    });

    /* ========== Validations for signup ========== */

    $("#btn-sign-up").click(function(e) {

        if(!$("#txt-name").val().trim()) {
            $("#icon-name").addClass("icon-validation");
            $("#wrap-name").show();
            e.preventDefault();
        } else {
            $("#icon-name").removeClass("icon-validation");
            $("#wrap-name").hide();
        }

        if(!$("#txt-last-name").val().trim()) {
            $("#icon-lastName").addClass("icon-validation");
            $("#wrap-lastName").show();
            e.preventDefault();
        } else {
            $("#icon-lastName").removeClass("icon-validation");
            $("#wrap-lastName").hide();
        }

        if(!$("#txt-email-signup").val().trim()) {
            $("#icon-email-signup").addClass("icon-validation");
            $("#wrap-email-signup").show();
            e.preventDefault();
        } else {
            $("#icon-email-signup").removeClass("icon-validation");
            $("#wrap-email-signup").hide();
        }

        if(!$("#txt-password-signup").val().trim()) {
            $("#icon-password-signup").addClass("icon-validation");
            $("#wrap-password-signup").show();
            e.preventDefault();
        } else {
            $("#icon-password-signup").removeClass("icon-validation");
            $("#wrap-password-signup").hide();
        }

        if(!$("#txt-confPassword").val().trim()) {
            $("#icon-confPassword").addClass("icon-validation");
            $("#wrap-confPassword").show();
            e.preventDefault();
        } else {
            $("#icon-confPassword").removeClass("icon-validation");
            $("#wrap-confPassword").hide();
        }

        if($("#txt-confPassword").val().trim() && $("#txt-password-signup").val().trim()) {
            if($("#txt-confPassword").val().trim() != $("#txt-password-signup").val().trim()) {
                $("#icon-confPassword").addClass("icon-validation");
            $("#wrap-samePassword").show();
            e.preventDefault();
            } 
        } else {
            $("#wrap-samePassword").hide();
        }

        if(!$('#rb-professor').is(':checked') && !$('#rb-student').is(':checked')) {
            $("#wrap-profOrStudent").show();
            e.preventDefault();
        } else {
            $("#wrap-profOrStudent").hide();
        } 

        e.preventDefault();

        var role;
        if($('#rb-professor').is(':checked')) {
            var role = true;
        } else { 
            role = false;
        }
        
        var user = {
            name: $("#txt-name").val().trim(),
            lastName: $("#txt-last-name").val().trim(),
            email: $("#txt-email-signup").val().trim().trim(),
            password: $("#txt-password-signup").val().trim(),
            role: role
        };

        $.post("/addUser", user)
          .then(function(pUser) {
            if(pUser != null) {
                swal("Email already exists!", "Try to sign-up with another email", "warning");
            } else {
                swal("Account create succesfully!", `Welcome ${$("#txt-name").val().trim()} ${$("#txt-last-name").val().trim()} `, "success");
                //$(location).attr('href',"/");
                
            }
          
        });
    });

});



