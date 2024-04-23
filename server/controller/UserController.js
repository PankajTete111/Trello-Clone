const UserSignup = require('../modals/user_signup_modal')

class UserController  {
	static async insertUser(req, res) {
    try {
      const userDetails = req.body;
      console.log("userDetails", userDetails);

      const results = await UserSignup.createUser(userDetails)
      console.log("resultssss", results[0][0]);

      const userid =results[0][0];
      console.log(userid.last_inserted_id)

      if (results && results.length > 0 && results[0][0].response === "fail") {
        return res.status(201).json({
          id: jobId,
          message: "User details already exist",
        });
      } else {
        return res.status(201).json({
          userId: userid.last_inserted_id,
          success: true,
          error: false,
          message: "User details inserted successfully",
        });
      }
    } catch (error) {
      console.error("Error inserting user details:", error);
      res.status(500).json({
        success: false,
        error: true,
        message: "Error inserting user details.",
      });
    }
  }
  static async insertBoard(req, res) {
    try {
      const boardDetails = req.body;
      console.log("boardDetails", boardDetails);
      // console.log(req.body.usiKey,"usiKey");
      // console.log(req.body.boardName,"boardName");


      const results = await UserSignup.createBoard(boardDetails)
      // console.log("resultssss", results[0][0]);
      console.log(results.UBI_USI_KEY,"result");

      // const userid =results[0][0];
      // console.log(userid.last_inserted_board_id,"userId")

      if (results && results.length > 0 && results[0][0].response === "fail") {
        return res.status(201).json({
          id: jobId,
          message: "Board details already exist",
        });
      } else {
        return res.status(201).json({
          USI_KEY: results[0][0].UBI_USI_KEY,
          BoardId:results[0][0].UBI_KEY,
          success: true,
          error: false,
          message: "Board details inserted successfully",
        });
      }
    } catch (error) {
      console.error("Error inserting Board details:", error);
      res.status(500).json({
        success: false,
        error: true,
        message: "Error inserting Board details.",
      });
    }
  }

  static async getBoardDetails(req, res) {
    try {
      const { usiKey } = req.params;

      // Call the model to get board details
      const boardDetails = await UserSignup.getBoardDetails(usiKey);
       console.log(boardDetails,"brd");
      if (boardDetails && boardDetails.length > 0) {
        return res.status(200).json({
          data: boardDetails,
          success: true,
          error: false,
          message: 'Board details retrieved successfully',
        });
      } else {
        return res.status(404).json({
          success: false,
          error: true,
          message: 'No board details found for the provided USI key',
        });
      }
    } catch (error) {
      console.error('Error getting board details:', error);
      res.status(500).json({
        success: false,
        error: true,
        message: 'Error getting board details',
      });
    }
  }
  static async createCard(req, res) {
    try {
      const {
        usiKey,
        ubiKey,
        cardTitle,
        cardDiscp,
        cardDate
      } = req.body;

      // Call the model to create a card
      const insertedCardId  = await UserSignup.createCard({
        usiKey,
        ubiKey,
        cardTitle,
        cardDiscp,
        cardDate
      });

      const [cardId] = insertedCardId[0][0];
      // console.log("cardId",cardId.last_inserted_card_id)

      return res.status(201).json({
        cardId:cardId.last_inserted_card_id,
        success: true,
        error: false,
        message: 'Card created successfully',
      });
    } catch (error) {
      console.error('Error creating card:', error);
      res.status(500).json({
        success: false,
        error: true,
        message: 'Error creating card',
      });
    }
  }
  static async getCardDetails(req, res) {
    try {
      const ubiKey = req.body.ubiKey;
      const usiKey = req.body.usiKey;
      // console.log(details.,"detailsCard");

      // Call the model to get card details
      const cardDetails = await UserSignup.getCardDetails(ubiKey,usiKey);

      return res.status(200).json({
        data:cardDetails,
        success: true,
        error: false,
        message: 'Card details retrieved successfully',
      });
    } catch (error) {
      console.error('Error getting card details:', error);
      res.status(500).json({
        success: false,
        error: true,
        message: 'Error getting card details',
      });
    }
  }

