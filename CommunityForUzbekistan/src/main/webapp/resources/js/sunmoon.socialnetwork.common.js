$(document).ready(function() {
	setUserInfo();	
	receiveList();
	/*$('#toMsgList').DataTable();*/
});


// 로그인 여부 체크 함수(newsFeed.jsp)
function loginCheckProc(data, user_id) {
   
   console.log("loginCheckProc: 1(세션값 초기화) OR 2(실패): "+data);
   if ( data == "1" ){
      console.log("loginCheckProc 세션값 없어야..:" + user_id);
      window.location.href="http://localhost:8888/";
   }/*else{
      window.location.href="http://localhost:8888/newsFeed";
         
   }*/
}

//로그인버튼 엔터(home.jsp)
function enterkey() {
    if (window.event.keyCode == 13) {
    	javascript:LoginCheck();
    }
}

//쪽지 삭제
function deleteMsg(num){
   var sendData = {num: num};
   
   console.log("삭제 쪽지 번호: " + num);
   
   $.ajax({
          url : 'http://localhost:8888/deleteMsg',
          method : 'POST',
          data : JSON.stringify(sendData),
          processData : false,
          contentType : 'application/json',
          success : function(data) {
            // console.log("success 내 쪽지 개수: " + origin);
            alert("쪽지를 삭제했습니다 :)");
            window.location.href="http://localhost:8888/Msg";
          },
          error : function(data, status, err) {
             //alert('error');
             console.log("error: " + data);
          }
       });
   
}

var origin="n";
//나에게 온 쪽지 개수 확인(새로운 쪽지 알림창)
function countMyMsg(){
	console.log("countMyMsg function called-");
	
	var to_user_id = document.getElementById("user_id").value;
	
	var sendData = {to_user_id: to_user_id};
	
	$.ajax({
	       url : 'http://localhost:8888/countMyMsg',
	       method : 'POST',
	       data : JSON.stringify(sendData),
	       processData : false,
	       contentType : 'application/json',
	       success : function(data) {
	    	   console.log("success 내 쪽지 개수: " + origin);
	    	   console.log("success 받아온 데이터: " + data);
	    	   
	    	   if(origin != "n" && origin != data){
	    		   alert("새로운 쪽지가 도착했습니다.");
	    	   }
	    	   origin = data;
	    	   console.log("success 내 쪽지 개수: " + origin);
	       },
	       error : function(data, status, err) {
	          //alert('error');
	          console.log("error: " + data);
	       }
	    });
	
}

//안읽은 쪽지 알림
function notRead(){
	console.log("notRead function called-");
	
	var to_user_id = document.getElementById("user_id").value;
	console.log("notRead: " + to_user_id);
	
	var sendData = {to_user_id: to_user_id};
	
	$.ajax({
	       url : 'http://localhost:8888/notRead',
	       method : 'POST',
	       data : JSON.stringify(sendData),
	       processData : false,
	       contentType : 'application/json',
	       success : function(data) {
	    	   console.log("success data: " + JSON.stringify(data));
	    	  
	    	   if(data != 0){
	    		   alert("읽지 않은 쪽지가 "+data+"개 있습니다.");
	    	   }
	       },
	       error : function(data, status, err) {
	          //alert('error');
	          console.log("error: " + data);
	       }
	    });
}

//받은 쪽지함
function receiveList(){
	

	var to_user_id = document.getElementById("user_id").value;
	
	
	var sendData = {to_user_id: to_user_id};
	
	
	$.ajax({
	       url : 'http://localhost:8888/receive',
	       method : 'POST',
	       data : JSON.stringify(sendData),
	       processData : false,
	       contentType : 'application/json',
	       success : function(data) {

	    	   var x;
	    	   var txt =""; 
	    	   txt+="<tr style='background: #e6e6e6; line-height: 250%; font-size: 120%; text-align: center;'>"; 
	    	   txt+="<th>보낸사람</th>"; 
	    	   txt+="<th>제목</th>"; 
	    	   txt+="<th>날짜</th>";
	    	   txt+="<th>삭제</th>";
	    	   txt+="</tr>"; 

	    	   for(x in data){
	    		   console.log(data[x].num);
	    		   
	    		   txt+="<tr style='line-height: 200%;'>";
	    		   txt+="<td><a class=owner-link><i class='fa fa-user fa-lg'></i>"+data[x].user_name+"</a></td>";
	    		   txt+="<td><a name='title' class='owner-link' href=javascript:MsgContent("+data[x].num+");>"+data[x].title+"</a></td>";
	    		   txt+="<td><a class=owner-link>"+data[x].senddate+"</a></td>";
	    		   txt+="<td><input type='button' id='deleteMsg' class='deleteMsg' value='삭제' onclick='javascript:deleteMsg("+data[x].num+");'></td>";
	    		   txt+="</tr>";
	    	   }

	    	   /*document.getElementById("insertBusData").innerHTML = txt;*/
	    	   $('#toMsgList').html(txt);
	    		
	    		
	       },
	       error : function(data, status, err) {
	          //alert('error');
	          console.log("error: " + data);
	       }
	    });
	
}

