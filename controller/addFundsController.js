const { json } = require('body-parser');
const AddFundsModel = require('../Model/addFunds');
const handleFactory = require('./handleFactory');
const multer = require('multer')
const sharp = require('sharp')
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
  //it makes req.files a json object
//   console.log(req.file)
//   const obj = JSON.parse(JSON.stringify(req.files));
//   // creating image object
//   var imgObj = {};
//   const image = obj.image.forEach(el=>{
//     imgObj['path'] = el.filename
//   })
  //creating cover images array
//   var coverObj = []
//   const cover = obj.coverImages.forEach(el=>{
//     coverObj.push(el.filename)
//   })
// const ext = req.file.mimetype.split("/")[1];
//  req.file.filename = `Image-${req.user.id}-${Date.now()}.${ext}`;
//  const fileName = json.toString(req.file.filename)

  const newItem = await AddFundsModel.create({
    amount: req.body.amount,
    transctionId: req.body.transctionId,
    Image:  req.file.filename,
  })
  console.log(newItem)
  res.status(200).json({
    message: "sucess",
    data: newItem
  })
})
