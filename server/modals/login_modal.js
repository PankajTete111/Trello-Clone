const db = require('../dbConfig/dbconfig'); // Make sure to adjust the path based on your project structure


async function userLogin({ email, password }) {
	try {
		const sql = 'CALL USP_KANBAN_USER_LOGIN(?, ?)';
		const [result] = await db.promise().query(sql, [email, password]);
		console.log("[result]", result[0][0].user_name)

		// Check if a user_id is returned
		if (result && result.length > 0 && result[0][0].user_id) {
			return {
				success: true,
				user_id: result[0][0].user_id,
				user_name: result[0][0].user_name,
				message: 'Login successful',
			};
		} else {
			return {
				success: false,
				message: 'Invalid email or password',
			};
		}
	} catch (error) {
		console.error('Error during user login:', error);
		throw error;
	}
}


async function userLoginInfo({ email,token }) {
  try {
    const sql = 'CALL USP_KANBAN_INSERT_LOGIN_DETAILS(?, ?)';
    const [result] = await db.promise().query(sql, [email, token]);
    // console.log("[result]", result[0][0].user_name); // Assuming user_name is the column you want to log

  } catch (error) {
    console.error('Error during user login:', error);
    throw error;
  }
}

async function verfyToken({token }) {
	console.log(token,"token");
	try {
	  const sql = 'CALL USP_KANBAN_VERIFY_TOKEN(?)';
	  const result = await db.promise().query(sql, [token]);
	  console.log(result[0][0],"resultFrom modal");

	//   console.log("[result]", result[0][0].user_name); // Assuming user_name is the column you want to log
		return result[0][0]
	} catch (error) {
	  console.error('Error during user login:', error);
	  throw error;
	}
  }


module.exports = { userLogin ,userLoginInfo,verfyToken };
