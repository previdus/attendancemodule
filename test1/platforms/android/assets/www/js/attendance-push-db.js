function displayAttendanceList(){
 db.transaction(function(transaction) {
 $('#attendanceData').html('');
   var groupDataHtml = "<fieldset data-role='controlgroup'>";
	groupDataHtml = groupDataHtml + " <legend>Saved Attendance List:</legend>";
   transaction.executeSql('select attendance.rowid as rowid,attendance.group_id as group_id, attendance.date as attDate,attendance.user_id as user_id,attendance.present_list as present_list , attendance.absent_list as absent_list, loginusr.api_key as api_key  from m_attendance attendance,m_loggedin_user loginusr  where loginusr.id  = attendance.user_id;', [],
	 function(transaction, result) {
      if (result != null && result.rows != null) {
        for (var i = 0; i < result.rows.length; i++) {
           var row = result.rows.item(i);
		   groupDataHtml = groupDataHtml + '<br><input type="checkbox" name="selectedAttendance" id="' + row.rowid + '" value="'+ row.attDate+  '" checked>';
		   groupDataHtml = groupDataHtml + '<label for="' + row.date + '">' + row.group_id + '</label>';
           $('#attendanceData').append('<br><br>'+ row.rowid + ' -- ' + row.group_id + ' -- ' + row.user_id + ' -- '+ row.attDate + ' -- '+ row.present_list + ' -- '+ row.absent_list + ' -- ' + row.api_key);
        }
		groupDataHtml = groupDataHtml + "</fieldset>";
		groupDataHtml = groupDataHtml + "<input type='button' value='Save All Attendance' onClick='saveAllAttendance()'> <br>";
		 $('#attendanceList').html('');
		 $('#attendanceList').append('<br>' + groupDataHtml);
		 
      }
     },errorHandler);
 },errorHandler,nullHandler);

 return;

}

function showNoOfAttendanceYetToBeSentToServer(){
 db.transaction(function(transaction) {
   transaction.executeSql('select * from m_attendance attendance,m_loggedin_user loginusr  where loginusr.id  = attendance.user_id;', [],
	 function(transaction, result) {
      if (result != null && result.rows != null) {
        		$('#noOfAttendanceToBeSentToServer').html('Attendance need to be updated: ' + result.rows.length);
      }
     },errorHandler);
 },errorHandler,nullHandler);
 return;
}

function saveAllAttendance(){
 db.transaction(function(transaction) {
   transaction.executeSql('select attendance.rowid as rowid,attendance.group_id as group_id, attendance.date as attDate,attendance.user_id as user_id,attendance.present_list as present_list , attendance.absent_list as absent_list, loginusr.api_key as api_key  from m_attendance attendance,m_loggedin_user loginusr  where loginusr.id  = attendance.user_id;', [],
	 function(transaction, result) {
      if (result != null && result.rows != null) {
        for (var i = 0; i < result.rows.length; i++) {
           var row = result.rows.item(i);
		   saveAttendanceOnServer(row.rowid, row.group_id, row.user_id, row.attDate, row.present_list, row.absent_list);
        }		 
      }
     },errorHandler);
 },errorHandler,allAttendanceSuccessfullySaved);
 return;
}

function allAttendanceSuccessfullySaved(){
	alert('Attendance saved successfully');
}

function saveAttendanceOnServer(rowNo, group_id, user_id, attDate, present_list, absent_list, api_key){
        // save it on server and delete once saved successfully.              
		deleteAttendanceData(rowNo);
}

function deleteAttendanceData(rowNo){
	db.transaction(function(transaction) {
		transaction.executeSql('delete from m_attendance where rowid = ?',[rowNo],nullHandler,errorHandler);
	}, errorHandler, nullHandler);
}











