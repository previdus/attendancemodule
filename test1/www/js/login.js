$('form').submit(function(){
	var postData = $(this).serialize();
	var userName = $('#username').val();
	var password = $('#password').val();
	var loginUrl = getLoginUrl();
	$.ajax({
		type: 'POST',
		url: loginUrl,
		data: postData,
		success: function(data){
		console.log(data);
		var obj = JSON.parse(data);
		//alert('inseting login data');
		login(obj.user_id, obj.name, obj.apiKey, userName, password);
		//alert('successfully inserted data');
		//getLoggedInUser();
		
		window.location = "index1.html";
			
		
		//alert('logged in user added');
		//alert(obj.apiKey);
		//alert(obj.name);
		//alert(obj.user_id);
		//loadPage('index1.html');
	},
	error: function(){
		console.log(data);
		alert('There was an error adding your comment');
		}
	});
	return false;
});
	
function loadPage(url) {
	 window.location = url;
}

function init() {
	document.addEventListener("deviceready", deviceReady, true);
	delete init;
	initDB();
}

function getLoginUrl(){
  return 'http://websites.avyay.co.in/sms-demo/api/login-exec.php';
}

function deviceReady() {
}