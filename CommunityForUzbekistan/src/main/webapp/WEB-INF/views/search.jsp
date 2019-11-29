<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
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
	function privacyShow() {
		document.getElementById("ossn-message-box").style.display = "block";
	}
</script>

<title>SGDG : Search</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="shortcut icon" href="/ssun/resources/img/SGDG_favicon_96x96.png">

<!-- <script type="text/javascript" async="" defer="" src="./News Feed _ OSSN Demo_files/piwik.js"></script>
<script async="" src="./News Feed _ OSSN Demo_files/analytics.js"></script>
<script src="./News Feed _ OSSN Demo_files/ARf53_7CZrph6eMZGwgXpTF2-tk.js"></script> -->
<link rel="stylesheet" type="text/css" href="/resources/css/bootstrap.min.css">
<link rel="stylesheet" type="text/css" href="/resources/css/ossn.default.css">
<script type="text/javascript" src="/resources/js/ossn.en.language.js"></script>
<script type="text/javascript" src="/resources/js/jquery-1.11.1.min.js"></script>
<script type="text/javascript" src="/resources/js/jquery-ui.min.js"></script>
<!-- <script type="text/javascript" src="./News Feed _ OSSN Demo_files/jquery-arhandler-1.1-min.js"></script> -->
<script type="text/javascript" src="/resources/js/jquery.scrolling.js"></script>
<script type="text/javascript" src="/resources/js/places.min.js"></script>
<script type="text/javascript" src="/resources/js/jquery.tokeninput.js"></script>
<script type="text/javascript" src="/resources/js/sunmoon.socialnetwork_search.js"></script>
<script type="text/javascript" src="/resources/js/opensource.socialnetwork.js"></script>
<script type="text/javascript" src="/resources/js/ossn.chat.js"></script>
<link rel="stylesheet" type="text/css" href="/resources/css/font-awesome.min.css">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
<!-- <link rel="stylesheet" type="text/css" href="./News Feed _ OSSN Demo_files/css"> -->
<script type="text/javascript" src="/resources/js/bootstrap.min.js"></script>
<link rel="stylesheet" type="text/css" href="/resources/css/jquery-ui.css">
   <!-- 20181120 민정추가  -->
<script type="text/javascript" src="/resources/js/sunmoon.socialnetwork.common.js"></script>

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
	

	function setUserInfo() {
		var txt="";
		//var user_dep = "${sessionScope.department}";
		var user_name = "${sessionScope.user_name}";
		var user_id = "${sessionScope.user_id}";
		var user_img = "${sessionScope.user_img}";
		
		console.info("--user_img: " + user_img);
		console.info("--user_dep: " + user_dep);
		
		/* if(user_dep == "Admin") {
			document.getElementById("user-department-info").innerHTML = "선문대 귀는 당나귀 귀";
		} else {
			checkDepartment(user_dep);
		} */
		
		//document.getElementById("user_dep").value = user_dep;
		document.getElementById("user-name-info").innerHTML = user_name;
		document.getElementById("user_id").value = user_id;
		document.getElementById("user_img").value = user_img;
		
		if(user_img=="" || user_img==null) {
			var url = "resources/img/e3852c91cacea4a823e607cccccb29c2.jpeg";
			/* document.getElementById("user-profile-img").attr("src", url); */
			$('#user-profile-img').attr("src", url);
		} else {
			var url = "resources/userImage/" + user_img;
			/* document.getElementById("user_img").attr("src", url); */
			$('#user-profile-img').attr("src", url);
		}
		
		
		/* document.getElementById("user-activity").innerHTML = txt; */
	}
	
	function checkDepartment(dep_code) {
		var depCode = {dep_code: dep_code};
		
		$.ajax({
	         url : 'http://localhost:8888/checkDepartment',
	         method : 'POST',
	         data : JSON.stringify(depCode),
	         processData : false,
	         contentType : 'application/json',
	         success : function(data) {
	        	console.log("학과: " + data);
	        	document.getElementById("user-department-info").innerHTML = data;
	         },
	         error : function(data, status, err) {
	            console.log("error: " + data);
	         }
	      });
	}
	
	function logout(){
	      console.log("logout called!");
	      
	      var user_id  = ${sessionScope.user_id};
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
	         
	         },
	         error : function(data, status, err) {
	            //alert('error');
	            console.log("error: " + data);
	         }
	      });         
	      
	   }
	   console.log("뉴스피드 user_id: " + "${sessionScope.user_id}");
	   console.log("password: " + "${sessionScope.password}");
	   
