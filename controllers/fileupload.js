const File = require("../models/File");
const upload = require("../config/multer");

const cloudinary = require("cloudinary").v2;

exports.localFileUpload = (req, res) => {
  try {
    console.log(req.file);
    res.status(200).json({
      success: true,
      message: "local file uploaded successfully",
    });
  } catch (error) {
    console.log(error);
  }
};
function isFileTypeSupported(type, supportedTypes) {
  return supportedTypes.includes(type);
}
async function uploadFiletoCloudinary(file, folder, quality) {
  const options = {
    folder: folder, // folder name
    resource_type: "auto", //it detects automatically file type
  };
  if (quality) {
    options.quality = quality;
  }
  return await cloudinary.uploader.upload(file.path, options);
}
exports.imageUpload = async (req, res) => {
  try {
    const { name, tags, email } = req.body;
    const file = req.file;
    console.log(file);

    //validation
    const supportedTypes = ["jpg", "png", "jpeg"];
    const filetype = file.mimetype.split("/")[1];
    if (!isFileTypeSupported(filetype, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: "File format not supported",
      });
    }
    const response = await uploadFiletoCloudinary(file, "normalpractice");
    console.log(response);

    //inserting into db
    const filedata = await File.create({
      name,
      tags,
      email,
      imageUrl: response.secure_url,
    });
    res.status(200).json({
      success: true,
      message: "File successfully uploaded",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "something went wrong",
    });
  }
};

exports.videoUpload = async (req, res) => {
  try {
    const { name, tags, email } = req.body;
    // console.log(req);
    const videofile = req.file;
    console.log(videofile);
    const supportedTypes = ["mp4", "mov"];
    const filetype = videofile.mimetype.split("/")[1];
    if (!isFileTypeSupported(filetype, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: "File format not supported",
      });
    }
    const response = await uploadFiletoCloudinary(videofile, "normalpractice");
    const filedata = await File.create({
      name,
      tags,
      email,
      imageUrl: response.secure_url,
    });
    res.status(200).json({
      success: true,
      message: "video successfully uploaded",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "something went wrong",
    });
  }
};

exports.imageSizeReducer = async (req, res) => {
  try {
    const { name, tags, email } = req.body;
    const file = req.file;
    console.log(file);

    //validation
    const supportedTypes = ["jpg", "png", "jpeg"];
    const filetype = file.mimetype.split("/")[1];
    if (!isFileTypeSupported(filetype, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: "File format not supported",
      });
    }
    const response = await uploadFiletoCloudinary(file, "normalpractice", 30);
    //console.log(response);
    const filedata = await File.create({
      name,
      tags,
      email,
      imageUrl: response.secure_url,
    });
    res.status(200).json({
      success: true,
      message: "File successfully uploaded",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "something went wrong",
    });
  }
};
