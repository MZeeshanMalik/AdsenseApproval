const User = require("../Model/userModel");
const handleFactory = require("./handleFactory");
const authController = require("./authenticationController");
const multer = require("multer");
const AppError = require("../utils/appError");
const fs = require('fs');
const path = require('path')
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/user");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `user-${req.user.id}-${Date.now()}-${ext}`);
  },
});
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Uploaded document is not an image", 400), false);
  }
};
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadUsePhoto = upload.single("photo");
// Users function for handling users
exports.addNewUser = authController.signup;
// exports.findUser = handleFactory.findOne(User);
// exports.updateUser = handleFactory.updateOne(User);
exports.getAllUsers = handleFactory.getAll(User);
exports.resizeUserPhoto = async(req, res, next) => {
  if (!req.file) return next();
    req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;
     await sharp(req.file.buffer)
      .resize(500, 500)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`public/img/users/${req.file.filename}`);
       next();
};
// const users = JSON.parse(
//   fs.readFileSync(path.join(__dirname + '../data/users.json')),
// );
const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};
exports.updateMe = catchAsync(async (req, res, next) => {
  // create error if user posts passwords data
  if (req.body.password || req.body.confirmPassword) {
    return next(
      new AppError("this field is not for changing password data", 400)
    );
  }
  const filterbody = filterObj(req.body, "name", "email");
  if (req.file) filterbody.photo = req.file.filename;
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filterbody, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: "sucess",
    data: {
      user: updatedUser,
    },
  });
});
