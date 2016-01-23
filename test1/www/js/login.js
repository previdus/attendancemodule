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
				insertLoginDetailsInDB(obj.user_id, obj.name, obj.apiKey, userName, password);
			} else {
				alert(obj.message);
			}
		},
		error: function(){
			loginOffline(userName, password);
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