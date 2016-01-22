$('form').submit(function(){
	var postData = $(this).serialize();
	var userName = $('#username').val();
	var password = $('#password').val();
	var loginUrl = getUrls('login');
	$.ajax({
		type: 'POST',
		url: loginUrl,
		data: postData,
		success: function(data){
			var obj = JSON.parse(data);
			if(obj.success){
				login(obj.user_id, obj.name, obj.apiKey, userName, password);
			} else {
				alert(obj.message);
			}
		},
		error: function(){
			console.log(data);
			alert('There was an error adding your comment');
			}
		});
	return false;
});

function init() {
	document.addEventListener("deviceready", deviceReady, true);
	delete init;
	initDB();
}

function deviceReady() {
}