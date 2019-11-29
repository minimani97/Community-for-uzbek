$(document).ready(function() {	
	
	// function ~~~
	setUserInfo();
	/*loadWriting();*/
	searchPost();
	loadSearchWriting();
	getNoticeInfo();
	bestLikePostInfo();
	bestCommentPostInfo();
	
});

// 댓글 창 껐다 켜기
function showCommentBox(w_num){
	
	if (document.getElementById("comments-list-"+w_num).style.display == "none") {
		document.getElementById("comments-list-"+w_num).style.display = "block";
		
		// 해당 글의 댓글 로딩		
		var user_id = document.getElementById("user_id").value;
		
		var num_data = {w_num: w_num};
		
		$.ajax({
			url : 'http://localhost:8888/commentList',
			method : 'POST',
			data : JSON.stringify(num_data),
			dataType: 'json',
			processData : false,
			contentType : 'application/json',
			success : function(data) {
				//alert(data);
				console.log(data);
				
				var myObj = data;
				var txt="";
				
				for (x in myObj) {
					$(".ossn-comments-list-"+myObj[x].w_num).html("");
					
					txt += "<!-- comment-item-start -->";
					txt += "<div class='comments-item' id='comments-item-"+myObj[x].c_num+"'>";
					txt += "<div class='row'>";
					txt += "<div class='col-md-1'>";
					txt += "<img class='comment-user-img' ";
					if(myObj[x].user_img == "" || myObj[x].user_img == null) {
						txt += "src='resources/img/e9f94905272829984a707d6270721081.jpeg'></div>";
					} else {
						txt += "src='resources/userImage/"+myObj[x].user_img+"'></div>";
					}
					txt += "<div class='col-md-11'>";
					txt += "<div class='comment-contents'><p>";
					txt += "<a class='owner-link'>"+myObj[x].user_name+"</a>";
					txt += "<span class='comment-text-"+myObj[x].c_num+"'>"+myObj[x].c_content+"</span></p>";
					txt += "<div class='comment-metadata'>";
					txt += "<div class='time-created'>"+myObj[x].c_time+"</div>";
					if(myObj[x].like_cnt == 0) {
						txt += "<a class='ossn-like-comment-"+myObj[x].c_num+"' data-type='Like' href='javascript:clickCommentLike("+myObj[x].c_num+")'>좋아요</a>";
					} else {
						txt += "<a class='ossn-like-comment-"+myObj[x].c_num+"' data-type='Like' href='javascript:clickCommentLike("+myObj[x].c_num+")'>좋아요 "+myObj[x].like_cnt+"</a>";
					}
					txt += "<a onclick='Ossn.ViewLikes(3, 'annotation')' class='ossn-total-likes ossn-total-likes-3' data-likes='' href='javascript:void(0);'></a>";
					if(myObj[x].user_id == user_id) {
						txt += "<div class='ossn-comment-menu'>";
						txt += "<div class='dropdown'>";
						txt += "<a id='dLabel' role='button' data-toggle='dropdown' data-target='#'> <i class='fa fa-sort-desc'></i></a>";
						txt += "<ul class='dropdown-menu multi-level' role='menu' aria-labelledby='dropdownMenu'>";
						txt += "<li><a data-guid='"+myObj[x].c_num+"' class='ossn-edit-comment' href='javascript:editComment_getContent("+myObj[x].c_num+");'>수정</a></li>";
						txt += "<li><a class='ossn-delete-comment' href='javascript:deleteComment("+myObj[x].c_num+");'>삭제</a></li>";
						txt += "</ul></div></div>";
					} else {
						txt += "";
					}
					txt += "</div></div></div></div></div>";
					txt += "<!-- comment-item-end -->";
					
					$(".ossn-comments-list-"+myObj[x].w_num).append(txt);
				}
				
			},
			error : function(data, status, err) {
				//alert('error');
				console.log(data);
			}
		});
		
    } else {
    	document.getElementById("comments-list-"+w_num).style.display = "none";
    }
		
}

