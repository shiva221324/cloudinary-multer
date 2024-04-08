const mongoose = require("mongoose");
const nodemail = require("nodemailer");
require("dotenv").config();
const FileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  tags: {
    type: String,
  },
  email: {
    type: String,
  },
});

FileSchema.post("save", async (doc) => {
  try {
    let transporter = nodemail.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.PASS_MAIL,
      },
    });
    const mailoptions = {
      from: "Venkat",
      to: doc.email,
      subject: "new file uploaded on cloudinary",
      html: `<h2>Hello bro</h2> <p>File uploaded</p><br>view here <a href="${doc.imageUrl}">${doc.imageUrl}</a>`,
    };
    transporter.sendMail(mailoptions);
  } catch (e) {
    console.log(e);
  }
});

module.exports = mongoose.model("File", FileSchema);
