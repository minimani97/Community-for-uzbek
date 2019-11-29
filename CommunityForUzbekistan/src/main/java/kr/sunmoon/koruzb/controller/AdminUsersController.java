package kr.sunmoon.koruzb.controller;

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import kr.sunmoon.koruzb.service.AdminUsersService;


@RestController
public class AdminUsersController {
	private static final Logger logger = LoggerFactory.getLogger(AdminUsersController.class);
	
	private AdminUsersService adminUsersService;
	

	@Autowired
	public void setAdminUsersService(AdminUsersService adminUsersService) {
		this.adminUsersService = adminUsersService;
	}
	
	@RequestMapping(value = "/editDepartment" )
	public void editDepartment(@RequestParam Map<String, Object> user_info) throws Exception {
		//logger.info("@RequestMapping editDepartment called. value:" + user_info.get("editUser_id").toString());
	
		//String depCode = user_info.get("editUser_dep").toString();
		//String depNum = user_info.get("editUser_num").toString();
		String user_id = user_info.get("editUser_id").toString();
		String certify = user_info.get("editUser_certify").toString();
		
		//adminUsersService.editDepartment(depNum,depCode);
		
		if(certify.equals("blockOn")){
			adminUsersService.blockCertify(user_id);
		}else{
			adminUsersService.unlockCertify(user_id);
		}
	}
	

}
