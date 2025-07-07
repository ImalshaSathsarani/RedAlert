const express = require("express");
const authcontroller = require("../controllers/authcontroller");
const router = express.Router();
const { identifier } = require("../middlewares/identification");

router.post("/signup", authcontroller.signup);
router.post("/signin", authcontroller.signin);
router.post("/signout", authcontroller.signout);
router.patch("/change-password", identifier, authcontroller.changePassword);

module.exports = router;
