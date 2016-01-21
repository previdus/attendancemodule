// global variables
var db;
var shortName = 'WebSqlDB';
var version = '1.0';
var displayName = 'WebSqlDB';
var maxSize = 65535;

function initDB(){
	db = openDatabase(shortName, version, displayName,maxSize);
}

// this is called when an error happens in a transaction
function errorHandler(transaction, error) {
   alert('Error: ' + error.message + ' code: ' + error.code);
}
// this is called when a successful transaction happens
function successCallBack() {
   //alert("DEBUGGING: success");
}
function nullHandler(){};



function displayAttendanceList(){
 alert('getting attendance list');

if (!window.openDatabase) {
  alert('Databases are not supported in this browser.');
  return;
 }


 
// this line clears out any content in the #lbUsers element on the page so that the next few lines will show updated
// content and not just keep repeating lines
 //$('#lbUsers').html('');


// this next section will select all the content from the User table and then go through it row by row
// appending the UserId  FirstName  LastName to the  #lbUsers element on the page
 db.transaction(function(transaction) {
   var groupDataHtml = "<fieldset data-role='controlgroup'>";
	groupDataHtml = groupDataHtml + " <legend>Student List:</legend>";
	var userId = $('#userId').val(); 
   transaction.executeSql('select * from m_attendance where user_id = ?;', [userId],
     function(transaction, result) {
      if (result != null && result.rows != null) {
		alert('Length ' + result.rows.length);
        for (var i = 0; i < result.rows.length; i++) {
           var row = result.rows.item(i);
		   groupDataHtml = groupDataHtml + '<br><input type="checkbox" name="selectedAttendance" id="' + row.group_id + '" value="'+ row.date+  '" checked>';
		   groupDataHtml = groupDataHtml + '<label for="' + row.date + '">' + row.group_id + '</label>';
		   $('#attendanceData').html('');
           $('#attendanceData').append('<br>' + row.group_id + '. ' + row.user_id + ' '+ row.date + ' '+ row.present_list + ' '+ row.absent_list + ' ');
        }
		groupDataHtml = groupDataHtml + "</fieldset>";
		groupDataHtml = groupDataHtml + "<input type='button' value='Add Attendance' onClick='pushAttendance()'> <br>";
		 $('#attendanceList').html('');
		 $('#attendanceList').append('<br>' + groupDataHtml);
		 
      }
     },errorHandler);
 },errorHandler,nullHandler);

 return;

}


function extractLoggedInUserData() {
		
	if (!window.openDatabase) {
		alert('Databases are not supported in this browser.');
		return;
		}
	// this line clears out any content in the #lbUsers element on the page so that the next few lines will show updated
// content and not just keep repeating lines
 //$('#lbUsers').html('');

// this next section will select all the content from the User table and then go through it row by row
// appending the UserId  FirstName  LastName to the  #lbUsers element on the page
 db.transaction(function(transaction) {
   transaction.executeSql('select * from m_loggedin_user limit 1;', [],
     function(transaction, result) {
      if (result != null && result.rows != null) {
        for (var i = 0; i < result.rows.length; i++) {
           var row = result.rows.item(i);
			$('#userId').val(row.id);
			$('#apiKey').val(row.api_key);
			$('#userName').val(row.name);
           //$('#loggedInUser').append('<br>' + row.id + '. ' + row.name + ' ' + row.api_key);
        }
      }else{alert(result);}
     },errorHandler);
 },errorHandler,nullHandler);

 return;

}








