package kr.sunmoon.koruzb.dao;

import java.sql.ResultSet;
import java.sql.SQLException;

import javax.sql.DataSource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import kr.sunmoon.koruzb.model.UserInfo;

@Repository
public class LoginDao {

	private static final Logger logger = LoggerFactory.getLogger(LoginDao.class);
	private JdbcTemplate jdbcTemplate;

	@Autowired
	public void setDataSource(DataSource datasource) {
		this.jdbcTemplate = new JdbcTemplate(datasource);
	}

	// 로그인 관련 함수
	public UserInfo checkLogin(String id, String password) {

		logger.info(id);
		logger.info(password);

		String sqlStatement = "select * from user_info where id='" + id +"'";

		try {
			logger.info("UserInfo checkLogin try.");

			return jdbcTemplate.queryForObject(sqlStatement, new RowMapper<UserInfo>() {
				@Override
				public UserInfo mapRow(ResultSet rs, int rowNum) throws SQLException {

					UserInfo userInfo = new UserInfo();
					userInfo.setId(rs.getString("id"));
					userInfo.setPassword(rs.getString("password"));
					userInfo.setName(rs.getString("name"));
					//userInfo.setNationality(rs.getString("nationality"));
					userInfo.setProfile(rs.getString("profile"));
					userInfo.setPhone(rs.getString("phone"));
					userInfo.setEmail(rs.getString("email"));
					userInfo.setUsertype(rs.getString("usertype"));
					userInfo.setCertify(rs.getString("certify"));

					logger.info("*******userinfo select Value*******: " + userInfo.toString());
					// request.getSession().setAttribute("signedUser",
					// userInfo);
					return userInfo;
				}

			});

		} catch (Exception e) {
			logger.info("DB Exception");
			e.printStackTrace();
			return new UserInfo();
		}

	}

}
