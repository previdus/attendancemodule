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
	$('#selectedGrp').val(selected);
	$.mobile.changePage( "#page2", { transition: "pop"});
  }

function ListGroups(){
   displayGroups();
}

function addAttendance(){
	var presentList = [];
            $.each($("input[name='selectedStudent']:checked"), function(){            
                presentList.push($(this).val());
            });
            //alert("Students present are: " + presentList.join(","));		
	var nonPresentList = [];
            $.each($("input[name='selectedStudent']:not(:checked)"), function(){            
                nonPresentList.push($(this).val());
            });
           // alert("Students absent are: " + nonPresentList.join(","));
	var selectedGroup = $('#selectedGrp').val();
	var date = $('#selectedDate').val();
	var userId = $('#userId').val();
	saveAttendance(selectedGroup, userId, date, presentList,nonPresentList);
}

function pushAttendanceData(){
	$.mobile.changePage( "#page3", { transition: "pop"});
}

function pullData(){
    $.mobile.changePage( "#page4", { transition: "pop"});
	$('#updateResult').html('Data updated Successfully.');
	//alert('Coach and Student data updated');
	markAttendanc();
}

function markAttendanc(){
	$.mobile.changePage( "#page1", { transition: "pop"});	
}

$("#page1").on('pageshow', function () {
   initAttendancePage();
});

$("#page2").on('pageshow', function () {
   var selected = $('#selectedGrp').val();
   //alert($('#nameOfUser').val());
   //$('#welcome').html();
	displayStudents(selected);
});

$("#page3").on('pageshow', function () {
	initPushData();
});

$("#page4").on('pageshow', function () {
	pullGroupAndStudentDataFromServer();
});
	
function init() {
   document.addEventListener("deviceready", deviceReady, true);
   loadGroupAndStudentDataOnFirstLogin();
   showNoOfAttendanceYetToBeSentToServer();
}

function deviceReady() {
}