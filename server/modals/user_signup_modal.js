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


async function createBoard({ usiKey, boardName, createdBy, modifiedBy }) {
  try {
    const sql = 'CALL USP_KANBAN_CREATE_BOARD(?, ?, ?, ?)';
    const [result] = await db.promise().query(sql, [usiKey, boardName, createdBy, modifiedBy]);
    return result;
  } catch (error) {
    console.error('Error creating board:', error);
    throw error;
  }
}
async function getBoardDetails(usiKey) {
  try {
    const sql = 'CALL USP_KANBAN_GET_BOARD_DETAILS(?)';
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
  cardLabels,
  cardTask,
  createdBy,
  modifiedBy,
}) {
  try {
    const sql = 'CALL USP_KANBAN_CREATE_CARD(?, ?,?, ?, ?, ?, ?, ?, ?)';
    const result = await db.promise().query(sql, [
      usiKey,
      ubiKey,
      cardTitle,
      cardDiscp,
      cardDate,
      cardLabels,
      cardTask,
      createdBy,
      modifiedBy,
    ]);


    return result;
  } catch (error) {
    console.error('Error creating card:', error);
    throw error;
  }
}

async function getCardDetails(usiKey) {
  try {
    const sql = 'CALL USP_KANBAN_GET_CARD_DETAILS(?)';
    const [result] = await db.promise().query(sql, [usiKey]);

    const cardDetails = result[0];

    return cardDetails;
  } catch (error) {
    console.error('Error getting card details:', error);
    throw error;
  }
}

module.exports = { createUser,createBoard,getBoardDetails ,createCard,getCardDetails};
