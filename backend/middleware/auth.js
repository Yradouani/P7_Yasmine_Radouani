const jwt = require ("jsonwebtoken");
const dotenv = require ('dotenv');
dotenv.config()

const authorization = (req, res, next) => {
    try {
        console.log(req.headers.authorization)
        const token = req.headers.authorization.split(' ')[1];
        // console.log(token);
        const decodedToken = jwt.verify(token, process.env.TOKEN);
        console.log(decodedToken);
        const userId = decodedToken.userId;
        console.log(userId);
        console.log(req.body.isAdmin)
        console.log(req.body.userId)
       
        if ((req.body.userId && (req.body.userId !== userId)) && (req.body.userId && req.body.isAdmin !== 1)) {
          console.log(userId);
          console.log("Vous n'êtes pas identifié ni administrateur")
          throw 'Invalid user ID';
          
        } else {
          next();
        }
      } catch {
        res.status(401).json({
          error: new Error('Invalid request!')
        });
      }
}


module.exports = authorization;