//보낸 쪽지함
function List(){

	var from_user_id = document.getElementById("user_id").value;
	
	
	var sendData = {from_user_id: from_user_id};
	
	
	$.ajax({
	       url : 'http://localhost:8888/msg',
	       method : 'POST',
	       data : JSON.stringify(sendData),
	       processData : false,
	       contentType : 'application/json',
	       success : function(data) {

	    	   var x;
	    	   var txt ="";
	    	   txt+="<tr style='background: #e6e6e6; line-height: 250%; font-size: 120%;'>"; 
	    	   txt+="<th>받은사람</th>"; 
	    	   txt+="<th>제목</th>"; 
	    	   txt+="<th>날짜</th>"; 
	    	   txt+="<th>수신 확인</th>"; 
	    	   txt+="<th>삭제</th>";
	    	   txt+="</tr>"; 

	    	   for(x in data){
	    		   console.log(data[x].num);
	    		   
	    		   txt+="<tr style='line-height: 200%;'>";
	    		   txt+="<td><a class=owner-link><i class='fa fa-user fa-lg'></i>"+data[x].user_name+"</a></td>";
	    		   txt+="<td><a name='title' class='owner-link' href=javascript:MsgContent("+data[x].num+");>"+data[x].title+"</a></td>";
	    		   txt+="<td><a class=owner-link>"+data[x].senddate+"</a></td>";
	    		   txt+="<td><a class=owner-link>"+data[x].open+"</a></td>";
	    		   txt+="<td><input type='button' id='deleteMsg' class='deleteMsg' value='삭제' onclick='javascript:deleteMsg("+data[x].num+");'></td>";
	    		   txt+="</tr>";
	    	   }

	    	   /*document.getElementById("insertBusData").innerHTML = txt;*/
	    	   $('#fromMsgList').html(txt);
	    	   
	       },
	       error : function(data, status, err) {
	          //alert('error');
	          console.log("error: " + data);
	       }
	    });
	
}
//내용 띄우기
function MsgContent(num){
	
	console.log("MsgContent function called-");
	
	$('.ossn-halt').addClass('ossn-light');
    $('.ossn-halt').attr('style', 'height:' + $(document).height() + 'px;');
    $('.ossn-halt').show();
    
    $('#ossn-message-box-send-post').attr('style', 'display:block;');

    var msg_con = $('#post-edit').val();
    console.log(msg_con);

    var sendData = {num: num};
    
    $.ajax({
		url : 'http://localhost:8888/open',
		method : 'POST',
		data : JSON.stringify(sendData),
		processData : false,
		contentType : 'application/json',
		success : function(data) {
			//alert(data);
			console.log("success data: "+JSON.stringify(data));
			console.log(data.title);

			var txt0="";
			var txt1="";
			var txt2="";
			var txt3="";
			txt0 += "<input type='' class='msgtitle' id='msgtitle' value='"+data.title+"' disabled='disabled'>";
			txt2 += "<input type='' class='who_content' id='who_content' value='"+data.user_name+"' disabled='disabled' style='border: none;'>";
			txt1 += "<textarea id='post-edit' name='post' readonly='readonly' style='resize: none;'>"+data.msg+"</textarea>";
			txt3 += "<input type='' class='sendTime_content' id='sendTime_content' value='"+data.senddate+"' disabled='disabled' style='border: none;'>";
			
			$('#txt0').html(txt0);
			$('#txt2').html(txt2);
			$('#msg-post-popup').html(txt1);
			$('#txt3').html(txt3);
			
		},
		error : function(data, status, err) {
			//alert('error');
			console.log("error: " + data);
		}
	});
}