</script>

</head>

<body>
	<div class="ossn-page-loading-annimation" style="display: none;">
		<div class="ossn-page-loading-annimation-inner">
			<div class="ossn-loading"></div>
		</div>
	</div>

	<div class="ossn-halt"></div>
	
<!-- 쪽지 보내기 -->
  <div name="ossn-message-box-send-msg" id="ossn-message-box-send-msg" class="ossn-message-box-send-msg" style="display: none;">
      <div class="title">
         쪽지 보내기
         <div class="close-box" onclick="PostMessageBoxClose();">X</div>
      </div>
      <div class="contents">
         <div class="ossn-box-inner">
            <div style="width: 100%; margin: auto;">
               <form id="ossn-msg-send-form" name="ossn-msg-send-form"
                  action="https://demo.opensource-socialnetwork.org/action/wall/post/edit"
                  enctype="multipart/form-data">
                  <fieldset>
                     <div id="send-post-popup">
                      
                           <input class="title_name" id="title_name" value="제목" disabled="disabled" style="height:36px; ">
                           <input type="text" class="title_input" id="title_input" name="title_input" value="" style="width: 398px">
                           
                           <textarea id="post-send-msg" name="post-send-msg" class="post-send-msg" 
                              placeholder="내용을 입력해주세요"></textarea>
                     </div>
                  </fieldset>
               </form>
               
            </div>
         </div>
      </div>
      <div class="control">
         <div class="controls">
            <a href="javascript:send()" onclick="" class="btn btn-primary">보내기</a>
            <a href="javascript:void(0);" onclick="PostMessageBoxClose();"
               class="btn btn-default">취소</a>
         </div>
      </div>
   </div>
 <!-- ===================================================================== -->	
	
 <!-- ===================================================================== -->
 	<!-- 글 수정 창 -->
	<div class="ossn-message-box-edit-post" style="display: none;">
		<div class="title">
			글 수정
			<div class="close-box" onclick="PostMessageBoxClose();">X</div>
		</div>
		<div class="contents">
			<div class="ossn-box-inner">
				<div style="width: 100%; margin: auto;">
					<form
						action="https://demo.opensource-socialnetwork.org/action/wall/post/edit"
						id="ossn-post-edit-form" class="ossn-form" method="post"
						enctype="multipart/form-data">
						<fieldset>
							<input type="hidden" name="ossn_ts" value="1542761066"> <input
								type="hidden" name="ossn_token"
								value="efd4a6afca12570625628c4ca9aa670a">
							<div id="edit-post-popup">
							</div>
						</fieldset>
					</form>
				</div>
			</div>
		</div>
		<div class="control">
			<div class="controls">
				<a href="javascript:editPost();"
					onclick="<!-- Ossn.Clk('#ossn-post-edit-save'); -->" class="btn btn-primary">저장</a>
				<a href="javascript:void(0);" onclick="PostMessageBoxClose();"
					class="btn btn-default">취소</a>
			</div>
		</div>
	</div>
	
	<!-- 댓글 수정 창 -->
	<div class="ossn-message-box-edit-comment" style="display: none;">
		<div class="title">
			댓글 수정
			<div class="close-box" onclick="CommentMessageBoxClose();">X</div>
		</div>
		<div class="contents">
			<div class="ossn-box-inner">
				<div style="width: 100%; margin: auto;">
					<form
						action="https://demo.opensource-socialnetwork.org/action/wall/post/edit"
						id="ossn-post-edit-form" class="ossn-form" method="post"
						enctype="multipart/form-data">
						<fieldset>
							<input type="hidden" name="ossn_ts" value="1542761066"> <input
								type="hidden" name="ossn_token"
								value="efd4a6afca12570625628c4ca9aa670a">
							<div id="edit-comment-popup">
								<!-- <textarea id="post-edit" name="post">test</textarea>
								<input type="hidden" name="guid" value="89"> <input
									type="submit" class="hidden" id="ossn-post-edit-save"> -->
							</div>
						</fieldset>
					</form>
				</div>
			</div>
		</div>
		<div class="control">
			<div class="controls">
				<a href="javascript:editComment();"
					onclick="<!-- Ossn.Clk('#ossn-post-edit-save'); -->" class="btn btn-primary">저장</a>
				<a href="javascript:void(0);" onclick="CommentMessageBoxClose();"
					class="btn btn-default">취소</a>
			</div>
		</div>
	</div>
 <!-- ===================================================================== -->
	<div class="ossn-viewer" style="display: none"></div>

	<div class="opensource-socalnetwork">
		<div class="sidebar sidebar-close">
			<div class="sidebar-contents">
				<div id="newseed-uinfo" class="newseed-uinfo">
					<img id="user-profile-img" src="">
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
									
							<li><a class="" href="http://localhost:8888/newsFeed?dep=F"><i
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
				<br>
			</div>
		</div>
		<div class="ossn-page-container sidebar-close-page-container">
			<!-- ossn topbar -->
			<div class="topbar">
				<div class="container">
					<div class="row">
						<div class="col-md-1 left-side left">
							<div class="topbar-menu-left">
								<li id="sidebar-toggle" data-toggle="0"><a
									class="sidebar-toggle" role="button" data-target="#"> <i
										class="fa fa-th-list"></i></a></li>
							</div>
						</div>
						<div class="col-md-4 mainTl-site-name text-center hidden-xs hidden-sm">
							<span><a href="http://localhost:8888/newsFeed" style="margin">😄 S.U.M Community 😄</a></span>
						</div>
						<div>
						<div class="col-md-5">
							<select id="search-type" name="search-type" class="search-type" style="">
								<option value="search-writing">글 내용</option>
								<option value="search-user">사용자</option>
							</select>
							<input type="text" id="search-page-area" name="search-page-area" class="search-page-area" placeholder="Search" value="" onkeydown="javascript:search()">
						</div>
						</div>
						<div class="col-md-2 text-right right-side right-side-nospace">
							<div class="topbar-menu-right">
								<li class="ossn-topbar-dropdown-menu">
									<div class="dropdown">
										<a role="button" data-toggle="dropdown" data-target="#"><i
											class="fa fa-sort-desc"></i></a>
										<ul class="dropdown-menu multi-level" role="menu"
											aria-labelledby="dropdownMenu">
											<li><a class="menu-topbar-dropdown-account_settings"
												href="https://demo.opensource-socialnetwork.org/u/administrator/edit">프로필 수정</a></li>
											<li><a class="menu-topbar-dropdown-logout2" onclick="javascript:logout()">로그아웃</a></li>
										</ul>
									</div>
								</li>
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
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- ./ ossn topbar -->
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
									<input type="hidden" id="user_dep" name="user_dep" value="">
									<input type="hidden" id="user_id" name="user_id" value="">
									<input type="hidden" id="user_img" name="user_img" value="">
									<input type=hidden id="calledNum_search" value="1">
									<p id="search-result" class="search-result"></p>
									<div id="user-activity-search" class="user-activity-search">
									</div>
								</div>
							</div>
							<div class="col-md-4">
								<div class="newsfeed-right">
									<style>
										.download-section {
											text-align: center;
										}
										
										.text-download-m {
											text-align: justify
										}
										
										.stars-download {
											display: block;
										}
										
										.stars-download .fa {
											color: #f9db29;
											margin-right: 5px;
										}
										
										.title-download {
											font-size: 20px;
											font-weight: bold;
											text-align: center;
											text-transform: uppercase;
											color: #676565
										}
										
										.download-section {
											text-align: center
										}
										
										.spacing-download {
											margin-top: 35px
										}
										.
									</style>
									<div class="widget-heading" style="margin-bottom: 10px;">공지사항</div>
									<div id="notice-area-right" name="notice-area-right">
										<br>
									</div>
								</div>
								<div class="newsfeed-right">
									<style>
										.download-section {
											text-align: center;
										}
										
										.text-download-m {
											text-align: justify
										}
										
										.stars-download {
											display: block;
										}
										
										.stars-download .fa {
											color: #f9db29;
											margin-right: 5px;
										}
										
										.title-download {
											font-size: 20px;
											font-weight: bold;
											text-align: center;
											text-transform: uppercase;
											color: #676565
										}
										
										.download-section {
											text-align: center
										}
										
										.spacing-download {
											margin-top: 35px
										}
										.
									</style>
									<div class="widget-heading" style="margin-bottom: 10px;">오늘의 좋아요 많은 글 TOP3</div>
									<div id="best-post-like-area-right" name="notice-area-right">
										<br>
									</div>
								</div>
								<div class="newsfeed-right">
									<style>
										.download-section {
											text-align: center;
										}
										
										.text-download-m {
											text-align: justify
										}
										
										.stars-download {
											display: block;
										}
										
										.stars-download .fa {
											color: #f9db29;
											margin-right: 5px;
										}
										
										.title-download {
											font-size: 20px;
											font-weight: bold;
											text-align: center;
											text-transform: uppercase;
											color: #676565
										}
										
										.download-section {
											text-align: center
										}
										
										.spacing-download {
											margin-top: 35px
										}
										.
									</style>
									<div class="widget-heading" style="margin-bottom: 10px;">오늘의 댓글 많은 글 TOP3</div>
									<div id="best-post-area-comment-right" name="notice-area-right">
										<br>
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
										href="https://demo.opensource-socialnetwork.org/">©
										COPYRIGHT OSSN Demo</a><a class="menu-footer-about"
										href="https://demo.opensource-socialnetwork.org/site/about">About</a><a
										class="menu-footer-site"
										href="https://demo.opensource-socialnetwork.org/site/terms">Terms
										and Conditions</a><a class="menu-footer-privacy"
										href="https://demo.opensource-socialnetwork.org/site/privacy">Privacy</a><a
										class="menu-footer-powered"
										href="https://www.opensource-socialnetwork.org/"
										style="color: rgb(128, 125, 125) !important;">Powered by
										the Open Source Social Network.</a>
								</div>
							</div>
						</div>
					</footer>
				</div>
			</div>
		</div>
	</div>

	<script type="text/javascript">
		var _paq = _paq || [];
		/* tracker methods like "setCustomDimension" should be called before "trackPageView" */
		_paq.push([ 'trackPageView' ]);
		_paq.push([ 'enableLinkTracking' ]);
		(function() {
			var u = "//analytic.softlab24.com/";
			_paq.push([ 'setTrackerUrl', u + 'piwik.php' ]);
			_paq.push([ 'setSiteId', '2' ]);
			var d = document, g = d.createElement('script'), s = d
					.getElementsByTagName('script')[0];
			g.type = 'text/javascript';
			g.async = true;
			g.defer = true;
			g.src = u + 'piwik.js';
			s.parentNode.insertBefore(g, s);
		})();
	</script>


	<div class="token-input-dropdown" style="display: none;"></div>



</body>
</html>