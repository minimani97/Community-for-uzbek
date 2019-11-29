package kr.sunmoon.koruzb.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Calendar;
import java.util.List;

import javax.sql.DataSource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import kr.sunmoon.koruzb.model.CommentInfo;
import kr.sunmoon.koruzb.model.PostInfo;
import kr.sunmoon.koruzb.model.W_files;

@Repository
public class MainTimelineDao {

	private static final Logger logger = LoggerFactory.getLogger(MainTimelineDao.class);
	private JdbcTemplate jdbcTemplate;

	@Autowired
	public void setDataSource(DataSource datasource) {
		this.jdbcTemplate = new JdbcTemplate(datasource);
	}

	public void insertPost(PostInfo postInfo) {

		logger.info("작성자 아이디: " + postInfo.getUser_id());
		logger.info("작성 일자: " + postInfo.getW_date());
		logger.info("글 내용: " + postInfo.getW_content());
		logger.info("익명여부: " + postInfo.getAnonymity());
		logger.info("댓글 수: " + postInfo.getComment_cnt());
		logger.info("좋아요 수: " + postInfo.getLike_cnt());
		logger.info("게시판 코드: " + postInfo.getDep_code());

		/*
		 * String sqlTemp =
		 * "insert into main_timeline values (null, '2016225197', '2018년 11월 14일 오전 09시 56분', 'ㄴㅁㅇㄻㄴㅇㄹ', 'N', 0, 0) ;"
		 * ; jdbcTemplate.update(sqlTemp);
		 */

		String sqlStatement = "insert into timeline_post (w_writer, w_time, w_content, anonymity, like_cnt, comment_cnt, dep_code) values (?,?,?,?,?,?,?)";

		jdbcTemplate.update(sqlStatement, postInfo.getUser_id(), postInfo.getW_date(), postInfo.getW_content(),
				postInfo.getAnonymity(), postInfo.getLike_cnt(), postInfo.getComment_cnt(), postInfo.getDep_code());

		// 파일 저장
		sqlStatement = "select MAX(w_num) from timeline_post";
		int w_num = jdbcTemplate.queryForObject(sqlStatement, Integer.class);

		logger.info("글 번호: " + w_num);

		int i = 0;
		for (i = 0; i < postInfo.save_filename.size(); i++) {
			sqlStatement = "insert into timeline_file (w_num, f_num, save_filename, dep_code) values(?,?,?,?)";
			jdbcTemplate.update(sqlStatement, w_num, i + 1, postInfo.save_filename.get(i), postInfo.getDep_code());

			logger.info((i + 1) + ". " + postInfo.save_filename.get(i));
		}
		if (i == 0) {
			logger.info("파일이 아무것도 첨부되지 않음:D");
			sqlStatement = "insert into timeline_file (w_num, f_num, save_filename, dep_code) values(?,?,?,?)";
			jdbcTemplate.update(sqlStatement, w_num, 0, null, postInfo.getDep_code());
		}
	}

	// 제일 처음 로딩할 10개 글
	public List<PostInfo> getPostInfo(final String dep_code) {

		logger.info("getPostInfo is running!!!!!!!!!");

		String sqlStatement1 = "select * from timeline_post, user_info where timeline_post.w_writer = user_info.id and timeline_post.delYN='N' and timeline_post.dep_code='"+dep_code+"' order by w_num desc limit 10";

		return jdbcTemplate.query(sqlStatement1, new RowMapper<PostInfo>() {

			@Override
			public PostInfo mapRow(ResultSet rs, int rowNum) throws SQLException {
				PostInfo post = new PostInfo();
				
				post.setW_num(rs.getInt("w_num"));
				post.setAnonymity(rs.getString("anonymity"));
				post.setUser_id(rs.getString("id"));
				post.setUser_name(rs.getString("name"));
				post.setUser_img(rs.getString("profile"));
				post.setW_date(rs.getString("w_time"));
				post.setW_content(rs.getString("w_content"));
				post.setLike_cnt(rs.getInt("like_cnt"));
				post.setComment_cnt(rs.getInt("comment_cnt"));
				post.setNotice(rs.getString("notice"));

				String sqlStatement2 = "select * from timeline_file where w_num = " + rs.getInt("w_num")
						+ " and dep_code='"+dep_code+"' and save_filename is not null";
				
				List<W_files> w_files =

						jdbcTemplate.query(sqlStatement2, new RowMapper<W_files>() {
							@Override
							public W_files mapRow(ResultSet rs2, int rowNum2) throws SQLException {
								W_files files = new W_files();

								files.setSave_filename(rs2.getString("save_filename"));

								return files;
							}
						});

				post.setSave_filenames(w_files);

				logger.info("select Value: " + post.toString());

				return post;
			}
		});
	}

