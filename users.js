const jwt = require("jsonwebtoken");
const {con}=require("./db");
const multer=require("multer");
const {logger}=require("./src/logger")
const getallusers =async (req, res) => {
    con.query('SELECT * FROM users', (err, rows) => {
        if (!err){
            res.send(rows)
            return
        }
        else
            console.log(err);
    });
}
const getuserbyid= async (req,res)=>{
    con.query('SELECT * FROM users WHERE id=?', [req.params.id], (err, rows) => {
        if (!err){
            var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  var objectvariable={
    url:fullUrl,
    msg:"done",
    request:req.body
  }
  logger.info(objectvariable)
  res.send(objectvariable)}
   else{
   res.status(404).send("not found");
   }
});

}
const deletebyid= async(req,res)=>{
    con.query('DELETE FROM users WHERE id=?', [req.params.id], (err) => {
        if (!err){
            var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
            var objectvariable={
              url:fullUrl,
              msg:"done",
              request:req.body
            }
            logger.info(objectvariable)
            res.send(objectvariable)        }
        else{
            logger.error("not found");}
    })
}

const updateuserbyid=async(req,res)=>{
    var id=req.params.id
    var password=req.body.password
    var email=req.body.email
    var first_name=req.body.first_name
    var last_name=req.body.last_name
    var address=req.body.address
    var date_of_birth=req.body.date_of_birth
    //var profile_url= req.file.filename
    var  sql = `UPDATE users
           SET password="${password}" ,email="${email}",first_name="${first_name}",last_name="${last_name}",address="${address}",date_of_birth="${date_of_birth}"
           WHERE id = "${id}"`;
           con.query(sql, function(error, _results) {
            if (error){
                res.status(404).send("not found");
            }
            var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
            var objectvariable={
              url:fullUrl,
              msg:"done",
              request:req.body
           }
           logger.info(objectvariable)
            res.send(objectvariable) 
          })
}
//! Use of Multer
var imageStorage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './user_profile/images/')   
    },
    filename: (req, file, callBack) => {
        callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  })
  
  const imageUpload = multer({
    storage: imageStorage,
    limits: {
      fileSize: 1000000 // 1000000 Bytes = 1 MB
    },
    fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(png|jpg)$/)) { 
         // upload only png and jpg format
         return cb(new Error('Please upload a Image'))
       }
     cb(undefined, true)
  }
  }) 
const profilepicuploadbyid=
async(req,res)=>{
    res.send(req.file)
    var imgsrc ='http://localhost:9000/images/' + req.file.filename
    var id=req.params.id
  
       var  sql = `UPDATE users
       SET profile_url="${imgsrc}"
       WHERE id = "${id}"`;
        con.query(sql, (err, result) => {
            if (err) throw err
            var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
            var objectvariable={
              url:fullUrl,
              msg:"done",
              request:req.body
            }
            logger.info(objectvariable)
            console.log("file uploaded")
        })
  } //res.send(req.file)
  (error, req, res, next) => {
   res.status(400).send({ error: error.message })
    console.log(error)
  
   
}
module.exports={getallusers,getuserbyid,deletebyid,updateuserbyid,profilepicuploadbyid}