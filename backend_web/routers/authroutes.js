const express = require("express");
const authcontroller = require("../controllers/authcontroller");
const router = express.Router();
const { identifier } = require("../middlewares/identification");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Folder where files will be saved
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Unique file name
  },
});
const upload = multer({ storage });

// ➤ Modify signup route to handle two files: registrationDocument and officeLetter
router.post(
  "/signup",
  upload.fields([
    { name: "registrationDocument", maxCount: 1 },
    { name: "officeLetter", maxCount: 1 },
  ]),
  authcontroller.signup
);

router.post("/signin", authcontroller.signin);
router.post("/signout", authcontroller.signout);
router.patch("/change-password", identifier, authcontroller.changePassword);

module.exports = router;
