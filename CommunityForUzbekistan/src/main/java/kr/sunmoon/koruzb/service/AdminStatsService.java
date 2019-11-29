package kr.sunmoon.koruzb.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.sunmoon.koruzb.dao.AdminStatsDao;
import kr.sunmoon.koruzb.model.CountTop5;

@Service
public class AdminStatsService {
	private static final Logger logger = LoggerFactory.getLogger(AdminStatsService.class);
	private AdminStatsDao adminStatsDao;
	
	@Autowired
	public void setAdminStatsDao(AdminStatsDao adminStatsDao) {
		this.adminStatsDao = adminStatsDao;
	}
	
	public String getUserNum() {		
		return adminStatsDao.getUserNum();
	}
	
	public String countPost() {
		return adminStatsDao.countPost();
	}
	
	public String countTodaysPost() {
		return adminStatsDao.countTodaysPost();
	}
	
	public String countTodaysComment() {
		return adminStatsDao.countTodaysComment();
	}
	
	public List<CountTop5> writerTop5() {
		return adminStatsDao.writerTop5();
	}
	
	public List<CountTop5> c_writerTop5() {
		return adminStatsDao.c_writerTop5();
	}
	
	public String getPostRatio() {		
		return adminStatsDao.getPostRatio();
	}
	
	public List<CountTop5> commentCount_Top5() {
		return adminStatsDao.commentCount_Top5();
	}
	
	public List<CountTop5> likeCount_Top5() {
		return adminStatsDao.likeCount_Top5();
	}
	
	public List<CountTop5> likeCommentCount_Top5() {
		return adminStatsDao.likeCommentCount_Top5();
	}
}
