package kr.sunmoon.koruzb.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import javax.sql.DataSource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import kr.sunmoon.koruzb.model.CountTop5;

@Repository
public class AdminStatsDao {
	private static final Logger logger = LoggerFactory.getLogger(AdminStatsDao.class);
	private JdbcTemplate jdbcTemplate;

	@Autowired
	public void setDataSource(DataSource datasource) {
		this.jdbcTemplate = new JdbcTemplate(datasource);
	}

	// 사용자 수 가져오기
	public String getUserNum() {

		ArrayList<Integer> data = new ArrayList<Integer>();

		// 인증된 사용자 수 가져오기
		String sqlStatement1 = "select count(*) from user_info where certify='y'";
		int certifyUser = jdbcTemplate.queryForObject(sqlStatement1, Integer.class);
		data.add(certifyUser);

		// 차단된 사용자 수 가져오기
		String sqlStatement2 = "select count(*) from user_info where certify='b'";
		int blockUser = jdbcTemplate.queryForObject(sqlStatement2, Integer.class);
		data.add(blockUser);
		
		// 인증되지 않은 사용자 수 가져오기
		String sqlStatement3 = "select count(*) from user_info where certify is null";
		int unCertifyUser = jdbcTemplate.queryForObject(sqlStatement3, Integer.class);
		data.add(unCertifyUser);

		// arraylist를 json으로 변환
		ObjectMapper mapper = new ObjectMapper();
		String jsonString = "";
		try {
			jsonString = mapper.writeValueAsString(data);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}

		return jsonString;

	}

