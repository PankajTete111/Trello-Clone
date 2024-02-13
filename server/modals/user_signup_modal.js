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
    return result;
  } catch (error) {
    console.error('Error creating board:', error);
    throw error;
  }
}
async function getBoardDetails(usiKey) {
  try {
    const sql = 'CALL USP_KANBAN_GET_ALL_BOARD_BY_ID(?)';
    const [result] = await db.promise().query(sql, [usiKey]);

    // Extract the rows from the result
    const rows = result[0];

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
  cardDate,
  cardLabels
}) {
  try {
    const sql = 'CALL USP_KANBAN_CREATE_CARD(?, ?,?, ?, ?, ?)';
    const result = await db.promise().query(sql, [
      usiKey,
      ubiKey,
      cardTitle,
      cardDiscp,
      cardDate,
      cardLabels
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
  taskName
}) {
  try {
    const sql = 'CALL USP_KANBAN_CREATE_TASK(?, ?,?)';
    const result = await db.promise().query(sql, [
      usiKey,
  ubiKey,
  taskName
    ]);


    return result;
  } catch (error) {
    console.error('Error creating card:', error);
    throw error;
  }
}

async function getTaskDetails(usiKey,uciKey) {
  // console.log(usiKey,uciKey,"===modal");
  try {
    const sql = 'CALL USP_KANBAN_GET_ALL_TASK_BY_CARD_ID(?,?)';
    const result = await db.promise().query(sql, [usiKey, uciKey]);

  //  console.log(result[0]);

    return result[0][0];
  } catch (error) {
    console.error('Error getting card details:', error);
    throw error;
  }
}

module.exports = {getTaskDetails, createTask, createUser,createBoard,getBoardDetails ,createCard,getCardDetails};
