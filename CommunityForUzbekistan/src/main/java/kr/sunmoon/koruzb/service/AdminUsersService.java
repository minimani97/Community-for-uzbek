package kr.sunmoon.koruzb.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.sunmoon.koruzb.dao.AdminUsersDao;
import kr.sunmoon.koruzb.model.UserInfo;


@Service
public class AdminUsersService {
	private static final Logger logger = LoggerFactory.getLogger(AdminUsersService.class);

	private AdminUsersDao adminUsersDao = new AdminUsersDao();
	

	@Autowired
	public void setAdminUsersDao(AdminUsersDao adminUsersDao) {
		this.adminUsersDao = adminUsersDao;
	}

	public List<UserInfo> adminInfo() {
		return adminUsersDao.adminInfo();
	}
	
	public UserInfo adminEditInfo(String user_id) throws Exception {
		return adminUsersDao.adminEditInfo(user_id);
	}
	
	/*public void editDepartment(String depNum, String depCode) {
		adminUsersDao.editDepartment(depNum,depCode);
	}*/
	
	public void blockCertify(String user_num) {
		adminUsersDao.blockCertify(user_num);
	}
	
	public void unlockCertify(String user_num) {
		adminUsersDao.unlockCertify(user_num);
	}
	

}