// 댓글 등록하기
function postComment(w_num){
	
	if(window.event.keyCode == 13) {
		console.log("window.event.keyCode");
		if (window.event.shiftKey === false){
			
			var c_content = $('#comment-box-'+w_num).html();
			/*var c_content = document.getElementById("comment-box-"+w_num).innerHTML();*/
			
			$('#comment-box-'+w_num).attr('contenteditable', 'false');
			$('#comment-box-'+w_num).attr('readonly', 'true');
			
			if(c_content == "") {
				alert("내용을 입력해주세요! :(");
				
				$('#comment-box-'+w_num).removeAttr("readonly");
				$('#comment-box-'+w_num).attr("contenteditable", "true");
				
				return false;
			}
			
			var user_id = document.getElementById("user_id").value;
			
			var dataList = {w_num: w_num, user_id: user_id, c_content: c_content};
			
			$.ajax({
				url : 'http://localhost:8888/writeComment',
				method : 'POST',
				data : JSON.stringify(dataList),
				dataType: 'json',
				processData : false,
				contentType : 'application/json',
				success : function(data) {
					$('#comment-box-'+w_num).html('');
					
					// 댓글 바로 띄우기 
					var txt="";
					var myObj = data;
					
					var user_id = $("#user_id").val();
					var user_name = $("#user-name-info").html();
					var user_img = $("#user_img").val();
					
					txt += "<!-- comment-item-start -->";
					txt += "<div class='comments-item' id='comments-item-"+myObj.c_num+"'>";
					txt += "<div class='row'>";
					txt += "<div class='col-md-1'>";
					txt += "<img class='comment-user-img' ";
					if(user_img == "" || user_img == null) {
						txt += "src='resources/img/e9f94905272829984a707d6270721081.jpeg'></div>";
					} else {
						txt += "src='resources/userImage/"+user_img+"'></div>";
					}
					txt += "<div class='col-md-11'>";
					txt += "<div class='comment-contents'><p>";
					txt += "<a class='owner-link'>"+user_name+"</a>";
					txt += "<span class='comment-text-"+myObj.c_num+"'>"+myObj.c_content+"</span></p>";
					txt += "<div class='comment-metadata'>";
					txt += "<div class='time-created'>"+myObj.c_time+"</div>";
					if(myObj.like_cnt == 0) {
						txt += "<a class='ossn-like-comment-"+myObj.c_num+"' data-type='Like' href='javascript:clickCommentLike("+myObj.c_num+")'>좋아요</a>";
					} else {
						txt += "<a class='ossn-like-comment-"+myObj.c_num+"' data-type='Like' href='javascript:clickCommentLike("+myObj.c_num+")'>좋아요 "+myObj.like_cnt+"</a>";
					}
					txt += "<a onclick='Ossn.ViewLikes(3, 'annotation')' class='ossn-total-likes ossn-total-likes-3' data-likes='' href='javascript:void(0);'></a>";
					txt += "<div class='ossn-comment-menu'>";
					txt += "<div class='dropdown'>";
					txt += "<a id='dLabel' role='button' data-toggle='dropdown' data-target='#'> <i class='fa fa-sort-desc'></i></a>";
					txt += "<ul class='dropdown-menu multi-level' role='menu' aria-labelledby='dropdownMenu'>";
					txt += "<li><a data-guid='"+myObj.c_num+"' class='ossn-edit-comment' href='javascript:editComment_getContent("+myObj.c_num+");'>수정</a></li>";
					txt += "<li><a class='ossn-delete-comment' href='javascript:deleteComment("+myObj.c_num+");'>삭제</a></li>";
					txt += "</ul></div></div></div></div></div></div></div>";
					txt += "<!-- comment-item-end -->";
					
					$('#comment-box-'+w_num).removeAttr("readonly");
					$('#comment-box-'+w_num).attr("contenteditable", "true");
					
					$(".ossn-comments-list-"+myObj.w_num).append(txt);
					
					// 댓글 개수 바꾸기(하나 증가시켜 출력하기)
					var tmp = $('#comment-btn-'+w_num).text();
					if(tmp == "댓글") {
						$('#comment-btn-'+w_num).text("댓글 1");
					} else {
						console.log("tmp: " + $('#comment-btn-'+w_num).text());
						console.log("tmp.substr(tmp.length - 1): "+ tmp.substr(tmp.length - 1));
						var c_cnt = parseInt(tmp.substr(tmp.length - 1)) + 1;
						console.log("c_cnt: " + c_cnt);
						
						$('#comment-btn-'+w_num).text("댓글 " + c_cnt);
					}
					
				},
				error : function(data, status, err) {
					//alert('error');
					console.log(data);
				}
			});
		}
	}
}

// 글 삭제하기
function deletePost(w_num) {
	
	console.log("deletePost is running!");
	
	var del_num = {w_num: w_num};
	
	$.ajax({
		url:'http://localhost:8888/deletePost',
		method:'POST',
		data:JSON.stringify(del_num),
		processData:false,
		contentType:'application/json',
		success:function(){
			$('#activity-item-'+w_num).fadeOut();
			$('#activity-item-'+w_num).remove();
			alert("글이 삭제되었습니다 :)");
		},
		error: function() {
			console.log("글 삭제 오류!");
		}
	});
}

// 댓글 삭제하기
function deleteComment(c_num) {
	
	console.log("deleteComment is running!");
	
	var del_num = {c_num: c_num};
	
	$.ajax({
		url:'http://localhost:8888/deleteComment',
		method:'POST',
		data:JSON.stringify(del_num),
		processData:false,
		contentType:'application/json',
		success:function(){
			$('#comments-item-'+c_num).fadeOut();
			$('#comments-item-'+c_num).remove();
			alert("댓글이 삭제되었습니다 :)");
		},
		error: function() {
			console.log("댓글 삭제 오류!");
		}
	});
}

// 수정할 글 내용 불러오기
function editPost_getContent(w_num) {
	console.log("editPost function called-");
	
	var dep_code;
	var url = window.location.href.split("?");
	console.log("1차 자르기: " + url);
	if(url[1] == undefined) {
		dep_code = "All";
	} else {
		var param = url[1].split("&");
		console.log("2차 자르기: " + param);
		var code = param[2].split("=");
		console.log("3차 자르기: " + code);
		// var code = param[1];
		dep_code = code[1];	
	}
	
	var sendData = {w_num: w_num, dep_code: dep_code};
	
	$.ajax({
		url:'http://localhost:8888/getPostContent',
		method:'POST',
		data:JSON.stringify(sendData),
		processData:false,
		contentType:'application/json',
		success:function(data){
			
			var myObj = data;
			console.log("myObj: " + myObj);
			/*var content = myObj.replace(/(?:\r\n|\r|\n)/g, '<br>');
			console.log("수정 글 내용: " + content);*/
			var txt = "";
			
			txt += "<textarea id='post-edit' name='post'>"+myObj+"</textarea>";
			txt += "<input type='hidden' id='post-guid' name='post-guid' value='"+w_num+"'>";
			txt += "<input type='submit' class='hidden' id='ossn-post-edit-save'>";
			
			$('.ossn-halt').addClass('ossn-light');
            $('.ossn-halt').attr('style', 'height:' + $(document).height() + 'px;');
            $('.ossn-halt').show();
            $('.ossn-message-box-edit-post').attr('style', 'display:block;');
            $('#edit-post-popup').html(txt);
            
			/*$('#ossn-halt').addClass('ossn-light');
			$('#ossn-halt').attr('style', 'height: 6019px;display:block;');
			$('#ossn-halt').html(txt);*/
			/*document.getElementById("edit-popup").innerHTML = txt;*/
		},
		error: function(data) {
			console.log("수정_글 불러오기 오류!");
		}
	});
}

// 글 수정창 닫는 함수
PostMessageBoxClose = function() {
    $('.ossn-message-box-edit-post').hide();
    $('.ossn-halt').removeClass('ossn-light').hide();
    $('.ossn-halt').attr('style', '');
};