	public String countPost() {
		ArrayList<Integer> data = new ArrayList<Integer>();

		// 현재 연도 가져오기
		int year = Calendar.getInstance().get(Calendar.YEAR);

		// 1월에 쓰여진 글 수 가져오기
		String sqlStatement1 = "select count(*) from timeline_post where delYN='N' and w_time like '" + year + "년 1월 %';";
		int post_jan = jdbcTemplate.queryForObject(sqlStatement1, Integer.class);
		data.add(post_jan);

		// 2월에 쓰여진 글 수 가져오기
		String sqlStatement2 = "select count(*) from timeline_post where delYN='N' and w_time like '" + year + "년 2월 %';";
		int post_feb = jdbcTemplate.queryForObject(sqlStatement2, Integer.class);
		data.add(post_feb);

		// 3월에 쓰여진 글 수 가져오기
		String sqlStatement3 = "select count(*) from timeline_post where delYN='N' and w_time like '" + year + "년 3월 %';";
		int post_mar = jdbcTemplate.queryForObject(sqlStatement3, Integer.class);
		data.add(post_mar);

		// 4월에 쓰여진 글 수 가져오기
		String sqlStatement4 = "select count(*) from timeline_post where delYN='N' and w_time like '" + year + "년 4월 %';";
		int post_apr = jdbcTemplate.queryForObject(sqlStatement4, Integer.class);
		data.add(post_apr);

		// 5월에 쓰여진 글 수 가져오기
		String sqlStatement5 = "select count(*) from timeline_post where delYN='N' and w_time like '" + year + "년 5월 %';";
		int post_may = jdbcTemplate.queryForObject(sqlStatement5, Integer.class);
		data.add(post_may);

		// 6월에 쓰여진 글 수 가져오기
		String sqlStatement6 = "select count(*) from timeline_post where delYN='N' and w_time like '" + year + "년 6월 %';";
		int post_jun = jdbcTemplate.queryForObject(sqlStatement6, Integer.class);
		data.add(post_jun);

		// 7월에 쓰여진 글 수 가져오기
		String sqlStatement7 = "select count(*) from timeline_post where delYN='N' and w_time like '" + year + "년 7월 %';";
		int post_jul = jdbcTemplate.queryForObject(sqlStatement7, Integer.class);
		data.add(post_jul);

		// 8월에 쓰여진 글 수 가져오기
		String sqlStatement8 = "select count(*) from timeline_post where delYN='N' and w_time like '" + year + "년 8월 %';";
		int post_aug = jdbcTemplate.queryForObject(sqlStatement8, Integer.class);
		data.add(post_aug);

		// 9월에 쓰여진 글 수 가져오기
		String sqlStatement9 = "select count(*) from timeline_post where delYN='N' and w_time like '" + year + "년 9월 %';";
		int post_sep = jdbcTemplate.queryForObject(sqlStatement9, Integer.class);
		data.add(post_sep);

		// 10월에 쓰여진 글 수 가져오기
		String sqlStatement10 = "select count(*) from timeline_post where delYN='N' and w_time like '" + year + "년 10월 %';";
		int post_oct = jdbcTemplate.queryForObject(sqlStatement10, Integer.class);
		data.add(post_oct);

		// 11월에 쓰여진 글 수 가져오기
		String sqlStatement11 = "select count(*) from timeline_post where delYN='N' and w_time like '" + year + "년 11월 %';";
		int post_nov = jdbcTemplate.queryForObject(sqlStatement11, Integer.class);
		data.add(post_nov);

		// 12월에 쓰여진 글 수 가져오기
		String sqlStatement12 = "select count(*) from timeline_post where delYN='N' and w_time like '" + year + "년 12월 %';";
		int post_dec = jdbcTemplate.queryForObject(sqlStatement12, Integer.class);
		data.add(post_dec);

		// 1월에 쓰여진 댓글 수 가져오기
		String sqlStatement13 = "select count(*) from timeline_comment where delYN='N' and c_time like '" + year + "년 1월 %';";
		int comment_jan = jdbcTemplate.queryForObject(sqlStatement13, Integer.class);
		data.add(comment_jan);

		// 2월에 쓰여진 댓글 수 가져오기
		String sqlStatement14 = "select count(*) from timeline_comment where delYN='N' and c_time like '" + year + "년 2월 %';";
		int comment_feb = jdbcTemplate.queryForObject(sqlStatement14, Integer.class);
		data.add(comment_feb);

		// 3월에 쓰여진 댓글 수 가져오기
		String sqlStatement15 = "select count(*) from timeline_comment where delYN='N' and c_time like '" + year + "년 3월 %';";
		int comment_mar = jdbcTemplate.queryForObject(sqlStatement15, Integer.class);
		data.add(comment_mar);

		// 4월에 쓰여진 댓글 수 가져오기
		String sqlStatement16 = "select count(*) from timeline_comment where delYN='N' and c_time like '" + year + "년 4월 %';";
		int comment_apr = jdbcTemplate.queryForObject(sqlStatement16, Integer.class);
		data.add(comment_apr);

		// 5월에 쓰여진 댓글 수 가져오기
		String sqlStatement17 = "select count(*) from timeline_comment where delYN='N' and c_time like '" + year + "년 5월 %';";
		int comment_may = jdbcTemplate.queryForObject(sqlStatement17, Integer.class);
		data.add(comment_may);

		// 6월에 쓰여진 댓글 수 가져오기
		String sqlStatement18 = "select count(*) from timeline_comment where delYN='N' and c_time like '" + year + "년 6월 %';";
		int comment_jun = jdbcTemplate.queryForObject(sqlStatement18, Integer.class);
		data.add(comment_jun);

		// 7월에 쓰여진 댓글 수 가져오기
		String sqlStatement19 = "select count(*) from timeline_comment where delYN='N' and c_time like '" + year + "년 7월 %';";
		int comment_jul = jdbcTemplate.queryForObject(sqlStatement19, Integer.class);
		data.add(comment_jul);

		// 8월에 쓰여진 댓글 수 가져오기
		String sqlStatement20 = "select count(*) from timeline_comment where delYN='N' and c_time like '" + year + "년 8월 %';";
		int comment_aug = jdbcTemplate.queryForObject(sqlStatement20, Integer.class);
		data.add(comment_aug);

		// 9월에 쓰여진 댓글 수 가져오기
		String sqlStatement21 = "select count(*) from timeline_comment where delYN='N' and c_time like '" + year + "년 9월 %';";
		int comment_sep = jdbcTemplate.queryForObject(sqlStatement21, Integer.class);
		data.add(comment_sep);

		// 10월에 쓰여진 댓글 수 가져오기
		String sqlStatement22 = "select count(*) from timeline_comment where delYN='N' and c_time like '" + year + "년 10월 %';";
		int comment_oct = jdbcTemplate.queryForObject(sqlStatement22, Integer.class);
		data.add(comment_oct);

		// 11월에 쓰여진 댓글 수 가져오기
		String sqlStatement23 = "select count(*) from timeline_comment where delYN='N' and c_time like '" + year + "년 11월 %';";
		int comment_nov = jdbcTemplate.queryForObject(sqlStatement23, Integer.class);
		data.add(comment_nov);

		// 12월에 쓰여진 댓글 수 가져오기
		String sqlStatement24 = "select count(*) from timeline_comment where delYN='N' and c_time like '" + year + "년 12월 %';";
		int comment_dec = jdbcTemplate.queryForObject(sqlStatement24, Integer.class);
		data.add(comment_dec);

		// arraylist를 json으로 변환
		ObjectMapper mapper = new ObjectMapper();
		String jsonString = "";
		try {
			jsonString = mapper.writeValueAsString(data);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}

		return jsonString;
	}

