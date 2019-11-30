package kr.sunmoon.koruzb.controller;

import java.text.DateFormat;
import java.util.Date;
import java.util.List;
import java.util.Locale;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import kr.sunmoon.koruzb.model.UserInfo;
import kr.sunmoon.koruzb.service.AdminUsersService;

/**
 * Handles requests for the application home page.
 */
@Controller
public class HomeController {

	private static final Logger logger = LoggerFactory.getLogger(HomeController.class);
	private AdminUsersService adminUsersService;

	//UserInformation user_info = new UserInformation();

	@Autowired
	public void setAdminUsersService(AdminUsersService adminUsersService) {
		this.adminUsersService = adminUsersService;
	}

	/**
	 * Simply selects the home view to render by returning its name.
	 */
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String home(Locale locale, Model model) {
		logger.info("Welcome home! The client locale is {}.", locale);

		Date date = new Date();
		DateFormat dateFormat = DateFormat.getDateTimeInstance(DateFormat.LONG, DateFormat.LONG, locale);

		String formattedDate = dateFormat.format(date);

		model.addAttribute("serverTime", formattedDate);

		return "home";
	}

	@RequestMapping(value = "/newsFeed", method = RequestMethod.GET)
	public String goNewsFeed(Model model) {
		logger.info("goNewsFeed enter!");

		return "newsFeed";
	}
	
	@RequestMapping(value = "/register", method = RequestMethod.GET)
	public String goRegister(Model model) {
		logger.info("goRegister enter!");

		return "register";
	}

	@RequestMapping(value = "/mypage", method = RequestMethod.GET)
	public String goMyPage(Model model) {
		logger.info("goNewsFeed enter!");

		return "mypage";
	}

	@RequestMapping(value = "/logout", method = RequestMethod.GET)
	public String goLoginPage(Model model) {
		logger.info("goLoginPage enter!");

		return "home";
	}

	@RequestMapping(value = "/bus", method = RequestMethod.GET)
	public String goBuspage(Model model) {
		logger.info("goBuspage enter!");

		return "bus";
	}

	@RequestMapping(value = "/searchPost", method = RequestMethod.GET)
	public String goSearchpage(Model model) {
		logger.info("goSearchpage enter!");

		return "search";
	}

	@RequestMapping(value = "/password", method = RequestMethod.GET)
	public String goPasswordpage(Model model) {
		logger.info("goPasswordpage enter!");

		return "password";
	}

	@RequestMapping(value = "/admin/stats", method = RequestMethod.GET)
	public String goAdmin_statspage(Model model) {
		logger.info("goAdminpage enter!");

		return "admin_stats";
	}

	@RequestMapping(value = "/admin/users", method = RequestMethod.GET)
	public String goAdmin_userspage(Model model) {
		logger.info("goAdminpage enter!");

		//List<UserInfo> user_list = adminUsersService.adminInfo();
		model.addAttribute("allUser", adminUsersService.adminInfo());

		return "admin_users";
	}

	@RequestMapping(value = "/admin/edituser", method = RequestMethod.GET)
	public String goAdmin_edituserpage(Model model, @RequestParam("number") String number) throws Exception {
		logger.info("goAdmin_edituserpage enter!");

		model.addAttribute("person", adminUsersService.adminEditInfo(number));

		return "admin_edit";
	}

	@RequestMapping(value = "/notice", method = RequestMethod.GET)
	public String goNoticepage(Model model) {
		logger.info("goNoticepage enter!");

		return "newsFeed";
	}

	@RequestMapping(value = "/Msg", method = RequestMethod.GET)
	public String goMsgPage(Model model) {
		logger.info("goMsgPage enter!");

		return "Msg";
	}
	
	@RequestMapping(value = "/tips")
	public String goTipsPage() {
		return "tips";
	}
}
