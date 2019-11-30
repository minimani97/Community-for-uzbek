package kr.sunmoon.koruzb.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.sunmoon.koruzb.dao.MessageDao;
import kr.sunmoon.koruzb.model.Msg;

@Service
public class MessageService {
	
	private static final Logger logger = LoggerFactory.getLogger(MessageService.class);
	private MessageDao messageDao;
	
	@Autowired
	public void setMessageDao(MessageDao messageDao) {
		this.messageDao = messageDao;
	}
	
	public String getName(String to_user_id){
		return messageDao.getName(to_user_id);
	}

	public void send(String from_user_id, String to_user_id, String title, String msg){
		logger.info("서비스!!!!!!!!!!!!!!!!RequestMapping /sendMsg.");
		messageDao.sendtxt(from_user_id, to_user_id, title, msg); 
	}
	//보낸 메세지
	public List<Msg> msg(String from_user_id){
		logger.info("서비스!!!!!!!!!!!!!!!!RequestMapping /sendMsg.");
		return messageDao.msgList(from_user_id);
	}
	//쪽지 열기
	public Msg open(int num){
		logger.info("서비스!!!!!!!!!!!!!!!!RequestMapping /open.");
		return messageDao.open(num);
	}
	//읽었는지 확인
	public void openCheck(int num){
		logger.info("서비스!!!!!!!!!!!!!!!!RequestMapping /open.");
		messageDao.opencheck(num);
	}
	//받은 메세지
	public List<Msg> receive(String to_user_id) {
		logger.info("서비스!!!!!!!!!!!!!!!!RequestMapping /receive.");
		return messageDao.receiveMsgList(to_user_id);
	}
	// 안읽은 쪽지 알림
	public String notRead(String to_user_id) {
		logger.info("서비스!!!!!!!!!!!!!!!!RequestMapping /notRead.");
		return messageDao.notRead(to_user_id);
	}
	//나에게 온 쪽지 개수 확인(새로운 쪽지 알림창)
	public String countMyMsg(String to_user_id) {
		logger.info("서비스!!!!!!!!!!!!!!!!RequestMapping /countMyMsg.");
		return messageDao.countMyMsg(to_user_id);
	}
	
	// 쪽지 삭제
	public void deleteMsg(int num) {
		logger.info("서비스!!!!!!!!!!!!!!!!RequestMapping /deleteMsg.");
		messageDao.deleteMsg(num);
	}
	
}
