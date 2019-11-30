package kr.sunmoon.koruzb.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.sunmoon.koruzb.dao.MypageDao;
import kr.sunmoon.koruzb.model.UserInfo;

@Service
public class MypageService {
	private static final Logger logger = LoggerFactory.getLogger(MypageService.class);


	private MypageDao mypagedao = new MypageDao();

	@Autowired
	public void setMypageDao(MypageDao mypagedao) {
		this.mypagedao = mypagedao;
	}

	public String findPassword(String phone, String user_id) throws Exception {
		return mypagedao.findPassword(phone, user_id);
	}

	public void saveProfileService(String imgUrl, String user_id) throws Exception {
		mypagedao.saveProfileDao(imgUrl, user_id);
	}
	
	public void editUserInfo(String u_id, String phone, String email) {
		mypagedao.editUserInfo(u_id, phone, email);
	}
	
	public UserInfo reSetSession(String user_id) {
		return mypagedao.reSetSession(user_id);
	}

	public UserInfo myPageInfoService(String user_id) throws Exception {
		return mypagedao.myPageInfoDao(user_id);
	}

	public void insertNewPassword(String user_id, String password) throws Exception {
		mypagedao.insertNewPassword(user_id, password);
	}
	
	public void deleteUser(String user_id) {
		mypagedao.deleteUser(user_id);
	}

}
