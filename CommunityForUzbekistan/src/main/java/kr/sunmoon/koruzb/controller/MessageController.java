package kr.sunmoon.koruzb.controller;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import kr.sunmoon.koruzb.model.Msg;
import kr.sunmoon.koruzb.service.MessageService;

@RestController
public class MessageController {
	private static final Logger logger = LoggerFactory.getLogger(MessageController.class);
	private MessageService messageService;
	
	@Autowired
	public void setMessageService(MessageService messageService) {
		this.messageService = messageService;
	}

	//쪽지 보내기
	@ResponseBody
	@RequestMapping("/sendMsg")
	public String sendMsg(@RequestBody Map<String, Object> Msg) throws Exception {

		logger.info("컨트롤러!!!!!!??????????????????!!!!!!!!!!RequestMapping /sendMsg.");

		/*String title = Msg.get("title_input").toString();
		String textMsg = (String) Msg.get("post-send-msg").toString();*/

		String from_user_id = Msg.get("from_user_id").toString();
		String to_user_id = Msg.get("to_user_id").toString();
		String title = Msg.get("title").toString();
		String textMsg = (String) Msg.get("msg").toString();
		logger.info("=====RequestMapping /쪽지--------------------보내는사람 : "+from_user_id+" 받는사람: " +to_user_id+ " 제목: " + title+ " 내용: " + textMsg);

		messageService.send(from_user_id,to_user_id, title, textMsg);
		return messageService.getName(from_user_id);
		//return "test";

	}
	
	//쪽지 받아오기
	@ResponseBody
	@RequestMapping("/msg")
	public List<Msg> msg(@RequestBody Map<String, Object> List) throws Exception {

		logger.info("컨트롤러!!!!!!??!!!!!!!!!!RequestMapping /msg.");

		String from_user_id = List.get("from_user_id").toString();
		logger.info("=====RequestMapping /내가 누구냐면 : "+from_user_id);

		return messageService.msg(from_user_id);
	}
	
	// 쪽지 열기
	@ResponseBody
	@RequestMapping("/open")
	public Msg content(@RequestBody Map<String, Object> content) throws Exception {

		logger.info("컨트롤러!!!!!!??!!!!!!!!!!RequestMapping /msg.");

		int num = Integer.parseInt(content.get("num").toString());
		logger.info("=====RequestMapping /불러올 글 제목은! : " + num);

		messageService.openCheck(num);
		return messageService.open(num);
	}
	
	// 쪽지 받아오기
	@ResponseBody
	@RequestMapping("/receive")
	public List<Msg> receive(@RequestBody Map<String, Object> List) throws Exception {

		logger.info("컨트롤러!!!!!!??!!!!!!!!!!RequestMapping /receive.");

		String to_user_id = List.get("to_user_id").toString();
		logger.info("=====RequestMapping /받는 사람 : " + to_user_id);

		return messageService.receive(to_user_id);
	}
	
	//안읽은 쪽지 알림
	@ResponseBody
	@RequestMapping("/notRead")
	public String notRead(@RequestBody Map<String, Object> read) throws Exception {

		logger.info("컨트롤러!!!!!!??!!!!!!!!!!RequestMapping /notRead.");
		logger.info("1초마다?");

		String to_user_id = read.get("to_user_id").toString();
		logger.info("=====RequestMapping /쪽지 확인 학번! : " + to_user_id);

		return messageService.notRead(to_user_id);
	}
	
	// 나에게 온 쪽지 개수 확인(새로운 쪽지 알림창)
	@ResponseBody
	@RequestMapping("/countMyMsg")
	public String countMyMsg(@RequestBody Map<String, Object> count) throws Exception {

		logger.info("컨트롤러!!!!!!??!!!!!!!!!!RequestMapping /countMyMsg.");
		logger.info("1초마다?");

		String to_user_id = count.get("to_user_id").toString();
		logger.info("=====RequestMapping /나에게 온 쪽지 개수! : " + to_user_id);

		return messageService.countMyMsg(to_user_id);
	}
	
	// 쪽지 삭제
	@ResponseBody
	@RequestMapping("/deleteMsg")
	public void deleteMsg(@RequestBody Map<String, Object> del) throws Exception {

		logger.info("컨트롤러!!!!!!??!!!!!!!!!!RequestMapping /deleteMsg.");

		int num = Integer.parseInt(del.get("num").toString());
		logger.info("=====RequestMapping /삭제할 쪽지 번호 : " + num);
		messageService.deleteMsg(num);

		//return "d";
	}

}	
