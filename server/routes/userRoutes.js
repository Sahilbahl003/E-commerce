const express = require("express");
const { getUser, updateProfileFull, removeProfileImage } = require("../controllers/userControllers");
const { auth } = require("../middlewares/Auth");
const upload=require("../config/multer.js");
const router =  express.Router();

router.get("/profile",auth,getUser);
router.put("/updateProfile",auth, upload.single("image"),updateProfileFull);
router.put("/removeProfileImage", auth, removeProfileImage);


module.exports = router;