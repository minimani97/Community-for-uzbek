package kr.sunmoon.koruzb.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.sunmoon.koruzb.dao.MainTimelineDao;
import kr.sunmoon.koruzb.model.CommentInfo;
import kr.sunmoon.koruzb.model.PostInfo;

@Service
public class MainTimelineService {
	
	private static final Logger logger = LoggerFactory.getLogger(MainTimelineService.class);
	private MainTimelineDao mainTimelineDao;
	
	@Autowired
	public void setMainTimelineDao(MainTimelineDao mainTimelineDao) {
		this.mainTimelineDao = mainTimelineDao;
	}
	
	public void insertRecord(PostInfo postInfo) {
		mainTimelineDao.insertPost(postInfo);
	}
	
	// 처음 글 10개 가져오기
	public List<PostInfo> getAllWriting(String dep_code) {
		return mainTimelineDao.getPostInfo(dep_code);
	}
	
	// 스크롤 내릴때마다 글 10개씩 더 가져오기
	public List<PostInfo> getExtraWriting(String dep_code, int calledNum) {
		return mainTimelineDao.getExtraPostInfo(dep_code, calledNum);
	}
	
	public int getW_num(String u_id, String w_time, String w_content, String dep_code) {
		return mainTimelineDao.getW_num(u_id, w_time, w_content, dep_code);
	}
	
	public void saveComment(CommentInfo infoData) {
		mainTimelineDao.insertComment(infoData);
	}
	
	public int getC_num(String u_id, String c_time, String c_content) {
		return mainTimelineDao.getC_num(u_id, c_time, c_content);
	}
	
	public List<CommentInfo> getAllComments(int w_num) {
		return mainTimelineDao.getAllComments(w_num);
	}
	
	// 글 삭제 함수
	public void deletePost(int w_num) {		
		mainTimelineDao.deletePost(w_num);
	}
	
	// 댓글 삭제 함수
	public int deleteComment(int c_num) {		
		return mainTimelineDao.deleteComment(c_num);
	}
	
	// 수정_글 불러오기
	public String getPostContent(int w_num, String dep_code) {		
		return mainTimelineDao.getPostContent(w_num, dep_code);
	}
	
	// 글 수정하기
	public void editPost(int w_num, String w_content) {
		mainTimelineDao.editPost(w_num, w_content);
	}
	
	// 수정_댓글 불러오기
	public String getCommentContent(int c_num, String dep_code) {
		return mainTimelineDao.getCommentContent(c_num, dep_code);
	}
	
	// 댓글 수정하기
	public int editComment(int c_num, String c_content) {
		return mainTimelineDao.editComment(c_num, c_content);
	}
	
	// 글 좋아요 기능
	public int setPostLike(int w_num) {
		return mainTimelineDao.setPostLike(w_num);
	}
	
	// 댓글 좋아요 기능
	public int setCommentLike(int c_num) {
		return mainTimelineDao.setCommentLike(c_num);
	}
	
	// 검색 단어에 해당하는 처음 글 10개 불러오기
	public List<PostInfo> getSearchWriting(String type, String word, String dep_code) {
		return mainTimelineDao.getSearchWriting(type, word, dep_code);
	}
	
	// 스크롤 내릴때마다 검색 글 10개씩 더 가져오기
	public List<PostInfo> getSearchExtraWriting(int calledNum, String type, String word, String dep_code) {
		return mainTimelineDao.getSearchExtraPostInfo(calledNum, type, word, dep_code);
	}
	
	
	// 공지사항 탭 관련 함수
	// 공지글 올리기
	public void postNotice(PostInfo postInfo) {		
		mainTimelineDao.postNotice(postInfo);
	}
	
	// 공지 글의 플래그 Y로 바꾸기
	public void putUpNotice(int w_num) {
		mainTimelineDao.putUpNotice(w_num);
	}
	
	// 공지 글의 플래그 N로 바꾸기
	public void putDownNotice(int w_num) {
		mainTimelineDao.putDownNotice(w_num);
	}
	
	// 공지 글로 설정된 글 가져오기
	public List<PostInfo> noticePostList() {
		return mainTimelineDao.noticePostList();
	}
	
	// 좋아요 가장 많은 글 세 개 가져오기
	public List<PostInfo> bestLikePostInfo() {
		return mainTimelineDao.bestLikePostInfo();
	}
	
	// 좋아요 가장 많은 글 세 개 가져오기
	public List<PostInfo> bestCommentPostInfo() {
		return mainTimelineDao.bestCommentPostInfo();
	}
}