	// 스크롤 내릴때마다 글 10개씩 더 가져오기
	public List<PostInfo> getExtraPostInfo(final String dep_code, int calledNum) {

		// 글 개수 가져오기
		int w_cnt;

		String sqlStatement = "select count(*) from timeline_post where delYN='N' and dep_code='"+dep_code+"'";
		w_cnt = jdbcTemplate.queryForObject(sqlStatement, Integer.class);

		int startIndex = calledNum * 10;

		logger.info("startIndex: " + startIndex);

		String sqlStatement1 = "select * from timeline_post, user_info where timeline_post.w_writer = user_info.id and timeline_post.delYN='N' and timeline_post.dep_code='"+dep_code+"' order by w_num desc limit "
				+ startIndex + ", 10";

		return jdbcTemplate.query(sqlStatement1, new RowMapper<PostInfo>() {

			@Override
			public PostInfo mapRow(ResultSet rs, int rowNum) throws SQLException {
				PostInfo post = new PostInfo();

				post.setW_num(rs.getInt("w_num"));
				post.setAnonymity(rs.getString("anonymity"));
				post.setUser_id(rs.getString("id"));
				post.setUser_name(rs.getString("name"));
				post.setUser_img(rs.getString("profile"));
				post.setW_date(rs.getString("w_time"));
				post.setW_content(rs.getString("w_content"));
				post.setLike_cnt(rs.getInt("like_cnt"));
				post.setComment_cnt(rs.getInt("comment_cnt"));

				String sqlStatement2 = "select * from timeline_file where w_num = " + rs.getInt("w_num")
						+ " and dep_code='"+dep_code+"' and save_filename is not null and delYN='N'";

				List<W_files> w_files =

						jdbcTemplate.query(sqlStatement2, new RowMapper<W_files>() {
							@Override
							public W_files mapRow(ResultSet rs2, int rowNum2) throws SQLException {
								W_files files = new W_files();

								files.setSave_filename(rs2.getString("save_filename"));

								return files;
							}
						});

				post.setSave_filenames(w_files);

				logger.info("select Value: " + post.toString());

				return post;
			}
		});
	}

	// 글 번호 가져오기
	public int getW_num(String u_id, String w_time, String w_content, String dep_code) {
		logger.info("w_content: " + w_content);

		String sqlStatement = "select w_num from timeline_post where w_content='" + w_content + "' and w_writer='"
				+ u_id + "' and w_time='" + w_time + "' and dep_code='"+dep_code+"'";

		logger.info("SQL: " + sqlStatement);

		return jdbcTemplate.queryForObject(sqlStatement, Integer.class);
	}

	// 댓글 추가하기
	public void insertComment(CommentInfo c_info) {

		logger.info("글 번호: " + c_info.getW_num());
		logger.info("작성자 아이디: " + c_info.getUser_id());
		logger.info("작성 시간: " + c_info.getC_time());
		logger.info("댓글 내용: " + c_info.getC_content());
		logger.info("좋아요 갯수: " + c_info.getLike_cnt());

		String sqlStatement1 = "update timeline_post set comment_cnt = comment_cnt + 1 where w_num = " + c_info.getW_num();
		jdbcTemplate.update(sqlStatement1);
		
		String sqlStatement2 = "insert into timeline_comment (w_num, c_writer, c_time, c_content, like_cnt) values(?,?,?,?,?)";
		jdbcTemplate.update(sqlStatement2, c_info.getW_num(), c_info.getUser_id(), c_info.getC_time(),
				c_info.getC_content(), c_info.getLike_cnt());
	}

