// const jsonwebtoken = require('jsonwebtoken')
// const User = require('../modals/login_modal')

// const tokenDecode = (req) => {
//   const bearerHeader = req.headers['authorization']
//   if (bearerHeader) {
//     const bearer = bearerHeader.split(' ')[1]
//     try {
//       const tokenDecoded = jsonwebtoken.verify(
//         bearer,
//         process.env.SECRET_KEY
//       )
//       return tokenDecoded
//     } catch {
//       return false
//     }
//   } else {
//     return false
//   }
// }

// exports.verifyToken = async (req, res, next) => {
//     // console.log(req,"req");
//   const tokenDecoded = tokenDecode(req)
//   console.log(tokenDecode,"tokedecode");
//   if (tokenDecoded) {
//     // const user = await User.findById(tokenDecoded.id)
//     if (tokenDecoded) {
//         console.log(tokenDecode.id,"ghghgh");
//         try {
//           const [rows, fields] = await pool.execute('SELECT * FROM tbl_use_login_details WHERE ULD_TOKEN = ?', [tokenDecoded.id]);
      
//           if (rows.length > 0) {
//             const user = rows[0];
//             req.user = user;
//             next();
//           } else {
//             res.status(401).json('Unauthorized');
//           }
//         } catch (error) {
//           console.error(error);
//           res.status(500).json('Internal Server Error');
//         }
//       } else {
//         res.status(401).json('Unauthorized');
//       }
//     }
   
//     }