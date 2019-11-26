package kr.sunmoon.koruzb.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.sunmoon.koruzb.dao.LoginDao;
import kr.sunmoon.koruzb.model.UserInfo;

@Service
public class LoginService {
	
	private static final Logger logger = LoggerFactory.getLogger(LoginService.class);
	private LoginDao loginDao;
	
	@Autowired
	public void setMainTimelineDao(LoginDao loginDao) {
		this.loginDao = loginDao;
	}
	
	// 로그인 관련 함수
	public UserInfo checkLogin(String id, String password){
	   return loginDao.checkLogin(id, password);
	}
	
}
