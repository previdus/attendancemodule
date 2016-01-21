
function loadPage(url) {
	 window.location = url;
}

function init() {
     
	document.addEventListener("deviceready", deviceReady, true);
	delete init;
	initDB();
	extractLoggedInUserData();
	displayAttendanceList();
}

function getPushDataUrl(){
  return ' http://websites.avyay.co.in/sms-demo/api/fetch-data.php?api_key=1234';
 
}

function deviceReady() {
}