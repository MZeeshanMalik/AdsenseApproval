const { json } = require('body-parser');
const AddFundsModel = require('../Model/addFunds');
const handleFactory = require('./handleFactory');
const multer = require('multer')
const sharp = require('sharp')
const jwt = require('jsonwebtoken')
const AppError = require('../utils/appError')
// exports.NewFund = handleFactory.Addnew(AddFundsModel);
const multerStorage = multer.memoryStorage();
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

// exports.uploadUsePhoto = upload.fields([
//   {name: "image", maxCount: 1},
// ]);
exports.uploadUsePhoto = upload.single('Image')

exports.resizeUserPhoto = async(req, res, next) => {
  if (!req.file) return next();
  const ext = req.file.mimetype.split("/")[1];
    req.file.filename = `Image-${req.user.email}-${req.user.id}-${Date.now()}.${ext}`;
     await sharp(req.file.buffer)
      .toFormat('jpeg')
      .toFile(`public/images/Funds_Images/${req.file.filename}`);
       next();
};
exports.NewFund = catchAsync(async (req,res,next)=>{
  const jwtToken = req.cookies.jwt
        const decodedToken = jwt.decode(jwtToken) 
        const userId = decodedToken.id;
  const newItem = await AddFundsModel.create({
    amount: req.body.amount,
    transctionId: req.body.transctionId,
    Image:  req.file.filename,
    user: userId
  })
  res.status(200).json({
    message: "sucess",
    data: newItem
  })
})
