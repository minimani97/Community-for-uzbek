package kr.sunmoon.koruzb.model;

import java.util.ArrayList;
import java.util.List;

public class PostInfo {
	
	private String user_id;
	private String user_name;
	private String user_img;
	private int w_num;
	private String w_date;
	private String w_content;
	private String anonymity;
	private int like_cnt = 0;
	private int comment_cnt = 0;
	private String dep_code;
	private String notice;
	
	public ArrayList<String> orig_filename = new ArrayList<String>();
	public ArrayList<String> save_filename = new ArrayList<String>();
	
	private List<W_files> save_filenames;

	public String getUser_id() {
		return user_id;
	}

	public void setUser_id(String user_id) {
		this.user_id = user_id;
	}

	public String getUser_name() {
		return user_name;
	}

	public void setUser_name(String user_name) {
		this.user_name = user_name;
	}

	public String getUser_img() {
		return user_img;
	}

	public void setUser_img(String user_img) {
		this.user_img = user_img;
	}

	public int getW_num() {
		return w_num;
	}

	public void setW_num(int w_num) {
		this.w_num = w_num;
	}

	public String getW_date() {
		return w_date;
	}

	public void setW_date(String w_date) {
		this.w_date = w_date;
	}

	public String getW_content() {
		return w_content;
	}

	public void setW_content(String w_content) {
		this.w_content = w_content;
	}

	public String getAnonymity() {
		return anonymity;
	}

	public void setAnonymity(String anonymity) {
		this.anonymity = anonymity;
	}

	public int getLike_cnt() {
		return like_cnt;
	}

	public void setLike_cnt(int like_cnt) {
		this.like_cnt = like_cnt;
	}

	public int getComment_cnt() {
		return comment_cnt;
	}

	public void setComment_cnt(int comment_cnt) {
		this.comment_cnt = comment_cnt;
	}

	public String getDep_code() {
		return dep_code;
	}

	public void setDep_code(String dep_code) {
		this.dep_code = dep_code;
	}

	public String getNotice() {
		return notice;
	}

	public void setNotice(String notice) {
		this.notice = notice;
	}

	public ArrayList<String> getOrig_filename() {
		return orig_filename;
	}

	public void setOrig_filename(ArrayList<String> orig_filename) {
		this.orig_filename = orig_filename;
	}

	public ArrayList<String> getSave_filename() {
		return save_filename;
	}

	public void setSave_filename(ArrayList<String> save_filename) {
		this.save_filename = save_filename;
	}

	public List<W_files> getSave_filenames() {
		return save_filenames;
	}

	public void setSave_filenames(List<W_files> save_filenames) {
		this.save_filenames = save_filenames;
	}
	
}
