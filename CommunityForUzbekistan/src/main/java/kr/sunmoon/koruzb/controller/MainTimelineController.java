package kr.sunmoon.koruzb.controller;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import kr.sunmoon.koruzb.model.CommentInfo;
import kr.sunmoon.koruzb.model.PostInfo;
import kr.sunmoon.koruzb.service.MainTimelineService;

@RestController
public class MainTimelineController {
	private static final Logger logger = LoggerFactory.getLogger(MainTimelineController.class);
	private MainTimelineService mainTimelineService;
	
	@Autowired
	public void setMainTimelineService(MainTimelineService mainTimelineService) {
		this.mainTimelineService = mainTimelineService;
	}
	
	// 글 올리기
	@RequestMapping(value="/post")
	public PostInfo posting(@RequestParam Map<String, Object> post,
			                MultipartHttpServletRequest request) throws Exception {
		
		/*Post post1 = new Post();*/
		PostInfo w_info = new PostInfo();
		
		/*post1.setUser_num(Integer.parseInt(post.get("user_num").toString()));
		post1.setW_content(post.get("post_content").toString());*/
		w_info.setUser_id(post.get("user_id").toString());
		w_info.setW_content(post.get("post_content").toString());
		w_info.setDep_code(post.get("page_dep_code").toString());
		w_info.setSellFlg(post.get("sellFlg").toString());
		
		logger.info("사용자 아이디: " + w_info.getUser_id());
		logger.info("글 내용: " + w_info.getW_content());

		if(post.get("anonymity").toString().equals("non-anonymous")) w_info.setAnonymity("N");
		else w_info.setAnonymity("Y");
		
		logger.info("익명여부: " + w_info.getAnonymity());
		
		// 작성 시간
		Date today = new Date();
		SimpleDateFormat date = new SimpleDateFormat("yyyy년 MM월 dd일");
		SimpleDateFormat time = new SimpleDateFormat("a hh시 mm분");
		
		String now = date.format(today) + " " + time.format(today);
		
		w_info.setW_date(now);
		
		logger.info("작성시간: " + w_info.getW_date());
		
		// 파일 저장
		int index = 0;
		
		String root = request.getSession().getServletContext().getRealPath("/");
	    String path = root + "/resources/uploadFile/"; 
	         
	    String newFileName = ""; // 업로드 되는 파일명
	    String fileName    = "";
      
	    File dir = new File(path);
	    if(!dir.isDirectory()){
	    	dir.mkdir();
	    }
	         
	    List<MultipartFile> image_files = request.getFiles("ossn_photo"); 
	    
	    if(image_files.size() == 1 && image_files.get(0).getOriginalFilename().equals("")) {
	    	
	    } else {
	    	for(int i=0; i<image_files.size(); i++) {
	    		index = i;
	    		// 본래 파일명
	    		String originalFileName = image_files.get(i).getOriginalFilename();
	    		w_info.orig_filename.add(originalFileName);
	    		logger.info("원래 파일명 : " + w_info.orig_filename.get(i));
	    		// 저장되는 파일 이름
	    		String saveFileName = System.currentTimeMillis() + "." + originalFileName.substring(originalFileName.lastIndexOf(".") + 1);
	    		w_info.save_filename.add(saveFileName);
			    logger.info("저장 위치 : " + path + w_info.save_filename.get(i));
			    
			    try {
			    	image_files.get(i).transferTo(new File(path + saveFileName));
			    } catch (Exception e) {
			         e.printStackTrace();
			    }
	    	}
	    }	 
	    
	    List<MultipartFile> video_files = request.getFiles("ossn_video");
	     
	    if(video_files.size() == 1 && video_files.get(0).getOriginalFilename().equals("")) {
	    	
	    } else {
	    	for(int j=index; j<video_files.size()+index; j++) {
	    		// 본래 파일명
	    		String originalFileName = video_files.get(j).getOriginalFilename();
	    		w_info.orig_filename.add(originalFileName);
	    		logger.info("원래 파일명 : " + w_info.orig_filename.get(j));
	    		// 저장되는 파일 이름
	    		String saveFileName = System.currentTimeMillis() + "." + originalFileName.substring(originalFileName.lastIndexOf(".") + 1);
	    		w_info.save_filename.add(saveFileName);
			    logger.info("저장 위치 : " + path + w_info.save_filename.get(j));
			    
			    try {
			    	video_files.get(j).transferTo(new File(path + saveFileName));
			    } catch (Exception e) {
			         e.printStackTrace();
			    }
	    	}
	    }
	    mainTimelineService.insertRecord(w_info);
	    
	    // 글 번호 가져오기
	    int w_num = mainTimelineService.getW_num(w_info.getUser_id(), w_info.getW_date(), w_info.getW_content(), w_info.getDep_code());
	    w_info.setW_num(w_num);
	    
	    logger.info("values: " + w_info.toString());
	    
	    return w_info;
	}
	