	// 댓글 번호 가져오기
	public int getC_num(String u_id, String c_time, String c_content) {
		logger.info("c_content: " + c_content);

		String sqlStatement = "select c_num from timeline_comment where c_content='" + c_content
				+ "' and c_writer='" + u_id + "' and c_time='" + c_time + "'";

		logger.info("SQL: " + sqlStatement);

		return jdbcTemplate.queryForObject(sqlStatement, Integer.class);
	}

	// 댓글 가져오기
	public List<CommentInfo> getAllComments(int w_num) {
		String sqlStatement1 = "select * from timeline_comment, user_info where timeline_comment.w_num="
				+ w_num + " and timeline_comment.c_writer=user_info.id and timeline_comment.delYN='N'";

		return jdbcTemplate.query(sqlStatement1, new RowMapper<CommentInfo>() {

			@Override
			public CommentInfo mapRow(ResultSet rs, int rowNum) throws SQLException {
				CommentInfo comment = new CommentInfo();

				comment.setC_num(rs.getInt("c_num"));
				comment.setW_num(rs.getInt("w_num"));
				comment.setC_time(rs.getString("c_time"));
				comment.setC_content(rs.getString("c_content"));
				comment.setLike_cnt(rs.getInt("like_cnt"));
				comment.setUser_id(rs.getString("id"));
				comment.setUser_name(rs.getString("name"));
				comment.setUser_img(rs.getString("profile"));

				logger.info("select Value: " + comment.toString());

				return comment;
			}
		});
	}
	
	// 글 삭제하기
	public void deletePost(int w_num) {

		// 글에 달린 댓글의 플래그 바꾸기
		String sqlStatement1 = "update timeline_comment set delYN = 'Y' where w_num = " + w_num;
		jdbcTemplate.update(sqlStatement1);

		// 해당 글의 플래그 바꾸기
		String sqlStatement2 = "update timeline_post set delYN = 'Y' where w_num = " + w_num;
		jdbcTemplate.update(sqlStatement2);
			
		// 해당 글의 파일 플래그 바꾸기
		String sqlStatement3 = "update timeline_file set delYN = 'Y' where w_num = " + w_num;
	}
	

	// 댓글 삭제하기
	public int deleteComment(int c_num) {

		// 해당 댓글의 플래그 바꾸기
		String sqlStatement1 = "update timeline_comment set delYN = 'Y' where c_num = " + c_num;
		jdbcTemplate.update(sqlStatement1);
		
		// 댓글이 달린 글 번호 가져오기
		String sqlStatement2 = "select w_num from timeline_comment where c_num = " + c_num;
		int w_num = jdbcTemplate.queryForObject(sqlStatement2, Integer.class);
		
		// 해당 글의 댓글 수 하나 줄이기
		String sqlStatement3 = "update timeline_post set comment_cnt = comment_cnt - 1 where w_num = " + w_num;
		jdbcTemplate.update(sqlStatement3);
		
		// 해당 댓글이 달린 글 번호 가져오기
		String sqlStatement4 = "select w_num from timeline_comment where c_num = " + c_num;
		return jdbcTemplate.queryForObject(sqlStatement4, Integer.class);
	}
	
	// 수정_글 내용 가져오기
	public String getPostContent(int w_num, String dep_code) {

		String sqlStatement = "select w_content from timeline_post where w_num = " + w_num + " and dep_code='"+dep_code+"'";
		System.out.println("SQL: " + sqlStatement);
		return jdbcTemplate.queryForObject(sqlStatement, String.class);
	}
	
