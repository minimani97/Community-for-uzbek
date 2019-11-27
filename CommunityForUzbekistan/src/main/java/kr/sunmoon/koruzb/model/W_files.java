package kr.sunmoon.koruzb.model;

public class W_files { // main_tl_files 테이블 정보
	
	private String orig_filename;
	private String save_filename;
	
	public String getOrig_filename() {
		return orig_filename;
	}
	public void setOrig_filename(String orig_filename) {
		this.orig_filename = orig_filename;
	}
	public String getSave_filename() {
		return save_filename;
	}
	public void setSave_filename(String save_filename) {
		this.save_filename = save_filename;
	}
	
	@Override
	public String toString() {
		return "W_files [orig_filename=" + orig_filename + ", save_filename=" + save_filename + "]";
	}
}
