const { url } = require("inspector");
const jwt = require("jsonwebtoken");
const {con}=require("./db");

const { logger } = require("./src/logger");

const signup = async (req, res) => {
  let data = {
    password: req.body.password,
    email: req.body.email,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    address: req.body.address,
    date_of_birth: req.body.date_of_birth,
  };
  con.query(
    "INSERT INTO users (password,email,first_name,last_name,address,date_of_birth) VALUES  (? ,? ,?,?,?,?)",
    [
      data.password,
      data.email,
      data.first_name,
      data.last_name,
      data.address,
      data.date_of_birth,
    ],
    (error, _results) => {
      if (error) return res.json({ error: error });
    }
  );
  //res.send("signup done!!!!!");
  var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  var objectvariable={
    url:fullUrl,
    msg:"signupdone",
    request:req.body
  }
  logger.info(objectvariable)
  res.send(objectvariable)
};
const login = async (req, res) => {
  var email = req.body.email;
  //console.log(req)
  var password = req.body.password;
  con.query(
    "select * from users where email=? and password=?",
    [email, password],
    function (error, results) {
      if (error) {
        return error;
      }
      console.log(results);
      if (results.length > 0) {
        let jwtSecretKey = process.env.JWT_SECRET_KEY;
        let data = {
          password: req.body.password,
          email: req.body.email,
        };
        const token = jwt.sign(data, jwtSecretKey);
        res.status(200).send({
          msg: "data saved",
          key: token,
          payload: results,
          status: 200,
        });
      } else {
        res.status(401).send();
      }
    }
  );
  var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  var objectvariable={
    url:fullUrl,
    msg:"logindone",
    request:req.body
  }
  logger.info(objectvariable)
  //res.send(objectvariable)
};
//};


module.exports = {
  signup,
  login,
};