	// 글 수정하기
	public void editPost(int w_num, String w_content) {

		String sqlStatement = "update timeline_post set w_content='" + w_content + "' where w_num=" + w_num;
		jdbcTemplate.update(sqlStatement);
				
	}
	
	// 수정_댓글 내용 가져오기
	public String getCommentContent(int c_num, String dep_code) {

		String sqlStatement = "select c_content from timeline_comment where c_num = " + c_num;
		
		String temp = jdbcTemplate.queryForObject(sqlStatement, String.class);
		logger.info("셀렉 해온 댓글 내용!_!: " + temp);
		return temp;

	}
	
	// 댓글 수정하기
	public int editComment(int c_num, String c_content) {
		
		// 댓글 내용 수정
		String sqlStatement1 = "update timeline_comment set c_content='" + c_content + "' where c_num=" + c_num;
		jdbcTemplate.update(sqlStatement1);
		
		// 댓글이 달려있는 글 번호 가져오기
		String sqlStatement2 = "select w_num from timeline_comment where c_num=" + c_num;
		int w_num = jdbcTemplate.queryForObject(sqlStatement2, Integer.class);
		
		return w_num;

	}
	
	// 글 좋아요 기능
	public int setPostLike(int w_num) {		
		
		// 현재 좋아요 개수 가져오기
		String sqlStatement1 = "select like_cnt from timeline_post where w_num=" + w_num;
		int like_cnt = jdbcTemplate.queryForObject(sqlStatement1, Integer.class);
		
		// 글 정보 담긴 테이블의 좋아요 컬럼 1 증가
		String sqlStatement2 = "update timeline_post set like_cnt = like_cnt + 1 where w_num=" + w_num;
		jdbcTemplate.update(sqlStatement2);
		
		return like_cnt;
	}
	
	// 댓글 좋아요 기능
	public int setCommentLike(int c_num) {

		// 현재 좋아요 개수 가져오기
		String sqlStatement1 = "select like_cnt from timeline_comment where c_num=" + c_num;
		int like_cnt = jdbcTemplate.queryForObject(sqlStatement1, Integer.class);

		// 댓글 정보 담긴 테이블의 좋아요 컬럼 1 증가
		String sqlStatement2 = "update timeline_comment set like_cnt = like_cnt + 1 where c_num=" + c_num;
		jdbcTemplate.update(sqlStatement2);

		return like_cnt;
	}
	
	// 검색 단어에 해당하는 처음 10개 글 불러오기
	public List<PostInfo> getSearchWriting(String type, String word, final String dep_code) {

		logger.info("getSearchWriting is running!!!!");
		logger.info("~~~~~searchType: " + type);

		String sqlStatement = "";
		if(type.equals("search-writing")) {
			sqlStatement = "select * from timeline_post, user_info where timeline_post.w_writer = user_info.id and timeline_post.w_content like '%"+word+"%' and timeline_post.dep_code='"+dep_code+"' and timeline_post.delYN='N' order by w_num desc limit 10";
		}
		else {
			sqlStatement = "select * from timeline_post, user_info where timeline_post.w_writer = user_info.id and user_info.name = '"+word+"' and timeline_post.anonymity='N' and timeline_post.dep_code='"+dep_code+"' and timeline_post.delYN='N' order by w_num desc limit 10";
		}

		logger.info("search_SQL: " + sqlStatement);
		return jdbcTemplate.query(sqlStatement, new RowMapper<PostInfo>() {

			@Override
			public PostInfo mapRow(ResultSet rs, int rowNum) throws SQLException {
				PostInfo post = new PostInfo();

				post.setW_num(rs.getInt("w_num"));
				post.setAnonymity(rs.getString("anonymity"));
				post.setUser_id(rs.getString("id"));
				post.setUser_name(rs.getString("name"));
				post.setUser_img(rs.getString("profile"));
				post.setW_date(rs.getString("w_time"));
				post.setW_content(rs.getString("w_content"));
				post.setLike_cnt(rs.getInt("like_cnt"));
				post.setComment_cnt(rs.getInt("comment_cnt"));

				String sqlStatement2 = "select * from timeline_file where w_num = " + rs.getInt("w_num")
						+ " and dep_code='"+dep_code+"' and save_filename is not null";

				List<W_files> w_files =

						jdbcTemplate.query(sqlStatement2, new RowMapper<W_files>() {
							@Override
							public W_files mapRow(ResultSet rs2, int rowNum2) throws SQLException {
								W_files files = new W_files();

								files.setSave_filename(rs2.getString("save_filename"));

								return files;
							}
						});

				post.setSave_filenames(w_files);

				logger.info("select Value: " + post.toString());

				return post;
			}
		});
	}

