package kr.sunmoon.koruzb.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import kr.sunmoon.koruzb.model.UserInfo;

@Repository
public class AdminUsersDao {

	private JdbcTemplate jdbcTemplate;

	@Autowired
	public void setDataSource(DataSource datasource) {
		this.jdbcTemplate = new JdbcTemplate(datasource);
	}

	public List<UserInfo> adminInfo() {
		
		String sql = "select distinct profile, name, id, email, phone from user_info;";
		//System.out.println(sql);
		return jdbcTemplate.query(sql, new RowMapper<UserInfo>() {
			@Override
			public UserInfo mapRow(ResultSet rs, int rowNum) throws SQLException {

				UserInfo info = new UserInfo();
				info.setProfile(rs.getString("profile"));
				info.setName(rs.getString("name"));
				info.setId(rs.getString("id"));
				info.setEmail(rs.getString("email"));
				info.setPhone(rs.getString("phone"));
				//info.setAdmin_dep(rs.getString("dep_name"));
				
				System.out.println("NAME IS: " + info.getName());
				
				return info;
			}

		});

	}
	
	public UserInfo adminEditInfo(String user_id) throws Exception {
		
		String sql = "select name, id, email, phone, certify from user_info where id = '" + user_id + "';";
		
		try {

			return jdbcTemplate.queryForObject(sql, new RowMapper<UserInfo>() {
				@Override
				public UserInfo mapRow(ResultSet rs, int rowNum) throws SQLException {

					UserInfo info = new UserInfo();
					info.setName(rs.getString("name"));
					info.setId(rs.getString("id"));
					//info.setAdminEdit_dep(rs.getString("dep_name"));
					info.setEmail(rs.getString("email"));
					info.setPhone(rs.getString("phone"));
					info.setCertify(rs.getString("certify"));
					//info.setAdminEdit_depcode(rs.getString("dep_code"));
					//info.setAdminEdit_certify(rs.getString("certify"));
					
					return info;
				}

			});
		} catch (Exception e) {
			return new UserInfo();
		}
		
	}
	
	/*public void editDepartment(String depNum, String depCode) {
		String sql = "update userinfo set department = '"+depCode+"' where user_num = '"+depNum+"';";
		
		jdbcTemplate.update(sql);
	}*/
		
	public void blockCertify(String user_id) {
		String sql = "update user_info set certify = 'b' where id = '"+user_id+"';";
		
		jdbcTemplate.update(sql);
		
	}
	
	public void unlockCertify(String user_id) {
		String sql = "update user_info set certify = 'y' where id = '"+user_id+"';";
		
		jdbcTemplate.update(sql);
		
	}
	
}
