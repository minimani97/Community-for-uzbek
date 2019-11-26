package kr.sunmoon.koruzb.service;

import javax.inject.Inject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.sunmoon.koruzb.dao.RegisterDao;
import kr.sunmoon.koruzb.model.UserInfo;

@Service
public class RegisterService {
	private static final Logger logger = LoggerFactory.getLogger(RegisterService.class);
	
	@Inject
	private RegisterDao registerDAO;
	

	@Autowired
	public void setRegisterDAO(RegisterDao registerDAO) {
		this.registerDAO = registerDAO;
	}
	
	public int checkDuplicate(String id) throws Exception{
		//System.out.println(userNum);
		return registerDAO.checkDuplicate(id);
	}
	
	// 인증 메일 보내기
	public void insert_Record(UserInfo info) throws Exception {
		
		registerDAO.insertRegisterUser(info); //insert
		
		/*
		 * String key = new TempKey().getKey(50, false);
		 * System.out.println(key.toString());
		 * registerDAO.createAuthKey(info.getPortal_email(), key);
		 * 
		 * MailHandler sendMail = new MailHandler(mailSender);
		 * sendMail.setSubject("[선♥귀♥당♥귀 인증 이메일]"); sendMail.setText( new
		 * StringBuffer().append("<h1>★가입을 축하드립니다★</h1>").append("<a href='http://" +
		 * "ssun.sunmoon.ac.kr/ssun/emailConfirm?portal_email()" +
		 * "=").append(info.getPortal_email()).append("&key=" +
		 * "").append(key).append("' target='_blenk'>링크를 " +
		 * "누르시면 선♥귀♥당♥귀로 이동합니다.</a>").toString() );
		 * sendMail.setFrom("dpfls96@gmail.com", "선귀당귀 관리자");
		 * sendMail.setTo(info.getPortal_email()); sendMail.send();
		 */
	}

	
	//@Override
	/*public void userAuth(String portal_email, String user_key) throws Exception {
		registerDAO.userAuth(portal_email,user_key);
	}*/
	
}
