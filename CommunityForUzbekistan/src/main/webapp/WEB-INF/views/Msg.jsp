<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<!-- saved from url=(0046)https://demo.opensource-socialnetwork.org/home -->
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<style type="text/css">
.algolia-places {
	width: 100%;
}

.ap-input, .ap-hint {
	width: 100%;
	padding-right: 35px;
	padding-left: 16px;
	line-height: 40px;
	height: 40px;
	border: 1px solid #CCC;
	border-radius: 3px;
	outline: none;
	font: inherit;
	appearance: none;
	-webkit-appearance: none;
	box-sizing: border-box;
}

.ap-input::-webkit-search-decoration {
	-webkit-appearance: none;
}

.ap-input::-ms-clear {
	display: none;
}

.ap-input:hover ~ .ap-input-icon svg, .ap-input:focus ~ .ap-input-icon svg,
	.ap-input-icon:hover svg {
	fill: #aaaaaa;
}

.ap-dropdown-menu {
	width: 100%;
	background: #ffffff;
	box-shadow: 0 1px 10px rgba(0, 0, 0, 0.2), 0 2px 4px 0
		rgba(0, 0, 0, 0.1);
	border-radius: 3px;
	margin-top: 3px;
	overflow: hidden;
}

.ap-suggestion {
	cursor: pointer;
	height: 46px;
	line-height: 46px;
	padding-left: 18px;
	overflow: hidden;
}

.ap-suggestion em {
	font-weight: bold;
	font-style: normal;
}

.ap-address {
	font-size: smaller;
	margin-left: 12px;
	color: #aaaaaa;
}

.ap-suggestion-icon {
	margin-right: 10px;
	width: 14px;
	height: 20px;
	vertical-align: middle;
}

.ap-suggestion-icon svg {
	-webkit-transform: scale(0.9) translateY(2px);
	transform: scale(0.9) translateY(2px);
	fill: #cfcfcf;
}

.ap-input-icon {
	border: 0;
	background: transparent;
	position: absolute;
	top: 0;
	bottom: 0;
	right: 16px;
	outline: none;
}

.ap-input-icon.ap-icon-pin {
	cursor: initial;
}

.ap-input-icon svg {
	fill: #cfcfcf;
	position: absolute;
	top: 50%;
	right: 0;
	-webkit-transform: translateY(-50%);
	transform: translateY(-50%);
}

.ap-cursor {
	background: #efefef;
}

.ap-cursor .ap-suggestion-icon svg {
	-webkit-transform: scale(1) translateY(2px);
	transform: scale(1) translateY(2px);
	fill: #aaaaaa;
}

.ap-footer {
	opacity: .8;
	text-align: right;
	padding: .5em 1em .5em 0;
	font-size: 12px;
	line-height: 12px;
}

.ap-footer a {
	color: inherit;
	text-decoration: none;
}

.ap-footer a svg {
	vertical-align: text-bottom;
	max-width: 60px;
}

.ap-footer:hover {
	opacity: 1;
}
</style>

<script>
	$(document).ready(function() {
       checkSession();     
   });
   
   function checkSession() {
	   var user_id = "${sessionScope.user_id}";
	   var user_certify = "${sessionScope.certify}";
	   
	   if(user_id == "") {
		   alert("로그인이 필요합니다.");
		   window.location.href = "http://localhost:8888";
	   } else {
		   if(user_certify == "b") {
			   alert("로그인이 필요합니다.");
			   window.location.href = "http://localhost:8888";
		   }
	   }
   }
</script>

<title>SGDG : Message</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="shortcut icon"
	href="/ssun/resources/img/SGDG_favicon_96x96.png">