  static async insertTask(req, res) {
    try {
      const taskDetails = req.body;
      console.log("taskDetails", taskDetails);

      const results = await UserSignup.createTask(taskDetails)
      console.log("resultssss", results[0][0]);

      // const userid =results[0][0];
      // console.log(userid.last_inserted_board_id)

      if (results && results.length > 0 && results[0][0].response === "fail") {
        return res.status(201).json({
          // id: jobId,
          message: "Task details already exist",
        });
      } else {
        return res.status(201).json({
          // BoardId: userid.last_inserted_board_id,
          success: true,
          error: false,
          message: "Task details inserted successfully",
        });
      }
    } catch (error) {
      console.error("Error inserting Board details:", error);
      res.status(500).json({
        success: false,
        error: true,
        message: "Error inserting Board details.",
      });
    }
  }

  static async getTaskDetails(req, res) {
    try {
      const  usiKey  = req.body.usiKey;
      const  ubiKey  = req.body.ubiKey;
      const uciKey = req.body.uciKey;

      // Call the model to get board details
      const taskDetails = await UserSignup.getTaskDetails(usiKey,ubiKey,uciKey,);
      if (taskDetails && taskDetails.length > 0) {
        return res.status(200).json({
          data: taskDetails,
          success: true,
          error: false,
          message: 'Task details retrieved successfully',
        });
      } else {
        return res.status(404).json({
          success: false,
          error: true,
          message: 'No Task details found for the provided USI key',
        });
      }
    } catch (error) {
      console.error('Error getting Task details:', error);
      res.status(500).json({
        success: false,
        error: true,
        message: 'Error getting task details',
      });
    }
  }
  static async deleteCard(req, res) {
    try {
      const { usi_key, ubi_key, card_title } = req.body;
  
      const deleteCardResult = await UserSignup.deleteUserCard({ usi_key, ubi_key,card_title});
      console.log("deleteCardResult", deleteCardResult[0].result);

      if (deleteCardResult[0].result === 1) {
        return res.status(200).json({
          success: true,
          message: 'card deleted successfully',
        });
      } else {
        // Handle other cases, such as email not found or password update failure
        return res.status(401).json({
          success: false,
          message: 'faild to delete.',
        });
      }
    } catch (error) {
      console.error('Error during user password update:', error);
      return res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }

  static async editCard(req, res) {
    try {
      const { uci_key, usi_key, cardTitle ,cardDiscp ,cardDate, cardLabels } = req.body;
  
      const editCardResult = await UserSignup.editCard({  uci_key, usi_key,  cardTitle ,cardDiscp ,cardDate, cardLabels});
      console.log("editCardResult", editCardResult[0].result);

      if (editCardResult[0].result === 1) {
        return res.status(200).json({
          success: true,
          message: 'card updated successfully',
        });
      } else {
        // Handle other cases, such as email not found or password update failure
        return res.status(401).json({
          success: false,
          message: 'faild to update.',
        });
      }
    } catch (error) {
      console.error('Error during update card details:', error);
      return res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }
  static async deleteBoard(req, res) {
    try {
      const { usi_key, ubi_key } = req.body;
  
      const deleteCardResult = await UserSignup.deleteUserBoard({ usi_key, ubi_key});
      console.log("deleteCardResult", deleteCardResult[0].result);

      if (deleteCardResult[0].result === 1) {
        return res.status(200).json({
          success: true,
          message: 'card deleted successfully',
        });
      } else {
        // Handle other cases, such as email not found or password update failure
        return res.status(401).json({
          success: false,
          message: 'faild to delete.',
        });
      }
    } catch (error) {
      console.error('Error during user password update:', error);
      return res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }
  static async deleteTask(req, res) {
    try {
      const uct_id  = req.body.uct_id;
  console.log(uct_id,"contrr");
      const deleteCardResult = await UserSignup.deleteUserTask(uct_id);
      console.log("deleteCardResult", deleteCardResult);

      if (deleteCardResult) {
        return res.status(200).json({
          success: true,
          message: 'Task deleted successfully',
        });
      } else {
        // Handle other cases, such as email not found or password update failure
        return res.status(401).json({
          success: false,
          message: 'faild to delete.',
        });
      }
    } catch (error) {
      console.error('Error during user password update:', error);
      return res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }
    
};

module.exports = UserController;
