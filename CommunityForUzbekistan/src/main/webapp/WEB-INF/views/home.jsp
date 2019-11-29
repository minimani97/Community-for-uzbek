<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<html>
<head>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<title>SGDG :D</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="shortcut icon" href="/ssun/resources/img/SGDG_favicon_96x96.png">

<!-- 
	Open Source Social Network (Ossn) https://www.opensource-socialnetwork.org/     
	BY Informatikon Technologies (http://informatikon.com/)
	BY SOFTLAB24 (https://www.softlab24.com/)
	-->
<script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
<script type="text/javascript" async="" defer="" src="./ossn_login_files/piwik.js"></script>
<!-- <script async="" src="./ossn_login_files/analytics.js"></script>
<script src="./ossn_login_files/ARf53_7CZrph6eMZGwgXpTF2-tk.js"></script> -->
<link rel="stylesheet" type="text/css" href="resources/css/bootstrap.min.css">
<link rel="stylesheet" type="text/css" href="resources/css/ossn.default.css">
<!-- <script type="text/javascript" src="./ossn_login_files/ossn.en.language.js"></script>
<script type="text/javascript" src="./ossn_login_files/jquery-1.11.1.min.js"></script>
<script type="text/javascript" src="./ossn_login_files/jquery-ui.min.js"></script>
<script type="text/javascript" src="./ossn_login_files/jquery-arhandler-1.1-min.js"></script>
<script type="text/javascript" src="./ossn_login_files/jquery.scrolling.js"></script>
<script type="text/javascript" src="./ossn_login_files/opensource.socialnetwork.js"></script> -->
<link rel="stylesheet" type="text/css" href="resources/css/font-awesome.min.css">
<!-- <link rel="stylesheet" type="text/css" href="./ossn_login_files/css">
<script type="text/javascript" src="./ossn_login_files/bootstrap.min.js"></script> -->
<!-- <link rel="stylesheet" type="text/css" href="./ossn_login_files/jquery-ui.css"> -->

<!-- 20181120 민정추가  -->
<script type="text/javascript" src="resources/js/sunmoon.socialnetwork.common.js"></script>

<script>
	Ossn.site_url = 'https://demo.opensource-socialnetwork.org/';
	Ossn.Config = {
		"token" : {
			"ossn_ts" : 1541650559,
			"ossn_token" : "3531a51ec5c0178df93840d4a69feae6"
		}
	};
	Ossn.Init();	

	function LoginCheck() {
		console.log("LoginCheck called!");
		
		// 1. Validation Check.
	    var emptyName = document.forms["ossn-login"]["id"].value;
	    var emptyPw   = document.forms["ossn-login"]["password"].value;
	    if (emptyName == "") {
	        alert("학번을 입력해주세요!");
	        return false;
	    }
	    if (emptyPw == "") {
	        alert("비밀번호를 입력해주세요!");
	        return false;
	    }
	   
	   // 2. Form Data Send
		var formData = new FormData($("#ossn-login")[0]);
	   
		$.ajax({
			url : 'http://localhost:8888/login',
			method : 'POST',
			data : formData,
			processData : false,
			contentType : false,
			success : function(data) {
				//alert(data);
				console.log("success data: "+JSON.stringify(data));
/*  			console.log("success data: "+data);
				console.log("에이젝스!!!!!!!!!!!!!!!user_num: "+data.user_num);
				console.log("에이젝스!!!!!!!!!!!!!!!password: "+data.password); */
				if (data.id == 0) {
			        alert("해당 회원이 존재하지 않습니다!");
			        return false;
			    }

				if(data.id == emptyName && data.password == emptyPw){
					console.log("===============일치해==============");
					window.location.href = "http://localhost:8888/newsFeed";
					//alert("로그인성공\n" + ${sessionScope.user_num} +" 님 환영합니다.");
					
					/* if(data.certify == 'y'){
						console.log("===============일치해==============");
						//console.log("세션 값!!!!!!!!!!!!!!!!!!: " + ${sessionScope.user_num});
						window.location.href = "http://localhost:8090/ssun/newsFeed";
						//alert("로그인성공\n" + ${sessionScope.user_num} +" 님 환영합니다.");
					}else if(data.certify == 'b'){
						alert("차단된 사용자입니다.");
					}else{
						alert("메일인증을 완료해주세요.");
					} */
					
				} else{
					alert("아이디와 비밀번호를 다시 확인해주세요!");
				}
				
			},
			error : function(data, status, err) {
				//alert('error');
				console.log("error: " + data);
			}
		});	    

	}
	
	function MemberCheck() {
		console.log("MemberCheck called!");
	}	
	
	
</script>
</head>

<body>
	<div class="ossn-page-loading-annimation" style="display: none;">
		<div class="ossn-page-loading-annimation-inner">
			<div class="ossn-loading"></div>
		</div>
	</div>

	<div class="ossn-halt ossn-light"></div>
	<div class="ossn-message-box"></div>
	<div class="ossn-viewer" style="display: none"></div>

	<div class="opensource-socalnetwork">
		<div class="ossn-page-container">
			<!-- ossn topbar -->
			<div class="topbar">
				<div class="container">
					<div class="row">
						<div class="col-md-2 left-side left"></div>
						<div class="col-md-7 site-name text-center ">
							<span><a href="http://localhost:8888/">😄 S.U.M Community 😄</a></span>
						</div>
						<div class="col-md-3 text-right right-side">
							<div class="topbar-menu-right">
								<li class="ossn-topbar-dropdown-menu">
									<div class="dropdown"></div>
								</li>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- ./ ossn topbar -->
			<div class="ossn-inner-page">
				<div class="ossn-layout-startup">
					<div class="container">
						<div class="row">
							<div class="ossn-system-messages">
								<div class="row">
									<div class="col-md-11 ossn-system-messages-inner"></div>
								</div>
							</div>
							<div class="ossn-home-container">
								<div class="inner">
									<div class="row">
										<div class="col-md-6 col-center ossn-page-contents">

											<div class="logo">
												<img src="resources/img/logo.png" width="375" height="160" style="margin-top:20px;">
											</div>
											<br>
											<br>
											<div class="description" style="margin-top:0px;">환영합니다! 아산시 신창면의 우즈베키스탄인들의 한국 적응과 소통을 위한 커뮤니티입니다:)</div>
											<br>
											<br>
											<br>
											<div class="ossn-widget ">
												<!-- <div class="widget-heading">Login</div> -->
												<div class="widget-contents">
												
													<form id="ossn-login" name="ossn-login" class="ossn-form"  action="/ssns/login"									
													      method="get">
														<fieldset>
															
															<input type="hidden" name="ossn_ts"    value="1541650559">
															<input type="hidden" name="ossn_token" value="3531a51ec5c0178df93840d4a69feae6">
															
															<div>
																<label>아이디</label> <input type="text"
																	name="id" value="" onkeyup="enterkey();">
															</div>

															<div>
																<label>비밀번호</label> <input type="password"
																	name="password" value="" onkeyup="enterkey();">
															</div>
															<div>
																<div>
																	<div>
									  									<input type="button" id="login" value="로그인" class="btn btn-primary" onclick="javascript:LoginCheck()">
																		<input type="button" id="findPwd" value="비밀번호찾기" class="btn btn-primary" onclick="location.href='http://localhost:8888/password'">
																		<input type="button" id="Member" value="회원가입" class="btn btn-join" onclick="location.href='http://localhost:8888/register'">
																		
																	</div>
																</div>
															</div>
															
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
											href="https://demo.opensource-socialnetwork.org/">©
											COPYRIGHT OSSN Demo</a><a class="menu-footer-about"
											href="https://demo.opensource-socialnetwork.org/site/about">About</a><a
											class="menu-footer-site"
											href="https://demo.opensource-socialnetwork.org/site/terms">Terms
											and Conditions</a><a class="menu-footer-privacy"
											href="https://demo.opensource-socialnetwork.org/site/privacy">Privacy</a><a
											class="menu-footer-powered"
											href="https://www.opensource-socialnetwork.org/"
											style="color: rgb(255, 255, 255) !important;">Powered by
											the Open Source Social Network.</a>
									</div>
								</div>
							</div>
						</footer>
					</div>
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


</body>
</html>