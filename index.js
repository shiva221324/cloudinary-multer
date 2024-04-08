const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

app.use(express.json());
app.use(cors());

//db connection
const connectDb = require("./config/database");
connectDb();

//cloudinary connection
const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();

const Upload = require("./routes/Fileupload");
app.use("/api/v1/upload", Upload);

app.listen(process.env.PORT, () => {
  console.log("Backend listening on port " + process.env.PORT);
});
