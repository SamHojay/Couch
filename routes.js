const express = require("express");
const multer = require("multer");
const router = express.Router();
const signUpTemplateCopy = require("../models/signupmodels");
const uploadTemplateCopy = require("../models/uploadmodels");

router.post("/signup", function(req,res){
const signedUpUser = new signUpTemplateCopy({
  fullName: req.body.fullName,
  username: req.body.username,
  email: req.body.email,
  password: req.body.password
});
signedUpUser.save().then((data) => {res.json(data)}).catch((err) => res.json(err));
});

const fileStorageEngine = multer.diskStorage({
    filename: (req,file,cb) => {
      cb(null, file.originalname)
    },
    destination: (req,file,cb) => {
      cb(null,"../src")
    }
  });

  const upload = multer({storage:fileStorageEngine});


router.post("/upload",upload.single('pdfs'),function(request,response){
  
  const uploadedBook = new uploadTemplateCopy({
    bookToUpload: request.body.bookToUpload
  });
  uploadedBook.save().then((data) => {response.json(data)}).catch((err) => response.json(err));
  console.log(request.file);
});

router.get("/getBook", (request,response) => {
  response.sendFile(__dirname + "/pdfs/download.pdf");
});
module.exports = router;