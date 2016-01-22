function dropAll(){

	db.transaction(function(tx){
		tx.executeSql( 'drop TABLE m_users;',
			[],nullHandler,errorHandler);
		tx.executeSql( 'drop TABLE m_loggedin_user;',
			[],nullHandler,errorHandler);
		tx.executeSql( 'drop table m_groups;',
			[],nullHandler,errorHandler);
		tx.executeSql( 'drop table m_students;',
			[],nullHandler,errorHandler);
		tx.executeSql( 'drop TABLE m_attendance;',
			[],nullHandler,errorHandler);
	},errorHandler,nullHandler);
}

function initDB(){
	

	//dropAll();

	db.transaction(function(tx){
		tx.executeSql( 'CREATE TABLE IF NOT EXISTS m_users(id INTEGER NOT NULL PRIMARY KEY, name TEXT NOT NULL, user_name TEXT NOT NULL, pwd TEXT NOT NULL, api_key TEXT NOT NULL)',
			[],nullHandler,errorHandler);
		tx.executeSql( 'CREATE TABLE IF NOT EXISTS m_loggedin_user(id INTEGER NOT NULL PRIMARY KEY, name TEXT NOT NULL, api_key TEXT NOT NULL)',
			[],nullHandler,errorHandler);
		tx.executeSql( 'CREATE TABLE IF NOT EXISTS m_groups(group_id INTEGER NOT NULL , name TEXT NOT NULL, user_id INTEGER NOT NULL)',
			[],nullHandler,errorHandler);
		tx.executeSql( 'CREATE TABLE IF NOT EXISTS m_students(student_id INTEGER NOT NULL , name TEXT NOT NULL, group_id INTEGER NOT NULL)',
			[],nullHandler,errorHandler);
		tx.executeSql( 'CREATE TABLE IF NOT EXISTS m_attendance(group_id INTEGER NOT NULL,date DATE NOT NULL,user_id INTEGER NOT NULL, present_list TEXT NOT NULL, absent_list TEXT NOT NULL) ',
			[],nullHandler,errorHandler);
	},errorHandler,nullHandler);
}


function login(user_id, name, apiKey, userName, password){

	db = openDatabase(shortName, version, displayName,maxSize);

	// this is the section that actually inserts the values into the User table
	db.transaction(function(transaction) {
		transaction.executeSql('delete from m_users where id = ?',[user_id],nullHandler,errorHandler);
		transaction.executeSql('delete from m_loggedin_user',[],nullHandler,errorHandler);
		transaction.executeSql('insert into m_users (id, name,user_name, pwd, api_key) values(?,?,?,?,?);',[user_id, name, userName, password, apiKey],nullHandler,errorHandler);

		transaction.executeSql('insert into m_loggedin_user (id, name, api_key) values(?,?,?);',[user_id, name, apiKey],nullHandler,errorHandler);
		

	}, errorHandler, login_success);
}

function login_success(){
	loadPage("index1.html");
}

 // list the values in the database to the screen using jquery to update the #lbUsers element
//  function getLoggedInUser() {

//  // if (!window.openDatabase) {
//  //  alert('Databases are not supported in this browser.');
//  //  return;
//  // }

// // this line clears out any content in the #lbUsers element on the page so that the next few lines will show updated
// // content and not just keep repeating lines
//  //$('#lbUsers').html('');

// // this next section will select all the content from the User table and then go through it row by row
// // appending the UserId  FirstName  LastName to the  #lbUsers element on the page
// db.transaction(function(transaction) {
// 	transaction.executeSql('select * from m_loggedin_user limit 1;', [],
// 		function(transaction, result) {
// 			if (result != null && result.rows != null) {
// 				for (var i = 0; i < result.rows.length; i++) {
// 					var row = result.rows.item(i);
// 					$('#loggedInUser').append('<br>' + row.id + '. ' + row.name + ' ' + row.api_key);
// 				}
// 			}
// 		},errorHandler);
// },errorHandler,nullHandler);

// return;

// }