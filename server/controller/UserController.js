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

      const results = await UserSignup.createBoard(boardDetails)
      console.log("resultssss", results[0][0]);

      const userid =results[0][0];
      console.log(userid.last_inserted_board_id)

      if (results && results.length > 0 && results[0][0].response === "fail") {
        return res.status(201).json({
          id: jobId,
          message: "Board details already exist",
        });
      } else {
        return res.status(201).json({
          BoardId: userid.last_inserted_board_id,
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
        cardDate,
        cardLabels,
        cardTask,
        createdBy,
        modifiedBy,
      } = req.body;

      // Call the model to create a card
      const insertedCardId  = await UserSignup.createCard({
        usiKey,
        ubiKey,
        cardTitle,
        cardDiscp,
        cardDate,
        cardLabels,
        cardTask,
        createdBy,
        modifiedBy,
      });

      const [cardId] = insertedCardId[0][0];
      console.log("cardId",cardId.last_inserted_card_id)

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
      const {usiKey} = req.params;

      // Call the model to get card details
      const cardDetails = await UserSignup.getCardDetails(usiKey);

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
    
};

module.exports = UserController;
