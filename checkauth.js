
const jwt=require("jsonwebtoken")


  // module.exports=function checkauth(req, res, next) {

  //   const bearerHeader = req.headers["authorization"];
  
  //   if (typeof bearerHeader !== "undefined") {
  
  //     const bearerToken = bearerHeader.split(" ")[1];
  
  //     req.token = bearerToken;
  
  //     next();
  
  //   } else {
  
  //     res.sendStatus(403);
  
  //   }
  
  // }
   module.exports=function checkauth(req, res, next) {
    
    const bearerHeader = req.headers["authorization"];
  
    if (typeof bearerHeader !== "undefined") {
      const bearerToken = bearerHeader.split(" ")[1];
      const jwtSecretKey = process.env.JWT_SECRET_KEY;
     
      jwt.verify(bearerToken, jwtSecretKey, (err, authData) => {
        if (err) {
          res.sendStatus(403);
        } else {
          next();
        }
      })
    } else {
  
      res.send({'msg':"header not set"});
  
    }
  
  }
  