	// 처음 글 10개 가져오기
	@RequestMapping("/postList")
	public List<PostInfo> postList(@RequestBody Map<String, Object> data) {
		logger.info("Kwak @RequestMapping /list");
		
		String dep_code = data.get("dep_code").toString();
		
		return mainTimelineService.getAllWriting(dep_code);
	}
	
	// 스크롤 내릴때마다 글 10개씩 더 가져오기
	@RequestMapping("/extraPost")
	public List<PostInfo> extraPostList(@RequestBody Map<String, Object> data) {
		logger.info("Kwak @RequestMapping /extraPost");
		
		int calledNum = Integer.parseInt(data.get("calledNum").toString());
		String dep_code = data.get("dep_code").toString();
		
		return mainTimelineService.getExtraWriting(dep_code, calledNum);
	}
	
	// 댓글 쓰기
	@RequestMapping(value="/writeComment")
	@ResponseBody
	public CommentInfo writeComment(@RequestBody Map<String, Object> comment
			                /*MultipartHttpServletRequest request*/) throws Exception {
		
		CommentInfo c_info = new CommentInfo();
		
		c_info.setW_num(Integer.parseInt(comment.get("w_num").toString()));
		c_info.setUser_id(comment.get("user_id").toString());
		c_info.setC_content(comment.get("c_content").toString());
		
		// 작성 시간
		Date today = new Date();
		SimpleDateFormat date = new SimpleDateFormat("yyyy년 MM월 dd일");
		SimpleDateFormat time = new SimpleDateFormat("a hh시 mm분");
				
		String now = date.format(today) + " " + time.format(today);
				
		c_info.setC_time(now);
		
		logger.info("글 번호: " + c_info.getW_num());
		logger.info("작성자 아이디: " + c_info.getUser_id());
		logger.info("댓글 내용: " + c_info.getC_content());
		logger.info("작성 시간: " + c_info.getC_time());
		
		mainTimelineService.saveComment(c_info);
		
		// 글 번호 가져오기
	    int c_num = mainTimelineService.getC_num(c_info.getUser_id(), c_info.getC_time(), c_info.getC_content());
	    c_info.setC_num(c_num);
	    
	    logger.info("values: " + c_info.toString());
	    
	    return c_info;
	}
	
	// 댓글 가져오기
	@ResponseBody
	@RequestMapping("/commentList")
	public List<CommentInfo> commentList(@RequestBody Map<String, Object> comment) throws Exception {
		
		logger.info("Kwak @RequestMapping /commentList");
		
		int w_num = Integer.parseInt(comment.get("w_num").toString());
		
		return mainTimelineService.getAllComments(w_num);
	}
	
	// 글 삭제하기
	@ResponseBody
	@RequestMapping("/deletePost")
	public void deletePost(@RequestBody Map<String, Object> num) throws Exception {
		
		logger.info("Kwak @RequestMapping /deletePost");
		
		int w_num = Integer.parseInt(num.get("w_num").toString());
		
		mainTimelineService.deletePost(w_num);
	}
	
	// 댓글 삭제하기
	@ResponseBody
	@RequestMapping("/deleteComment")
	public int deleteComment(@RequestBody Map<String, Object> num) throws Exception {

		logger.info("Kwak @RequestMapping /deleteComment");

		int c_num = Integer.parseInt(num.get("c_num").toString());

		return mainTimelineService.deleteComment(c_num);
	}

	// 수정_글 불러오기
	@ResponseBody
	@RequestMapping(value="/getPostContent", produces="application/text;charset=utf8")
	public String getPostContent(@RequestBody Map<String, Object> data) throws Exception {

		logger.info("Kwak @RequestMapping /deleteComment");

		int w_num = Integer.parseInt(data.get("w_num").toString());
		String dep_code = data.get("dep_code").toString();

		return mainTimelineService.getPostContent(w_num, dep_code);
	}
	
	// 글 수정하기
	@ResponseBody
	@RequestMapping("/editPost")
	public void editPost(@RequestBody Map<String, Object> w_info) throws Exception {

		logger.info("Kwak @RequestMapping /editPost");
		
		int w_num = Integer.parseInt(w_info.get("w_num").toString());
		String w_content = w_info.get("w_content").toString();
				
		mainTimelineService.editPost(w_num, w_content);
	}
	