	// 스크롤 내릴때마다 글 10개씩 더 가져오기
	public List<PostInfo> getSearchExtraPostInfo(int calledNum, String type, String word, final String dep_code) {

		int startIndex = calledNum * 10;

		logger.info("startIndex: " + startIndex);

		logger.info("searchType: " + type);
		logger.info("searchWord: " + word);

		String sqlStatement1;
		if (type.equals("search-writing")) {
			sqlStatement1 = "select * from timeline_post, user_info where timeline_post.w_writer = user_info.id and timeline_post.w_content like '%"
					+ word + "%' and timeline_post.dep_code='" + dep_code
					+ "' and timeline_post.delYN='N' order by w_num desc limit " + startIndex + ", 10";
		} else {
			sqlStatement1 = "select * from timeline_post, user_info where timeline_post.w_writer = user_info.id and userinfo.name = '"
					+ word + "' and timeline_post.anonymity='N' and timeline_post.dep_code='" + dep_code
					+ "' and timeline_post.delYN='N' order by w_num desc limit " + startIndex + ", 10";
		}

		logger.info("search_SQL: " + sqlStatement1);
		return jdbcTemplate.query(sqlStatement1, new RowMapper<PostInfo>() {

			@Override
			public PostInfo mapRow(ResultSet rs, int rowNum) throws SQLException {
				PostInfo post = new PostInfo();

				post.setW_num(rs.getInt("w_num"));
				post.setAnonymity(rs.getString("anonymity"));
				post.setUser_id(rs.getString("id"));
				post.setUser_name(rs.getString("name"));
				post.setUser_img(rs.getString("profile"));
				post.setW_date(rs.getString("w_time"));
				post.setW_content(rs.getString("w_content"));
				post.setLike_cnt(rs.getInt("like_cnt"));
				post.setComment_cnt(rs.getInt("comment_cnt"));

				String sqlStatement2 = "select * from timeline_file where w_num = " + rs.getInt("w_num")
						+ " and dep_code='" + dep_code + "' and save_filename is not null and delYN='N'";

				List<W_files> w_files =

						jdbcTemplate.query(sqlStatement2, new RowMapper<W_files>() {
							@Override
							public W_files mapRow(ResultSet rs2, int rowNum2) throws SQLException {
								W_files files = new W_files();

								files.setSave_filename(rs2.getString("save_filename"));

								return files;
							}
						});

				post.setSave_filenames(w_files);

				logger.info("select Value: " + post.toString());

				return post;
			}
		});
	}
	
	
	// 공지사항 탭 관련 함수
	// 공지글 올리기
	public void postNotice(PostInfo postInfo) {

		logger.info("작성자 아이디: " + postInfo.getUser_id());
		logger.info("작성 일자: " + postInfo.getW_date());
		logger.info("글 내용: " + postInfo.getW_content());
		logger.info("익명여부: " + postInfo.getAnonymity());
		logger.info("댓글 수: " + postInfo.getComment_cnt());
		logger.info("좋아요 수: " + postInfo.getLike_cnt());
		logger.info("학과 코드: " + postInfo.getDep_code());

		String sqlStatement = "insert into timeline_post (w_writer, w_time, w_content, anonymity, like_cnt, comment_cnt, dep_code) values (?,?,?,?,?,?,?)";

		jdbcTemplate.update(sqlStatement, postInfo.getUser_id(), postInfo.getW_date(), postInfo.getW_content(),
				postInfo.getAnonymity(), postInfo.getLike_cnt(), postInfo.getComment_cnt(), postInfo.getDep_code());

		// 파일 저장
		sqlStatement = "select MAX(w_num) from timeline_post";
		int w_num = jdbcTemplate.queryForObject(sqlStatement, Integer.class);

		logger.info("글 번호: " + w_num);

		int i = 0;
		for (i = 0; i < postInfo.save_filename.size(); i++) {
			sqlStatement = "insert into timeline_file (w_num, f_num, save_filename, dep_code) values(?,?,?,?)";
			jdbcTemplate.update(sqlStatement, w_num, i + 1, postInfo.save_filename.get(i), postInfo.getDep_code());

			logger.info((i + 1) + ". " + postInfo.save_filename.get(i));
		}
		if (i == 0) {
			logger.info("파일이 아무것도 첨부되지 않음:D");
			sqlStatement = "insert into timeline_file (w_num, f_num, save_filename, dep_code) values(?,?,?,?)";
			jdbcTemplate.update(sqlStatement, w_num, 0, null, postInfo.getDep_code());
		}
	}
	