//쪽지 보내기
function sendMsg(user_id){
	console.log("sendMsg function called-");

	$('.ossn-halt').addClass('ossn-light');
    $('.ossn-halt').attr('style', 'height:' + $(document).height() + 'px;');
    $('.ossn-halt').show();
    
    var txt = "<input type='hidden' id='to_user_id' value='"+user_id+"'>";
    $('#send-post-popup').prepend(txt);
	
    $('#ossn-message-box-send-msg').attr('style', 'display:block;');	
    
	
}
//보내기 버튼
function send(){
	console.log("send function called-");
	
	//var formData = new FormData($("#ossn-post-send-form")[0]);

	var title = $("#title_input").val();
	var msg = $("#post-send-msg").val();
	var from_user_id = $("#user_id").val();
	var to_user_id = $("#to_user_id").val();

	if (title == "") {
		alert("제목을 적어주세요 :)");
	} else if (msg == "") {
		alert("내용을 적어주세요 :)");
	} else {
		
		var sendData = {
			title : title,
			msg : msg,
			from_user_id : from_user_id,
			to_user_id : to_user_id
		};

		console.log("값아??" + title + "/" + msg + "/" + from_user_id + "/"
				+ to_user_id);
		$.ajax({
			url : 'http://localhost:8888/sendMsg',
			method : 'POST',
			data : JSON.stringify(sendData),
			processData : false,
			contentType : 'application/json',
			success : function(data) {
				// alert(data);
				console.log("success data: " + JSON.stringify(data));

				var to_user_name = data.to_user_name;
				console.log("to_user_name: " + to_user_name);
				$('#to_user_name').attr('val', 'to_user_name');

				$('.ossn-message-box-send-msg').hide();
				$('.ossn-halt').removeClass('ossn-light').hide();
				$('.ossn-halt').attr('style', '');

				alert("쪽지를 보냈습니다:)");
				$('#ossn-msg-send-form')[0].reset();
			},
			error : function(data, status, err) {
				// alert('error');
				console.log("error: " + data);
			}
		});

	}
	
	

}

//버스 값 가져오기(bus.jsp)
function getBusData_p_ca(){

	var name = $('#name_p_ca').val();
	$('.bus_timeTable').text("▶ "+ name);
	
	$.ajax({
	       url : 'http://localhost:8888/bus_p_ca',
	       method : 'GET',
	       data : name,
	       processData : false,
	       contentType : false,
	       success : function(data) {

	    	   var x;
	    	   var txt =""; 
	    	   txt+="<div class='busTimeLine'>";
	    	   txt+="<table class=bus_time style='width:100%' >";
	    	   txt+="<tr style='background: #e6e6e6;'>";
	    	   txt+="<th>순</th>";
	    	   txt+="<th>아산캠퍼스<br>(출발)</th>";
	    	   txt+="<th>아산역(KTX)</th>";
	    	   txt+="<th>천안역</th>";
	    	   txt+="<th>하이렉스파 건너편<br>/용암마을</th>";
	    	   txt+="<th>아산역(KTX)</th>";
	    	   txt+="<th>아산캠퍼스<br>(도착)</th>";
	    	   txt+="</tr>";
	    	   
	    	   for(x in data){
	    		   console.log(data[x].num);
	    		   txt+="<tr>";
	    		   txt+="<td>"+data[x].count+"</td>";
	    		   txt+="<td>"+data[x].asancam_s+"</td>";
	    		   txt+="<td>"+data[x].asanktx_1+"</td>";
	    		   txt+="<td>"+data[x].cheonan+"</td>";
	    		   txt+="<td>"+data[x].hi+"</td>";
	    		   txt+="<td>"+data[x].asanktx_2+"</td>";
	    		   txt+="<td>"+data[x].asancam_e+"</td>";
	    		   txt+="</tr>";
	    	   }
	    	   txt+="</table>";
	    	   txt+="</div>";

	    	   /*document.getElementById("insertBusData").innerHTML = txt;*/
	    	   $('#insertBusData').html(txt);

	       },
	       error : function(data, status, err) {
	          //alert('error');
	          console.log("error: " + data);
	       }
	    });

}