// 글 수정하기
function editPost() {
	var w_num = $('#post-guid').val();
	console.log("수정 글 번호: " + w_num);
	var content = $('#post-edit').val();
	console.log("수정 내용: " + content);
	
	if(content == "") {
		alert("내용을 입력하세요!");
		return false;
	}
	
	var sendData = {w_num: w_num, w_content: content};
	
	$.ajax({
		url:'http://localhost:8888/editPost',
		method:'POST',
		data:JSON.stringify(sendData),
		processData:false,
		contentType:'application/json',
		success:function(){
			
			$('.ossn-message-box-edit-post').hide();
		    $('.ossn-halt').removeClass('ossn-light').hide();
		    $('.ossn-halt').attr('style', '');
		    
		    // 글 수정된 내용으로 다시 띄우기
		    var editContent = content.replace(/(?:\r\n|\r|\n)/g, '<br>');
		    $('#writing-'+w_num).html(editContent);
		    
			alert("글이 수정되었습니다 :)")
		},
		error: function(data) {
			console.log("글 수정 오류!");
		}
	});
}

// 수정할 댓글 내용 불러오기
function editComment_getContent(c_num) {
	console.log("editComment function called-");
	
	var edit_num = {c_num: c_num};
	console.log("c_num: " + c_num);
	
	$.ajax({
		url:'http://localhost:8888/getCommentContent',
		method:'POST',
		data:JSON.stringify(edit_num),
		processData:false,
		contentType:'application/json',
		success:function(data){
			
			var content = data;
			console.log("수정할 댓글 내용: " + content);
			var txt = "";
			
			txt += "<textarea id='comment-edit' name='post'>"+content+"</textarea>";
			txt += "<input type='hidden' id='comment-guid' name='comment-guid' value='"+c_num+"'>";
			txt += "<input type='submit' class='hidden' id='ossn-post-edit-save'>";
			
			$('.ossn-halt').addClass('ossn-light');
            $('.ossn-halt').attr('style', 'height:' + $(document).height() + 'px;');
            $('.ossn-halt').show();
            $('.ossn-message-box-edit-comment').attr('style', 'display:block;');
            $('#edit-comment-popup').html(txt);
            
			/*$('#ossn-halt').addClass('ossn-light');
			$('#ossn-halt').attr('style', 'height: 6019px;display:block;');
			$('#ossn-halt').html(txt);*/
			/*document.getElementById("edit-popup").innerHTML = txt;*/
		},
		error: function(data) {
			console.log("수정_댓글 불러오기 오류!");
		}
	});
}

// 댓글 수정 창 닫는 함수
CommentMessageBoxClose = function() {
    $('.ossn-message-box-edit-comment').hide();
    $('.ossn-halt').removeClass('ossn-light').hide();
    $('.ossn-halt').attr('style', '');
};

// 댓글 수정하기
function editComment() {
	var c_num = $('#comment-guid').val();
	console.log("수정 댓글 번호: " + c_num);
	var content = $('#comment-edit').val();
	console.log("수정 내용: " + content);
	
	if(content == "") {
		alert("내용을 입력하세요!");
		return false;
	}
	
	var sendData = {c_num: c_num, c_content: content};
	
	$.ajax({
		url:'http://localhost:8888/editComment',
		method:'POST',
		data:JSON.stringify(sendData),
		processData:false,
		contentType:'application/json',
		success:function(data){
			
			$('.ossn-message-box-edit-comment').hide();
		    $('.ossn-halt').removeClass('ossn-light').hide();
		    $('.ossn-halt').attr('style', '');
		    
		    // 댓글 수정된 내용으로 다시 띄우기
		    var w_num = data;
		    console.log("w_num: " + w_num);
		    
		    $('.comment-text-'+c_num).text(content);
		    
			alert("댓글이 수정되었습니다 :)");
		},
		error: function(data) {
			console.log("댓글 수정 오류!");
		}
	});
}

// 글 좋아요 누르기
function clickPostLike(w_num) {
	
	var data = {w_num: w_num};
	
	$.ajax({
		url:'http://localhost:8888/postLike',
		method:'POST',
		data:JSON.stringify(data),
		processData:false,
		contentType:'application/json',
		success:function(data){
			
			console.log("넘겨받은 데이터!_!: " + data);
			var like_cnt = parseInt(data) + 1;
			console.log("좋아요 갯수: " + like_cnt);
			
			if(data == 0) {
				$('#ossn-like-'+w_num).text("좋아요 1");
			} else {
				$('#ossn-like-'+w_num).text("좋아요 "+like_cnt);
			}
			
			console.log("좋아요 성공:D")
		},
		error: function(data) {
			console.log("좋아요 오류:(");
		}
	});
	
}

// 댓글 좋아요 누르기
function clickCommentLike(c_num) {
	
	var data = {c_num: c_num};
	
	$.ajax({
		url:'http://localhost:8888/commentLike',
		method:'POST',
		data:JSON.stringify(data),
		processData:false,
		contentType:'application/json',
		success:function(data){
			
			console.log("넘겨받은 데이터!_!: " + data);
			var like_cnt = parseInt(data) + 1;
			console.log("좋아요 갯수: " + like_cnt);
			
			if(data == 0) {
				$('.ossn-like-comment-'+c_num).text("좋아요 1");
			} else {
				$('.ossn-like-comment-'+c_num).text("좋아요 "+like_cnt);
			}
			
			console.log("좋아요 성공:D")
		},
		error: function(data) {
			console.log("좋아요 오류:(");
		}
	});
	
}

