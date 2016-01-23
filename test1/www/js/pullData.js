function pullGroupAndStudentDataFromServer(){
	var pullDataUrl = getUrls('pullGrpAndStudentData');
	
	var apiKey = $('#apiKey').val();
	var getData = "{api_key:'" + apiKey + "'}"; 
	pullDataUrl = pullDataUrl + '?api_key=' + apiKey;
	
	$.ajax({
		type: 'GET',
		url: pullDataUrl,
		success: function(data){
		console.log(data);
		var obj = JSON.parse(data);
		saveGroupAndStudentDataFromServerToLocalDB(obj);		
	},
	error: function(){
		console.log(data);
		alert('Please check your network connection!');
		}
	});
	return false;
}

function selectedGroup(selected){
	alert(selected);
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
            alert("Students present are: " + presentList.join(","));		
	var nonPresentList = [];
            $.each($("input[name='selectedStudent']:not(:checked)"), function(){            
                nonPresentList.push($(this).val());
            });
            alert("Students absent are: " + nonPresentList.join(","));
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
}

function deviceReady() {
}