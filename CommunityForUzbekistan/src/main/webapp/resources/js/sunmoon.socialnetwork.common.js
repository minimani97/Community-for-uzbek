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

// 한국생활 꿀팁 정보 클릭 시 작동하는 함수
function clickTipBtn(type) {
	
	if(type == "recycle") {
		var title = "<b style='font-size:23px;'>쓰레기 분리수거</b>";
		var txt = "여러 가지 재활용 가능한 것의 분리수거 하는 요령을 알아봅시다 :)<br>집에서 하는 작은 실천이 지구 환경을 구하는데 큰 도움이 됩니다!<br><br>1. 폐지 분리배출 요령<br>페지를 분리배출할 때 주의할 점은, 오물이나 물에 젖지 않도록 하고 비닐, 플라스틱, 알루미늄, 철사 등 이물질이 섞이지 않도록 해야 합니다.<br>1) 신문지<br> 신문지만 따로 모아 30Cm 정도의 높이로 끈으로 묶어서 보관합니다. 이때 비닐봉지에 넣어서 보관하면 안됩니다. 비닐이 섞이면 재활용이 어려워 비닐을 다시 분리해야 하는 번거로움이 따릅니다.<br>2) 헌책, 잡지류<br>헌책, 잡지류, 노트 등을 30Cm 높이로 묶어 신문지와 같은 요령으로 보관합니다. 이때 비닐로 코팅되거나 접합된 겉표지는 재활용이 어려우므로 제거합니다.<br>3) 상자류<br>라면상자나 각종 가전제품 포장재, 과자상자 등은 납작하게 부피를 줄인 후 끈으로 묶어 보관합니다.<br>4) 음료수팩, 우유팩<br>내용물을 비운 후 양옆을 납작하게 눌러 우유팩에 5~6개씩 넣어 보관하거나 펴서 말린 후 보관합니다.<br><br>2. 폐플라스틱의 분리수거<br>1) 폐플라스틱의 분리배출<br>가정에서 발생하는 폐플라스틱으로는 각종 세제용기류, 삼푸, 린스 용기류와 바가 지, 함지박, 기타 식기류 등을 들 수 있습니다. 쌀포대, 비료포대는 물론 밴드, 끈도 모으면 재활용 됩니다.<br>2) 폐플라스틱의 분리배출요령<br>– 폐플라스틱은 성상과 재질이 다양해 다른 재활용품에 비해 분리배출에 세심한 주의를 기울여야 합니다. <br>– 폐페인트병 등 플라스틱 용기는 내용물을 깨끗이 비우고 다른 재질로 된 뚜껑이나 부착상표를 제거한 후 배출합니다.<br>– 폐스티로폴은 내용물을 완전히 비우고 이물질이 묻어있는 경우 깨끗이 씻어 끈으로 묶어서 배출합니다.<br>– 폐스티로폴 중 컵라면 용기, 도시락 등 1회용 용기와 수산양식용 폐부자, 건축용 단열재, 이물질이 많이 묻어 있거나 다른 재질로 코팅된 것은 재활용품으로 분리배출하면 안됩니다.<br>– 전화기 헤어드라이기 옷걸이 등 복합재질로 된 폐플라스틱과 재떨이, 식기 등 열에 잘 녹지 않는 폐플라스틱은 재활용품으로 분리배출하면 안됩니다.<br>– TV, 냉장고, 세탁기 등 가전제품을 포장한 스티로폴은 판매자에게 되돌려 줍시다.<br>– 농촌의 폐비닐은 하우스용 비닐과 구분하여 흙과 자갈, 잡초를 털어낸 후 일정한 크기로 뭉쳐 운반이 쉽도록 묶어서 마을 공동 집하장에 보관합니다.<br><br>3. 고철 분리수거<br> 고철에는 철강제조공정에서 발생하는 자가발생 고철과 철강재를 이용하여 공업용, 소비재 제품을 제조하는 과정에서 발생하는 가공고철, 사용후 소비자로부터 처리된 철강폐기물로서 재사용이 적합하도록 처리된 노폐고철을 들 수 있습니다. 가정에서 분리배출하는 고철은 바로 노폐고철이라고 볼 수 있는데 그 쓰임새를 다한 철제로 된 각종 주방용품, 생활용품들도 분류하여 모아두면 모두 훌륭한 자원이 되는 것입니다.<br><br>▶ 분리배출 요령<br>가급적 부피를 줄여서 배출하고 용기류의 경우 내용물을 깨끗이 비운 뒤 플라스틱이나 기타 이물질로 된 뚜껑을 분리하여 배출합니다. 플라스틱이 많이 섞인 라디오, 시계 등은 금속성분이 있더라도 분리배출하면 안됩니다.<br><br>4. 캔 분리배출<br> 캔에는 철과 알루미늄에 대한 재활용마크가 각각 표시되어 있으므로 가능한 한 철캔과 알루미늄캔을 구분하여 배출합니다.<br><br>▶ 분리배출 요령<br>– 알루미늄캔과 철캔을 구별하는 요령 : 알루미늄캔은 반짝거리고 은빛이 나며 색상이 선명합니다. 특히 철캔에 비해 가벼우며 잘 찌그러집니다. 캔 속에 들어있는 내용물을 완전히 비운 뒤 납작하게 쭈그러뜨려 배출합니다.<br>– 뚜껑분리형의 경우에는 뚜껑을 캔 속에 넣어 함께 배출합니다.<br>– 부탄가스용기는 구멍을 뚫은 뒤 찌그러뜨려 배출합니다.<br><br>5. 유리병 분리수거<br> 유리병은 깨어지지 않는 동안 계속 사용하거나 다시 회수되어 새로운 용기로 재사용하는 등 재활용 효과가 높습니다.<br><br>▶ 분리배출 요령<br>플라스틱이나 알루미늄 등 이물질로 된 뚜껑을 제거합니다. 내용물을 깨끗이 비운 뒤 되도록 무색, 청·녹색, 갈색으로 분리배출합니다. 판유리나 형광등, 백열등, 거울 등은 재활용이 안됩니다. 농약빈병의 경우 내용물을 완전히 사용한 후 유리병, PET병별로 구분하여 뚜껑을 분리, 마대에 따로 넣어 배출합니다.<br><br>6. 가구, 가전제품 분리배출<br> 폐가전, 가구는 현재 지방자치단체, 가전제품 제조업체, (사)전국가전. 가구재활용 협의회에서 주로 수거하고 있습니다. 지방자치단체에서는 배출자에게 수수료를 받고 스티커를 발부하여 수거·처리하고 있으며 가전제품 제조업체에서는 신제품을 판매할 때 구제품을 수거하여 처리하고 있습니다. 또한 지방자치단체, (사)전국가전·가구재활용 협의회에서 재활용 센터를 통하여 가전, 가구를 배출하려 하거나 중고제품을 저렴하게 구입하고자 하면 관할 시·군·구나 (사)전국가전·가구재활용 협의회 전화 : 02-637-2220에 문의하시면 됩니다. 신제품 구입으로 사용이 필요 없어진 가전. 가구는 다른 사람에게 제공하거나 재활용 센터 등에 보냅니다. 고장난 가전제품이나 가구는 수리가 가능한 경우 재활용 센터에 보내고 수리가 불가능한 경우 관할 시·군·구에 연락하여 수수료를 내고 배출합니다.<br><br>7. 음식물 쓰레기 분리수거<br>생활폐기물중 음식물 쓰레기가 가장 많은 비중을 차지하고 있으므로 음식물 쓰레기는 줄이는 것이 쓰레기 감량화에 가장 큰 효과를 가져옵니다.<br><br>▶ 분리배출 요령<br> 재활용하기 위하여 분리수거를 실시하는 지역에서는 재활용이 가능한 음식물 쓰레기만을 선별하여 배출하면 됩니다.<br>– 비닐, 병뚜껑, 은박지, 젓가락 등의 이물질과 필요시 소금 성분이 많은 된장, 고추장, 간장 등은 별로 배출하고 김치 등을 씻어서 배출하면 됩니다.<br>– 동식물성 유지류, 중금속 오염기능 물질 및 잉크물질은 제거하여 배출합니다.<br>– 가정용 수집용기를 비치하여 음식물쓰레기만을 별도로 수집하여야 합니다.<br>– 가정용 수집용기에 모은 음식물쓰레기를 종량제 봉투에 담아 배출하거나, 공동수거 용기에 배 출하기 전에 물기를 최대한 제거하여 배출하면 됩니다.<br>– 음식점이나 집단급식소에서는 음식물 쓰레기 발생 단계별 조리 전 쓰레기, 조리 후 먹고 남긴 쓰레기(잔반)를 구분하여 수집용기에 수집하여야 합니다. 이때, 조리 후 먹고 남긴 쓰레기는 체나 망사형 자루 등에 수집하여 자연 탈수 또는 간단한 기기. 기구를 이용하여 물기를 제거합니다.<br>– 감량의무 사업장은 스스로 또는 위탁하여 재활용 하거나 감량화 처리를 한 후 배출하여야 하며, 기타 사업장은 시.군.구의 조례가 정하는 바에 따라 배출하여야 합니다.<br>– 시장, 백화점, 호텔 등 음식물쓰레기 발생형태들을 감안하여 분리수집이 용이한 장소에 적정규모의 분리수집 장소를 확보하고, 음식물쓰레기의 물기와 이물질을 제거한 후 분리수집 장소에 배출하여야 합니다.<br><br>8. 의류(옷) 분리수거<br> 섬유 재활용 업체에서 사용하는 재활용품의 원료는 바로 가정에서 배출한 의류와 섬유, 의류업체에서 폐기물로 발생한 썰물(재단 후 남은 자투리)입니다. 업체에서 나오는 썰물에는 이물질이 들어있는 경우가 거의 없으나 가정에서 나오는 헌 의류의 경우에는 병, 쇳조각 등이 분리되지 않고 나와 공장에서 재분류해야 하는 어려움이 따르고 있습니다. 가정에서부터의 바른 분리가 중요한 만큼 무엇보다도 계획적인 구매로 불필요한 의류의 구입을 줄여 헌 의류의 발생을 줄여야 하며 입을만한 옷들은 깨끗이 빨아 이웃, 친척과 교환하여 입거나 불우이웃과 나누어 입도록 하는 알뜰함이 필요합니다.<br><br>▶ 분리배출 요령<br>헌 의류를 보관할 때 무엇보다도 중요한 것은 카페트, 가죽 백, 구두, 기저귀 카바 등과 같이 복합소재의 제품이 섞이지 않도록 해야 합니다. 쓸만한 단추나 지퍼 등을 따로 떼내어 가정에서 필요할 때 다시 활용하면 더욱 좋습니다. 30cm의 높이로 묶어 부피를 줄여 배출합니다.";
		
		$('#bus_timeTable').html("");
		$('#bus_timeTable').html(title);
		$('#tips-content-area').html("");
		$('#tips-content-area').html(txt);
	} else if(type == "restaurant") {
		var title = "<b style='font-size:23px;'>음식점</b>";
		var txt = "1. 패스트푸드/커피전문점<br> 1) 버거킹 이용 팁<br> - 토마토, 양파, 피클, 불고기 소스, 케찹, 양상추, 마요네즈 등을 공짜로 추가, 제거해서 내맘대로 만들어 먹을 수 있다.<br>(400원만 더 내고 올 엑스트라 추가하면 햄버거 토핑의 양이 1.5배 더 많아진다!)<br><br> 2) KFC 이용 팁<br> - KFC에서 후렌치후라이에 100원만 더 추가하면 치즈소스가 듬뿍 들어간 치즈후렌치후라이로 업그레이드 가능 (치즈소스는 무료 리필!)<br><br> 3) 커피전문점에서 음료 주문 시 팁<br> - 음료를 시킬 때는 얼음을 조금만 넣어달라고 하면 더 많은 양을 먹을 수 있음<br> - 텀블러나 개인 컵을 가져가면, 할인도 받고 양도 더 많이!<br><br> 2. 맥도날드<br> - 맥도날드 감자튀김 먹을 때, 200원 더 내고 너겟소스 구입해서 찍어먹으면 훨씬 맛있다.<br> (새콤달콤 스윗앤샤워 / 매콤달콤 스윗앤칠리 / 케이준소스 3종류)<br> - 상하이 버거는 맥치킨 소스를 2번 뿌리는데 더 많이 뿌려달라고 하면 더 맛있다.<br>- 빅맥 먹고 싶은데 돈이 없다면, 맥 스냅랩 추천!<br> - 방금 나온 맥치킨버거는 세상에서 제일 맛있는 버거! 소스 많이 뿌려달라고 하면 천국의 맛<br><br> 3. 베스킨라빈스<br> - 매 월 31일에는 패밀리 사이즈 가격으로 더 큰 사이즈인 하프갤런을 구입할 수 있다. (베스킨라빈스 31데이 행사)<br> - 맛보기 스푼으로 모든 아이스크림을 맛볼 수 있다.<br>";
		
		$('#bus_timeTable').html("");
		$('#bus_timeTable').html(title);
		$('#tips-content-area').html("");
		$('#tips-content-area').html(txt);
	} else if(type == "transportation") {
		var title = "<b style='font-size:23px;'>대중교통</b>";
		var txt = "1. 대중교통<br>1) 버스 환승기준<br>- 환승 기준은 30분 이내이다. 밤 9시 이후에는 다음날 아침 7시까지 1시간 적용되며 총 4번 환성이 가능하고, 같은 버스 또는 전철에서 전철로 환승할 경우 환승이 적용되지 않는다.<br><br>2) 교통카드 이용<br>- 교통카드가 갑자기 고장/파손된 경우, 편의점을 통해 본사로 보내 잔액 환불이 가능하다.<br>(잠자는 교통카드 잔액이 80억 이상!)<br>- 전국 호환되는 교통카드가 별도로 있다.<br><!-- <img src='http://localhost:8888/resources/tipPic/transport-card.jpg'><br> -->- 전국의 몇몇 버스정류장에는 버스정보안내시스템에 버스카드 잔액 확인하는 곳이 있다.<br><br>3) 우등 고속버스<br>- 우등 고속버스에는 팔걸이 부분쪽에 이어폰을 꽃으면 라디오를 들을 수 있는 기능이 있다.<!-- <br><img src='http://localhost:8888/resources/tipPic/bus-earphone-plug.jpg'> -->";
		
		$('#bus_timeTable').html("");
		$('#bus_timeTable').html(title);
		$('#tips-content-area').html("");
		$('#tips-content-area').html(txt);
	} else if(type == "electronic") {
		var title = "<b style='font-size:23px;'>가전/전자기기</b>";
		var txt = "1. 컴퓨터<br>1) 컴퓨터에 오류가 났을 때<br>- 컴퓨터가 켜지지 않거나 삐-삐 거리는 등 도저히 알 수 없는 이상한 문제가 발생했을 때, 컴퓨터 본체 열어서 램(RAM)을 뺐다가 끼우면 거의 90% 해결된다.<br><br>2) 인터넷<br>- 인터넷 중 한글이 써지지 않을 때, 주소창에 마우스 커서를 놓고 다시 한/영키를 누르거나 하단에 시작표시줄 한/영 버튼을 누르면 대부분 해결된다.<br>- 긴 글을 볼 때 마우스 휠 말고 스페이스바를 누르면 현재 내용이 끝난 부분부터 그 다음 내용까지 화면에 알맞게 내용이 넘어가게 된다.<br><br>2. 휴대폰<br>- 판매점과 대리점은 다르며, 대리점은 as 등이 편한 반면 판매점은 휴대폰만 판매한다.<br>(판매점은 SKT, LGT, KT 3사를 취급하고, 대리점은 하나의 통신사만 취급한다.)<br>- 휴대폰은 무조건 ‘할부원금이 낮은 기기’를 사야한다.<br>";
		
		$('#bus_timeTable').html("");
		$('#bus_timeTable').html(title);
		$('#tips-content-area').html("");
		$('#tips-content-area').html(txt);
	} else if(type == "clothes") {
		var title = "<b style='font-size:23px;'>옷</b>";
		var txt = "1. 유니클로<br>1) 유니클로 수선 팁 & 피팅룸 이용 팁<br>- 유니클로는 29,900원 이상 바지는 기장 수선이 무료인데, 바쁜 주말보다 평일에 하면 비교적 고퀄리티의 수선이 가능하다.<br>- 피팅룸에서 바지를 입어보고 사이즈가 안맞을 때, 직원에게 다른 치수를 가져다 달라고 말하면 가져다준다.(유니클로 교육 OP에도 있는 사항, 최대 3벌 시착 가능)<br>2) 저렴하게 사는 팁 & 품절된 옷 주문 팁<br>- 진열상품이나 약간의 하자가 있는 상품을 반값 이상으로 싸게 살 수 있는 B품 상품 파는 곳이 있으니 스탭에게 물어보고 이를 잘 활용할 것!<br>- 품절된 상품을 구매하고 싶을 때, 먼저 주문해두고 나중에 수령 가능하다. 다른 지점에서 구매하고 싶을 때에는 그 지점의 재고도 직원에게 물어보면 조회가 가능하니 물어보고 갈 것!<br><br>2. 옷가게<br>1) 옷 살 때<br>- 진열상품(마네킹)은 되도록 사지 않는 것이 좋다. (더러운 경우가 많다!)<br>- 사장이 있는 가게에서 사는 것이 가장 싸게 살 수 있다.<br>- 계절이 끝나갈 때 옷을 사면 저렴하게 구매 가능하다.<br>2) 처음 옷 입기 전<br>- 새 옷은 처음 입기 전에 웬만하면 손세탁해서 입는 것이 좋다. 처음 세탁할 때는 물빠짐 현상으로 다른 옷에 물이 들 수도 있다.<br>";
		
		$('#bus_timeTable').html("");
		$('#bus_timeTable').html(title);
		$('#tips-content-area').html("");
		$('#tips-content-area').html(txt);
	} else if(type == "leisure") {
		var title = "<b style='font-size:23px;'>여가생활</b>";
		var txt = "1. 놀이동산<br>1) 롯데월드<br>- 롯데월드 입장 시 대기 줄이 길 때, 정문 앞 엘리베이터를 타고 3층 민속박물관 또는 석촌호수 쪽 매직 아일랜드 매표소에서 자유이용권을 끊으면 빨리 들어갈 수 있다.<br>2) 에버랜드<br>- 에버랜드에서 생일인 사람에게는 줄을 서지 않고 바로 놀이기구를 탈 수 있는 스페셜패스 4매와 생일 목걸이를 걸어줘서 가는 곳마다 직원들에게 이벤트성 축하를 받을 수 있다.<br>3) 기타<br>- 놀이기구 중 몇 가지는 매직패스(빠른 탑승 예약서비스)를 이용하면 기다리지 않고 바로 탈 수 있다.<br><br>2. 영화관<br>1) 영화관 스낵코너<br>- CGV에서는 트윈팝콘이라고 해서 추가금액 없이 반반 가능(고소한 맛, 카라멜 맛, 어니언 맛 모두 맛볼 수 있다!)<br>- 반반팝콘 시킬 때 중간에 가림판을 빼달라고 하면 한 주먹이 더 들어가니 참고!<br>- 팝콘은 막 튀긴 것보다 튀긴지 30분 정도 지나 수분이 날라가야 더 바삭하고 고소하다.<br>- CGV에서는 콜라 리필이 가능하다.(팝콘이나 에이드는 리필 불가)<br>2) 영화관 매표소<br>- 매표소에서 생일 콤보 쿠폰 받으면 CGV 콤보에서 업그레이드 가능한 모든 조합이 다 무료이다. (사이즈, 음료 변경 등)<br>- 영화관 매표소나 인포에는 여성용품, 비상약이 구비되어 있다.<br><br>3. 노래방<br>- 노래방에 따라 인원수에 맞춰 가격이 올라가기 때문에, 다수 인원인 경우 일부분이 들어가 방을 받고, 사람이 더 들어가면 저렴하게 이용가능하다.<br>";
		
		$('#bus_timeTable').html("");
		$('#bus_timeTable').html(title);
		$('#tips-content-area').html("");
		$('#tips-content-area').html(txt);
	} else if(type == "hospital") {
		var title = "<b style='font-size:23px;'>병원</b>";
		var txt = "1) 응급실 이용<br>- 대학병원 응급실은 2~3월에 가면 고생이 많음 (새로 들어온 인턴 의사들이 주로 응급실에 배치되기 때문)<br>- 응급실에 갔는데 돈이 없을 땐, ‘응급 의료비 대불제도’를 이용 가능하다.<br><br>2) 헌혈증<br>- 대한적십자사에서는 수혈이 필요한 경우 헌혈증을 연간 1,000매까지 무상으로 지원해준다.<br>";
		
		$('#bus_timeTable').html("");
		$('#bus_timeTable').html(title);
		$('#tips-content-area').html("");
		$('#tips-content-area').html(txt);
	} else {
		var title = "<b style='font-size:23px;'>기타</b>";
		var txt = "1. 마트<br>- 좋은 물건을 사려면 아침 일찍 가고, 싸게 사려면 저녁 늦게 가야 한다. (저녁에는 떨이로 싸게 판매하기 때문)<br>- 마트에 진열되어 있는 식품들은 뒤쪽이 유통기한이 더 여유로운 제품들이다.<br>- 대형마트에서 가전제품을 구매할 때도 흥정이 가능하다. (판매사원은 실적이 중요하기 때문에 할인이 가능하다.)<br>- 캔음료 사먹을 때, 입 닿는 부분은 닦아서 먹는 것이 안전하다. (비닐에 쌓여있지 않은 빨대도 닦아 먹을 것!)<br><br>2. 주유소<br>- 휘발유 수송 트럭이 주유소에 기름을 공급하는 시간은 피하는 것이 좋다. 이때 주유를 할 시에 불순물이 주유될 수 있기 때문이다.<br>- 가득 주유를 하면 연료소모가 ᄈᆞᆯ라지므로, 2/3정도가 적당하다.<br>- 이른 아침에 주유하는 것이 가장 경제적이다. 날씨가 추울수록 휘발유의 밀도가 올라가고, 더울수록 밀도가 팽창하기 때문에 기온에 따라 기름 양의 차이가 발생한다.<br>";
		
		$('#bus_timeTable').html("");
		$('#bus_timeTable').html(title);
		$('#tips-content-area').html("");
		$('#tips-content-area').html(txt);
	}
}

PostMessageBoxClose = function() {
	$('.ossn-message-box-edit-post').hide();
    $('#ossn-message-box-send-msg').hide();
    $('.ossn-message-box-edit-comment').hide();
    $('.ossn-halt').removeClass('ossn-light').hide();
    $('.ossn-halt').attr('style', '');
    $('#post-edit').text("");
    $('#who_content').val("");
    $('#sendTime_content').val("");
    $('#msgtitle').val("");
};