// 글 검색하기
function searchPost(){
	
	var user_id = document.getElementById("user_id").value;
	//var user_dep = document.getElementById("user_dep").value;
	
	var url = decodeURI(decodeURIComponent(document.location.href));
	var param = url.split("?");
	
	console.log("url: " + url);
	console.log("param: " + param[1]);
	
	var temp = param[1].split("&");
	console.log("tmp: " + temp);
	
	var type = temp[0].split("=")[1];
	var word = temp[1].split("=")[1];
	var dep_code = temp[2].split("=")[1];
	console.log("search type: " + type);
	console.log("search word: " + word);
	console.log("dep_code: " + dep_code);
	
	var sendData = {type: type, word: word, dep_code: dep_code};
	
	if(type=="search-writing") {
		$('#search-type').val("search-writing").prop("selected", true);
	} else {
		$('#search-type').val("search-user").prop("selected", true);
	}
	$('#search-page-area').val(word);
	
	$.ajax({
		url:'http://localhost:8888/search',
		method:'POST',
		data:JSON.stringify(sendData),
		processData:false,
		contentType:'application/json',
		success:function(data){
		
			if(data=="") {
				$('#search-result').html("<br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;검색 결과가 존재하지 않습니다!:(");
				alert("검색 결과가 존재하지 않습니다!");
				return false;
			}
			
			var myObj = data;
			var txt = "";
			var x;
			
			for(x in myObj) {
				
				var content = myObj[x].w_content.replace(/(?:\r\n|\r|\n)/g, '<br>');
	        	
	        	txt += "<!-- wall item start -->";
	            txt += "<div class=ossn-wall-item id=activity-item-"+myObj[x].w_num+">";
	            txt += "<div class=row>";
	            txt += "<div class=meta>";
	            txt += "<img class=user-img ";
	            if(myObj[x].user_img=="" || myObj[x].user_img==null || myObj[x].anonymity=="Y") {
	            	txt += "src=resources/img/default-user-icon-11.jpg>";
	            } else { 
	            	txt += "src=http://localhost:8888/resources/userImage/"+myObj[x].user_img+">";
	            }
	            console.log("myObj[x].user_id: " + myObj[x].user_id);
	            if(user_id == "admin" && myObj[x].anonymity=='N') {
	            	txt += "<div class=post-menu>";
		            txt += "<div class=dropdown>";
		            txt += "<a id=dLabel role=button data-toggle=dropdown class='btn btn-link' data-target=#>";
		            txt += "<i class='fa fa-sort-desc'></i></a>";
		            txt += "<ul class='dropdown-menu multi-level' role=menu aria-labelledby=dropdownMenu>";
		            txt += "<li><a id='post-sendMsg-btn' class='post-control-sendMsg ossn-wall-post-sendMsg' data-guid="+myObj[x].w_num+" href=javascript:sendMsg("+myObj[x].user_id+");>글쓴이에게 쪽지 보내기</a></li>";
		            txt += "<li><a id='post-edit-btn' class='post-control-edit ossn-wall-post-edit' data-guid="+myObj[x].w_num+" href=javascript:editPost_getContent("+myObj[x].w_num+");>수정</a></li>";
		            txt += "<li><a id='post-delete-btn' class='post-control-delete ossn-wall-post-delete' data-guid="+myObj[x].w_num+" href='javascript:deletePost("+myObj[x].w_num+");'>삭제</a></li>";
		            txt += "</ul></div></div>";
	            } else if(user_id == "admin" && myObj[x].anonymity=='Y') {
	            	txt += "<div class=post-menu>";
		            txt += "<div class=dropdown>";
		            txt += "<a id=dLabel role=button data-toggle=dropdown class='btn btn-link' data-target=#>";
		            txt += "<i class='fa fa-sort-desc'></i></a>";
		            txt += "<ul class='dropdown-menu multi-level' role=menu aria-labelledby=dropdownMenu>";
		            txt += "<li><a id='post-edit-btn' class='post-control-edit ossn-wall-post-edit' data-guid="+myObj[x].w_num+" href=javascript:editPost_getContent("+myObj[x].w_num+");>수정</a></li>";
		            txt += "<li><a id='post-delete-btn' class='post-control-delete ossn-wall-post-delete' data-guid="+myObj[x].w_num+" href='javascript:deletePost("+myObj[x].w_num+");'>삭제</a></li>";
		            txt += "</ul></div></div>";
	            } else if(myObj[x].user_id==user_id /*&& myObj[x].anonymity=="N"*/) {
	            	txt += "<div class=post-menu>";
		            txt += "<div class=dropdown>";
		            txt += "<a id=dLabel role=button data-toggle=dropdown class='btn btn-link' data-target=#>";
		            txt += "<i class='fa fa-sort-desc'></i></a>";
		            txt += "<ul class='dropdown-menu multi-level' role=menu aria-labelledby=dropdownMenu>";
		            txt += "<li><a id='post-edit-btn' class='post-control-edit ossn-wall-post-edit' data-guid="+myObj[x].w_num+" href=javascript:editPost_getContent("+myObj[x].w_num+");>수정</a></li>";
		            txt += "<li><a id='post-delete-btn' class='post-control-delete ossn-wall-post-delete' data-guid="+myObj[x].w_num+" href='javascript:deletePost("+myObj[x].w_num+");'>삭제</a></li>";
		            txt += "</ul></div></div>";
	            } else if(myObj[x].anonymity=="Y") {
	            	txt += "";
	            } else {
	            	txt += "<div class=post-menu>";
		            txt += "<div class=dropdown>";
		            txt += "<a id=dLabel role=button data-toggle=dropdown class='btn btn-link' data-target=#>";
		            txt += "<i class='fa fa-sort-desc'></i></a>";
		            txt += "<ul class='dropdown-menu multi-level' role=menu aria-labelledby=dropdownMenu>";
		            txt += "<li><a id='post-sendMsg-btn' class='post-control-sendMsg ossn-wall-post-sendMsg' data-guid="+myObj[x].w_num+" href=javascript:sendMsg("+myObj[x].user_id+");>글쓴이에게 쪽지 보내기</a></li>";
		            txt += "</ul></div></div>";
	            }
	            txt += "<div class=user>";
	            if(myObj[x].anonymity=="N"){
	            	txt += "<a class=owner-link>"+myObj[x].user_name+" </a></div>";
	            } else if(myObj[x].anonymity=="Non") {
	            	txt += "<a class=owner-link>관리자 </a></div>";
	            } else {
	            	txt += "<a class=owner-link>익명 </a></div>";
	            }
	            txt += "<div class=post-meta>";
	            txt += "<span class=time-created>"+myObj[x].w_date+"</span>";
	            txt += "<span class=time-created></span></div></div>";
	            txt += "<div class=post-contents><p id='writing-"+myObj[x].w_num+"'>"+content+"</p>";
	            if(myObj[x].save_filenames.length == 0) {
	            	txt += "</div>";
	            } else {
	            	for(key in myObj[x].save_filenames){
	            		var fileName = myObj[x].save_filenames[key].save_filename;
	            		var ext = checkExtension(fileName);
	            		
	            		if(ext == "video") {
	            			txt += "<video controls>";
	            			txt += "<source src=http://localhost:8888/resources/uploadFile/"+fileName+" type=video/"+cmpExtension(fileName)+"></video>";
	            		} else {
	            			txt += "<img src=http://localhost:8888/resources/uploadFile/"+fileName+">";
	            		}
	            	}
	            	txt += "</div>";
	            }         
	            txt += "<div class=comments-likes>";
	            txt += "<div class=menu-likes-comments-share>";
	            if(myObj[x].comment_cnt == 0) {
	            	txt += "<li><a id='comment-btn-"+myObj[x].w_num+"' class='post-control-comment comment-post' data-guid="+myObj[x].w_num+" href=javascript:showCommentBox("+myObj[x].w_num+")>댓글</a></li>";
	            } else {
	            	txt += "<li><a id='comment-btn-"+myObj[x].w_num+"' class='post-control-comment comment-post' data-guid="+myObj[x].w_num+" href=javascript:showCommentBox("+myObj[x].w_num+")>댓글 "+myObj[x].comment_cnt+"</a></li>";
	            }
	            if(myObj[x].like_cnt == 0) {
	            	txt += "<li><a id=ossn-like-"+myObj[x].w_num+" onclick='Ossn.PostLike("+myObj[x].w_num+");' class=post-control-like href=javascript:clickPostLike("+myObj[x].w_num+");>좋아요</a></li></div>";
	            } else {
	            	txt += "<li><a id=ossn-like-"+myObj[x].w_num+" onclick='Ossn.PostLike("+myObj[x].w_num+");' class=post-control-like href=javascript:clickPostLike("+myObj[x].w_num+");>좋아요 "+myObj[x].like_cnt+"</a></li></div>";
	            }			            	
	            txt += "<div class=comments-list id=comments-list-"+myObj[x].w_num+" style='display: none;'>";
	            txt += "<div class=ossn-comments-list-"+myObj[x].w_num+"></div>";
	            txt += "<div class=comments-item>";
	            txt += "<div class=row>";
	            txt += "<div class=col-md-1>";
	            if(myObj[x].user_img == "" || myObj[x].user_img == null) {
			    	txt += "<img class=comment-user-img src=resources/img/e9f94905272829984a707d6270721081.jpeg></div>";
			    } else {
			    	txt += "<img class=comment-user-img src=resources/userImage/"+myObj[x].user_img+"></div>";
			    }
	            txt += "<div class=col-md-11>";
	            txt += "<form action=https://demo.opensource-socialnetwork.org/action/post/comment id=comment-container-"+myObj[x].w_num+" class='ossn-form comment-container' autocomplete=off method=post enctype=multipart/form-data>";
	            txt += "<fieldset><input type=hidden name=ossn_ts value=1541654765>";
	            txt += "<input type=hidden name=ossn_token value=5bf764f2bf2aa4b3472f73d5c6080e95>";
	            txt += "<div class=ossn-comment-attach-photo onclick=Ossn.Clk('#ossn-comment-image-file-"+myObj[x].w_num+"');>";
	            txt += "<i class='fa fa-camera'></i></div>";
	            txt += "<div class=ossn-comment-attach-photo></div>";
	            txt += "<span type=text name=comment id=comment-box-"+myObj[x].w_num+" class=comment-box placeholder='Write a comment...' contenteditable=true onkeypress='javascript:postComment("+myObj[x].w_num+");'></span>";
	            txt += "<input type=hidden name=post value="+myObj[x].w_num+">";
	            txt += "<input type=hidden name=comment-attachment></fieldset></form></div></div></div>";
	            txt += "<script>Ossn.PostComment("+myObj[x].w_num+");</script>";
	            txt += "<div class=ossn-comment-attachment id=comment-attachment-container-"+myObj[x].w_num+">";
	            txt += "<script>Ossn.CommentImage("+myObj[x].w_num+");</script>";
	            txt += "<form id=ossn-comment-attachment-"+myObj[x].w_num+" class=ossn-form method=post enctype=multipart/form-data>";
	            txt += "<fieldset>";
	            txt += "<input type=hidden name=ossn_ts value=1541654765>";
	            txt += "<input type=hidden name=ossn_token value=5bf764f2bf2aa4b3472f73d5c6080e95>"; 
	            txt += "<input type=file name=file style=display: none; id=ossn-comment-image-file-+"+myObj[x].w_num+">";
	            txt += "<div class=image-data></div></fieldset></form></div></div></div></div></div></div>";
	            txt += "<!-- wall item end -->";
			}
			$(".user-activity-search").html(txt);
			
			console.log("검색 성공:D");
		},
		error: function(data) {
			console.log("검색 오류:(");
		}
	});
}

