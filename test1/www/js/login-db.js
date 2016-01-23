function resetDB(){
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
	},errorHandler,resetSuccess);
}

function resetSuccess(){
    alert('DB was reset successfully');
	initDB();
   
}

function initDB(){
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
	},errorHandler,loginIfUserAlreadyLoggedIn);
}

function loginIfUserAlreadyLoggedIn() {
	db.transaction(function(transaction) {
		transaction.executeSql('select * from m_loggedin_user limit 1;', [],
		function(transaction, result) {
			if (result != null && result.rows != null && result.rows.length == 1) {
			   loadPage("index1.html");
			}
		},errorHandler);
	},errorHandler,nullHandler);
	return;
}

function loginOffline(userId, pwd) {
	db.transaction(function(transaction) {
		transaction.executeSql('select * from m_users where id = ? and pwd = ?;', [userId, pwd],
		function(transaction, result) {
			if (result != null && result.rows != null && result.rows.length == 1) {
			   loadPage("index1.html");
			}else{
				alert('Check your netowork connection!');
			}
		},errorHandler);
	},errorHandler,nullHandler);
	return;
}


function insertLoginDetailsInDB(user_id, name, apiKey, userName, password){
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
