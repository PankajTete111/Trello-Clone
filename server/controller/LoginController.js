// const userLogin = require('../modals/login_modal'); // Adjust the path based on your project structure

// class LoginController {
// 	static async loginUser(req, res) {
// 		try {
// 			const { email, password } = req.body;

// 			const loginResult = await userLogin.userLogin({ email, password });

// 			if (loginResult.success) {
// 				// Handle successful login
// 				return res.status(200).json({
// 					success: true,
// 					user_id: loginResult.user_id,
// 					message: 'Login successful',
// 				});
// 			} else {
// 				// Handle failed login
// 				return res.status(401).json({
// 					success: false,
// 					message: 'Invalid email or password',
// 				});
// 			}
// 		} catch (error) {
// 			console.error('Error during user login:', error);
// 			return res.status(500).json({
// 				success: false,
// 				message: 'Internal server error',
// 			});
// 		}
// 	}
// }

// module.exports = LoginController;


// const jwt = require('jsonwebtoken');
// const userLogin = require('../modals/login_modal'); // Adjust the path based on your project structure


// class LoginController {
//   static async loginUser(req, res) {
//     try {
//       const { email, password } = req.body;
//       console.log(email,"email");
//       console.log(password,"pass");

//       const loginResult = await userLogin.userLogin({ email, password });
      
//       console.log("loginResult", loginResult);
//       // console.log("insertLogindetails",insertLogindetails);

//       if (loginResult.success) {
//         // Generate JWT token
//         const token = jwt.sign({ user_id: loginResult.user_id }, 'your-secret-key', {
//           expiresIn: '1h', // Token expiration time, adjust as needed
//         });
//         console.log(token,"token");
//         // const insertLogindetails=  userLogin.userLoginInfo({email, token});
//         // console.log("insertLogindetails",insertLogindetails);

//         userLogin.userLoginInfo({ email, token })
//   .then(insertLogindetails => {
//     console.log("insertLogindetails", insertLogindetails);
//   })
//   .catch(error => {
//     console.error("Error inserting login details:", error);
//   });
//   userLogin.userLoginInfo = async ({ email, token }) => {
//     // Perform some async operation, e.g., database insertion
//     const result = await someAsyncOperation();
//     return result;
//   };

        

//         // Handle successful login with token
//         return res.status(200).json({
//           Inserted: insertLogindetails,
//           success: true,
//           user_id: loginResult.user_id,
//           user_name: loginResult.user_name,
//           token: token,
//           message: 'Login successfulllll',
//         });
//       } else {
//         // Handle failed login
//         return res.status(401).json({
//           success: false,
//           message: 'Invalid email or password',
//         });
//       }
//     } catch (error) {
//       console.error('Error during user login:', error);
//       return res.status(500).json({
//         success: false,
//         message: 'Internal server error',
//       });
//     }
//   }

//   static async loginUserInfo(req, res) {
//     try {
//       const { email, password } = req.body;

//       const loginResult = await userLogin.userLoginInfo({ user_id,email, token });
//       console.log("loginResulthhh", loginResult);

//       if (loginResult.success) {
//         // Generate JWT token
//         const token = jwt.sign({ user_id: loginResult.user_id }, 'your-secret-key', {
//           expiresIn: '1h', // Token expiration time, adjust as needed
//         });
//         console.log(token,"token");

//         // Handle successful login with token
//         return res.status(200).json({
//           success: true,
//           user_id: loginResult.user_id,
//           user_name: loginResult.user_name,
//           token: token,
//           message: 'Login successfullll',
//         });
//       } else {
//         // Handle failed login
//         return res.status(401).json({
//           success: false,
//           message: 'Invalid email or password',
//         });
//       }
//     } catch (error) {
//       console.error('Error during user login:', error);
//       return res.status(500).json({
//         success: false,
//         message: 'Internal server error',
//       });
//     }
//   }

  
// }

// module.exports = LoginController;

const jwt = require('jsonwebtoken');
const userLogin = require('../modals/login_modal'); // Adjust the path based on your project structure

class LoginController {

  static async loginUser(req, res) {
    try {
      const { email, password } = req.body;

      const loginResult = await userLogin.userLogin({ email, password });
      
      console.log("loginResult", loginResult);

      if (loginResult.success) {
        // Generate JWT token
        const token = jwt.sign({ user_id: loginResult.user_id }, 'your-secret-key', {
          expiresIn: '1h', // Token expiration time, adjust as needed
        });

        // Insert login details
        try {
          const insertLogindetails = await userLogin.userLoginInfo({ email, token });
          console.log("insertLogindetails", insertLogindetails);
        } catch (error) {
          console.error("Error inserting login details:", error);
        }

        // Handle successful login with token
        return res.status(200).json({
          success: true,
          user_id: loginResult.user_id,
          user_name: loginResult.user_name,
          token: token,
          message: 'Login successful',
        });
      } else {
        // Handle failed login
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password',
        });
      }
    } catch (error) {
      console.error('Error during user login:', error);
      return res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }

  static async loginUserInfo(req, res) {
    try {
      const { email, password } = req.body;

      const loginResult = await userLogin.userLoginInfo({ email, password }); // Update this line

      console.log("loginResult", loginResult);

      if (loginResult.success) {
        // Generate JWT token
        const token = jwt.sign({ user_id: loginResult.user_id }, 'your-secret-key', {
          expiresIn: '1h', // Token expiration time, adjust as needed
        });

        // Handle successful login with token
        return res.status(200).json({
          success: true,
          user_id: loginResult.user_id,
          user_name: loginResult.user_name,
          token: token,
          message: 'Login successful',
        });
      } else {
        // Handle failed login
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password',
        });
      }
    } catch (error) {
      console.error('Error during user login:', error);
      return res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }

  static async verifyToken(req, res) {
    try {
      const token = req.headers.authorization; 
      console.log(token,"tok");

      // Assuming userLogin.verfyToken is an asynchronous function
      const result = await userLogin.verfyToken({ token });
      console.log(result[0].status,"resulttoken");

      // Check the result and send an appropriate response
      if (result && result.length > 0 && result[0].status === 'Valid') {
        res.status(200).json({
          success: true,
          message: 'Token is valid',
          // user: result[0][0], // Include additional user information if needed
        });
      } else {
        res.status(401).json({
          success: false,
          message: 'Invalid token',
        });
      }
    } catch (error) {
      console.error('Error during token verification:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    }
  }

  static async updatePassword(req, res) {
    try {
      const { email, password } = req.body;
  
      const updatePaswordResult = await userLogin.updateUserPassword({ email, password });
      // console.log("updatePasswordResult", updatePaswordResult[0].message);

      if (updatePaswordResult && updatePaswordResult[0].message === 1) {
        return res.status(200).json({
          success: true,
          message: 'Password updated successfully',
        });
      } else {
        // Handle other cases, such as email not found or password update failure
        return res.status(401).json({
          success: false,
          message: 'Please check your email id.',
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
}

module.exports = LoginController;