//확장자 확인
function cmpExtension(fileName) {
	var file = fileName;
	var ext = file.substr(file.length - 3);
	
	return ext;
}

// 해당 파일이 이미지인지 비디오인지 확인
function checkExtension(fileName) {
	var file = fileName;
	var ext = file.substr(file.length - 3);
	var kind;
	
	if(ext=="avi" || ext=="mpg" || ext=="mpeg" || ext=="mp4" || ext=="wmv" || ext=="flv" || ext=="mov" || ext=="flv") {
		kind = "video";
	} else {
		kind = "image";
	}
	
	return kind;
}

// 검색하기
function search() {
	if(event.keyCode == 13) {
		
		var selectBox = document.getElementById('search-type').value;
		console.log("검색 조건: " + selectBox);
		var search_word = $('#search-page-area').val();
		console.log("검색 키워드: " + search_word);
		
		var url = decodeURI(decodeURIComponent(document.location.href));
		var param = url.split("?");
		
		console.log("url: " + url);
		console.log("param: " + param[1]);
		
		var temp = param[1].split("&");
		console.log("tmp: " + temp);
		
		var dep_code = temp[2].split("=")[1];
		console.log("dep_code: " + dep_code);
		
		if(search_word == "") {
			alert("검색 내용을 입력하세요!");
			return false;
		}
		
		window.location.replace("http://localhost:8888/searchPost?searchType="+selectBox+"&searchWord="+encodeURI(encodeURIComponent(search_word))+"&dep="+dep_code);
	}
}