	// 공지글의 플래그 'Y'로 바꾸기
	public void putUpNotice(int w_num) {

		// 해당 글의 플래그 바꾸기
		String sqlStatement1 = "update timeline_post set notice = 'Y' where w_num = " + w_num;
		jdbcTemplate.update(sqlStatement1);
		
		// 해당 글의 플래그 바꾸기
		String sqlStatement2 = "update timeline_file set notice = 'Y' where w_num = " + w_num;
		jdbcTemplate.update(sqlStatement2);
	}
	
	// 공지글의 플래그 'N'로 바꾸기
	public void putDownNotice(int w_num) {

		// 해당 글의 플래그 바꾸기
		String sqlStatement1 = "update timeline_post set notice = 'N' where w_num = " + w_num;
		jdbcTemplate.update(sqlStatement1);

		// 해당 글의 플래그 바꾸기
		String sqlStatement2 = "update timeline_file set notice = 'N' where w_num = " + w_num;
		jdbcTemplate.update(sqlStatement2);

	}
	
	// 공지글로 설정된 글 가져오기
	public List<PostInfo> noticePostList() {

		String sqlStatement1 = "select * from timeline_post where notice='Y' order by w_num desc";

		return jdbcTemplate.query(sqlStatement1, new RowMapper<PostInfo>() {

			@Override
			public PostInfo mapRow(ResultSet rs, int rowNum) throws SQLException {
				PostInfo post = new PostInfo();

				post.setW_num(rs.getInt("w_num"));
				post.setW_date(rs.getString("w_time"));
				post.setW_content(rs.getString("w_content"));
				post.setNotice(rs.getString("notice"));

				String sqlStatement2 = "select * from timeline_file where notice='Y' and w_num="+rs.getString("w_num")+" and save_filename is not null";

				List<W_files> w_files =

						jdbcTemplate.query(sqlStatement2, new RowMapper<W_files>() {
							@Override
							public W_files mapRow(ResultSet rs2, int rowNum2) throws SQLException {
								W_files files = new W_files();

								files.setSave_filename(rs2.getString("save_filename"));

								return files;
							}
						});

				post.setSave_filenames(w_files);

				logger.info("select Value: " + post.toString());

				return post;
			}
		});
	}

