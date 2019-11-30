package kr.sunmoon.koruzb.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import javax.sql.DataSource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import kr.sunmoon.koruzb.model.Msg;

@Repository
public class MessageDao {

	private static final Logger logger = LoggerFactory.getLogger(MessageDao.class);
	private JdbcTemplate jdbcTemplate;

	@Autowired
	public void setDataSource(DataSource datasource) {
		this.jdbcTemplate = new JdbcTemplate(datasource);
	}
	
	public String getName(String to_user_id){
		String sqlStatement = "select name from user_info where id = '"+to_user_id+"'";
		
		return jdbcTemplate.queryForObject(sqlStatement, String.class);
	}
	
	
	public void sendtxt(String from_user_id, String to_user_id, String title, String msg) {
		//logger.info("Dao!!!!!!!!!!!!!!!!RequestMapping /sendMsg.");
		//logger.info("체크체크:" + from_user_id+"/"+to_user_id+"/"+title+"/"+msg);
		
		String sqlStatement ="insert into sendmsg (from_user_id, to_user_id, title, msg) "
				+ "values ('"+from_user_id+"','"+to_user_id+"','"+title+"','"+msg+"')";

		jdbcTemplate.update(sqlStatement);
	}

	//보낸 메시지
	public List<Msg> msgList(String from_user_id){
		
		logger.info("쪽지리스트 가져오는 함수  " + from_user_id);
		
		//String sqlStatement = "select * from sendmsg where from_user_id ='"+from_user_id+"'";
		String sqlStatement = "select num, to_user_id, name, title, msg, open, senddate "
				+ "from user_info U, sendmsg S "
				+ "where S.to_user_id = U.id and del='N' and S.from_user_id='"+from_user_id+"' order by senddate desc";
		
		//try{
			logger.info("msgList try.");
			
			return jdbcTemplate.query(sqlStatement, new RowMapper<Msg>(){
				
				@Override
				public Msg mapRow(ResultSet rs, int rowNum) throws SQLException {
					
					Msg msg = new Msg();
					msg.setNum(rs.getInt("num"));
					msg.setUser_name(rs.getString("name"));/*
					msg.setFrom_user_id(rs.getString("from_user_id"));*/
					msg.setTo_user_id(rs.getString("to_user_id"));
					msg.setTitle(rs.getString("title"));
					msg.setSenddate(rs.getString("senddate"));
					msg.setOpen(rs.getString("open"));
					
					logger.info("=====msg value=====: " + msg.toString());
					
					return msg;
				}
			});
		/*}catch (Exception e) {
			logger.info("DB Exception");
			return new Msg();
		}*/
		
	}
	
	//쪽지 열기
	public Msg open(int num){
		
		String sqlStatement = "select num, name, title, msg, senddate "
				+ "from user_info U, sendmsg S "
				+ "where S.from_user_id = U.id and num = "+num;
		
		return jdbcTemplate.queryForObject(sqlStatement, new RowMapper<Msg>(){
			
			@Override
			public Msg mapRow(ResultSet rs, int rowNum) throws SQLException {
				
				Msg msg = new Msg();
				msg.setNum(rs.getInt("num"));
				msg.setUser_name(rs.getString("name"));
				msg.setTitle(rs.getString("title"));
				msg.setMsg(rs.getString("msg"));
				msg.setSenddate(rs.getString("senddate"));
				
				return msg;
			}
		});
	}
	//메세지 읽으면 open = Y
	public void opencheck(int num){
		String sqlStatement = "update sendmsg set open='Y' where num="+num;
		
		jdbcTemplate.update(sqlStatement); 
	}
	
	// 받은 메시지
	public List<Msg> receiveMsgList(String to_user_id) {

		logger.info("쪽지리스트 가져오는 함수  " + to_user_id);

		String sqlStatement = "select num, from_user_id, name, title, msg, senddate "
				+ "from sendmsg S, user_info U " + "where from_user_id = id and del='N' and to_user_id='" + to_user_id+"' order by senddate desc";

		logger.info("receiveMsgList try.");

		return jdbcTemplate.query(sqlStatement, new RowMapper<Msg>() {

			@Override
			public Msg mapRow(ResultSet rs, int rowNum) throws SQLException {

				Msg msg = new Msg();
				msg.setNum(rs.getInt("num"));
				msg.setUser_name(rs.getString("name"));
				msg.setFrom_user_id(rs.getString("from_user_id"));
				msg.setTitle(rs.getString("title"));
				msg.setSenddate(rs.getString("senddate"));

				logger.info("=====receive value=====: " + msg.toString());

				return msg;
			}
		});

	}

	// 쪽지 열기
	public String notRead(String to_user_id) {

		String sqlStatement = "select count(*) from sendmsg where open='N' and to_user_id='"+to_user_id+"'";
		int result = jdbcTemplate.queryForObject(sqlStatement, Integer.class);
		
		return Integer.toString(result);
	}
	
	//나에게 온 쪽지 개수 확인(새로운 쪽지 알림창)
	public String countMyMsg(String to_user_id) {

		String sqlStatement = "select count(*) from sendmsg where to_user_id='"+to_user_id+"'";
		int result = jdbcTemplate.queryForObject(sqlStatement, Integer.class);
		
		logger.info("=====notRead value=====: " + result);
		
		return Integer.toString(result);
	}
	
	// 쪽지 삭제
	public void deleteMsg(int num) {

		String sqlStatement = "update sendmsg set del = 'Y' where num=" + num;
		jdbcTemplate.update(sqlStatement);
	}
}