	public String countTodaysPost() {
		ArrayList<Integer> data = new ArrayList<Integer>();

		// 오늘 날짜 가져오기
		int year = Calendar.getInstance().get(Calendar.YEAR);
		int month = Calendar.getInstance().get(Calendar.MONTH) + 1;
		int day = Calendar.getInstance().get(Calendar.DATE);
		logger.info("오늘은 " + year + "년 " + month + "월 " + day + "일 인니다^ㅇ^/");
		
		// 오늘 올라온 총 게시글 수 가져오기
		String sqlStatement1, sqlStatement2;
		if(day < 10) {
			sqlStatement1 = "select count(*) from timeline_post where delYN='N' and w_time like '"+year+"년 "+month+"월 0"+day+"일%' and dep_code not like 'N'";
			sqlStatement2 = "select count(*) from timeline_post where delYN='N' and anonymity='Y' and w_time like '" + year + "년 " + month + "월 0" + day + "일%'";
		} else {
			sqlStatement1 = "select count(*) from timeline_post where delYN='N' and w_time like '"+year+"년 "+month+"월 "+day+"일%' and dep_code not like 'N'";
			sqlStatement2 = "select count(*) from timeline_post where delYN='N' and anonymity='Y' and w_time like '" + year + "년 " + month + "월 " + day + "일%'";
		}
		int cnt_post = jdbcTemplate.queryForObject(sqlStatement1, Integer.class);
		data.add(cnt_post);
		
		// 오늘 올라온 익명 게시글 수 가져오기
		logger.info("sqlStatement2: " + sqlStatement2);
		int cnt_post_anonymity = jdbcTemplate.queryForObject(sqlStatement2, Integer.class);
		data.add(cnt_post_anonymity);

		// arraylist를 json으로 변환
		ObjectMapper mapper = new ObjectMapper();
		String jsonString = "";
		try {
			jsonString = mapper.writeValueAsString(data);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}

		return jsonString;
	}
	
	public String countTodaysComment() {
		ArrayList<Integer> data = new ArrayList<Integer>();

		// 오늘 날짜 가져오기
		int year = Calendar.getInstance().get(Calendar.YEAR);
		int month = Calendar.getInstance().get(Calendar.MONTH) + 1;
		int day = Calendar.getInstance().get(Calendar.DATE);
		logger.info("오늘은 " + year + "년 " + month + "월 " + day + "일 인니다^ㅇ^/");
		
		// 오늘 올라온 총 댓글 수 가져오기
		String sqlStatement;
		if(day < 10) {
			sqlStatement = "select count(*) from timeline_comment where delYN='N' and c_time like '"+year+"년 "+month+"월 0"+day+"일%'";
		} else {
			sqlStatement = "select count(*) from timeline_comment where delYN='N' and c_time like '"+year+"년 "+month+"월 "+day+"일%'";
		}
		
		int cnt_post = jdbcTemplate.queryForObject(sqlStatement, Integer.class);
		data.add(cnt_post);

		// arraylist를 json으로 변환
		ObjectMapper mapper = new ObjectMapper();
		String jsonString = "";
		try {
			jsonString = mapper.writeValueAsString(data);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}

		return jsonString;
	}
	
	// 월 별 글을 가장 많이 올린 사용자 리스트 가져오기
	public List<CountTop5> writerTop5() {

		// 현재 연도와 달 정보 가져오기
		int year = Calendar.getInstance().get(Calendar.YEAR);
		int month = Calendar.getInstance().get(Calendar.MONTH) + 1;
		
		String date = year + "년 " + month + "월";
		logger.info("오늘은 " + date);

		String sqlStatement = "select user_info.name, count(timeline_post.w_content) as cnt from timeline_post, user_info where not user_info.id='admin' and timeline_post.delYN='N' and timeline_post.w_writer = user_info.id and timeline_post.anonymity='N' and timeline_post.w_time like '"+date+"%' group by timeline_post.w_writer order by cnt desc limit 5";

		return jdbcTemplate.query(sqlStatement, new RowMapper<CountTop5>() {

			@Override
			public CountTop5 mapRow(ResultSet rs, int rowNum) throws SQLException {
				CountTop5 data = new CountTop5();
				
				data.setContent(rs.getString("name"));
				data.setCount(rs.getInt("cnt"));

				logger.info("select Value: " + data.toString());

				return data;
			}
		});
	}
	
	// 월 별 댓글을 가장 많이 올린 사용자 리스트 가져오기
	public List<CountTop5> c_writerTop5() {

		// 현재 연도와 달 정보 가져오기
		int year = Calendar.getInstance().get(Calendar.YEAR);
		int month = Calendar.getInstance().get(Calendar.MONTH) + 1;

		String date = year + "년 " + month + "월";
		logger.info("오늘은 " + date);

		String sqlStatement = "select user_info.name, count(timeline_comment.c_content) as cnt from timeline_comment, user_info where not user_info.id='admin' and timeline_comment.delYN='N' and timeline_comment.c_writer = user_info.id and timeline_comment.c_time like '"
				+ date + "%' group by timeline_comment.c_writer order by cnt desc limit 5";

		return jdbcTemplate.query(sqlStatement, new RowMapper<CountTop5>() {

			@Override
			public CountTop5 mapRow(ResultSet rs, int rowNum) throws SQLException {
				CountTop5 data = new CountTop5();

				data.setContent(rs.getString("name"));
				data.setCount(rs.getInt("cnt"));

				logger.info("select Value: " + data.toString());

				return data;
			}
		});
	}
	
