$(function () {
	$('body').on('click','#sign-up-link',function(e){
		e.preventDefault();
		$('#sign-in-form').hide();
		$('#sign-up-form').show();
	});

	$('body').on('click','#back-to-login-link',function(e){
		e.preventDefault();
		$('#sign-in-form').show();
		$('#sign-up-form').hide();
	});

	$('body').on('click','#sign-up-button',function(e){
		e.preventDefault();
		userEmail = $('#signup-inputEmail').val();
		userName = $('#signup-inputName').val();
		userPassword = $('#signup-inputPassword').val();
		userConfPassword = $('#signup-confirmPassword').val();
		if(userConfPassword==userPassword){
			$.ajax({
				type:"POST",
				url:"../api/signup",
				data:{UserEmail: userEmail, UserName:userName, UserPassword:userPassword},
				success: function(responseText){
						$('#sign-in-form').show();
						$('#signup-inputEmail').val('');
						$('#signup-inputName').val('');
						$('#signup-inputPassword').val('');
						$('#signup-confirmPassword').val('');
						$('#sign-up-form').hide();					
				}
			});
		}
	});

	$('body').on('click','#sign-in-button',function(e){
		e.preventDefault();
		userEmail = $('#inputEmail').val();
		userPassword = $('#inputPassword').val();
		$.ajax({
			type:"POST",
			url:"../api/authenticate",
			data:{UserEmail: userEmail, UserPassword:userPassword},
			success: function(responseText){
				console.log(responseText.message);
				if(responseText.message=="authenticated")
				document.location.href="/user/"+responseText.user_id;
			}
		});
	});
});
