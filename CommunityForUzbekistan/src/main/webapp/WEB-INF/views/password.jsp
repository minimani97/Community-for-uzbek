<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>SUMC : Find Password</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<!-- <link rel="shortcut icon" href="/resources/img/SGDG_favicon_96x96.png"> -->

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
<!-- 20181120 민정추가  -->
<!-- <script type="text/javascript" src="resources/js/sunmoon.socialnetwork.common.js"></script> -->

<script>
	//비밀번호찾기
	function findPassword() {
		var formData = new FormData($("#mypage_form")[0]);
		
		$.ajax({
			url : 'http://localhost:8888/findPassword',
			method : 'POST',
			data : formData,
			processData : false,
			contentType : false,
			success : function(data) {
				if(data == "fail"){
					alert("비밀번호 찾기 실패! \n이메일과 아이디를 다시 확인해주세요.");
					console.log(data);
				}else{
					alert("비밀번호가 " + data + " 로 재설정 되었습니다. \n로그인 후 반드시 비밀번호를 재설정 해주세요!");
					console.log(data);
					window.location.href="http://localhost:8888";
				}
			},
			error : function(data, status, err) {
				
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

											<div class="ossn-widget ">
												<div class="widget-heading">비밀번호 찾기</div>
												<div class="widget-contents">
													<form id="mypage_form"
														action="https://demo.opensource-socialnetwork.org/action/profile/edit"
														class="ossn-form ossn-edit-form" method="post"
														enctype='multipart/form-data'>
														<fieldset>
															<input type="hidden" name="ossn_ts" value="1541659967" />
															<input type="hidden" name="ossn_token" value="c8b51be7bd1e5ddcc3fff53e4ac1a99c" />
															<p>※ 입력한 정보가 일치하면 비밀번호를 재설정할 수 있습니다.</p>
															
															<div>
																<label>아이디</label>
																<input type="text" id="find_user_id" name="find_user_id"/>
															</div>
															
															<div>
																<label>전화번호</label>
																<input type="text" id="find_phone" name="find_phone" onKeyup="inputPhoneNumber(this);" maxlength="13" />
															</div>

															<div class="widget-contents">

																<div>
																	<input type="button" value="비밀번호 재설정하기"
																		onclick="findPassword()" class="btn btn-primary" />
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
					</div>
				</div>




				<footer>
				<div class="col-md-11">
					<div class="footer-contents">
						<div class="ossn-footer-menu">
							<a class="menu-footer-a_copyrights"
								href="https://demo.opensource-socialnetwork.org/">&copy;
								COPYRIGHT OSSN Demo</a><a class="menu-footer-about"
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