	// 익명글, 실명글 개수 가져오기
	public String getPostRatio() {

		ArrayList<Integer> data = new ArrayList<Integer>();

		// 실명글 개수 가져오기
		String sqlStatement1 = "select count(*) from timeline_post where delYN='N' and anonymity='N'";
		int nonAnonymityPost = jdbcTemplate.queryForObject(sqlStatement1, Integer.class);
		data.add(nonAnonymityPost);

		// 익명글 개수 가져오기
		String sqlStatement2 = "select count(*) from timeline_post where delYN='N' and anonymity='Y';";
		int anonymityPost = jdbcTemplate.queryForObject(sqlStatement2, Integer.class);
		data.add(anonymityPost);

		// arraylist를 json으로 변환
		ObjectMapper mapper = new ObjectMapper();
		String jsonString = "";
		try {
			jsonString = mapper.writeValueAsString(data);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}

		return jsonString;

	}
	
	// 월 별 댓글이 가장 많은 글 가져오기
	public List<CountTop5> commentCount_Top5() {

		// 현재 연도와 달 정보 가져오기
		int year = Calendar.getInstance().get(Calendar.YEAR);
		int month = Calendar.getInstance().get(Calendar.MONTH) + 1;

		String date = year + "년 " + month + "월";
		logger.info("오늘은 " + date);

		String sqlStatement = "select timeline_post.w_content, timeline_post.comment_cnt from timeline_post where not timeline_post.comment_cnt = 0 and timeline_post.delYN='N' and timeline_post.w_time like '"+date+"%' order by timeline_post.comment_cnt desc limit 5;";

		return jdbcTemplate.query(sqlStatement, new RowMapper<CountTop5>() {

			@Override
			public CountTop5 mapRow(ResultSet rs, int rowNum) throws SQLException {
				CountTop5 data = new CountTop5();

				data.setContent(rs.getString("w_content"));
				data.setCount(rs.getInt("comment_cnt"));

				logger.info("select Value: " + data.toString());

				return data;
			}
		});
	}
	
	// 월 별 좋아요가 가장 많은 글 가져오기
	public List<CountTop5> likeCount_Top5() {

		// 현재 연도와 달 정보 가져오기
		int year = Calendar.getInstance().get(Calendar.YEAR);
		int month = Calendar.getInstance().get(Calendar.MONTH) + 1;

		String date = year + "년 " + month + "월";
		logger.info("오늘은 " + date);

		String sqlStatement = "select timeline_post.w_content, timeline_post.like_cnt from timeline_post where not timeline_post.like_cnt = 0 and timeline_post.delYN='N' and timeline_post.w_time like '"
				+ date + "%' order by timeline_post.like_cnt desc limit 5;";

		return jdbcTemplate.query(sqlStatement, new RowMapper<CountTop5>() {

			@Override
			public CountTop5 mapRow(ResultSet rs, int rowNum) throws SQLException {
				CountTop5 data = new CountTop5();

				data.setContent(rs.getString("w_content"));
				data.setCount(rs.getInt("like_cnt"));

				logger.info("select Value: " + data.toString());

				return data;
			}
		});
	}
	
	// 월 별 좋아요가 가장 많은 댓글 가져오기
	public List<CountTop5> likeCommentCount_Top5() {

		// 현재 연도와 달 정보 가져오기
		int year = Calendar.getInstance().get(Calendar.YEAR);
		int month = Calendar.getInstance().get(Calendar.MONTH) + 1;

		String date = year + "년 " + month + "월";
		logger.info("오늘은 " + date);

		String sqlStatement = "select timeline_comment.c_content, timeline_comment.like_cnt from timeline_comment where not timeline_comment.like_cnt = 0 and timeline_comment.delYN='N' and timeline_comment.c_time like '"
				+ date + "%' order by timeline_comment.like_cnt desc limit 5;";

		return jdbcTemplate.query(sqlStatement, new RowMapper<CountTop5>() {

			@Override
			public CountTop5 mapRow(ResultSet rs, int rowNum) throws SQLException {
				CountTop5 data = new CountTop5();

				data.setContent(rs.getString("c_content"));
				data.setCount(rs.getInt("like_cnt"));

				logger.info("select Value: " + data.toString());

				return data;
			}
		});
	}
}
