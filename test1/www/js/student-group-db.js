function initAttendancePage(){	
	extractLoggedInUserData();
	displayGroups();
}

function loadGroupAndStudentDataOnFirstLogin() {
	db.transaction(function(transaction) {
		transaction.executeSql('select * from m_groups grps, m_loggedin_user loginusr where grps.user_id = loginusr.id limit 1;', [],
		function(transaction, result) {
			if (result != null && result.rows != null && result.rows.length == 0) {
			   pullGroupAndStudentDataFromServer();
			}
		},errorHandler);
	},errorHandler,nullHandler);
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
 },errorHandler,nullHandler);
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
   },errorHandler,pullDataComplete);
return false;
}

function pullDataComplete(){
	alert('Pull data is complete!');
}

 
function displayGroups(){
 db.transaction(function(transaction) {   
    transaction.executeSql('select grp.group_id as group_id, grp.name as name from m_groups grp, m_loggedin_user loginusr where loginusr.id = grp.user_id;', [],
     function(transaction, result) {
      if (result != null && result.rows != null) {
      	if(result.rows.length != 0){
      		var groupDataHtml = '<h1 class="title select-group">Select Group</h1><ul class="gen-list">';
      		for (var i = 0; i < result.rows.length; i++) {
	           var row = result.rows.item(i);
			   groupDataHtml = groupDataHtml + '<li><a href="#" onClick="selectedGroup('+ row.group_id +')"> ' + row.name + '</a></li>';
	        }
			groupDataHtml = groupDataHtml + "</ul>";
      	} else {
      		var groupDataHtml = '<h1 class="title select-group">No Groups Available</h1>';
      	} 
		 $('#coachGroups').html('');
		 $('#coachGroups').append(groupDataHtml);
      }
     },errorHandler);
 },errorHandler,nullHandler);
 return;
}

function extractLoggedInUserData() {
 db.transaction(function(transaction) {
   transaction.executeSql('select * from m_loggedin_user limit 1;', [],
     function(transaction, result) {
      if (result != null && result.rows != null) {
        for (var i = 0; i < result.rows.length; i++) {
           var row = result.rows.item(i);
			$('#welcome').html("<h1>" + row.name + "</h1>");
			$('#nameOfUser').val(row.name);
			$('#userId').val(row.id);
			$('#apiKey').val(row.api_key);
			$('#userName').val(row.name);
        }
      }else{
	    logoutRedirect();
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
		//$.mobile.changePage( "#page2", { transition: "pop"});
		 $('#groupStudents').html('<br>' + groupDataHtml);
		 
      }
     },errorHandler);
 },errorHandler,nullHandler);
 return;
}

function attendanceSavedSuccessfully(){
		saveAllAttendance();
		markAttendanc();
}

function saveAttendance(group_id, userId, date, present_list,absent_list){
     	db.transaction(function(transaction) { 
		transaction.executeSql('insert into m_attendance(group_id,user_id,date,present_list,absent_list) values(?,?,?,?,?);',[group_id, userId, date, present_list,absent_list],nullHandler,errorHandler);	 
   },errorHandler,attendanceSavedSuccessfully);
return false;
}

