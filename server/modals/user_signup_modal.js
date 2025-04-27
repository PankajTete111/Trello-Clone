const db = require('../dbConfig/dbconfig');

async function createUser({ email_id, contact_no, full_name, password }) {
  try {
    const sql = 'CALL USP_KANBAN_CREATE_USER(?, ?, ?, ?)';
    const [result] = await db.promise().query(sql, [email_id, contact_no, full_name, password]);
    return result;
  } catch (error) {
    console.error('Error inserting user details:', error);
    throw error;
  }
}


async function createBoard({ usiKey, boardName }) {
  console.log(usiKey,boardName,"usikeyboardname");
  try {
    const sql = 'CALL USP_KANBAN_CREATE_BOARD(?, ?)';
    const [result] = await db.promise().query(sql, [usiKey, boardName]);
    console.log(result, "ress");
    return result;
    
  } catch (error) {
    console.error('Error creating board:', error);
    throw error;
  }
}

async function getBoardDetails(usiKey) {
  try {
    console.log(usiKey,"usiKey");
    
    const sql = 'CALL USP_KANBAN_GET_ALL_BOARD_BY_ID(?)';
    const result = await db.promise().query(sql, [usiKey]);
console.log(result[0],"res");
    // Extract the rows from the result
    const rows = result[0];
    console.log(rows,"rows");
    return rows;
  } catch (error) {
    console.error('Error getting board details:', error);
    throw error;
  }
}

async function createCard({
  usiKey,
  ubiKey,
  cardTitle,
  cardDiscp,
  cardDate
}) {
  try {
    const sql = 'CALL USP_KANBAN_CREATE_CARD(?, ?,?, ?, ?)';
    const result = await db.promise().query(sql, [
      usiKey,
      ubiKey,
      cardTitle,
      cardDiscp,
      cardDate
    ]);


    return result;
  } catch (error) {
    console.error('Error creating card:', error);
    throw error;
  }
}

async function getCardDetails(ubiKey, usiKey ) {
  try {
    const sql = 'CALL USP_KANBAN_GET_ALL_CARD_BY_BOARD_ID(?,?)';
    const [result] = await db.promise().query(sql, [ubiKey,usiKey]);

    const cardDetails = result[0];

    return cardDetails;
  } catch (error) {
    console.error('Error getting card details:', error);
    throw error;
  }
}

async function createTask({
  usiKey,
  ubiKey,
  uciKey,
  taskName
}) {
  try {
    const sql = 'CALL USP_KANBAN_CREATE_TASK(?, ? , ? , ?)';
    const result = await db.promise().query(sql, [
    usiKey,
    ubiKey,
    uciKey,
    taskName
    ]);


    return result;
  } catch (error) {
    console.error('Error creating card:', error);
    throw error;
  }
}

async function getTaskDetails(usiKey,ubiKey,uciKey) {
  // console.log(usiKey,uciKey,"===modal");
  try {
    const sql = 'CALL USP_KANBAN_GET_ALL_TASK_BY_CARD_ID(?,?,?)';
    const result = await db.promise().query(sql, [usiKey,ubiKey,uciKey]);

  //  console.log(result[0]);

    return result[0][0];
  } catch (error) {
    console.error('Error getting card details:', error);
    throw error;
  }
}

async function deleteUserCard ({usi_key,ubi_key,card_title}){
	try {
		const sql = 'CALL USP_KANBAN_DELETE_CARD(?, ?,?)';
		const result = await db.promise().query(sql, [usi_key, ubi_key,card_title]);
		console.log("result", result[0][0]);
		return result[0][0];
	  } catch (error) {
		console.error('Error during user password update:', error);
		throw error;
	  }

}

async function editCard ({ uci_key, usi_key,  cardTitle ,cardDiscp ,cardDate, cardLabels}){
	try {
		const sql = 'CALL USP_KANBAN_UPDATE_CARD_DETAILS_BY_CARD_ID(?, ?,?,?,?,?)';
		const result = await db.promise().query(sql, [  uci_key, usi_key,  cardTitle ,cardDiscp ,cardDate, cardLabels]);
		console.log("result", result[0][0]);
		return result[0][0];
	  } catch (error) {
		console.error('Error during user password update:', error);
		throw error;
	  }

}
async function deleteUserBoard ({usi_key,ubi_key}){
	try {
		const sql = 'CALL USP_KANBAN_DELETE_BOARD(?, ?)';
		const result = await db.promise().query(sql, [usi_key, ubi_key]);
		console.log("result", result[0][0]);
		return result[0][0];
	  } catch (error) {
		console.error('Error during user password update:', error);
		throw error;
	  }

}

async function deleteUserTask (uct_id){
  console.log(uct_id)
	try {
		const sql = 'CALL USP_KANBAN_DELETE_TASK_BY_TASK_ID(?)';
		const result = await db.promise().query(sql, [uct_id]);
		// console.log("result", result[0]);
		return result;
	  } catch (error) {
		console.error('Error during user password update:', error);
		throw error;
	  }

}

module.exports = {deleteUserTask,deleteUserBoard ,editCard,getTaskDetails, createTask, createUser,createBoard,getBoardDetails ,createCard,getCardDetails ,deleteUserCard};
