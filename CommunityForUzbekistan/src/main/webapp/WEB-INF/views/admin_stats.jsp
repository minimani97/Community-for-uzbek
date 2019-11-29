<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>SGDG : Stats</title>
<link rel="shortcut icon" href="/ssun/resources/img/SGDG_favicon_96x96.png">

<!-- 
	Open Source Social Network (Ossn) https://www.opensource-socialnetwork.org/     
	BY Informatikon Technologies (http://informatikon.com/)
	BY SOFTLAB24 (https://www.softlab24.com/)
	-->

<link rel="stylesheet" type="text/css" href="/resources/css/bootstrap.min.css" />
<link rel="stylesheet" type="text/css" href="/resources/css/ossn.admin.default.css" />
<script src="/resources/js/ossn.en.language.js"></script>
<script src="/resources/js/jquery-1.11.1.min.js"></script>
<script src="/resources/js/jquery-ui.min.js"></script>
<script src="/resources/js/tinymce.min.js"></script>
<script src="/resources/js/jquery.scrolling.js?ossn_cache=4f3a726e"></script>
<script src="/resources/js/Chart.min.js"></script>
<script src="/resources/js/chart.legend.js"></script>
<script src="/resources/js/sunmoon.socialnetwork.administrator.js"></script>
<script src="/resources/js/opensource.socialnetwork.js"></script>
<link rel="stylesheet" type="text/css" href="//maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
<link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Roboto+Slab:300,700,400" />
<script src="/resources/js/bootstrap.min.js"></script>
<link rel="stylesheet" type="text/css" href="//cdnjs.cloudflare.com/ajax/libs/jqueryui/1.10.4/css/jquery-ui.css" />

<script>
         	
	Ossn.site_url = 'https://demo.opensource-socialnetwork.org/';
	Ossn.Config = {"token":{"ossn_ts":1543315723,"ossn_token":"b5b4fd2e278d22faf411e0cb49c1f802"},"cache":{"last_cache":"4f3a726e","ossn_cache":"1"}};
	Ossn.Init();

	function logout(){
	      console.log("logout called!");
	      
	      var user_id = "${sessionScope.user_id}";

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
	
	// 로그인 여부 체크 함수(newsFeed.jsp)
	function loginCheckProc(data, user_id) {
	   
	   console.log("loginCheckProc: 1(세션값 초기화) OR 2(실패): "+data);
	   if ( data == "1" ){
	      console.log("loginCheckProc 세션값 없어야..:" + user_id);
	      window.location.href="http://localhost:8888";
	   }else{
	      console.log("세션값 초기화 실패!");
	         
	   }
	}
	
</script>
<script>
        tinymce.init({
            toolbar: "bold italic underline alignleft aligncenter alignright bullist numlist image media link unlink emoticons autoresize fullscreen insertdatetime print spellchecker preview",
            selector: '.ossn-editor',
            plugins: "code image media link emoticons fullscreen insertdatetime print spellchecker preview",
            convert_urls: false,
            relative_urls: false,
            language: "en",
        });
    </script>

</head>
<body>
	<div class="header">
		<div class="container">

			<div class="row">
				<div class="col-md-6 col-sm-6 col-xs-6">
					<!-- <img style="width:181px;height:45px" src="/ssun/resources/img/SGDG_icon.png"/> -->
					<div class="page_title">관리자 페이지:D</div>
				</div>
				<div class="col-md-6 col-sm-6 col-xs-6 header-dropdown">
					<ul class="navbar-right">
						<div class="dropdown">
							<a id="dLabel" role="button" data-toggle="dropdown"
								data-target="#"><i class="fa fa-bars fa-3"></i></a>
							<ul class="dropdown-menu multi-level" role="menu"
								aria-labelledby="dropdownMenu">
								<li><a href="http://localhost:8888/newsFeed">메인페이지로 돌아가기</a></li>
								<li><a href="" onclick="javascript:logout()">로그아웃</a></li>
							</ul>
						</div>
					</ul>
				</div>
			</div>

		</div>
	</div>
	<div class="row no-right-margins">
		<div class="topbar-menu">
			<div class="navbar navbar-default navbar-admin-second"
				role="navigation">
				<div class="container">
					<div class="row">
						<div class="col-12">
							<button type="button" class="navbar-toggle"
								data-toggle="collapse" data-target="#navigationbar">
								<span class="sr-only">Toggle navigation</span> <span
									class="icon-bar"></span> <span class="icon-bar"></span> <span
									class="icon-bar"></span>
							</button>
							<div class="collapse navbar-collapse" id="navigationbar">
								<ul class="nav navbar-nav">
									<li><a class="menu-topbar-admin-home"
										href="http://localhost:8888/admin/users">사용자 관리</a></li>
									<li><a class="menu-topbar-admin-home"
										href="http://localhost:8888/admin/stats">SUMC 통계</a></li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="container">
		<div class="row">
			<div class="col-md-12">
				<div class="ossn-layout-admin">
					<div class="ossn-system-messages">
						<div class="row">
							<div class="col-md-12 ossn-system-messages-inner"></div>
						</div>
					</div>
					<div class="row">
						<div class="col-md-12 contents">
							<div class="page-title">통-계</div>
							<div class="ossn-admin-dsahboard">
								<div class="row">

									<div class="col-md-12 admin-dashboard-item">
										<div class="admin-dashboard-box">
											<div class="admin-dashboard-title">월 별 게시글·댓글 통계</div>
											<div class="admin-dashboard-contents">
												<canvas id="users-count-graph"></canvas>
												<div id="usercount-lineLegend"></div>
											</div>
										</div>
									</div>

								</div>

								<div class="row margin-top-10">
									<div class="col-md-4 admin-dashboard-item">
										<div class="admin-dashboard-box">
											<div class="admin-dashboard-title">사용자 수</div>
											<div class="admin-dashboard-contents center admin-dashboard-fixed-height">
												<canvas id="users-classified-graph"></canvas>
												<div id="userclassified-lineLegend"></div>
											</div>
										</div>
									</div>

									<div class="col-md-4 admin-dashboard-item">
										<div class="admin-dashboard-box">
											<div class="admin-dashboard-title">오늘 올라온 글 / 익명 글 수</div>
											<div class="admin-dashboard-contents center admin-dashboard-fixed-height">
												<div id="todaysPost" name="todaysPost" class="text center"></div>
											</div>
										</div>
									</div>
									
									<div class="col-md-4 admin-dashboard-item">
										<div class="admin-dashboard-box">
											<div class="admin-dashboard-title">오늘 올라온 댓글</div>
											<div class="admin-dashboard-contents center admin-dashboard-fixed-height">
												<div id="todaysComment" name="todaysComment" class="text center"></div>
											</div>
										</div>
									</div>					
								</div>

								<div class="row">
									<div class="col-md-4 admin-dashboard-item">
										<div class="admin-dashboard-box">
											<div class="admin-dashboard-title">이번 달의 글쟁이 TOP5</div>
											<div class="admin-dashboard-contents center admin-dashboard-fixed-height">
												<div id="writerTop5" name="writerTop5" class="text-rank center"></div>
											</div>
										</div>
									</div>
									
									<div class="col-md-4 admin-dashboard-item">
										<div class="admin-dashboard-box">
											<div class="admin-dashboard-title">이번 달의 댓쟁이 TOP5</div>
											<div class="admin-dashboard-contents center admin-dashboard-fixed-height">
												<div id="c_writerTop5" name="c_writerTop5" class="text-rank center"></div>
											</div>
										</div>
									</div>
									
									
									<div class="col-md-4 admin-dashboard-item">
										<div class="admin-dashboard-box">
											<div class="admin-dashboard-title">현재까지 올라온 글 중...</div>
											<div class="admin-dashboard-contents center admin-dashboard-fixed-height">
												<canvas id="post-anonymityRatio-graph"></canvas>
												<div id="post-anonymityRatio-lineLegend"></div>
											</div>
										</div>
									</div>
								</div>

								<div class="row">
									<div class="col-md-4 admin-dashboard-item">
										<div class="admin-dashboard-box">
											<div class="admin-dashboard-title">이번 달의 댓글 가장 많은 글 TOP5</div>
											<div class="admin-dashboard-contents center admin-dashboard-fixed-height">
												<div id="bestPost_comment_Top5" name="bestPost_comment_Top5" class="text-rank-extra center"></div>
											</div>
										</div>
									</div>
									
									<div class="col-md-4 admin-dashboard-item">
										<div class="admin-dashboard-box">
											<div class="admin-dashboard-title">이번 달의 좋아요 가장 많은 글 TOP5</div>
											<div class="admin-dashboard-contents center admin-dashboard-fixed-height">
												<div id="bestPost_like_Top5" name="bestPost_like_Top5" class="text-rank-extra center"></div>
											</div>
										</div>
									</div>	
									
									<div class="col-md-4 admin-dashboard-item">
										<div class="admin-dashboard-box">
											<div class="admin-dashboard-title">이번 달의 좋아요 가장 많은 댓글 TOP5</div>
											<div class="admin-dashboard-contents center admin-dashboard-fixed-height">
												<div id="bestComment_like_Top5" name="bestComment_like_Top5" class="text-rank-extra center"></div>
											</div>
										</div>
									</div>
								</div>
								
								<div class="row">
									<div class="col-md-4 admin-dashboard-item">
										<div class="admin-dashboard-box admin-dashboard-box-small">
											<div class="admin-dashboard-title">SUMC Version</div>
											<div
												class="admin-dashboard-contents admin-dashboard-contents-small center admin-dashboard-fixed-height">
												<div class="text center">beta 1.0.0</div>
											</div>
										</div>
									</div>
								</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- footer -->
		<footer>
			<div class="row">
				<div class="col-md-6">
					&copy; COPYRIGHT 2018 <a
						href="https://demo.opensource-socialnetwork.org/">Open Source
						Social Network</a>
				</div>
				<div class="col-md-6 text-right"></div>
			</div>
		</footer>
		<!-- /footer -->
	</div>
	<!-- /container -->
</body>
</html>