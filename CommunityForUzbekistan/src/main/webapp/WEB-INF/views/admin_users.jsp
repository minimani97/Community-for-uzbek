<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<script src="/resources/js/ARf53_7CZrph6eMZGwgXpTF2-tk.js"></script>
<title>SGDG : User List</title>
<link rel="shortcut icon" href="/resources/img/SGDG_favicon_96x96.png">


<link rel="stylesheet" type="text/css" href="/resources/css/bootstrap.min.css" />
<link rel="stylesheet" type="text/css" href="/resources/css/ossn.admin.default.css" />
<script src="/resources/js/ossn.en.language.js"></script>
<script src="/resources/js/jquery-1.11.1.min.js"></script>
<script src="/resources/js/jquery-ui.min.js"></script>
<script src="/resources/js/tinymce.min.js"></script>
<script src="https://demo.opensource-socialnetwork.org/components/OssnAutoPagination/vendors/jquery.scrolling.js?ossn_cache=4f3a726e"></script>
<script src="/resources/js/opensource.socialnetwork.js"></script>
<link rel="stylesheet" type="text/css" href="//maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
<link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Roboto+Slab:300,700,400" />
<script src="/resources/js/bootstrap.min.js"></script>
<link rel="stylesheet" type="text/css" href="/resources/css/jquery-ui.css" />

<!-- 예린 datatable 링크 추가 -->	
<script src="/resources/datatables/jquery.dataTables.js"></script>
<script src="/resources/datatables/dataTables.bootstrap4.js"></script>

<!-- Page level plugin CSS-->
<link href="/resources/datatables/dataTables.bootstrap4.css" rel="stylesheet">

<!-- DataTables Responsive CSS -->
<link href="/resources/css/dataTables.responsive.css" rel="stylesheet">
 

<script>
	Ossn.site_url = 'https://demo.opensource-socialnetwork.org/';
	Ossn.Config = {
		"token" : {
			"ossn_ts" : 1543324250,
			"ossn_token" : "9b66cd51714927b0431583ab8f3198c5"
		},
		"cache" : {
			"last_cache" : "4f3a726e",
			"ossn_cache" : "1"
		}
	};
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
	            alert("error");
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
				toolbar : "bold italic underline alignleft aligncenter alignright bullist numlist image media link unlink emoticons autoresize fullscreen insertdatetime print spellchecker preview",
				selector : '.ossn-editor',
				plugins : "code image media link emoticons fullscreen insertdatetime print spellchecker preview",
				convert_urls : false,
				relative_urls : false,
				language : "en",
			});
	
	//페이징 처리
	$(document).ready(function() {	
		 $('#paging').DataTable();
		 responsive: true
	});
	
</script>

</head>
<body>
	<div class="header">
		<div class="container">

			<div class="row">
				<div class="col-md-6 col-sm-6 col-xs-6">
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
								<li><a href="" onclick="javascript:logout();">로그아웃</a></li>
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
								<ul class="nav navbar-nav navbar-right">
								</ul>
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
							<div class="page-title">사용자 관리</div>
							<form
								action="https://demo.opensource-socialnetwork.org/administrator/users"
								class="ossn-form ossn-admin-form" method="post"
								enctype='multipart/form-data'>
								<fieldset>
									<input type="hidden" name="ossn_ts" value="1543324250" /> <input
										type="hidden" name="ossn_token"
										value="9b66cd51714927b0431583ab8f3198c5" />
									<div class="margin-top-10 user-search">
									</div>
									<div class="top-controls right">

									</div>
								</fieldset>
							</form>
							<form
								action="https://demo.opensource-socialnetwork.org/action/admin/users/delete"
								class="ossn-form ossn-admin-form" method="post"
								enctype='multipart/form-data' id="blockUser">
								<fieldset>
									<input type="hidden" name="ossn_ts" value="1543324250" /> <input
										type="hidden" name="ossn_token"
										value="9b66cd51714927b0431583ab8f3198c5" />
									<div class="margin-top-10">
										<table class="table ossn-users-list" id="paging" name="paging">
											<thead align="riget" class="table-titles">
												<tr>
													<th>이름</th>
													<th>아이디</th>
													<th>이메일</th>
													<th>전화번호</th>
													<th>수정</th>
												</tr>
											</thead>
										
											<tbody>
												<c:forEach var="adminInfo" items="${allUser}">

													<tr>
														<td style="text-align: left;" class="btnBlock">${adminInfo.name}</td>
														<td style="text-align: left;" class="btnBlock">${adminInfo.id}</td>
														<td style="text-align: left;" class="btnBlock">${adminInfo.email}</td>
														<td style="text-align: left;" class="btnBlock">${adminInfo.phone}</td>

														<td style="text-align: left;" ><a
															href="/admin/edituser?number=${adminInfo.id}">정보수정</a>
														</td>

														
													</tr>
												</c:forEach>

											</tbody>
										</table>
									</div>
									<div class="row">

										<div class="container-table container-table-pagination">
											<div class="center-row">
			
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
	</div>
</body>
</html>