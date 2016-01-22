// global variables
var db;
var shortName = 'WebSqlDB';
var version = '1.0';
var displayName = 'WebSqlDB';
var maxSize = 65535;

if (!window.openDatabase) {
  alert('Databases are not supported in this mobile.');
} else {
	db = openDatabase(shortName, version, displayName,maxSize);
}

function errorHandler(transaction, error) {
	alert('Error: ' + error.message + ' code: ' + error.code);
}

function nullHandler(){

};

function getUrls(type){
	var str_api = 'http://websites.avyay.co.in/sms-demo/api/';

	if(type == 'login'){
		return str_api + 'login-exec.php';
	} else {

	}
}

function loadPage(url) {
	 window.location = url;
}

$(document).bind('mobileinit',function(){
    $.mobile.changePage.defaults.changeHash = false;
    $.mobile.hashListeningEnabled = false;
    $.mobile.pushStateEnabled = false;
});