	// 수정_댓글 불러오기
	@ResponseBody
	@RequestMapping(value = "/getCommentContent", produces = "application/text;charset=utf8")
	public String getCommentContent(@RequestBody Map<String, Object> data) throws Exception {

		logger.info("Kwak @RequestMapping /deleteComment");

		int c_num = Integer.parseInt(data.get("c_num").toString());
		String dep_code = data.get("dep_code").toString();

		return mainTimelineService.getCommentContent(c_num, dep_code);
	}
	
	// 댓글 수정하기
	@ResponseBody
	@RequestMapping("/editComment")
	public int editComment(@RequestBody Map<String, Object> c_info) throws Exception {

		logger.info("Kwak @RequestMapping /editPost");

		int c_num = Integer.parseInt(c_info.get("c_num").toString());
		String c_content = c_info.get("c_content").toString();

		int w_num = mainTimelineService.editComment(c_num, c_content);
		logger.info("해당 댓글의 글 번호: " + w_num);
		return w_num;
	}
	
	// 글 좋아요 기능
	@ResponseBody
	@RequestMapping("/postLike")
	public int setPostLike(@RequestBody Map<String, Object> data) throws Exception {
		
		logger.info("Kwak @RequestMapping /postLike");
		
		int w_num = Integer.parseInt(data.get("w_num").toString());
		
		return mainTimelineService.setPostLike(w_num);
	}
	
	// 댓글 좋아요 기능
	@ResponseBody
	@RequestMapping("/commentLike")
	public int setCommentLike(@RequestBody Map<String, Object> data) throws Exception {

		logger.info("Kwak @RequestMapping /commentLike");

		int c_num = Integer.parseInt(data.get("c_num").toString());

		return mainTimelineService.setCommentLike(c_num);
	}
	
	// 검색 단어에 해당하는 처음 10개 글 불러오기
	@ResponseBody
	@RequestMapping("/search")
	public List<PostInfo> searchPostList(@RequestBody Map<String, Object> data) throws Exception {

		logger.info("Kwak @RequestMapping /search");

		String search_type = data.get("type").toString();
		String search_word = data.get("word").toString();
		String dep_code = data.get("dep_code").toString();

		return mainTimelineService.getSearchWriting(search_type, search_word, dep_code);
	}
	
