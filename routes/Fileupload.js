const router = require("express").Router();
const {
  localFileUpload,
  imageUpload,
  videoUpload,
  imageSizeReducer,
} = require("../controllers/fileupload");
const upload = require("../config/multer");

router.post("/localFileUpload", upload.single("file"), localFileUpload);
router.post("/imageUpload", upload.single("file"), imageUpload);
router.post("/videoUpload", upload.single("video"), videoUpload);
router.post("/imageSizeReducer", upload.single("file"), imageSizeReducer);
module.exports = router;
