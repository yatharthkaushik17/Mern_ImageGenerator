const express = require("express");
const router = express.Router();

const {getPhoto} = require("../controller/Photos");
const { Login, Signup, sendOtp, verifyOtp } = require("../controller/Auth");
const { auth } = require("../middleware/auth");
const { history } = require("../controller/history");

router.get("/getPhoto/:query",auth,getPhoto);
router.get("/gethistory",auth,history)
router.post("/Login",Login)
router.post("/Signup",Signup)
router.post("/sendOTP",sendOtp);
router.post("/verifyOtp",verifyOtp);

module.exports = router;