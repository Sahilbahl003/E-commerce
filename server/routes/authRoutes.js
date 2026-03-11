const express = require("express");
const { register, login, sendOtp, verifyOtp, resetPassword, changePassword } = require("../controllers/authControllers");
const router = express.Router();
const {sendRegisterOtp,verifyRegisterOtp,} = require("../controllers/authControllers");
const { auth } = require("../middlewares/Auth");

router.post("/register",register);
router.post("/login",login);

router.post("/register-otp", sendRegisterOtp);
router.post("/verify-register", verifyRegisterOtp);

router.post("/send-otp",sendOtp);
router.post("/verify-otp",verifyOtp);
router.post("/reset-password",resetPassword);

router.put("/changePassword", auth, changePassword);


module.exports = router;

