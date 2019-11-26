$(document).ready(function() {
	countUser();
	countPost();
	countTodaysPost();
	countTodaysComment();
	writerTop5();
	c_writerTop5();
	postRatio();
	commentCount_Top5();
	likeCount_Top5();
	likeCommentCount_Top5();
});

// 사용자수 집계
function countUser() {
	$.ajax({
		url:'http://localhost:8090/ssun/getUserNum',
		method:'POST',
		processData:false,
		contentType:false,
		success:function(data){
			
			var myObj = JSON.parse(data);
			console.log("myObjData: " + myObj);
			
			var certifyUser = myObj[0];
			var blockUser = myObj[1];
			var unCertifyUser = myObj[2];
			
			console.log("확인사용자: " + certifyUser);
			console.log("미확인사용자: " + unCertifyUser);
			console.log("차단사용자: " + blockUser);
			
			var gdata = [
				{
					value: certifyUser,
					color:"#01ADEF",
					highlight: "#01ADEF",
					label: "인증 사용자"
				},
				{
					value: unCertifyUser,
					color:"#AFEF01",
					highlight: "#AFEF01",
					label: "미인증 사용자"
				},
				{
					value: blockUser,
					color: "#ED008C",
					highlight: "#ED008C",
					label: "차단 사용자"
				},
			];
			$(window).on('load', function(){
				var chartjs = $('#users-classified-graph')[0].getContext("2d");
				this.myPie = new Chart(chartjs).Pie(gdata);
				chart_js_legend($('#userclassified-lineLegend')[0],gdata);				
			});
			
			console.log("이용자 수 표 만들기 성공:D");
		},
		error: function(data) {
			console.log("이용자 수 표 만들기 오류:(");
		}
	});
}

