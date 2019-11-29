package kr.sunmoon.koruzb.controller;

import java.io.File;
import java.util.Iterator;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

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

import kr.sunmoon.koruzb.model.UserInfo;
import kr.sunmoon.koruzb.service.MypageService;
import kr.sunmoon.koruzb.service.RegisterService;


@RestController
public class MyPageController {
	private static final Logger logger = LoggerFactory.getLogger(MyPageController.class);
	
	private RegisterService registerService;
	private MypageService mypageService;

	@Autowired
	public void setRegisterService(RegisterService registerService) {
		this.registerService = registerService;
	}
	
	@Autowired
	public void setMypageService(MypageService mypageService) {
		this.mypageService = mypageService;
	}
		
	@RequestMapping(value = "/insertProfile")
	public String insertProfile(@RequestParam Map<String, Object> user_info
			                ,MultipartHttpServletRequest request) throws Exception {
		
		logger.info("@RequestMapping insertProfile called.");
		UserInfo DBuserInfo = new UserInfo();
		
		String user_id = user_info.get("user_id").toString();
		
		logger.info(user_id);
 
		String profile_info = "";
		
		String root = request.getSession().getServletContext().getRealPath("/");
	    String path = root+"/resources/userImage/"; 
	         
	    String newFileName = ""; // 업로드 되는 파일명
	    String fileName    = "";
      
	    File dir = new File(path);
	    if(!dir.isDirectory()){
	    	dir.mkdir();
	    }
	         
	    Iterator<String> files = request.getFileNames();
	        
	    while(files.hasNext()){
	     String uploadFile = files.next();
	                         
	        MultipartFile mFile = request.getFile(uploadFile);
	        fileName = mFile.getOriginalFilename();
	        newFileName = System.currentTimeMillis()+"."+fileName.substring(fileName.lastIndexOf(".")+1);
	             
	        
	        //request.getSession().setAttribute(fileName);
	        
	        logger.info("originalName: " + fileName);
			logger.info("size: " + newFileName);
	        logger.info(path);
	        
	        try {
	       	 mFile.transferTo(new File(path+newFileName));
	        } catch (Exception e) {
	            e.printStackTrace();
	        }
	    }
	    request.getSession().setAttribute("user_img",newFileName);
	    logger.info( request.getSession().getAttribute("user_img").toString());

	    mypageService.saveProfileService(newFileName,user_id);
	  
	    return newFileName;
	}
	
	@RequestMapping(value = "/editUserInfo")
	public void editUserInfo(@RequestParam Map<String, Object> user_info) throws Exception {
		
		System.out.println("user_info: " + user_info.toString());
		
		String user_id = user_info.get("mypage_id").toString();
		String user_tel = user_info.get("mypage_tel").toString();
		String user_email = user_info.get("mypage_email").toString();
		
		mypageService.editUserInfo(user_id, user_tel, user_email);
		
	}
	
	// 회원 정보 변경 후 세션값 재설정하는 함수
	@ResponseBody
	@RequestMapping(value = "/reSetSession")
	public void reSetSession(@RequestBody Map<String, Object> user_info, HttpServletRequest request) throws Exception {
		String user_id = user_info.get("user_id").toString();
		
		UserInfo info = mypageService.reSetSession(user_id);
		request.getSession().setAttribute("email", info.getEmail());
		request.getSession().setAttribute("phone", info.getPhone());
	}
	
	@RequestMapping(value = "/mypageInfomation")
	public UserInfo mypageInfomation(@RequestParam Map<String, Object> user_info) throws Exception {
		
		logger.info("값님 : "+ user_info.get("mypage_userId").toString());

		String user_id = user_info.get("mypage_userId").toString();
		
		return mypageService.myPageInfoService(user_id);
		
	}
	
	@RequestMapping(value = "/mypagePwdChange")
	public void mypagePwdChange(@RequestParam Map<String, Object> user_info) throws Exception {
		
		logger.info("값님 : "+ user_info.get("mypage_id").toString());
		logger.info("값님 : "+ user_info.get("mypage_password").toString());
		
		String user_id = user_info.get("mypage_id").toString();
		String password = user_info.get("mypage_password").toString();
		
		
		mypageService.insertNewPassword(user_id, password);
		
	}
	
	@RequestMapping(value = "/findPassword")
	public String findPassword(@RequestParam Map<String, Object> user_info) throws Exception {
		
		logger.info("값님 : "+ user_info.get("find_email").toString());
		logger.info("값님 : "+ user_info.get("find_user_id").toString());
		
		String portal_email = (user_info.get("find_email").toString());
		String user_id = user_info.get("find_user_id").toString();
		
		return mypageService.findPassword(portal_email, user_id);
		
	}
	
	@ResponseBody
	@RequestMapping(value = "/deleteUser")
	public void deleteUser(@RequestBody Map<String, Object> data) throws Exception {
		
		logger.info("값님 : "+ data.get("user_id").toString());
		
		String delNum = data.get("user_id").toString();
		
		mypageService.deleteUser(delNum);
		
	}
	
}	
