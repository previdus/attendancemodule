function PullData(){
	var pullDataUrl = getPullDataUrl();
	$.ajax({
		type: 'GET',
		url: pullDataUrl,
		success: function(data){
		console.log(data);
		var obj = JSON.parse(data);
		
		saveData(obj);
		alert('Data saved successfully');		
		//window.location = "index1.html";
	},
	error: function(){
		console.log(data);
		alert('There was an error adding your comment');
		}
	});
	return false;
}

function selectedGroup(){
  
  var selected = $('#select-choice-group').val();
	alert(' Selected group is ' + selected);
	displayStudents(selected);
  }

function ListGroups(){
   displayGroups();
}

function addAttendance(){
	var presentList = [];
            $.each($("input[name='selectedStudent']:checked"), function(){            
                presentList.push($(this).val());
            });
            alert("Students present are: " + presentList.join(", "));		
	var nonPresentList = [];
            $.each($("input[name='selectedStudent']:not(:checked)"), function(){            
                nonPresentList.push($(this).val());
            });
            alert("Students absent are: " + nonPresentList.join(", "));
	var selectedGroup = $('#select-choice-group').val();
	var date = $('#selectedDate').val();
	var userId = $('#userId').val();
			saveAttendance(selectedGroup, userId, date, presentList,nonPresentList);
}
	
function PushAttendance(){
	loadPage('pushAttendance.html');
}	
function loadPage(url) {
	 window.location = url;
}

function init() {
     
	document.addEventListener("deviceready", deviceReady, true);
	delete init;
	initDB();
	extractLoggedInUserData();
}

function getPullDataUrl(){
  return ' http://websites.avyay.co.in/sms-demo/api/fetch-data.php?api_key=1234';
 
}

function deviceReady() {
}