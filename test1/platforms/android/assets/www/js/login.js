var randNum = Math.floor((Math.random() * 100000) + 1);
$("#rand-num").html(randNum);

$('form.login-form').submit(function(){
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
				//loginOffline(userName, password);
				insertLoginDetailsInDB(obj.user_id, obj.name, obj.apiKey, userName, password);
			} else {
				alert(obj.message);
			}
		},
		error: function(){
			alert('Internet connection is not available. You will be logged in offline.');
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

function UserResetDB(){
	if($("#randnum").val() == randNum){
		resetDB();
		alert('DB has been reset');
	} else {
		alert("Please enter valid code");
	}
}