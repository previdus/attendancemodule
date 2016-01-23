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
  // this is a call back method which does nothing.
};

function getUrls(type){
	var str_api = 'http://websites.avyay.co.in/sms-demo/api/';

	if(type == 'login'){
		return str_api + 'login-exec.php';
	} 
	else if(type == 'pullGrpAndStudentData'){
		return str_api + 'fetch-data.php';
	}else{
	}
}

function loadPage(url) {
	 window.location = url;
}

function logout(){
	db.transaction(function(transaction) { 
			transaction.executeSql('delete from m_loggedin_user;',[],nullHandler,errorHandler);	 
	},errorHandler,logoutRedirect);
return false;
}

function logoutRedirect(){
	loadPage('index.html');
}

$(document).bind('mobileinit',function(){
    // $.mobile.changePage.defaults.changeHash = false;
    // $.mobile.hashListeningEnabled = false;
    // $.mobile.pushStateEnabled = false;
});

function extractLoggedInUserData() {
 db.transaction(function(transaction) {
   transaction.executeSql('select * from m_loggedin_user limit 1;', [],
     function(transaction, result) {
      if (result != null && result.rows != null) {
        for (var i = 0; i < result.rows.length; i++) {
           var row = result.rows.item(i);
			$('#welcome').html("<h1>" + row.name + "</h1>");
			$('#userId').val(row.id);
			$('#apiKey').val(row.api_key);
			$('#userName').val(row.name);
        }
      }else{
	    logoutRedirect();
	  }
     },errorHandler);
 },errorHandler,loadGroupAndStudentDataOnFirstLogin);
 return;
}