<!-- 
	Open Source Social Network (Ossn) https://www.opensource-socialnetwork.org/     
	BY Informatikon Technologies (http://informatikon.com/)
	BY SOFTLAB24 (https://www.softlab24.com/)
	-->
<!-- <link rel="stylesheet" type="text.css" href="resources/css/stylesheet.css"> -->
<!-- <script type="text/javascript" async="" defer="" src="./News Feed _ OSSN Demo_files/piwik.js"></script>
<script async="" src="./News Feed _ OSSN Demo_files/analytics.js"></script>
<script src="./News Feed _ OSSN Demo_files/ARf53_7CZrph6eMZGwgXpTF2-tk.js"></script> -->
<link rel="stylesheet" type="text/css"
	href="/resources/css/bootstrap.min.css">
<link rel="stylesheet" type="text/css"
	href="/resources/css/ossn.default.css">
<script type="text/javascript" src="/resources/js/ossn.en.language.js"></script>
<script type="text/javascript" src="/resources/js/jquery-1.11.1.min.js"></script>
<script type="text/javascript" src="/resources/js/jquery-ui.min.js"></script>
<!-- <script type="text/javascript" src="./News Feed _ OSSN Demo_files/jquery-arhandler-1.1-min.js"></script> -->
<script type="text/javascript" src="/resources/js/jquery.scrolling.js"></script>
<script type="text/javascript" src="/resources/js/places.min.js"></script>
<script type="text/javascript" src="/resources/js/jquery.tokeninput.js"></script>
<script type="text/javascript"
	src="/resources/js/sunmoon.socialnetwork.common.js"></script>
<script type="text/javascript"
	src="/resources/js/opensource.socialnetwork.js"></script>
<script type="text/javascript" src="/resources/js/ossn.chat.js"></script>
<link rel="stylesheet" type="text/css"
	href="/resources/css/font-awesome.min.css">
<link rel="stylesheet"
	href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
<!-- <link rel="stylesheet" type="text/css" href="./News Feed _ OSSN Demo_files/css"> -->
<script type="text/javascript" src="/resources/js/bootstrap.min.js"></script>
<link rel="stylesheet" type="text/css"
	href="/resources/css/jquery-ui.css">

<!-- 예린 datatable 링크 추가 -->
<!-- <script src="/ssun/resources/datatables/jquery.dataTables.js"></script>
<script src="/ssun/resources/datatables/dataTables.bootstrap4.js"></script> -->

<!-- Page level plugin CSS-->
<!-- <link href="/ssun/resources/datatables/dataTables.bootstrap4.css" rel="stylesheet"> -->

<!-- DataTables Responsive CSS -->
<!-- <link href="/ssun/resources/css/dataTables.responsive.css" rel="stylesheet"> -->

<script>

	Ossn.site_url = 'https://demo.opensource-socialnetwork.org/';
	Ossn.Config = {
		"token" : {
			"ossn_ts" : 1541646441,
			"ossn_token" : "2b41a5d65173661dec98233ee8b2b260"
		}
	};
	Ossn.Init();
	$(document).ready(function() {
		setInterval(function() {
			Ossn.NotificationsCheck()

		}, 5000 * 12);
	});

	$(document).ready(function() {
		
		setUserInfo();	
	});
	

	
	function setUserInfo() {
		
		console.log("셋유저인폳들어가따ㅏㅏㅏㅏ아ㅏㅏ");
		
		var user_id = "${sessionScope.user_id}";
				
		document.getElementById("user_id").value = user_id;	
		
	}
	
	function logout(){
	      console.log("logout called!");
	      
	      var user_id  = "${sessionScope.user_id}";

	      $.ajax({
	         url : 'http://localhost:8090/ssun/logout',
	         method : 'POST',
	         data : user_id,
	         processData : false,
	         contentType : false,
	         success : function(data) {

	            console.log(data);
	            console.log("값1:" + user_id);

	            loginCheckProc(data, user_id);
	            alert("로그아웃 됩니다.");
	 
	         },
	         error : function(data, status, err) {
	            //alert('error');
	            console.log("error: " + data);
	         }
	      });         
	      
	   }
	   console.log("뉴스피드 : " + "${sessionScope.user_id}");
	   console.log("password: " + "${sessionScope.password}");
	   	   
	
	    
</script>
<!-- <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script> -->
<script src="https://code.jquery.com/jquery-1.10.2.js"></script>
</head>

<body>

	<div class="ossn-page-loading-annimation" style="display: none;">
		<div class="ossn-page-loading-annimation-inner">
			<div class="ossn-loading"></div>
		</div>
	</div>
	<div class="ossn-halt"></div>

	<div name="ossn-message-box-send-post" id="ossn-message-box-send-post"
		class="ossn-message-box-edit-post" style="display: none;">
		<div class="title">
			<span id="txt0"></span>
			<div class="close-box" onclick="PostMessageBoxClose();">X</div>
		</div>

		<div id="line" class="line" style="padding: 10px;">
			<input class="who" id="who" value="보낸 사람" disabled="disabled"
				style="font-weight: bold;"> <span id="txt2"> </span> <span
				id="txt3"> </span> <input class="sendTime" id="sendTime"
				value="보낸 날짜" disabled="disabled" style="font-weight: bold;">
		</div>

		<div class="contents">
			<div class="ossn-box-inner">
				<div style="width: 100%; margin: auto;">
					<form
						action="https://demo.opensource-socialnetwork.org/action/wall/post/edit"
						id="ossn-post-msg-form" class="ossn-form" method="post"
						enctype="multipart/form-data">
						<fieldset>
							<div id="msg-post-popup"></div>
						</fieldset>
					</form>
				</div>
			</div>
		</div>
	</div>


	<!-- ================================================================================ -->
	<div class="ossn-inner-page">
		<div class="container">
			<div class="row">
				<div class="ossn-system-messages">
					<div class="row">
						<div class="col-md-11 ossn-system-messages-inner"></div>
					</div>
				</div>
				<div class="ossn-layout-newsfeed">
					<div class="col-md-7">
						<div class="newsfeed-middle">
							<div class="ossn-wall-container">

								<ul id="tab" name="tab" class="tab">
									<li class="current" data-tab="tab1"><a id="List_"
										onclick="javascript:receiveList();">받은 쪽지</a></li>
									<li data-tab="tab2"><a id="receiveList_"
										onclick="javascript:List();">보낸 쪽지</a></li>
								</ul>

								<div id="tab1" class="tabcontent current">
									<div class="tabs-input">
										<div class="wall-tabs">
											<li class="item ossn-wall-container-menu-post"
												data-name="post"><i class="fa fa-pencil"></i>받은 쪽지함</li>
										</div>
									</div>
									<div id="receiveMsgList-post-popup">

										<table id="toMsgList" name="toMsgList"
											class="sendMsgListTable" style="width: 100%">
											<!-- 쪽지 들어와라~~ -->

										</table>

										<input type="hidden" name="guid" value="89"> <input
											type="submit" class="hidden" id="ossn-post-sendMsgList-save">
									</div>

								</div>

								<div id="tab2" class="tabcontent ">
									<div class="tabs-input">
										<div class="wall-tabs">
											<li class="item ossn-wall-container-menu-post"
												data-name="post"><i class="fa fa-pencil"></i>보낸 쪽지함</li>
										</div>
									</div>
									<div id="sendMsgList-post-popup">

										<table id="fromMsgList" class="sendMsgListTable"
											style="width: 100%">
											<!-- 쪽지 들어와라~~ -->
										</table>

										<input type="hidden" name="guid" value="89"> <input
											type="submit" class="hidden" id="ossn-post-sendMsgList-save">
									</div>

								</div>

								<form id="ossn-wall-form" name="ossn-wall-form"
									class="ossn-form" method="post" enctype="multipart/form-data">
									<fieldset>
										<input type="hidden" id="to_user_name" name="to_user_name" value="">
										<!-- <input type="hidden" id="user_dep" name="user_dep" value=""> -->
										<input type="hidden" id="user_id" name="user_id" value="">
										<input type="hidden" id="user_img" name="user_img" value="">
										<input type="hidden" id="page_dep_code" name="page_dep_code" value=""> 
										<input type="hidden" name="ossn_ts" value="1541646439">
										<input type="hidden" name="ossn_token" value="bbcef9f5e5b67ccb7584a8c99a19116a">
									</fieldset>
								</form>
							</div>
							<input type=hidden id="calledNum" value="1">
							<div id="user-activity" class="user-activity"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<script>
		$(function() {
			$('ul.tab li').click(function() {
				var activeTab = $(this).attr('data-tab');
				$('ul.tab li').removeClass('current');
				$('.tabcontent').removeClass('current');
				$(this).addClass('current');
				$('#' + activeTab).addClass('current');
			})
		});
		
		 //페이징 처리
	
	</script>
</body>
</html>