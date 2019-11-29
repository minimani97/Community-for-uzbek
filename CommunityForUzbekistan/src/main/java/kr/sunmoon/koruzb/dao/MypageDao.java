package kr.sunmoon.koruzb.dao;

import java.sql.ResultSet;
import java.sql.SQLException;

import javax.inject.Inject;
import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Repository;

import kr.sunmoon.koruzb.model.UserInfo;
import kr.sunmoon.koruzb.util.MailHandler;

@Repository
public class MypageDao {
	// private static final Logger logger = (Logger)
	// LoggerFactory.getLogger(RegisterDAO.class);
	@Inject
	private JavaMailSender mailSender;
	private JdbcTemplate jdbcTemplate;

	@Autowired
	public void setDataSource(DataSource datasource) {
		this.jdbcTemplate = new JdbcTemplate(datasource);
	}
	
	// 비밀번호 찾기
	public String findPassword(String portal_email, String user_id) throws Exception{
		
		String sql = "select count(*) from user_info where id = '"+user_id+"';";
		int result = Integer.parseInt(jdbcTemplate.queryForObject(sql, String.class));
		
		// 메일 보내기
		if(result == 1){
			String sqlStatement = "select password from user_info where id = '"+user_id+"';";
			String rst = jdbcTemplate.queryForObject(sqlStatement, String.class);

			MailHandler sendMail = new MailHandler(mailSender);
			sendMail.setSubject("[선문대 귀는 당나귀 귀 ★ 비밀번호 찾기 안내]");
			sendMail.setText(new StringBuffer().append("<h1>비밀번호 안내</h1>").append("찾으신 비밀번호 : ")
					.append(rst).toString());
			sendMail.setFrom("dpfls96@gmail.com", "선귀당귀 관리자");
			sendMail.setTo(portal_email);
			sendMail.send();
			
			return jdbcTemplate.queryForObject(sqlStatement, String.class);
			
			
		}else{
		return "fail"; 
		}
	}
	
	public void saveProfileDao(String imgUrl, String user_id) throws Exception {
		String sql = "update user_info set profile = '" + imgUrl + "' where id = '" + user_id + "';";
		System.out.println(sql);
		jdbcTemplate.update(sql);
	}
	
	public void editUserInfo(String u_id, String phone, String email) {
		String sql = "update user_info set phone = '"+phone+"', email='"+email+"' where id = '"+u_id+"';";
		System.out.println("SQL: " + sql);
		jdbcTemplate.update(sql);
	}
	
	public UserInfo reSetSession(String user_id) {
		String sql = "select * from user_info where id='"+user_id+"'";
		
		return jdbcTemplate.queryForObject(sql, new RowMapper<UserInfo>() {
			@Override
			public UserInfo mapRow(ResultSet rs, int rowNum) throws SQLException {
				
				UserInfo info = new UserInfo();
				
				info.setEmail(rs.getString("email"));
				info.setPhone(rs.getString("phone"));
				
				return info;
				
			}
		});
	}

	public UserInfo myPageInfoDao(String user_id) throws Exception {
		// UserInformation info = new UserInformation();
		String sql = "select id, name, email from user_info where id = '" + user_id
				+ "';";
		System.out.println(user_id);

		try {

			return jdbcTemplate.queryForObject(sql, new RowMapper<UserInfo>() {
				@Override
				public UserInfo mapRow(ResultSet rs, int rowNum) throws SQLException {

					UserInfo info = new UserInfo();

					info.setEmail(rs.getString("email"));
					info.setId(rs.getString("id"));
					info.setName(rs.getString("name"));
					//info.setUser_department(rs.getString("department"));
					
					return info;
				}

			});

		} catch (Exception e) {
			return new UserInfo();
		}

	}

	public void insertNewPassword(String user_id, String password) {

		String sql = "update user_info set password = '"+password+"' where id = '" + user_id + "';";
		System.out.println(sql);
		jdbcTemplate.update(sql);

	}
	
	public void deleteUser(String user_id) {
		
		String sql = "delete from user_info where id = "+user_id+"";
		jdbcTemplate.update(sql);
		
	}

}
