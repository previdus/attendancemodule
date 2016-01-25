function displayAttendanceList(){
 db.transaction(function(transaction) {
   var groupDataHtml = "<fieldset data-role='controlgroup'>";
	groupDataHtml = groupDataHtml + " <legend>Saved Attendance List:</legend>";
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









