package kr.sunmoon.koruzb.model;

public class Msg {
	
	private int num;
	private String user_name;
	private String from_user_id;
	private String to_user_id;
	private String title;
	private String senddate;
	private String open;
	private String msg;
	
	public int getNum() {
		return num;
	}
	public void setNum(int num) {
		this.num = num;
	}
	public String getUser_name() {
		return user_name;
	}
	public void setUser_name(String user_name) {
		this.user_name = user_name;
	}
	public String getFrom_user_id() {
		return from_user_id;
	}
	public void setFrom_user_id(String from_user_id) {
		this.from_user_id = from_user_id;
	}
	public String getTo_user_id() {
		return to_user_id;
	}
	public void setTo_user_id(String to_user_id) {
		this.to_user_id = to_user_id;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getSenddate() {
		return senddate;
	}
	public void setSenddate(String senddate) {
		this.senddate = senddate;
	}
	public String getOpen() {
		return open;
	}
	public void setOpen(String open) {
		this.open = open;
	}
	public String getMsg() {
		return msg;
	}
	public void setMsg(String msg) {
		this.msg = msg;
	}
	
	@Override
	public String toString() {
		return "Msg [num=" + num + ", user_name=" + user_name + ", from_user_id=" + from_user_id + ", to_user_id="
				+ to_user_id + ", title=" + title + ", senddate=" + senddate + ", open=" + open + ", msg=" + msg + "]";
	}
}
