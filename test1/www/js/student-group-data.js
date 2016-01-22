// global variables
var db;
var shortName = 'WebSqlDB';
var version = '1.0';
var displayName = 'WebSqlDB';
var maxSize = 65535;
db = openDatabase(shortName, version, displayName,maxSize);

function initDB(){
	// alert('ghhuj');

	extractLoggedInUserData();
}

// this is called when an error happens in a transaction
function errorHandler(transaction, error) {
   alert('Error: ' + error.message + ' code: ' + error.code);
}
// this is called when a successful transaction happens
function successCallBack() {
   alert("DEBUGGING: success");
}
function nullHandler(){
//alert('null')

};

function displayGroups(){

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
   var groupDataHtml = "<div data-role='fieldcontain'>";
	groupDataHtml = groupDataHtml + "<label for='select-choice-group' class='select'>Choose your Group:</label>";
	groupDataHtml = groupDataHtml + "<select name='select-choice-group' id='select-choice-group'>";
	
   transaction.executeSql('select grp.group_id as group_id, grp.name as name from m_groups grp, m_loggedin_user loginusr where loginusr.id = grp.user_id;', [],
     function(transaction, result) {
      if (result != null && result.rows != null) {
        for (var i = 0; i < result.rows.length; i++) {
           var row = result.rows.item(i);
		   groupDataHtml = groupDataHtml + '<option value="' + row.group_id + '">' + row.name + '</option>';
           // $('#loggedInUser').append('<br>' + row.group_id + '. ' + row.name + ' ');
        }
		groupDataHtml = groupDataHtml + "</select> </div>";
		groupDataHtml = groupDataHtml + "<input type='button' value='Select Group' onClick='selectedGroup()'> <br>";
		 $('#coachGroups').html('');
		 $('#coachGroups').append('<br>' + groupDataHtml);
      }
     },errorHandler);
 },errorHandler,nullHandler);

 return;

}


function displayStudents(group_id){

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


function extractLoggedInUserData() {
			// alert('ghh');
	// if (!window.openDatabase) {
	// 	alert('Databases are not supported in this browser.');
	// 	return;
	// 	}
	// this line clears out any content in the #lbUsers element on the page so that the next few lines will show updated
// content and not just keep repeating lines
 //$('#lbUsers').html('');

// this next section will select all the content from the User table and then go through it row by row
// appending the UserId  FirstName  LastName to the  #lbUsers element on the page

 db.transaction(function(transaction) {

   transaction.executeSql('select * from m_loggedin_user limit 1;', [],
     function(transaction, result) {

      if (result != null && result.rows != null) {
      	// alert('asd11234'); 
      	//  alert(result.rows.length);
        for (var i = 0; i < result.rows.length; i++) {
           var row = result.rows.item(i);

			$('#userId').val(row.id);
			$('#apiKey').val(row.api_key);
			$('#userName').val(row.name);
           alert(row.id + ' ' + row.name + ' ' + row.api_key);
        }
      }else{alert(result);}
     },errorHandler);

 },errorHandler,nullHandler);

 return;

}


 // list the values in the database to the screen using jquery to update the #lbUsers element
function saveData(groupAndStudentData) {
		
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
			saveGroupAndStudentData(groupAndStudentData, row.id);
           //$('#loggedInUser').append('<br>' + row.id + '. ' + row.name + ' ' + row.api_key);
        }
      }else{alert(result);}
     },errorHandler);
 },errorHandler,nullHandler);

 return;

}

function saveAttendance(group_id, userId, date, present_list,absent_list){
    if (!window.openDatabase) {
		alert('Databases are not supported in this browser.');
		return;
	}
	// this is the section that actually inserts the values into the User table
	db.transaction(function(transaction) { 
		transaction.executeSql('insert into m_attendance(group_id,user_id,date,present_list,absent_list) values(?,?,?,?,?);',[group_id, userId, date, present_list,absent_list],nullHandler,errorHandler);	 
   });
return false;
}

function saveGroupAndStudentData(dataObj, userId){
	
    if (!window.openDatabase) {
		alert('Databases are not supported in this browser.');
		return;
	}
	// this is the section that actually inserts the values into the User table
	db.transaction(function(transaction) {
		transaction.executeSql('delete from m_students where group_id in ( select group_id from m_groups where user_id = ?);',[userId],nullHandler,errorHandler);
		transaction.executeSql('delete from m_groups where user_id = ?;',[userId],nullHandler,errorHandler);
		$.each(dataObj.groups, function(idx, obj){
			//transaction.executeSql('delete from m_groups where group_id = ? and user_id = ?;',[obj.group_id,userId ],nullHandler,errorHandler);
			transaction.executeSql('insert into m_groups(group_id, name, user_id) values(?,?,?);',[obj.group_id, obj.group_name, userId],nullHandler,errorHandler);
			});
		$.each(dataObj.students, function(idx, obj){
			//transaction.executeSql('delete from m_students where student_id = ? and group_id = ?;',[obj.student_id ,obj.group_id ],nullHandler,errorHandler);
			transaction.executeSql('insert into m_students(student_id, name, group_id) values(?,?,?);',[obj.student_id, obj.student_name,obj.group_id],nullHandler,errorHandler);
			});		 
   });
return false;

}

