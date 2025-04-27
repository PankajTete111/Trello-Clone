const jwt = require('jsonwebtoken');

const authenticateRequest = (req) => {
  let token = null;
  
  if (!req.headers.authorization) {
    console.log("Login Required!!!!!!!!!!!!!");
    throw { message: "Login Required!", code: 401 };
  }

  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    token = req.headers.authorization.split(' ')[1];
  }

  try {
    jwt.verify(token, Buffer.from(process.env.jwtkey, 'base64'));
    const decodedToken = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
    console.log(decodedToken.user);
    
    return decodedToken.user;
  } catch (err) {
    console.log("Invalid token");
    throw { message: "Invalid Token", code: 401 };
  }
}

module.exports = authenticateRequest;