// 월별 글·댓글 수 집계
function countPost() {
	$.ajax({
		url:'http://localhost:8090/ssun/countPost',
		method:'POST',
		processData:false,
		contentType:'application/json',
		success:function(data){
			
			var temp = data.split(",");
			console.log(temp);
			
			var jan_p = temp[0].split("[")[1];
			var feb_p = temp[1];
			var mar_p = temp[2];
			var apr_p = temp[3];
			var may_p = temp[4];
			var jun_p = temp[5];
			var jul_p = temp[6];
			var aug_p = temp[7];
			var sep_p = temp[8];
			var oct_p = temp[9];
			var nov_p = temp[10];
			var dec_p = temp[11];
			
			var jan_c = temp[12];
			var feb_c = temp[13];
			var mar_c = temp[14];
			var apr_c = temp[15];
			var may_c = temp[16];
			var jun_c = temp[17];
			var jul_c = temp[18];
			var aug_c = temp[19];
			var sep_c = temp[20];
			var oct_c = temp[21];
			var nov_c = temp[22];
			var dec_c = temp[23].split("]")[0];
			
			var lineChartData = {
					labels : ["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],
					datasets : [
											{
							label: "게시글",
							fillColor : "rgba(151,187,205,0.2)",
							strokeColor : "rgba(151,187,205,1)",
							pointColor : "rgba(151,187,205,1)",
							pointStrokeColor : "#fff",
							pointHighlightFill : "#fff",
							pointHighlightStroke : "rgba(151,187,205,1)",					
							data : [jan_p,feb_p,mar_p,apr_p,may_p,jun_p,jul_p,aug_p,sep_p,oct_p,nov_p,dec_p]				},
							{
								label: "댓글",
								fillColor : "rgba(185,204,148,0.2)",
								strokeColor : "rgba(185,204,148,1)",
								pointColor : "rgba(185,204,148,1)",
								pointStrokeColor : "#fff",
								pointHighlightFill : "#fff",
								pointHighlightStroke : "rgba(185,204,148,1)",					
								data : [jan_c,feb_c,mar_c,apr_c,may_c,jun_c,jul_c,aug_c,sep_c,oct_c,nov_c,dec_c]				}
													]
				}		
				$(document).ready(function(){
					var ctx = document.getElementById("users-count-graph").getContext("2d");
					var myLine = new Chart(ctx).Line(lineChartData, {
						responsive: true,
						maintainAspectRatio: false,
					});
					chart_js_legend(document.getElementById("usercount-lineLegend"),lineChartData);

				});
			
			console.log("월별 게시글/댓글 수 표 만들기 성공:D");
		},
		error: function(data) {
			console.log("월별 게시글/댓글 수 표 만들기 오류:(");
		}
	});
}

// 오늘 올라온 글 수 집계
function countTodaysPost() {
	$.ajax({
		url:'http://localhost:8090/ssun/countTodaysPost',
		method:'POST',
		processData:false,
		contentType:false,
		success:function(data){
			
			var temp = data.split(",");
			console.log("temp: " + temp);

			var postTotal = temp[0].split("[")[1];
			var anonymityPostTotal = temp[1].split("]")[0];
			console.log("postTotal: " + postTotal);
			console.log("anonymityPostTotal: " + anonymityPostTotal);
			
			var txt = postTotal + " / " + anonymityPostTotal;
			
			$('#todaysPost').html(txt);
			
			console.log("오늘 올라온 글 불러오기 성공:D");
		},
		error: function(data) {
			console.log("오늘 올라온 글 불러오기 오류:(");
		}
	});
}

// 오늘 올라온 댓글 수 집계
function countTodaysComment() {
	$.ajax({
		url:'http://localhost:8090/ssun/countTodaysComment',
		method:'POST',
		processData:false,
		contentType:false,
		success:function(data){
			
			console.log("data: "+data);
			
			var temp = data.split("[")[1];
			console.log("temp: " + temp);

			var commentTotal = temp.split("]")[0];
			console.log("commentTotal: " + commentTotal);
			
			$('#todaysComment').html(commentTotal);
			
			console.log("오늘 올라온 댓글 불러오기 성공:D");
		},
		error: function(data) {
			console.log("오늘 올라온 댓글 불러오기 오류:(");
		}
	});
}

// 글 가장 많이 쓴 사용자 top5 집계
function writerTop5() {
	$.ajax({
		url:'http://localhost:8090/ssun/writerTop5',
		method:'POST',
		processData:false,
		contentType:false,
		success:function(data){
			
			var myObj = data;
			var txt = "";
			var x;
			var cnt = 1;
			
			for(x in myObj) {
				txt += cnt + ". " + myObj[x].content + " / " + myObj[x].count + "개";
				txt += "<br>";
				cnt++;
			}
			
			$('#writerTop5').html(txt);
			
			console.log("글쟁이 top5 로드 성공:D");
		},
		error: function(data) {
			console.log("글쟁이 top5 로드 오류:(");
		}
	});
}

// 댓글 가장 많이 쓴 사용자 top5 집계
function c_writerTop5() {
	$.ajax({
		url:'http://localhost:8090/ssun/c_writerTop5',
		method:'POST',
		processData:false,
		contentType:false,
		success:function(data){
			
			var myObj = data;
			var txt = "";
			var x;
			var cnt = 1;
			
			for(x in myObj) {
				txt += cnt + ". " + myObj[x].content + " / " + myObj[x].count + "개";
				txt += "<br>";
				cnt++;
			}
			
			$('#c_writerTop5').html(txt);
			
			console.log("댓쟁이 top5 로드 성공:D");
		},
		error: function(data) {
			console.log("댓쟁이 top5 로드 오류:(");
		}
	});
}

// 실명글·익명글 비율 집계
function postRatio() {
	$.ajax({
		url:'http://localhost:8090/ssun/getPostRatio',
		method:'POST',
		processData:false,
		contentType:false,
		success:function(data){

			var jsonData = JSON.parse(data);
			console.log("jsonData: " + jsonData);
			
			var nonAnonymityPost = jsonData[0];
			var anonymityPost = jsonData[1];
			
			console.log("실명글 개수: " + anonymityPost);
			console.log("익명글 개수: " + nonAnonymityPost);
			
			var gdata = [
				{
					value: nonAnonymityPost,
					color:"#01ADEF",
					highlight: "#01ADEF",
					label: "실명글"
				},
				{
					value: anonymityPost,
					color: "#ED008C",
					highlight: "#ED008C",
					label: "익명글"
				},
			];
			$(window).on('load', function(){
				var chartjs = $('#post-anonymityRatio-graph')[0].getContext("2d");
				this.myPie = new Chart(chartjs).Pie(gdata);
				chart_js_legend($('#post-anonymityRatio-lineLegend')[0],gdata);				
			});
			
			console.log("이용자 수 표 만들기 성공:D");
		},
		error: function(data) {
			console.log("이용자 수 표 만들기 오류:(");
		}
	});
}

// 댓글이 가장 많은 글 top5 집계
function commentCount_Top5() {
	$.ajax({
		url:'http://localhost:8090/ssun/commentCount_Top5',
		method:'POST',
		processData:false,
		contentType:false,
		success:function(data){
			
			var myObj = data;
			var txt = "";
			var x;
			var cnt = 1;
			
			txt += "<div class='popOver_container'>"
			for(x in myObj) {
				
				var con = myObj[x].content.replace(/\r\n/gi, "<br>");
				
				var tmp = myObj[x].content.substr(0,8) + "...";
				console.log("잘라버린 스트링 값: " + tmp);
				
				txt += "<a id='popOverDataComment_"+cnt+"' class='' href='#' data-content='"+con+"' rel='Popover' data-placement='bottom' data-original-title='댓글 "+myObj[x].count+"개' data-trigger='hover' data-html='true'>";
				if(myObj[x].content.length <= 8) {
					txt += cnt + ". " + myObj[x].content + "</a><br>"; 
				} else {
					txt += cnt + ". " + tmp + "</a><br>"
				}
				cnt++;
			}
			txt += "</div>"
			
			$('#bestPost_comment_Top5').html(txt);
			cnt = 1;
			for(var i=0; i<5; i++) {
				$('#popOverDataComment_'+cnt).popover();
				cnt++;
			}
			
			console.log("top5 로드 성공:D");
		},
		error: function(data) {
			console.log("top5 로드 오류:(");
		}
	});
}

// 좋아요가 가장 많은 글 top5 집계
function likeCount_Top5() {
	$.ajax({
		url:'http://localhost:8090/ssun/likeCount_Top5',
		method:'POST',
		processData:false,
		contentType:false,
		success:function(data){
			
			var myObj = data;
			var txt = "";
			var x;
			var cnt = 1;
			
			txt += "<div class='popOver_container'>"
			for(x in myObj) {
				
				var con = myObj[x].content.replace(/\r\n/gi, "<br>");
				
				var tmp = myObj[x].content.substr(0,8) + "...";
				console.log("잘라버린 스트링 값: " + tmp);
				
				txt += "<a id='popOverDataLike_"+cnt+"' class='' href='#' data-content='"+con+"'" +
						" rel='Popover' data-placement='bottom' data-original-title='좋아요 "
						+myObj[x].count+"개' data-trigger='hover' data-html='true'>";
				if(myObj[x].content.length <= 8) {
					txt += cnt + ". " + myObj[x].content + "</a><br>"; 
				} else {
					txt += cnt + ". " + tmp + "</a><br>"
				}
				cnt++;
			}
			txt += "</div>"
			
			$('#bestPost_like_Top5').html(txt);
			cnt = 1;
			for(var i=0; i<5; i++) {
				$('#popOverDataLike_'+cnt).popover();
				cnt++;
			}
			
			console.log("top5 로드 성공:D");
		},
		error: function(data) {
			console.log("top5 로드 오류:(");
		}
	});
}

// 좋아요가 가장 많은 댓글 top5 집계
function likeCommentCount_Top5() {
	$.ajax({
		url:'http://localhost:8090/ssun/likeCommentCount_Top5',
		method:'POST',
		processData:false,
		contentType:false,
		success:function(data){
			
			var myObj = data;
			var txt = "";
			var x;
			var cnt = 1;
			
			txt += "<div class='popOver_container'>"
			for(x in myObj) {
				
				var con = myObj[x].content.replace(/\r\n/gi, "<br>");
				
				var tmp = myObj[x].content.substr(0,8) + "...";
				console.log("잘라버린 스트링 값: " + tmp);
				
				txt += "<a id='popOverDataCommentLike_"+cnt+"' class='' href='#' data-content='"+con+"' rel='Popover' data-placement='bottom' data-original-title='좋아요 "+myObj[x].count+"개' data-trigger='hover' data-html='true'>";
				if(myObj[x].content.length <= 8) {
					txt += cnt + ". " + myObj[x].content + "</a><br>"; 
				} else {
					txt += cnt + ". " + tmp + "</a><br>"
				}
				cnt++;
			}
			txt += "</div>"
			
			$('#bestComment_like_Top5').html(txt);
			cnt = 1;
			for(var i=0; i<5; i++) {
				$('#popOverDataCommentLike_'+cnt).popover();
				cnt++;
			}
			
			console.log("top5 로드 성공:D");
		},
		error: function(data) {
			console.log("top5 로드 오류:(");
		}
	});
}