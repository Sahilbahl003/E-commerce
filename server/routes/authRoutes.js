const express = require("express");
const { register, login, sendOtp, verifyOtp, resetPassword } = require("../controllers/authControllers");
const router = express.Router();
const {sendRegisterOtp,verifyRegisterOtp,} = require("../controllers/authControllers");

router.post("/register",register);
router.post("/login",login);

router.post("/register-otp", sendRegisterOtp);
router.post("/verify-register", verifyRegisterOtp);

router.post("/send-otp",sendOtp);
router.post("/verify-otp",verifyOtp);
router.post("/reset-password",resetPassword);


module.exports = router;

