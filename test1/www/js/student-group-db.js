function initDB(){	
	extractLoggedInUserData();
}

function extractLoggedInUserData() {
 db.transaction(function(transaction) {
   transaction.executeSql('select * from m_loggedin_user limit 1;', [],
     function(transaction, result) {
      if (result != null && result.rows != null) {
        for (var i = 0; i < result.rows.length; i++) {
           var row = result.rows.item(i);
			$('#welcome').html("<h1> Welcome " + row.name + "</h1>");
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

function loadGroupAndStudentDataOnFirstLogin() {
	db.transaction(function(transaction) {
		transaction.executeSql('select * from m_groups where user_id = ? limit 1;', [$('#userId').val()],
		function(transaction, result) {
			if (result != null && result.rows != null && result.rows.length == 0) {
			   pullGroupAndStudentDataFromServer();
			}else{ 
				displayGroups();
			}
		},errorHandler);
	},errorHandler,displayGroups);
	return;
}

function saveGroupAndStudentDataFromServerToLocalDB(groupAndStudentData) {
 db.transaction(function(transaction) {
   transaction.executeSql('select * from m_loggedin_user limit 1;', [],
     function(transaction, result) {
      if (result != null && result.rows != null) {
        for (var i = 0; i < result.rows.length; i++) {
           var row = result.rows.item(i);
			saveGroupAndStudentData(groupAndStudentData, row.id);
        }
      }else{
	     logoutRedirect();
	  }
     },errorHandler);
 },errorHandler,displayGroups);
 return;
}

function saveGroupAndStudentData(dataObj, userId){
	db.transaction(function(transaction) {
		transaction.executeSql('delete from m_students where group_id in ( select group_id from m_groups where user_id = ?);',[userId],nullHandler,errorHandler);
		transaction.executeSql('delete from m_groups where user_id = ?;',[userId],nullHandler,errorHandler);
		$.each(dataObj.groups, function(idx, obj){
			transaction.executeSql('insert into m_groups(group_id, name, user_id) values(?,?,?);',[obj.group_id, obj.group_name, userId],nullHandler,errorHandler);
			});
		$.each(dataObj.students, function(idx, obj){
			transaction.executeSql('insert into m_students(student_id, name, group_id) values(?,?,?);',[obj.student_id, obj.student_name,obj.group_id],nullHandler,errorHandler);
			});		 
   },errorHandler,nullHandler);
return false;
}

function displayGroups(){
 db.transaction(function(transaction) {
   var groupDataHtml = "<div data-role='fieldcontain'>";
	groupDataHtml = groupDataHtml + "<label for='select-choice-group' class='select'>Select Group:</label>";
	groupDataHtml = groupDataHtml + "<select name='select-choice-group' id='select-choice-group'>";	
    transaction.executeSql('select grp.group_id as group_id, grp.name as name from m_groups grp, m_loggedin_user loginusr where loginusr.id = grp.user_id;', [],
     function(transaction, result) {
      if (result != null && result.rows != null) {
        for (var i = 0; i < result.rows.length; i++) {
           var row = result.rows.item(i);
		   groupDataHtml = groupDataHtml + '<option value="' + row.group_id + '">' + row.name + '</option>';
        }
		groupDataHtml = groupDataHtml + "</select> </div>";
		groupDataHtml = groupDataHtml + "<input type='button' value='List Students' onClick='selectedGroup()'> <br>";
		 $('#coachGroups').html('');
		 $('#coachGroups').append('<br>' + groupDataHtml);
      }
     },errorHandler);
 },errorHandler,nullHandler);
 return;
}


function displayStudents(group_id){
 db.transaction(function(transaction) {
   var groupDataHtml = "<fieldset data-role='controlgroup'>";
	groupDataHtml = groupDataHtml + " <legend>Student List:</legend>";
	
   transaction.executeSql('select * from m_students where group_id = ?;', [group_id],
     function(transaction, result) {
      if (result != null && result.rows != null) {
        for (var i = 0; i < result.rows.length; i++) {
           var row = result.rows.item(i);
		   groupDataHtml = groupDataHtml + '<br><input type="checkbox" name="selectedStudent" id="' + row.student_id + '" value="'+ row.student_id+  '" checked>';
		   groupDataHtml = groupDataHtml + '<label for="' + row.name + '">' + row.name + '</label>';
           // $('#loggedInUser').append('<br>' + row.group_id + '. ' + row.name + ' ');
        }
		groupDataHtml = groupDataHtml + "</fieldset>";
		groupDataHtml = groupDataHtml + "<input type='button' value='Add Attendance' onClick='addAttendance()'> <br>";
		 $('#groupStudents').html('');
		 $('#groupStudents').append('<br>' + groupDataHtml);
		 
      }
     },errorHandler);
 },errorHandler,nullHandler);

 return;

}

function saveAttendance(group_id, userId, date, present_list,absent_list){
	db.transaction(function(transaction) { 
		transaction.executeSql('insert into m_attendance(group_id,user_id,date,present_list,absent_list) values(?,?,?,?,?);',[group_id, userId, date, present_list,absent_list],nullHandler,errorHandler);	 
   },errorHandler,nullHandler);
return false;
}

function logout(){
	db.transaction(function(transaction) { 
			transaction.executeSql('delete from m_loggedin_user;',[],nullHandler,errorHandler);	 
	},errorHandler,logoutRedirect);
return false;
}