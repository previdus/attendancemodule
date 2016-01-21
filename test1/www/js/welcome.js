// global variables
var db;
var shortName = 'WebSqlDB';
var version = '1.0';
var displayName = 'WebSqlDB';
var maxSize = 65535;

// this is called when an error happens in a transaction
function errorHandler(transaction, error) {
   alert('Error: ' + error.message + ' code: ' + error.code);
}

// this is called when a successful transaction happens
function successCallBack() {
   //alert("DEBUGGING: success");
}

function nullHandler(){};


function onBodyLoad(){
 if (!window.openDatabase) {
   return;
 }

 db = openDatabase(shortName, version, displayName,maxSize);

 db.transaction(function(tx){

   tx.executeSql( 'CREATE TABLE IF NOT EXISTS User(UserId INTEGER NOT NULL PRIMARY KEY, FirstName TEXT NOT NULL, LastName TEXT NOT NULL)',
	[],nullHandler,errorHandler);
	},errorHandler,successCallBack);
}

// list the values in the database to the screen using jquery to update the #lbUsers element
function ListDBValues() {

 if (!window.openDatabase) {
  alert('Databases are not supported in this browser.');
  return;
 }

// this line clears out any content in the #lbUsers element on the page so that the next few lines will show updated
// content and not just keep repeating lines
 $('#lbUsers').html('');

// this next section will select all the content from the User table and then go through it row by row
// appending the UserId  FirstName  LastName to the  #lbUsers element on the page
 db.transaction(function(transaction) {
   transaction.executeSql('SELECT * FROM User;', [],
     function(transaction, result) {
      if (result != null && result.rows != null) {
        for (var i = 0; i < result.rows.length; i++) {
          var row = result.rows.item(i);
          $('#lbUsers').append('<br>' + row.UserId + '. ' + row.FirstName+ ' ' + row.LastName);
        }
      }
     },errorHandler);
 },errorHandler,nullHandler);

 return;

}

// this is the function that puts values into the database using the values from the text boxes on the screen
function AddValueToDB() {

 if (!window.openDatabase) {
   //alert('Databases are not supported in this browser.');
   return;
 }
// this is the section that actually inserts the values into the User table
 db.transaction(function(transaction) {
   transaction.executeSql('INSERT INTO User(FirstName, LastName) VALUES (?,?)',[$('#txFirstName').val(), $('#txLastName').val()],nullHandler,errorHandler);
   });

// this calls the function that will show what is in the User table in the database
 ListDBValues();
 return false;

}