// 스크롤하여 제일 하단에 닿았을 경우 검색된 글 10개 추가로 띄우기
function loadSearchWriting() {
	$(window).scroll(function() {
		
		console.log("$(window).scroll(function()");
		console.log($(window).scrollTop());
		console.log($(document).height());
		console.log($(window).height());
		
		if(($(document).height() - $(window).height() - 1 <= $(window).scrollTop()) && ($(document).height() - $(window).height() + 1 >= $(window).scrollTop())) {
			console.log("페이지 제일 하단 도착!");
			
			var num = parseInt($('#calledNum_search').val());
			console.log("calledNum_search : " + num);
			
			var temp = num+1; 
			/*$('#calledNum').value = num+1;*/
			document.getElementById("calledNum_search").value = temp;
			console.log("수정된 calledNum: " + temp);
			
			var type = document.getElementById('search-type').value;
			var word = document.getElementById('search-page-area').value;
			console.log("스크롤하단_검색조건: " + type);
			console.log("스크롤하단_검색단어: " + word);
			
			var url = decodeURI(decodeURIComponent(document.location.href));
			var param = url.split("?");
			
			console.log("url: " + url);
			console.log("param: " + param[1]);
			
			var temp = param[1].split("&");
			console.log("tmp: " + temp);
			
			var dep_code = temp[2].split("=")[1];
			console.log("dep_code: " + dep_code);
			
			var sendData = {calledNum : num, type: type, word: word, dep_code: dep_code};
			
			//var user_dep = $('#user_dep').val();
			var user_id = $('#user_id').val();
			
			$.ajax({
				url : 'http://localhost:8888/searchExtraPost',
				method : 'POST',
				data : JSON.stringify(sendData),
				dataType : 'json',
				processData : false,
				contentType : 'application/json',
				success : function(data) {
					
					var myObj = data;
					var txt = "";
					var x;
					
					for(x in myObj) {
						
						var content = myObj[x].w_content.replace(/(?:\r\n|\r|\n)/g, '<br>');
			        	
			        	txt += "<!-- wall item start -->";
			            txt += "<div class=ossn-wall-item id=activity-item-"+myObj[x].w_num+">";
			            txt += "<div class=row>";
			            txt += "<div class=meta>";
			            txt += "<img class=user-img ";
			            if(myObj[x].user_img=="" || myObj[x].user_img==null || myObj[x].anonymity=="Y") {
			            	txt += "src=resources/img/default-user-icon-11.jpg>";
			            } else { 
			            	txt += "src=http://localhost:8888/resources/userImage/"+myObj[x].user_img+">";
			            }
			            console.log("myObj[x].user_id: " + myObj[x].user_id);
			            if(user_id == "admin" && myObj[x].anonymity=='N') {
			            	txt += "<div class=post-menu>";
				            txt += "<div class=dropdown>";
				            txt += "<a id=dLabel role=button data-toggle=dropdown class='btn btn-link' data-target=#>";
				            txt += "<i class='fa fa-sort-desc'></i></a>";
				            txt += "<ul class='dropdown-menu multi-level' role=menu aria-labelledby=dropdownMenu>";
				            txt += "<li><a id='post-sendMsg-btn' class='post-control-sendMsg ossn-wall-post-sendMsg' data-guid="+myObj[x].w_num+" href=javascript:sendMsg("+myObj[x].user_id+");>글쓴이에게 쪽지 보내기</a></li>";
				            txt += "<li><a id='post-edit-btn' class='post-control-edit ossn-wall-post-edit' data-guid="+myObj[x].w_num+" href=javascript:editPost_getContent("+myObj[x].w_num+");>수정</a></li>";
				            txt += "<li><a id='post-delete-btn' class='post-control-delete ossn-wall-post-delete' data-guid="+myObj[x].w_num+" href='javascript:deletePost("+myObj[x].w_num+");'>삭제</a></li>";
				            txt += "</ul></div></div>";
			            } else if(user_id == "admin" && myObj[x].anonymity=='Y') {
			            	txt += "<div class=post-menu>";
				            txt += "<div class=dropdown>";
				            txt += "<a id=dLabel role=button data-toggle=dropdown class='btn btn-link' data-target=#>";
				            txt += "<i class='fa fa-sort-desc'></i></a>";
				            txt += "<ul class='dropdown-menu multi-level' role=menu aria-labelledby=dropdownMenu>";
				            txt += "<li><a id='post-edit-btn' class='post-control-edit ossn-wall-post-edit' data-guid="+myObj[x].w_num+" href=javascript:editPost_getContent("+myObj[x].w_num+");>수정</a></li>";
				            txt += "<li><a id='post-delete-btn' class='post-control-delete ossn-wall-post-delete' data-guid="+myObj[x].w_num+" href='javascript:deletePost("+myObj[x].w_num+");'>삭제</a></li>";
				            txt += "</ul></div></div>";
			            } else if(myObj[x].user_id==user_id /*&& myObj[x].anonymity=="N"*/) {
			            	txt += "<div class=post-menu>";
				            txt += "<div class=dropdown>";
				            txt += "<a id=dLabel role=button data-toggle=dropdown class='btn btn-link' data-target=#>";
				            txt += "<i class='fa fa-sort-desc'></i></a>";
				            txt += "<ul class='dropdown-menu multi-level' role=menu aria-labelledby=dropdownMenu>";
				            txt += "<li><a id='post-edit-btn' class='post-control-edit ossn-wall-post-edit' data-guid="+myObj[x].w_num+" href=javascript:editPost_getContent("+myObj[x].w_num+");>수정</a></li>";
				            txt += "<li><a id='post-delete-btn' class='post-control-delete ossn-wall-post-delete' data-guid="+myObj[x].w_num+" href='javascript:deletePost("+myObj[x].w_num+");'>삭제</a></li>";
				            txt += "</ul></div></div>";
			            } else if(myObj[x].anonymity=="Y") {
			            	txt += "";
			            } else {
			            	txt += "<div class=post-menu>";
				            txt += "<div class=dropdown>";
				            txt += "<a id=dLabel role=button data-toggle=dropdown class='btn btn-link' data-target=#>";
				            txt += "<i class='fa fa-sort-desc'></i></a>";
				            txt += "<ul class='dropdown-menu multi-level' role=menu aria-labelledby=dropdownMenu>";
				            txt += "<li><a id='post-sendMsg-btn' class='post-control-sendMsg ossn-wall-post-sendMsg' data-guid="+myObj[x].w_num+" href=javascript:sendMsg("+myObj[x].user_id+");>글쓴이에게 쪽지 보내기</a></li>";
				            txt += "</ul></div></div>";
			            }
			            txt += "<div class=user>";
			            if(myObj[x].anonymity=="N"){
			            	txt += "<a class=owner-link>"+myObj[x].user_name+" </a></div>";
			            } else {
			            	txt += "<a class=owner-link>익명 </a></div>";
			            }
			            txt += "<div class=post-meta>";
			            txt += "<span class=time-created>"+myObj[x].w_date+"</span>";
			            txt += "<span class=time-created></span></div></div>";
			            txt += "<div class=post-contents><p id='writing-"+myObj[x].w_num+"'>"+content+"</p>";
			            if(myObj[x].save_filenames.length == 0) {
			            	txt += "</div>";
			            } else {
			            	for(key in myObj[x].save_filenames){
			            		var fileName = myObj[x].save_filenames[key].save_filename;
			            		var ext = checkExtension(fileName);
			            		
			            		if(ext == "video") {
			            			txt += "<video controls>";
			            			txt += "<source src=http://localhost:8888/resources/uploadFile/"+fileName+" type=video/"+cmpExtension(fileName)+"></video>";
			            		} else {
			            			txt += "<img src=http://localhost:8888/resources/uploadFile/"+fileName+">";
			            		}
			            	}
			            	txt += "</div>";
			            }         
			            txt += "<div class=comments-likes>";
			            txt += "<div class=menu-likes-comments-share>";
			            if(myObj[x].comment_cnt == 0) {
			            	txt += "<li><a id='comment-btn-"+myObj[x].w_num+"' class='post-control-comment comment-post' data-guid="+myObj[x].w_num+" href=javascript:showCommentBox("+myObj[x].w_num+")>댓글</a></li>";
			            } else {
			            	txt += "<li><a id='comment-btn-"+myObj[x].w_num+"' class='post-control-comment comment-post' data-guid="+myObj[x].w_num+" href=javascript:showCommentBox("+myObj[x].w_num+")>댓글 "+myObj[x].comment_cnt+"</a></li>";
			            }
			            if(myObj[x].like_cnt == 0) {
			            	txt += "<li><a id=ossn-like-"+myObj[x].w_num+" onclick='Ossn.PostLike("+myObj[x].w_num+");' class=post-control-like href=javascript:clickPostLike("+myObj[x].w_num+");>좋아요</a></li></div>";
			            } else {
			            	txt += "<li><a id=ossn-like-"+myObj[x].w_num+" onclick='Ossn.PostLike("+myObj[x].w_num+");' class=post-control-like href=javascript:clickPostLike("+myObj[x].w_num+");>좋아요 "+myObj[x].like_cnt+"</a></li></div>";
			            }			            	
			            txt += "<div class=comments-list id=comments-list-"+myObj[x].w_num+" style='display: none;'>";
			            txt += "<div class=ossn-comments-list-"+myObj[x].w_num+"></div>";
			            txt += "<div class=comments-item>";
			            txt += "<div class=row>";
			            txt += "<div class=col-md-1>";
			            if(myObj[x].user_img == "" || myObj[x].user_img == null) {
					    	txt += "<img class=comment-user-img src=resources/img/e9f94905272829984a707d6270721081.jpeg></div>";
					    } else {
					    	txt += "<img class=comment-user-img src=resources/userImage/"+myObj[x].user_img+"></div>";
					    }
			            txt += "<div class=col-md-11>";
			            txt += "<form action=https://demo.opensource-socialnetwork.org/action/post/comment id=comment-container-"+myObj[x].w_num+" class='ossn-form comment-container' autocomplete=off method=post enctype=multipart/form-data>";
			            txt += "<fieldset><input type=hidden name=ossn_ts value=1541654765>";
			            txt += "<input type=hidden name=ossn_token value=5bf764f2bf2aa4b3472f73d5c6080e95>";
			            /*txt += "<div class=ossn-comment-attach-photo onclick=Ossn.Clk('#ossn-comment-image-file-"+myObj[x].w_num+"');>";
			            txt += "<i class='fa fa-camera'></i></div>";
			            txt += "<div class=ossn-comment-attach-photo></div>";*/
			            txt += "<span type=text name=comment id=comment-box-"+myObj[x].w_num+" class=comment-box placeholder='Write a comment...' contenteditable=true onkeypress='javascript:postComment("+myObj[x].w_num+");'></span>";
			            txt += "<input type=hidden name=post value="+myObj[x].w_num+">";
			            txt += "<input type=hidden name=comment-attachment></fieldset></form></div></div></div>";
			            txt += "<script>Ossn.PostComment("+myObj[x].w_num+");</script>";
			            txt += "<div class=ossn-comment-attachment id=comment-attachment-container-"+myObj[x].w_num+">";
			            txt += "<script>Ossn.CommentImage("+myObj[x].w_num+");</script>";
			            txt += "<form id=ossn-comment-attachment-"+myObj[x].w_num+" class=ossn-form method=post enctype=multipart/form-data>";
			            txt += "<fieldset>";
			            txt += "<input type=hidden name=ossn_ts value=1541654765>";
			            txt += "<input type=hidden name=ossn_token value=5bf764f2bf2aa4b3472f73d5c6080e95>"; 
			            txt += "<input type=file name=file style=display: none; id=ossn-comment-image-file-+"+myObj[x].w_num+">";
			            txt += "<div class=image-data></div></fieldset></form></div></div></div></div></div></div>";
			            txt += "<!-- wall item end -->";
					}
					
					$(".user-activity-search").append(txt);
					
				},
				error : function(data, status, err) {
					//alert('ERROR!');
					console.log(data);
				}
			});
		}
		
	});
}