function getBusData_p_ct(){
	var name = $('#name_p_ct').val();
	$('.bus_timeTable').text("▶ "+ name);

	$.ajax({
	       url : 'http://localhost:8888/bus_p_ct',
	       method : 'GET',
	       data : name,
	       processData : false,
	       contentType : false,
	       success : function(data) {
	    	   
	    	   var x;
	    	   var txt =""; 
	    	   txt+="<div class='busTimeLine'>";
	    	   txt+="<table class=bus_time style='width:100%'>";
	    	   txt+="<tr style='background: #e6e6e6;'>";
	    	   txt+="<th>순</th>";
	    	   txt+="<th>아산캠퍼스<br>(출발)</th>";
	    	   txt+="<th>터미널</th>";
	    	   txt+="<th>한국전력/<br>홈마트에브리데이</th>";
	    	   txt+="<th>아산캠퍼스<br>(도착)</th>";
	    	   txt+="</tr>";
	    	   
	    	   for(x in data){
	    		   console.log(data[x].num);
	    		   txt+="<tr>";
	    		   txt+="<td>"+data[x].count+"</td>";
	    		   txt+="<td>"+data[x].asancam_s+"</td>";
	    		   txt+="<td>"+data[x].terminal+"</td>";
	    		   txt+="<td>"+data[x].korea+"</td>";
	    		   txt+="<td>"+data[x].asancam_e+"</td>";
	    		   txt+="</tr>";
	    	   }
	    	   txt+="</table>";
	    	   txt+="</div>";

	    	   /*document.getElementById("insertBusData").innerHTML = txt;*/
	    	   $('#insertBusData').html(txt);  

	       },
	       error : function(data, status, err) {
	          //alert('error');
	          console.log("error: " + data);
	       }
	    });
}
function getBusData_p_ot(){
	var name = $('#name_p_ot').val();
	$('.bus_timeTable').text("▶ "+ name);
	
	$.ajax({
	       url : 'http://localhost:8888/bus_p_ot',
	       method : 'GET',
	       data : name,
	       processData : false,
	       contentType : false,
	       success : function(data) {

	    	   var x;
	    	   var txt =""; 
	    	   txt+="<div class='busTimeLine'>";
	    	   txt+="<table class=bus_time style='width:100%'>";
	    	   txt+="<tr style='background: #e6e6e6;'>";
	    	   txt+="<th>순</th>";
	    	   txt+="<th>아산캠퍼스<br>(출발)</th>";
	    	   txt+="<th>배방지역</th>";
	    	   txt+="<th>터미널</th>";
	    	   txt+="<th>온양역</th>";
	    	   txt+="<th>아산캠퍼스<br>(도착)</th>";
	    	   txt+="</tr>";
	    	   
	    	   for(x in data){
	    		   console.log(data[x].num);
	    		   txt+="<tr>";
	    		   txt+="<td>"+data[x].count+"</td>";
	    		   txt+="<td>"+data[x].asancam_s+"</td>";
	    		   txt+="<td>"+data[x].baebang+"</td>";
	    		   txt+="<td>"+data[x].terminal+"</td>";
	    		   txt+="<td>"+data[x].oy+"</td>";
	    		   txt+="<td>"+data[x].asancam_e+"</td>";
	    		   txt+="</tr>";
	    	   }
	    	   txt+="</table>";
	    	   txt+="</div>";

	    	   /*document.getElementById("insertBusData").innerHTML = txt;*/
	    	   $('#insertBusData').html(txt);  

	       },
	       error : function(data, status, err) {
	          //alert('error');
	          console.log("error: " + data);
	       }
	    });
}
function getBusData_p_cc(){
	var name = $('#name_p_cc').val();
	$('.bus_timeTable').text("▶ "+ name);
	
	$.ajax({
	       url : 'http://localhost:8888/bus_p_cc',
	       method : 'GET',
	       data : name,
	       processData : false,
	       contentType : false,
	       success : function(data) {

	    	   var x;
	    	   var txt =""; 
	    	   txt+="<div class='busTimeLine'>";
	    	   txt+="<table class=bus_time style='width:100%'>";
	    	   txt+="<tr style='background: #e6e6e6;'>";
	    	   txt+="<th>순</th>";
	    	   txt+="<th>천안캠퍼스<br>(출발)</th>";
	    	   txt+="<th>청수동</th>";
	    	   txt+="<th>신방동</th>";
	    	   txt+="<th>아산역</th>";
	    	   txt+="<th>아산캠퍼스<br>(도착)</th>";
	    	   txt+="</tr>";
	    	   
	    	   for(x in data){
	    		  if(x>=0 && x<3){
	    		   console.log(data[x].num);
	    		   txt+="<tr>";
	    		   txt+="<td>"+data[x].count+"</td>";
	    		   txt+="<td>"+data[x].cheonan_s+"</td>";
	    		   txt+="<td>"+data[x].cs+"</td>";
	    		   txt+="<td>"+data[x].sb+"</td>";
	    		   txt+="<td>"+data[x].asanktx_1+"</td>";
	    		   txt+="<td>"+data[x].asancam_e+"</td>";
	    		   txt+="</tr>";
	    		   }
	    	   }
	    	   txt+="</table>";
	    	   txt+="</div>";
	    	   
	    	   txt+="<br><br>";
	    	   txt+="<div class='busTimeLine'>";
	    	   txt+="<table class=bus_time style='width:100%'>";
	    	   txt+="<tr style='background: #e6e6e6;'>";
	    	   txt+="<th align=right>순</th>";
	    	   txt+="<th>아산캠퍼스<br>(출발)</th>";
	    	   txt+="<th>아산역(KTX)</th>";
	    	   txt+="<th>신방동</th>";
	    	   txt+="<th>청수동</th>";
	    	   txt+="<th>천안캠퍼스<br>(도착)</th>";	
	    	   txt+="</tr>";
	    	   
	    	   for(x in data){
	    		   if(x>=3 && x<6){
	    		   console.log(data[x].num);
	    		   txt+="<tr>";
	    		   txt+="<td>"+data[x].count+"</td>";
	    		   txt+="<td>"+data[x].asancam_s+"</td>";
	    		   txt+="<td>"+data[x].asanktx_1+"</td>";
	    		   txt+="<td>"+data[x].sb+"</td>";
	    		   txt+="<td>"+data[x].cs+"</td>";
	    		   txt+="<td>"+data[x].cheonan_e+"</td>";
	    		   txt+="</tr>";
	    		   }
	    	   }
	    	   txt+="</table>";
	    	   txt+="</div>";

	    	   /*document.getElementById("insertBusData").innerHTML = txt;*/
	    	   $('#insertBusData').html(txt);  

	       },
	       error : function(data, status, err) {
	          //alert('error');
	          console.log("error: " + data);
	       }
	    });
}