	// 스크롤 내릴때마다 검색 글 10개씩 더 가져오기
	@RequestMapping("/searchExtraPost")
	public List<PostInfo> searchExtraPostList(@RequestBody Map<String, Object> data) {
		logger.info("Kwak @RequestMapping /searchExtraPost");
		
		int calledNum = Integer.parseInt(data.get("calledNum").toString());
		String search_type = data.get("type").toString();
		String search_word = data.get("word").toString();
		String dep_code = data.get("dep_code").toString();
		
		return mainTimelineService.getSearchExtraWriting(calledNum, search_type, search_word, dep_code);
	}
	
	
	// 공지사항 탭 관련 함수
	// 공지글 올리기
	@RequestMapping(value = "/postNotice")
	public PostInfo postNotice(@RequestParam Map<String, Object> post, MultipartHttpServletRequest request)
			throws Exception {
		
		PostInfo w_info = new PostInfo();

		w_info.setUser_id(post.get("user_id").toString());
		w_info.setW_content(post.get("post_content").toString());
		w_info.setDep_code("N"); // 코드를 N(공지글)로 설정해주기

		logger.info("사용자 아이디: " + w_info.getUser_id());
		logger.info("글 내용: " + w_info.getW_content());

		w_info.setAnonymity("Non");

		logger.info("익명여부: " + w_info.getAnonymity());

		// 작성 시간
		Date today = new Date();
		SimpleDateFormat date = new SimpleDateFormat("yyyy년 MM월 dd일");
		SimpleDateFormat time = new SimpleDateFormat("a hh시 mm분");

		String now = date.format(today) + " " + time.format(today);

		w_info.setW_date(now);

		logger.info("작성시간: " + w_info.getW_date());

		// 파일 저장
		int index = 0;

		String root = request.getSession().getServletContext().getRealPath("/");
		String path = root + "/resources/uploadFile/";

		String newFileName = ""; // 업로드 되는 파일명
		String fileName = "";

		File dir = new File(path);
		if (!dir.isDirectory()) {
			dir.mkdir();
		}

		List<MultipartFile> image_files = request.getFiles("ossn_photo");

		if (image_files.size() == 1 && image_files.get(0).getOriginalFilename().equals("")) {

		} else {
			for (int i = 0; i < image_files.size(); i++) {
				index = i;
				// 본래 파일명
				String originalFileName = image_files.get(i).getOriginalFilename();
				w_info.orig_filename.add(originalFileName);
				logger.info("원래 파일명 : " + w_info.orig_filename.get(i));
				// 저장되는 파일 이름
				String saveFileName = System.currentTimeMillis() + "."
						+ originalFileName.substring(originalFileName.lastIndexOf(".") + 1);
				w_info.save_filename.add(saveFileName);
				logger.info("저장 위치 : " + path + w_info.save_filename.get(i));

				try {
					image_files.get(i).transferTo(new File(path + saveFileName));
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}

		List<MultipartFile> video_files = request.getFiles("ossn_video");

		if (video_files.size() == 1 && video_files.get(0).getOriginalFilename().equals("")) {

		} else {
			for (int j = index; j < video_files.size() + index; j++) {
				// 본래 파일명
				String originalFileName = video_files.get(j).getOriginalFilename();
				w_info.orig_filename.add(originalFileName);
				logger.info("원래 파일명 : " + w_info.orig_filename.get(j));
				// 저장되는 파일 이름
				String saveFileName = System.currentTimeMillis() + "."
						+ originalFileName.substring(originalFileName.lastIndexOf(".") + 1);
				w_info.save_filename.add(saveFileName);
				logger.info("저장 위치 : " + path + w_info.save_filename.get(j));

				try {
					video_files.get(j).transferTo(new File(path + saveFileName));
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}
		mainTimelineService.postNotice(w_info);

		// 글 번호 가져오기
		int w_num = mainTimelineService.getW_num(w_info.getUser_id(), w_info.getW_date(), w_info.getW_content(),
				w_info.getDep_code());
		w_info.setW_num(w_num);

		logger.info("values: " + w_info.toString());

		return w_info;
	}
	
	// 공지 글의 플래그 Y로 바꾸기
	@ResponseBody
	@RequestMapping("/putUpNotice")
	public void putUpNotice(@RequestBody Map<String, Object> num) throws Exception {

		logger.info("Kwak @RequestMapping /deletePost");

		int w_num = Integer.parseInt(num.get("w_num").toString());

		mainTimelineService.putUpNotice(w_num);
	}
	
	// 공지 글의 플래그 N로 바꾸기
	@ResponseBody
	@RequestMapping("/putDownNotice")
	public void putDownNotice(@RequestBody Map<String, Object> num) throws Exception {

		logger.info("Kwak @RequestMapping /putDownNotice");

		int w_num = Integer.parseInt(num.get("w_num").toString());

		mainTimelineService.putDownNotice(w_num);
	}
	
	// 공지 글로 설정된 글 가져오기
	@ResponseBody
	@RequestMapping("/noticePostList")
	public List<PostInfo> noticePostList() throws Exception {

		logger.info("Kwak @RequestMapping /noticePostList");

		return mainTimelineService.noticePostList();
	}
	
	// 좋아요 가장 많은 글 세 개 가져오기
	@ResponseBody
	@RequestMapping("/bestLikePostInfo")
	public List<PostInfo> bestLikePostInfo() throws Exception {

		logger.info("Kwak @RequestMapping /bestLikePostInfo");

		return mainTimelineService.bestLikePostInfo();
	}
	
	// 댓글 가장 많은 글 세 개 가져오기
	@ResponseBody
	@RequestMapping("/bestCommentPostInfo")
	public List<PostInfo> bestCommentPostInfo() throws Exception {

		logger.info("Kwak @RequestMapping /bestCommentPostInfo");

		return mainTimelineService.bestCommentPostInfo();
	}
	
	// 판매완료 처리하기
	@ResponseBody
	@RequestMapping("/sellComplete")
	public void sellComplete(@RequestBody Map<String, Object> info) throws Exception {
		
		int w_num = Integer.parseInt(info.get("w_num").toString());
		
		mainTimelineService.sellComplete(w_num);
	}
	
	// 판매완료 취소 처리하기
	@ResponseBody
	@RequestMapping("/sellCompleteCancel")
	public void sellCompleteCancel(@RequestBody Map<String, Object> info) throws Exception {
		
		int w_num = Integer.parseInt(info.get("w_num").toString());
		
		mainTimelineService.sellCompleteCancel(w_num);
	}
}	