// 검색 페이지 우측에 공지로 설정된 글 띄우기
function getNoticeInfo() {
	//var user_dep = document.getElementById("user_dep").value;
	var user_id = document.getElementById("user_id").value;
	console.log("유저어ㅓ어어넘버어어어ㅓ:" + user_id);
	
	var user_img = $('#user_img').val();
	console.log("유저 프로필 사진: " + user_img);
	
	$.ajax({
		url:'http://localhost:8888/noticePostList',
		method:'POST',
		processData:false,
		contentType:false,
		success:function(data){
			var myObj = data;
			var txt = "";
			var x;
			
			for (x in myObj) {
				
				var content = myObj[x].w_content.replace(/(?:\r\n|\r|\n)/g, '<br>');
				
				txt += "<div class='ossn-wall-item' id='activity-item-"+myObj[x].w_num+"' style='margin-top: 10px;'>";
				txt += "<div class='row'>";
				txt += "<div class='meta'>";
				txt += "<div class='post-meta'>";
				txt += "<span class='time-created'>"+myObj[x].w_date+"</span>";
				txt += "<span class='time-created'></span></div></div>";
				txt += "<div class='post-contents'><p id='writing-"+myObj[x].w_num+"'>"+content+"</p>";
				if(myObj[x].save_filenames.length == 0) {
	            	txt += "</div>";
	            } else {
	            	for(key in myObj[x].save_filenames){
	            		console.log("------파일 이름: " + myObj[x].save_filenames[key].save_filenames);
	            		
	            		var fileName = myObj[x].save_filenames[key].save_filename;
	            		var ext = checkExtension(fileName);
	            		
	            		if(ext == "video") {
	            			txt += "<video class='cam-video' controls>";
	            			txt += "<source src=http://localhost:8888/resources/uploadFile/"+fileName+" type=video/"+cmpExtension(fileName)+"></video>";
	            		} else {
	            			txt += "<img src=http://localhost:8888/resources/uploadFile/"+fileName+">";
	            		}
	            	}
	            	txt += "</div>";
	            }
				txt += "</div></div></div>";
	        }
			
	        document.getElementById("notice-area-right").innerHTML = txt;
			
			console.log("처음 10개 글 가져오기 성공:D");
		},
		error: function(data) {
			console.log("처음 10개 글 가져오기 오류:(");
		}
	});
}