function getBusData_t_ca(){
	var name = $('#name_tg_ca').val();
	$('.bus_timeTable').text("▶ "+ name);
	
	$.ajax({
	       url : 'http://localhost:8888/bus_h_ca',
	       method : 'GET',
	       data : name,
	       processData : false,
	       contentType : false,
	       success : function(data) {

	    	   var x;
	    	   var txt =""; 
	    	   txt+="<div class='busTimeLine'>";
	    	   txt+="<table class=bus_time style='width:100%'>";
	    	   txt+="<tr style='background: #e6e6e6;'>";
	    	   txt+="<th>순</th>";
	    	   txt+="<th>선문대<br>(출발)</th>";
	    	   txt+="<th>아산역</th>";
	    	   txt+="<th>천안역</th>";
	    	   txt+="<th>아산역</th>";
	    	   txt+="<th>선문대<br>(도착)</th>";
	    	   txt+="</tr>";
	    	   
	    	   for(x in data){
	    		   console.log(data[x].num);
	    		   txt+="<tr>";
	    		   txt+="<td>"+data[x].count+"</td>";
	    		   txt+="<td>"+data[x].asancam_s+"</td>";
	    		   txt+="<td>"+data[x].asanktx_1+"</td>";
	    		   txt+="<td>"+data[x].cheonan+"</td>";
	    		   txt+="<td>"+data[x].asanktx_2+"</td>";
	    		   txt+="<td>"+data[x].asancam_e+"</td>";
	    		   txt+="</tr>";
	    	   }
	    	   txt+="</table>";
	    	   txt+="</div>";

	    	   /*document.getElementById("insertBusData").innerHTML = txt;*/
	    	   $('#insertBusData').html(txt);  

	       },
	       error : function(data, status, err) {
	          //alert('error');
	          console.log("error: " + data);
	       }
	    });
}
function getBusData_t_ct(){
	var name = $('#name_tg_ct').val();
	$('.bus_timeTable').text("▶ "+ name);
	
	$.ajax({
	       url : 'http://localhost:8888/bus_h_ct',
	       method : 'GET',
	       data : name,
	       processData : false,
	       contentType : false,
	       success : function(data) {

	    	   var x;
	    	   var txt =""; 
	    	   txt+="<div class='busTimeLine'>";
	    	   txt+="<table class=bus_time style='width:100%'>";
	    	   txt+="<tr style='background: #e6e6e6;'>";
	    	   txt+="<th>순</th>";
	    	   txt+="<th>선문대<br>(출발)</th>";
	    	   txt+="<th>터미널</th>";
	    	   txt+="<th>선문대<br>(도착)</th>";
	    	   txt+="</tr>";
	    	   
	    	   for(x in data){
	    		   console.log(data[x].num);
	    		   txt+="<tr>";
	    		   txt+="<td>"+data[x].count+"</td>";
	    		   txt+="<td>"+data[x].asancam_s+"</td>";
	    		   txt+="<td>"+data[x].terminal+"</td>";
	    		   txt+="<td>"+data[x].asancam_e+"</td>";
	    		   txt+="</tr>";
	    	   }
	    	   txt+="</table>";
	    	   txt+="</div>";

	    	   /*document.getElementById("insertBusData").innerHTML = txt;*/
	    	   $('#insertBusData').html(txt);  

	       },
	       error : function(data, status, err) {
	          //alert('error');
	          console.log("error: " + data);
	       }
	    });
}

