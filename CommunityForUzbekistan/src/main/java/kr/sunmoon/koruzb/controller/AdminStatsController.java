package kr.sunmoon.koruzb.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import kr.sunmoon.koruzb.model.CountTop5;
import kr.sunmoon.koruzb.service.AdminStatsService;



@RestController
public class AdminStatsController {
	private static final Logger logger = LoggerFactory.getLogger(AdminStatsController.class);
	private AdminStatsService adminStatsService;
	
	@Autowired
	public void setAdminStatsService(AdminStatsService adminStatsService) {
		this.adminStatsService = adminStatsService;
	}
	
	@ResponseBody
	@RequestMapping("/getUserNum")
	public String getUserNum() {
		logger.info("Kwak @RequestMapping /getUserNum");
		
		return adminStatsService.getUserNum();
	}
	
	@ResponseBody
	@RequestMapping("/countPost")
	public String countPost() {
		logger.info("Kwak @RequestMapping /countPost");
		
		return adminStatsService.countPost();
	}
	
	@ResponseBody
	@RequestMapping("/countTodaysPost")
	public String countTodaysPost() {
		logger.info("Kwak @RequestMapping /countTodaysPost");
		
		return adminStatsService.countTodaysPost();
	}
	
	@ResponseBody
	@RequestMapping("/countTodaysComment")
	public String countTodaysComment() {
		logger.info("Kwak @RequestMapping /countTodaysComment");
		
		return adminStatsService.countTodaysComment();
	}
	
	@ResponseBody
	@RequestMapping("/writerTop5")
	public List<CountTop5> writerTop5() {
		logger.info("Kwak @RequestMapping /writerTop5");
		
		return adminStatsService.writerTop5();
	}
	
	@ResponseBody
	@RequestMapping("/c_writerTop5")
	public List<CountTop5> c_writerTop5() {
		logger.info("Kwak @RequestMapping /c_writerTop5");
		
		return adminStatsService.c_writerTop5();
	}
	
	@ResponseBody
	@RequestMapping("/getPostRatio")
	public String getPostRatio() {
		logger.info("Kwak @RequestMapping /getPostRatio");
		
		return adminStatsService.getPostRatio();
	}
	
	@ResponseBody
	@RequestMapping("/commentCount_Top5")
	public List<CountTop5> commentCount_Top5() {
		logger.info("Kwak @RequestMapping /commentCount_Top5");
		
		return adminStatsService.commentCount_Top5();
	}
	
	@ResponseBody
	@RequestMapping("/likeCount_Top5")
	public List<CountTop5> likeCount_Top5() {
		logger.info("Kwak @RequestMapping /likeCount_Top5");
		
		return adminStatsService.likeCount_Top5();
	}
	
	@ResponseBody
	@RequestMapping("/likeCommentCount_Top5")
	public List<CountTop5> likeCommentCount_Top5() {
		logger.info("Kwak @RequestMapping /likeCommentCount_Top5");
		
		return adminStatsService.likeCommentCount_Top5();
	}
}