// 좋아요 많은 글 세 개 페이지 우측에 띄우기
function bestLikePostInfo() {
	//var user_dep = document.getElementById("user_dep").value;
	var user_id = document.getElementById("user_id").value;
	console.log("유저어ㅓ어어넘버어어어ㅓ:" + user_id);
	
	var user_img = $('#user_img').val();
	console.log("유저 프로필 사진: " + user_img);
	
	$.ajax({
		url:'http://localhost:8888/bestLikePostInfo',
		method:'POST',
		processData:false,
		contentType:false,
		success:function(data){
			var myObj = data;
			var txt = "";
			var x;
			
			for (x in myObj) {
				
				var content = myObj[x].w_content.replace(/(?:\r\n|\r|\n)/g, '<br>');
				
				txt += "<div class='ossn-wall-item' id='activity-item-"+myObj[x].w_num+"' style='margin-top: 10px;'>";
				txt += "<div class='row'>";
				txt += "<div class='meta'>";
				txt += "<div class='post-meta'>";
				txt += "<span class='time-created'>"+myObj[x].w_date+"</span>";
				txt += "<span class='time-created'></span></div></div>";
				txt += "<div class='post-contents'><p id='writing-"+myObj[x].w_num+"'>"+content+"</p>";
				if(myObj[x].save_filenames.length == 0) {
	            	txt += "</div>";
	            } else {
	            	for(key in myObj[x].save_filenames){
	            		console.log("------파일 이름: " + myObj[x].save_filenames[key].save_filenames);
	            		
	            		var fileName = myObj[x].save_filenames[key].save_filename;
	            		var ext = checkExtension(fileName);
	            		
	            		if(ext == "video") {
	            			txt += "<video class='cam-video' controls>";
	            			txt += "<source src=http://localhost:8888/resources/uploadFile/"+fileName+" type=video/"+cmpExtension(fileName)+"></video>";
	            		} else {
	            			txt += "<img src=http://localhost:8888/resources/uploadFile/"+fileName+">";
	            		}
	            	}
	            	txt += "</div>";
	            }
				txt += "</div></div></div>";
	        }
			
	        document.getElementById("best-post-like-area-right").innerHTML = txt;
			
		},
		error: function(data) {
			
		}
	});
}

// 댓글 많은 글 세 개 페이지 우측에 띄우기
function bestCommentPostInfo() {
	//var user_dep = document.getElementById("user_dep").value;
	var user_id = document.getElementById("user_id").value;
	console.log("유저어ㅓ어어넘버어어어ㅓ:" + user_id);
	
	var user_img = $('#user_img').val();
	console.log("유저 프로필 사진: " + user_img);
	
	$.ajax({
		url:'http://localhost:8888/bestCommentPostInfo',
		method:'POST',
		processData:false,
		contentType:false,
		success:function(data){
			var myObj = data;
			var txt = "";
			var x;
			
			for (x in myObj) {
				
				var content = myObj[x].w_content.replace(/(?:\r\n|\r|\n)/g, '<br>');
				
				txt += "<div class='ossn-wall-item' id='activity-item-"+myObj[x].w_num+"' style='margin-top: 10px;'>";
				txt += "<div class='row'>";
				txt += "<div class='meta'>";
				txt += "<div class='post-meta'>";
				txt += "<span class='time-created'>"+myObj[x].w_date+"</span>";
				txt += "<span class='time-created'></span></div></div>";
				txt += "<div class='post-contents'><p id='writing-"+myObj[x].w_num+"'>"+content+"</p>";
				if(myObj[x].save_filenames.length == 0) {
	            	txt += "</div>";
	            } else {
	            	for(key in myObj[x].save_filenames){
	            		console.log("------파일 이름: " + myObj[x].save_filenames[key].save_filenames);
	            		
	            		var fileName = myObj[x].save_filenames[key].save_filename;
	            		var ext = checkExtension(fileName);
	            		
	            		if(ext == "video") {
	            			txt += "<video class='cam-video' controls>";
	            			txt += "<source src=http://localhost:8888/resources/uploadFile/"+fileName+" type=video/"+cmpExtension(fileName)+"></video>";
	            		} else {
	            			txt += "<img src=http://localhost:8888/resources/uploadFile/"+fileName+">";
	            		}
	            	}
	            	txt += "</div>";
	            }
				txt += "</div></div></div>";
	        }
			
	        document.getElementById("best-post-area-comment-right").innerHTML = txt;
			
		},
		error: function(data) {
			
		}
	});
}