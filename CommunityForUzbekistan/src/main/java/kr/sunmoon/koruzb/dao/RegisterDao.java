package kr.sunmoon.koruzb.dao;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import kr.sunmoon.koruzb.model.UserInfo;

@Repository
public class RegisterDao {
	// private static final Logger logger = (Logger)
	// LoggerFactory.getLogger(RegisterDAO.class);
	private JdbcTemplate jdbcTemplate;

	@Autowired
	public void setDataSource(DataSource datasource) {
		this.jdbcTemplate = new JdbcTemplate(datasource);
	}

	public int checkDuplicate(String id) {

		String sql = "select count(*) from user_info where id = '" + id + "';";
		System.out.println(sql);

		int result = jdbcTemplate.queryForObject(sql, Integer.class);
		System.out.println("JDBC TEMPLATE: " + result);
		return result;

	}

	/*
	 * @Override public UserVO authenticate(String str) throws Exception { //
	 * TODO Auto-generated method stub System.out.println("dao"); return
	 * sqlSession.selectOne(namespace+".checkdupl", str); }
	 */

	public void insertRegisterUser(UserInfo info) {

		String sql = "insert into user_info values(?,?,?,null,?,?,'U')";

		jdbcTemplate.update(sql, info.getId(), info.getPassword(), info.getName(), info.getPhone(),
				info.getEmail());

	}

	/*public void createAuthKey(String portal_email, String user_authCode) throws Exception {
		// TODO Auto-generated method stub
		UserInformation info = new UserInformation();

		info.setUser_authCode(user_authCode);
		info.setPortal_email(portal_email);
		String sql = "update userinfo set user_key = '" + user_authCode + "' where portal_email = '" + portal_email
				+ "';";
		System.out.println(sql);
		jdbcTemplate.update(sql);
	}

	// @Override
	public void userAuth(String portal_email, String user_key) throws Exception {
		// TODO Auto-generated method stub
		// sqlSession.update(namespace + ".userAuth", user_email);

		String sql = "update userinfo set certify = 'y' where portal_email = '" + portal_email + "';";
		System.out.println(sql);
		jdbcTemplate.update(sql);
	}*/

	
}
