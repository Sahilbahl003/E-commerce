const express = require("express");
const { getUser } = require("../controllers/userControllers");
const { auth } = require("../middlewares/Auth");
const router =  express.Router();

router.get("/profile",auth,getUser);


module.exports = router;