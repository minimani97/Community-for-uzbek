package kr.sunmoon.koruzb.controller;

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.sunmoon.koruzb.model.UserInfo;
import kr.sunmoon.koruzb.service.RegisterService;


@Controller
public class RegisterController {

	private static final Logger logger = LoggerFactory.getLogger(RegisterController.class);

	private RegisterService registerService;
	//UserInformation user_info = new UserInformation();
	
	@Autowired
	public void setRegisterService(RegisterService registerService) {
		this.registerService = registerService;
	}
	
	@ResponseBody
	@RequestMapping(value = "/numconfirm" )
	public int checkDuplicate(@RequestParam Map<String, Object> user_info) throws Exception {
		//logger.info("@RequestMapping checkDuplicate called. value:" + user_info.get("user_id").toString());
	
		String input_id = user_info.get("user_id").toString();
		logger.info(input_id);

		int result = registerService.checkDuplicate(input_id); 
		System.out.println("Controller RESULT : " + result);
		return result;
	}
	
	@RequestMapping(value = "/insertuser", method = RequestMethod.POST)
	public String insertuser(@RequestParam Map<String, Object> infoParam) throws Exception {

		UserInfo user_info = new UserInfo();
		
		user_info.setId(infoParam.get("user_id").toString());
		user_info.setPassword(infoParam.get("password").toString());
		user_info.setName(infoParam.get("user_name").toString());
		user_info.setPhone(infoParam.get("user_phone").toString());
		user_info.setEmail(infoParam.get("user_email").toString());

		/*
		 * logger.info("insertuser value: " + user_info.getId()());
		 * logger.info("insertuser value: " + user_info.getUser_num());
		 * logger.info("insertuser value: " + user_info.getPassword());
		 * logger.info("insertuser value: " + user_info.getUser_name());
		 * logger.info("insertuser value: " + user_info.getUser_department());
		 * System.out.println(user_info.getPortal_email());
		 */
		registerService.insert_Record(user_info);

		return "home";
	}
	
	
	/*@RequestMapping(value = "/emailConfirm", method = RequestMethod.GET)
	public String emailConfirm(Model model) throws Exception { // 이메일 링크 타고 들어옴
		registerService.userAuth(user_info.getPortal_email(), user_info.getUser_authCode());
	
		return "home";
	}*/
	
}