	// 좋아요 가장 많은 글 세 개 가져오기
	public List<PostInfo> bestLikePostInfo() {

		// 오늘 날짜 가져오기
		int year = Calendar.getInstance().get(Calendar.YEAR);
		int month = Calendar.getInstance().get(Calendar.MONTH) + 1;
		int day = Calendar.getInstance().get(Calendar.DATE);
		logger.info("오늘은 " + year + "년 " + month + "월 " + day + "일 인니다^ㅇ^/");

		String sqlStatement1;
		if (day < 10) {
			sqlStatement1 = "select * from timeline_post where not timeline_post.like_cnt = 0 and timeline_post.delYN='N' and timeline_post.w_time like '" + year + "년 " + month + "월 0" + day + "일%' order by timeline_post.like_cnt desc limit 3"; 
		} else {
			sqlStatement1 = "select * from timeline_post where not timeline_post.like_cnt = 0 and timeline_post.delYN='N' and timeline_post.w_time like '" + year + "년 " + month + "월 " + day + "일%' order by timeline_post.like_cnt desc limit 3";
		}
		
		return jdbcTemplate.query(sqlStatement1, new RowMapper<PostInfo>() {

			@Override
			public PostInfo mapRow(ResultSet rs, int rowNum) throws SQLException {
				PostInfo post = new PostInfo();

				post.setW_num(rs.getInt("w_num"));
				post.setW_date(rs.getString("w_time"));
				post.setW_content(rs.getString("w_content"));
				post.setNotice(rs.getString("notice"));

				String sqlStatement2 = "select * from timeline_file where w_num=" + rs.getString("w_num")
						+ " and save_filename is not null";

				List<W_files> w_files =

						jdbcTemplate.query(sqlStatement2, new RowMapper<W_files>() {
							@Override
							public W_files mapRow(ResultSet rs2, int rowNum2) throws SQLException {
								W_files files = new W_files();

								files.setSave_filename(rs2.getString("save_filename"));

								return files;
							}
						});

				post.setSave_filenames(w_files);

				logger.info("select Value: " + post.toString());

				return post;
			}
		});
	}
	
	// 댓글 가장 많은 글 세 개 가져오기
	public List<PostInfo> bestCommentPostInfo() {

		// 오늘 날짜 가져오기
		int year = Calendar.getInstance().get(Calendar.YEAR);
		int month = Calendar.getInstance().get(Calendar.MONTH) + 1;
		int day = Calendar.getInstance().get(Calendar.DATE);
		logger.info("오늘은 " + year + "년 " + month + "월 " + day + "일 인니다^ㅇ^/");

		String sqlStatement1;
		if (day < 10) {
			sqlStatement1 = "select * from timeline_post where not timeline_post.comment_cnt = 0 and timeline_post.delYN='N' and timeline_post.w_time like '"
					+ year + "년 " + month + "월 0" + day + "일%' order by timeline_post.comment_cnt desc limit 3";
		} else {
			sqlStatement1 = "select * from timeline_post where not timeline_post.comment_cnt = 0 and timeline_post.delYN='N' and timeline_post.w_time like '"
					+ year + "년 " + month + "월 " + day + "일%' order by timeline_post.comment_cnt desc limit 3";
		}

		return jdbcTemplate.query(sqlStatement1, new RowMapper<PostInfo>() {

			@Override
			public PostInfo mapRow(ResultSet rs, int rowNum) throws SQLException {
				PostInfo post = new PostInfo();

				post.setW_num(rs.getInt("w_num"));
				post.setW_date(rs.getString("w_time"));
				post.setW_content(rs.getString("w_content"));
				post.setNotice(rs.getString("notice"));

				String sqlStatement2 = "select * from timeline_file where w_num=" + rs.getString("w_num")
						+ " and save_filename is not null";

				List<W_files> w_files =

						jdbcTemplate.query(sqlStatement2, new RowMapper<W_files>() {
							@Override
							public W_files mapRow(ResultSet rs2, int rowNum2) throws SQLException {
								W_files files = new W_files();

								files.setSave_filename(rs2.getString("save_filename"));

								return files;
							}
						});

				post.setSave_filenames(w_files);

				logger.info("select Value: " + post.toString());

				return post;
			}
		});
	}

}