function getBusData_i_ca(){
	var name = $('#name_i_ca').val();
	$('.bus_timeTable').text("▶ "+ name);

	$.ajax({
	       url : 'http://localhost:8888/bus_s_ca',
	       method : 'GET',
	       data : name,
	       processData : false,
	       contentType : false,
	       success : function(data) {

	    	   var x;
	    	   var txt =""; 
	    	   txt+="<div class='busTimeLine'>";
	    	   txt+="<table class=bus_time style='width:100%'>";
	    	   txt+="<tr style='background: #e6e6e6;'>";
	    	   txt+="<th>순</th>";
	    	   txt+="<th>선문대<br>(출발)</th>";
	    	   txt+="<th>아산역(KTX)</th>";
	    	   txt+="<th>천안역</th>";
	    	   txt+="<th>아산역(KTX)</th>";
	    	   txt+="<th>선문대<br>(도착)</th>";
	    	   txt+="</tr>";
	    	   
	    	   for(x in data){
	    		   console.log(data[x].num);
	    		   txt+="<tr>";
	    		   txt+="<td>"+data[x].count+"</td>";
	    		   txt+="<td>"+data[x].asancam_s+"</td>";
	    		   txt+="<td>"+data[x].asanktx_1+"</td>";
	    		   txt+="<td>"+data[x].cheonan+"</td>";
	    		   txt+="<td>"+data[x].asanktx_2+"</td>";
	    		   txt+="<td>"+data[x].asancam_e+"</td>";
	    		   txt+="</tr>";
	    	   }
	    	   txt+="</table>";
	    	   txt+="</div>";

	    	   /*document.getElementById("insertBusData").innerHTML = txt;*/
	    	   $('#insertBusData').html(txt);  

	       },
	       error : function(data, status, err) {
	          //alert('error');
	          console.log("error: " + data);
	       }
	    });
}
function getBusData_i_ct(){
	var name = $('#name_i_ct').val();
	$('.bus_timeTable').text("▶ "+ name);
	
	$.ajax({
	       url : 'http://localhost:8888/bus_s_ct',
	       method : 'GET',
	       data : name,
	       processData : false,
	       contentType : false,
	       success : function(data) {

	    	   var x;
	    	   var txt =""; 
	    	   txt+="<div class='busTimeLine'>";
	    	   txt+="<table class=bus_time style='width:100%'>";
	    	   txt+="<tr style='background: #e6e6e6;'>";
	    	   txt+="<th>순</th>";
	    	   txt+="<th>선문대<br>(출발)</th>";
	    	   txt+="<th>터미널</th>";
	    	   txt+="<th>선문대<br>(도착)</th>";
	    	   txt+="</tr>";
	    	   
	    	   for(x in data){
	    		   console.log(data[x].num);
	    		   txt+="<tr>";
	    		   txt+="<td>"+data[x].count+"</td>";
	    		   txt+="<td>"+data[x].asancam_s+"</td>";
	    		   txt+="<td>"+data[x].terminal+"</td>";
	    		   txt+="<td>"+data[x].asancam_e+"</td>";
	    		   txt+="</tr>";
	    	   }
	    	   txt+="</table>";
	    	   txt+="</div>";

	    	   /*document.getElementById("insertBusData").innerHTML = txt;*/
	    	   $('#insertBusData').html(txt);  

	       },
	       error : function(data, status, err) {
	          //alert('error');
	          console.log("error: " + data);
	       }
	    });
}

PostMessageBoxClose = function() {
	$('.ossn-message-box-edit-post').hide();
    $('#ossn-message-box-send-msg').hide();
    $('.ossn-message-box-edit-comment').hide();
    $('.ossn-halt').removeClass('ossn-light').hide();
    $('.ossn-halt').attr('style', '');
    $('#ossn-msg-send-form')[0].reset();
};