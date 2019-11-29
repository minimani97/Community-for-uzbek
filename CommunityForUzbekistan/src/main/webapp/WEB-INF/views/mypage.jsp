<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>SGDG : MyPage</title>
<meta name="viewport" content="width=device-width, initial-scale=1" />
<script src="/cdn-cgi/apps/head/ARf53_7CZrph6eMZGwgXpTF2-tk.js"></script>
<link rel="shortcut icon"
	href="/resources/img/SGDG_favicon_96x96.png">

<!-- 
	Open Source Social Network (Ossn) https://www.opensource-socialnetwork.org/     
	BY Informatikon Technologies (http://informatikon.com/)
	BY SOFTLAB24 (https://www.softlab24.com/)
	-->
	
<!-- <script type="text/javascript" async="" defer="" src="./News Feed _ OSSN Demo_files/piwik.js"></script>
<script async="" src="./News Feed _ OSSN Demo_files/analytics.js"></script>
<script src="./News Feed _ OSSN Demo_files/ARf53_7CZrph6eMZGwgXpTF2-tk.js"></script> -->
<link rel="stylesheet" type="text/css" href="resources/css/bootstrap.min.css">
<link rel="stylesheet" type="text/css" href="resources/css/ossn.default.css">
<script type="text/javascript" src="resources/js/ossn.en.language.js"></script>
<script type="text/javascript" src="resources/js/jquery-1.11.1.min.js"></script>
<script type="text/javascript" src="resources/js/jquery-ui.min.js"></script>
<!-- <script type="text/javascript" src="./News Feed _ OSSN Demo_files/jquery-arhandler-1.1-min.js"></script> -->
<script type="text/javascript" src="resources/js/jquery.scrolling.js"></script>
<script type="text/javascript" src="resources/js/places.min.js"></script>
<script type="text/javascript" src="resources/js/jquery.tokeninput.js"></script>
<script type="text/javascript" src="resources/js/opensource.socialnetwork.js"></script>
<script type="text/javascript" src="resources/js/ossn.chat.js"></script>
<link rel="stylesheet" type="text/css" href="resources/css/font-awesome.min.css">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
<!-- <link rel="stylesheet" type="text/css" href="./News Feed _ OSSN Demo_files/css"> -->
<script type="text/javascript" src="resources/js/bootstrap.min.js"></script>
<link rel="stylesheet" type="text/css" href="resources/css/jquery-ui.css">
<!-- <script type="text/javascript" src="resources/js/sunmoon.socialnetwork.js"></script> -->
<link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=PT+Sans:400italic,700,400" />

<!-- 20181120 민정추가  -->
<script type="text/javascript" src="resources/js/sunmoon.socialnetwork.common.js"></script>

<!-- 11/25 예린추가 -->
<!-- <script type="text/javascript" src="resources/js/sunmoon.socialnetwork.mypage.js"></script> -->
<script>
	Ossn.site_url = 'https://demo.opensource-socialnetwork.org/';
	Ossn.Config = {
		"token" : {
			"ossn_ts" : 1542354882,
			"ossn_token" : "8828f01c95a16becdc858ec731af20b2"
		},
		"cache" : {
			"last_cache" : "27781315",
			"ossn_cache" : "1"
		}
	};
	Ossn.Init();
	$(document).ready(function() {
		setInterval(function() {
			Ossn.NotificationsCheck()
		}, 5000 * 12);
	});

	//유저세션
	function setUserInfo() {
		var txt = "";
		//var user_dep = "${sessionScope.department}";
		var user_name = "${sessionScope.user_name}";
		var user_id = "${sessionScope.user_id}";
		var user_img = "${sessionScope.user_img}";

		document.getElementById("user-name-info").innerHTML = user_name;
		document.getElementById("mypage_id").value = user_id;
		document.getElementById("mypage_name").value = user_name;
		document.getElementById("user_id").value = user_id;
		//document.getElementById("mypage_userId").value = user_id;
		document.getElementById("user_img").value = user_img;
		document.getElementById("mypage_tel").value = "${sessionScope.phone}";
		document.getElementById("mypage_email").value = "${sessionScope.email}";
		
		$('#user-name-area').text("");
		$('#user-name-area').text(user_name);

		if (user_img == "" || user_img == null) {
			var url = "resources/img/default-user-icon-11.jpg";
			/* document.getElementById("user-profile-img").attr("src", url); */
			$('#newseed-uinfo-img').attr("src", url);
			$('#profile-photo').attr("src", url);
		} else {
			var url = "resources/userImage/" + user_img;
			/* document.getElementById("user_img").attr("src", url); */
			$('#newseed-uinfo-img').attr("src", url);
			$('#profile-photo').attr("src", url);
		}

		/* document.getElementById("user-activity").innerHTML = txt; */
	}

	//로그아웃	
	function logout() {
		console.log("logout called!");

		var user_id = "${sessionScope.user_id}";
		console.log(" userId 값000:" + user_id);

		$.ajax({
			url : 'http://localhost:8888/logout',
			method : 'POST',
			data : user_id,
			processData : false,
			contentType : false,
			success : function(data) {

				console.log(data);
				console.log("값1:" + user_id);

				loginCheckProc(data, user_id);
				alert("로그아웃 됩니다.");

				/* if("${sessionScope.user_id}" != null){
				   console.log("값2:" + "${sessionScope.user_id}");
				   loginCheckProc(data, user_id);
				   console.log("값3:" + "${sessionScope.user_id}");
				   alert("로그아웃 됩니다.");
				   //window.location.href = "http://localhost:8888/";
				} */

			},
			error : function(data, status, err) {
				//alert('error');
				console.log("error: " + data);
			}
		});

	}

	//학과코드 -> 학과이름	
	function checkDepartment(dep_code) {
		var depCode = {
			dep_code : dep_code
		};

		$.ajax({
					url : 'http://localhost:8888/checkDepartment',
					method : 'POST',
					data : JSON.stringify(depCode),
					processData : false,
					contentType : 'application/json',
					success : function(data) {
						console.log("학과: " + data);
						document.getElementById("user-department-info").innerHTML = data;
						document.getElementById("mypage_department").value = data;
					},
					error : function(data, status, err) {
						console.log("error: " + data);
					}
				});
	}

	//마이페이지 유저정보 가져오기	
	$(document).ready(function() {

		function mypageInfo() {
			console.log("마이페이지 에이젝스 현장");
			var formData = new FormData($("#mypage_form")[0]);

			$.ajax({
				url : 'http://localhost:8888/mypageInfomation',
				method : 'POST',
				data : formData,
				processData : false,
				contentType : false,
				success : function(data) {
					//alert(data);
					console.log("성공했니???~~~~~~~~~~~~~~");
					console.log(data);

				},
				error : function(data, status, err) {
					//arert('error');
					console.log(data);
				}
			});
		}

	});
</script>

<script>
	/**이벤트 발생 (크롬,파이어폭스,사파이어 OK!) **/
	function eventOccur(evEle, evType) {
		if (evEle.fireEvent) {
			evEle.fireEvent('on' + evType);
		} else {
			//MouseEvents가 포인트 그냥 Events는 안됨~ ??
			var mouseEvent = document.createEvent('MouseEvents');
			/* API문서 initEvent(type,bubbles,cancelable) */
			mouseEvent.initEvent(evType, true, false);
			var transCheck = evEle.dispatchEvent(mouseEvent);
			if (!transCheck) {
				//만약 이벤트에 실패했다면
				console.log("클릭 이벤트 발생 실패!");
			}

		}
	}
	/** 대체버튼 클릭시 강제 이벤트 발생**/
	function inpufilecheck() {
		eventOccur(document.getElementById('pfile'), 'click');
		/* alert(orgFile.value); 이벤트 처리가 끝나지 않은 타이밍이라 값 확인 안됨! 시간차 문제 */
	}

	//프로필 사진 수정
	function setImage() {

		console.log("setImage called.");

		var file = document.querySelector('#pfile');
		var fileList = file.files;

		//console.log(file.files);

		var reader = new FileReader();
		reader.readAsDataURL(fileList[0]);

		reader.onload = function() {
			document.querySelector('#preview').src = reader.result;
		};

		/* function insertData() { */
		console.log("insert function called!");

		var formData = new FormData($("#profile-update")[0]);
		$.ajax({
			url : 'http://localhost:8888/insertProfile',
			method : 'POST',
			data : formData,
			processData : false,
			contentType : false,
			success : function(data) {
				// 프로필 사진 뜨는부분 변경
				$('#profile-photo').attr("src", "/resources/userImage/" + data);
				$('#newseed-uinfo-img').attr("src",
						"/resources/userImage/" + data);

				console.log(data);
			},
			error : function(data, status, err) {
				console.log(data);
			}
		});
	}
		
	// 전화번호 및 이메일 정보 수정
	function editUserInfo() {
		
		var formData = new FormData($("#mypage_form")[0]);
		
		$.ajax({
			url : 'http://localhost:8888/editUserInfo',
			method : 'POST',
			data : formData,
			processData : false,
			contentType : false,
			success : function() {
				alert("회원 정보 수정이 완료되었습니다.");
				reSetSession();
				
			},
			error : function(data, status, err) {
				console.log(data);
			}
		});
	}
	
	// 회원정보 수정 후 세션 재설정
	function reSetSession() {
		
		var user_id = "${sessionScope.user_id}";
		var sendData = {user_id: user_id};
	
		$.ajax({
			url : 'http://localhost:8888/reSetSession',
			method : 'POST',
			data : JSON.stringify(sendData),
			processData : false,
			contentType : 'application/json',
			success : function() {
				location.reload();
			},
			error : function(data, status, err) {
				console.log(data);
			}
		});
	}

	//비밀번호 변경시 비밀번호변경과 비밀번호확인이 같은지 확인	
	function checkPwd() {
		console.log("password function called!");

		var inputed = $("#mypage_password").val();
		var reinputed = $("#password_confirm").val();

		if (reinputed == "" && (inputed != reinputed || inputed == reinputed)) {
			$(".signupbtn").prop("disabled", true);
			$(".signupbtn").css("background-color", "#aaaaaa");
			$("#password_confirm").css("background-color", "#FFCECE");
		} else if (inputed == reinputed) {
			$("#password_confirm").css("background-color", "#B0F6AC");
			$('.signupbtn').removeAttr("disabled")
			$(".signupbtn").css("background-color", "#006600");
			$(".signupbtn").css("border", "none");
		} else if (inputed != reinputed) {
			$(".signupbtn").prop("disabled", true);
			$(".signupbtn").css("background-color", "#aaaaaa");
			$("#password_confirm").css("background-color", "#FFCECE");

		}
	}

	//비밀번호 변경시 저장
	function mypagePwdChange() {
		console.log("마이페이지 정보");
		var formData = new FormData($("#mypage_form")[0]);

		$.ajax({
			url : 'http://localhost:8888/mypagePwdChange',
			method : 'POST',
			data : formData,
			processData : false,
			contentType : false,
			success : function(data) {
				$("#mypage_password").val("");
				$("#password_confirm").val("");
				
				$("#password_confirm").css("background-color", "#FFFFFF");
				
				alert("비밀번호 변경 성공!");
			},
			error : function(data, status, err) {
				//arert('error');
				console.log(data);
			}
		});
	}

	//회원탈퇴
	function delUser() {

		var check = confirm("정말로 선귀당귀를 탈퇴하시겠습니까?");
		var user_id = document.getElementById("user_id").value;
		if (check) {
			console.log(user_id);
		} else {
			return false;
		}

		var allData = {
			user_id : user_id
		};

		$.ajax({
			url : 'http://localhost:8888/deleteUser',
			method : 'POST',
			data : JSON.stringify(allData),
			processData : false,
			contentType : 'application/json',
			success : function(data) {
				alert("탈퇴 완료되었습니다.\n그동안 이용해주셔서 감사합니다.");
				logout();
			},
			error : function(data, status, err) {
				console.log("error: " + data);
			}
		});
	}
	
	function inputPhoneNumber(obj) {

		var number = obj.value.replace(/[^0-9]/g, "");
		var phone = "";

		if (number.length < 4) {
			return number;
		} else if (number.length < 7) {
			phone += number.substr(0, 3);
			phone += "-";
			phone += number.substr(3);
		} else if (number.length < 11) {
			phone += number.substr(0, 3);
			phone += "-";
			phone += number.substr(3, 3);
			phone += "-";
			phone += number.substr(6);
		} else {
			phone += number.substr(0, 3);
			phone += "-";
			phone += number.substr(3, 4);
			phone += "-";
			phone += number.substr(7);
		}
		obj.value = phone;
	}
</script>

</head>
<body>

	<div class="ossn-page-loading-annimation">
		<div class="ossn-page-loading-annimation-inner">
			<div class="ossn-loading"></div>
		</div>
	</div>

	<div class="ossn-halt ossn-light"></div>
	<div class="ossn-message-box"></div>
	<div class="ossn-viewer" style="display: none"></div>

	<div class="opensource-socalnetwork">
		<div class="sidebar sidebar-close">
			<div class="sidebar-contents">
				<div id="newseed-uinfo" class="newseed-uinfo">
					<img id="newseed-uinfo-img" style="margin-top: 5px;"
						src="resources/img/default-user-icon-11.jpg">
					<div class="name" style="width: 150px">
						<br>
						<div id="user-department-info" name="user-department-info"
							style="font-weight: bold; display: block; color: #fff; font-size: 16px"></div>
						<div id="user-name-info" name="user-name-info"
							style="font-weight: bold; display: block; color: #fff; font-size: 16px"></div>
					</div>
				</div>
				<div class="sidebar-menu-nav">
					<div id="sidebar-menu" name="sidebar-menu" class="sidebar-menu">
						<ul id="menu-content" class="menu-content collapse out">
							<li><a class="" href="http://localhost:8888/notice"><i
									class="fa fa-bullhorn fa-lg"></i>홍보공간</a></li>
						
							<li><a class="" href="http://localhost:8888/newsFeed"><i
									class="fa fa-comments fa-lg"></i>소통공간</a></li>
									
							<li><a class="" href="http://localhost:8888/fleaMarket"><i
									class="fa fa-shopping-cart fa-lg"></i>플리마켓</a></li>

							<!-- <li data-toggle="collapse" data-target="#1234"
								class="menu-section-extra active collapsed" aria-expanded="true"><a
								class="" href="javascript:void(0);"><i
									class="fa fa-plus fa-lg"></i>부가기능<span class="arrow"></span></a></li>
							<ul class="sub-menu collapse" id="1234" aria-expanded="true"
								style="height: 0px;">
								<li class="menu-section-item-bus">
									<a class="menu-section-item-a-bus" href="http://localhost:8888/bus">한국생활 꿀팁</a>
								</li>
								<li class="menu-section-item-university">
									<a class="menu-section-item-a-university" href="http://lily.sunmoon.ac.kr/MainDefault.aspx">여러 사이트 모음</a>
								</li>
							</ul> -->
							
							<li data-toggle="collapse"
								data-target="#1471e4e05a4db95d353cc867fe317314"
								class="menu-section-groups active collapsed"
								aria-expanded="false"><a class=""
								href="javascript:void(0);"><i class="fa fa-plus fa-lg"></i>부가기능<i class="fa fa-angle-down fa-lg" style="float:right; margin-top:10px"></i></a></li>
							<ul class="su-menu collapse"
								id="1471e4e05a4db95d353cc867fe317314" aria-expanded="false"
								style="height: 0px;">
								<li data-toggle="collapse" data-target="#1111"
									class="menu-section-links active in collapsed"
									aria-expanded="false"><a href="http://localhost:8888/tips"><i
										class="fa fa-lightbulb-o fa-lg"></i>한국생활 꿀팁</a></li>
								<li data-toggle="collapse" data-target="#2222"
									class="menu-section-links active in collapsed"
									aria-expanded="false"><a class=""
									href="javascript:void(0);"><i
										class="fa fa-link"></i>유용한 사이트 링크<i class="fa fa-angle-down fa-lg" style="float:right; margin-top:10px"></i></a></li>
								<ul class="sub-sub-menu collapse" id="2222"
									aria-expanded="false" style="height: 0px;">
									<li class="menu-section-item-friends"><a
										class="menu-section-item-a-friends"
										href="https://www.asan.go.kr/news/">아산시청</a></li>
									<li class="menu-section-item-friends"><a
										class="menu-section-item-a-friends"
										href="https://www.asan.go.kr/tour/main/">아산문화관광</a></li>
									<li class="menu-section-item-friends"><a
										class="menu-section-item-a-friends"
										href="http://www.liveinkorea.kr/center/main/main.do?centerId=asansi">아산다문화가족지원센터</a></li>
									<li class="menu-section-item-friends"><a
										class="menu-section-item-a-friends"
										href="https://eps.hrdkorea.or.kr/e9/index.do?method=index">EPS 외국인고용지원</a></li>
									<li class="menu-section-item-friends"><a
										class="menu-section-item-a-friends"
										href="https://www.liveinkorea.kr/portal/main/intro.do">다누리(다문화가족지원포털)</a></li>
								</ul>
							</ul>

							<li><a class="" href="http://localhost:8888/mypage"><i
									class="fa fa-user fa-lg"></i>마이페이지</a></li>
					</div>
				</div>
				<form id=user-info name=user-info>
					<!-- 유저정보 들어감니다~_~ -->
					<!-- <input type="hidden" id="user_id" name="user_id" value="">  -->
					<input type="hidden" id="user_name" name="user_name" value="">
					<input type="hidden" id="user_img" name="user_img"
						value="resources/img/default-user-icon-11.jpg">
				</form>
				<br>
			</div>
		</div>
		<div class="ossn-page-container">
			<!-- ossn topbar -->
			<div class="topbar">
				<div class="container">
					<div class="row">
						<div class="col-md-2 left-side left">
							<div class="topbar-menu-left">
								<li id="sidebar-toggle" data-toggle='0'><a role="button"
									data-target="#"> <i class="fa fa-th-list"></i></a></li>
							</div>
						</div>
						<div class="col-md-7 site-name text-center hidden-xs hidden-sm">
							<span><a href="http://localhost:8888/newsFeed">😄 S.U.M Community 😄</a></span>
						</div>
						<div class="col-md-3 text-right right-side">
							<div class="topbar-menu-right">
								<ul>
									<li class="ossn-topbar-dropdown-menu">
										<div class="dropdown">
											<a role="button" data-toggle="dropdown" data-target="#"><i
												class="fa fa-sort-desc"></i></a>
											<ul class="dropdown-menu multi-level" role="menu"
												aria-labelledby="dropdownMenu">
												<li><a class="menu-topbar-dropdown-account_settings"
													href="http://localhost:8888/mypage">프로필 수정</a></li>
												<li><a class="menu-topbar-dropdown-logout2"
													onclick="javascript:logout()">로그아웃</a></li>
											</ul>
										</div>
									</li>
									<!-- <li id="ossn-notif-friends"><a
										onClick="Ossn.NotificationFriendsShow(this);"
										class="ossn-notifications-friends" href="javascript:void(0);">
											<span> <span
												class="ossn-notification-container hidden"></span>
												<div class="ossn-icon ossn-icons-topbar-friends">
													<i class="fa fa-users"></i>
												</div>
										</span>
									</a></li> -->
									<li id="ossn-notif-messages"><a href="#"
										onclick="window.open('http://localhost:8888/Msg', 'msgList', 'resizable=no width=800px height=500px');return false"
										class="ossn-notifications-messages" role="button"
										data-toggle="dropdown"> <span> <span
												class="ossn-notification-container hidden"></span>
												<div class="ossn-icon ossn-icons-topbar-messages">
													<i class="fa fa-envelope"></i>
												</div>
										</span>
									</a></li>

									<!-- <li id="ossn-notif-notification"><a
										href="javascript:void(0);"
										onClick="Ossn.NotificationShow(this)"
										class="ossn-notifications-notification"
										onClick="Ossn.NotificationShow(this)" role="button"
										data-toggle="dropdown"> <span> <span
												class="ossn-notification-container hidden"></span>
												<div class="ossn-icon ossn-icons-topbar-notification">
													<i class="fa fa-globe"></i>
												</div>
										</span>
									</a></li> -->
									<div class="dropdown">
										<div
											class="dropdown-menu multi-level dropmenu-topbar-icons ossn-notifications-box">
											<div class="selected"></div>
											<div class="type-name">Notifications</div>
											<div class="metadata">
												<div style="height: 66px;">
													<div class="ossn-loading ossn-notification-box-loading"></div>
												</div>
												<div class="bottom-all">
													<a href="#">See All</a>
												</div>
											</div>
										</div>
									</div>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- ./ ossn topbar -->
			<div class="ossn-inner-page">
				<div class="container">
					<div class="row">
						<div class="ossn-layout-contents">
							<div class="ossn-system-messages">
								<div class="row">
									<div class="col-md-11 ossn-system-messages-inner"></div>
								</div>
							</div>
							<div class="ossn-profile container">
								<div class="row">
									<div class="col-md-11">
										<div class="ossn-profile">
											<div class="top-container">
												<div id="container" class="profile-cover">
													<div class="profile-cover-controls" style="display: none">
														<a href="javascript:void(0);"
															onclick="Ossn.Clk('.coverfile');"
															class='btn-action change-cover'> Change Cover </a> <a
															href="javascript:void(0);" id="reposition-cover"
															class='btn-action reposition-cover'> Reposition </a>
													</div>
													<form id="upload-cover" style="display: none;"
														method="post" enctype="multipart/form-data"
														style="display: none">
														<input type="file" name="coverphoto" class="coverfile"
															onchange="Ossn.Clk('#upload-cover .upload');" /> <input
															type="hidden" name="ossn_ts" value="1542354882" /> <input
															type="submit" name="ossn_token"
															value="8828f01c95a16becdc858ec731af20b2" /> <input
															type="submit" class="upload" />
													</form>
													<img id="draggable" class="profile-cover-img"
														src="resources/img/backgreen.png"
														style='top: -104px; left: 0px;' />
												</div>

												<div class="profile-photo">
													<img id="profile-photo"
														src="resources/img/default-user-icon-11.jpg"
														name="preview" id="preview" height="170" width="170"
														onclick="Ossn.Viewer('photos/viewer?user=administrator');" />
												</div>

												<div id="user-fullname" class="user-fullname">
													<a id="user-name-area" style="margin-left: 10px;"></a>
													<div>
														<form id="profile-update" method="post" enctype="multipart/form-data">
															<input type="file" name="pfile" id="pfile" style="display: none" 
																onchange='javascript:setImage()' value="" /> 
															<input type="hidden" id="user_id" name="user_id" value="">
															<input type="button" name="profile_upload" class="btn btn-primary"
																value="프로필 사진 변경하기" onclick="inpufilecheck()" style="margin-top: 10px;" />
														</form>
													</div>
												</div>

												<div id="profile-menu" class="profile-menu"
													style="display: none">
													<a
														href="https://demo.opensource-socialnetwork.org/u/administrator/edit"
														class='btn-action'> Update Info </a>
												</div>
												<div id="cover-menu" class="profile-menu">
													<a href="javascript:void(0);"
														onclick="Ossn.repositionCOVER();" class='btn-action'>
														Save Position </a>
												</div>
											</div>

										</div>
									</div>
								</div>
								<div class="row ossn-profile-bottom">
									<div class="col-md-11">
										<div class="ossn-layout-module">
											<div class="module-title">
												<div class="title">회원정보</div>
												<div class="controls"></div>
											</div>
											<div class="module-contents">
												<form id="mypage_form"
													action="https://demo.opensource-socialnetwork.org/action/profile/edit"
													class="ossn-form ossn-edit-form" method="post"
													enctype='multipart/form-data'>
													<fieldset>
														<input type="hidden" name="ossn_ts" value="1542354882" />
														<input type="hidden" name="ossn_token"
															value="8828f01c95a16becdc858ec731af20b2" />
														<div>
															<input type='hidden' id="mypage_id" name="mypage_id" value="" />
														</div>
														<div>
															<label> 이름 </label> <input type='text' id="mypage_name"
																name="mypage_name" value="" disabled />
														</div><br>
														<div>
															<label> 전화번호</label>
															<input type="text" id="mypage_tel" name="mypage_tel" 
																	maxlength="13" onKeyup="inputPhoneNumber(this);" value=""  />
														</div><br>
														<div>
															<label> 이메일</label>
															<input type="text" id="mypage_email" name="mypage_email" value="" />
														</div><br>
														<div>
															<input type="button" id="editInfoBtn" onclick="editUserInfo()" 
																   class="btn btn-primary" value="정보수정하기" />
														</div>
														<br><br>
														<div>
															<label> 신규비밀번호 </label> <input type='password'
																id="mypage_password" name="mypage_password"
																oninput="checkPwd()" />
														</div><br>
														<div>
															<label> 비밀번호확인 </label> <input type='password'
																id="password_confirm" name="password_confirm"
																oninput="checkPwd()" />
														</div><br>
														<div>
															<input type="button" id="passwordChange"
																name="passwordChange" value="비밀번호변경"
																class="btn btn-primary signupbtn"
																onclick="mypagePwdChange()" />
														</div>
														<br>
														<div>
															<!-- <label> 소속학과 </label> 
																<input type='text' id="mypage_department" name="mypage_department" value="" readonly /> --> 
																<input type='button' id="deleteUser" name="deleteUser" class="btn btn-primary"
																style="float: right;" onclick="delUser()" value="회원탈퇴" />
														</div>
														<!-- <input type="hidden" value="administrator" name="username" /> -->

													</fieldset>
												</form>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<footer>
					<div class="col-md-11">
						<div class="footer-contents">
							<div class="ossn-footer-menu">
								<a class="menu-footer-a_copyrights"
									href="https://demo.opensource-socialnetwork.org/">&copy;
									COPYRIGHT Open Source Social Network Demo</a><a
									class="menu-footer-about"
									href="https://demo.opensource-socialnetwork.org/site/about">About</a><a
									class="menu-footer-site"
									href="https://demo.opensource-socialnetwork.org/site/terms">Terms
									and Conditions</a><a class="menu-footer-privacy"
									href="https://demo.opensource-socialnetwork.org/site/privacy">Privacy</a><a
									class="menu-footer-powered"
									href="https://www.opensource-socialnetwork.org/">Powered by
									the Open Source Social Network.</a>
							</div>
						</div>
					</div>
					</footer>

				</div>
			</div>
		</div>
	</div>
	<!-- <div class="ossn-chat-base hidden-xs hidden-sm">
		<div class="ossn-chat-bar">
			<div class="friends-list">

				<div class="ossn-chat-tab-titles">
					<div class="text">Chat</div>
				</div>

				<div class="data">
					<div class="ossn-chat-none">No friends online</div>
				</div>
			</div>
			<div class="inner friends-tab">
				<div class="ossn-chat-icon">
					<div class="ossn-chat-inner-text ossn-chat-online-friends-count">
						Chat (<span>0</span>)
					</div>
				</div>
			</div>

		</div>

		<div class="ossn-chat-containers"></div>
	</div>
	<div class="ossn-chat-windows-long">
		<div class="inner">
			<div class="ossn-chat-none">No friends online</div>
			<script>Ossn.ChatBoot();</script>
		</div>
	</div> -->

</body>
</html>