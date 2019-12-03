package kr.sunmoon.koruzb.dao;

import java.sql.ResultSet;
import java.sql.SQLException;

import javax.inject.Inject;
import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import kr.sunmoon.koruzb.model.UserInfo;

@Repository
public class MypageDao {
	
	//@Inject
	private JdbcTemplate jdbcTemplate;

	@Autowired
	public void setDataSource(DataSource datasource) {
		this.jdbcTemplate = new JdbcTemplate(datasource);
	}
	
	// 비밀번호 찾기
	public String findPassword(String phone, String user_id) throws Exception{
		
		String sql = "select count(*) from user_info where id = '"+user_id+"';";
		int result = Integer.parseInt(jdbcTemplate.queryForObject(sql, String.class));
		
		// 비밀번호 랜덤 생성 후 데이터베이스에서 변경
		if(result == 1){
			
			String random_pw_val = getRandomPassword(10);
			System.out.println("랜덤 생성된 Password값: " + random_pw_val);
			
			String sqlStatement = "update user_info set password = '"+random_pw_val+"' where id = '"+user_id+"'";
			jdbcTemplate.update(sqlStatement);
			
			return random_pw_val;
		}else{
			return "fail"; 
		}
	}
	
	// 비밀번호 랜덤 생성
	public String getRandomPassword(int len) { 
		char[] charSet = new char[] { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 
									'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 
									'T', 'U', 'V', 'W', 'X', 'Y', 'Z' }; 
		int idx = 0; 
		StringBuffer sb = new StringBuffer(); 
				
		for (int i = 0; i < len; i++) { 
			idx = (int) (charSet.length * Math.random()); // 36 * 생성된 난수를 Int로 추출 (소숫점제거) 
			sb.append(charSet[idx]); 
		} 
		return sb.toString(); 
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
