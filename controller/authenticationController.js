const catchAsync = require("../utils/catchAsync");
const crypto = require("crypto")
const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");
const User = require("../Model/userModel");
const { promisify } = require('util');
const sendEmail = require('../utils/email')
const signToken = function(id){
  return jwt.sign({id: id} , process.env.SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN
  })
}

const createToken = (user,  statusCode,res)=>{
 const token =  signToken(user._id);
 const cookieOptions = {
  expires: new Date(
    Date.now() + process.env.JWT_COOKIEEXPIRES * 24 * 60 * 60 * 1000,
  ),
  httpOnly: true,
};
if (process.env.NODE_ENV === 'production') {
  cookieOptions.secure = true;
}
console.log(token, cookieOptions)
res.cookie('jwt' , token , cookieOptions)
user.password = undefined
  res.status(statusCode).json({
    status : 'sucess',
     token,
    data: user
  })
}
exports.signup = catchAsync(async (req, res, next) => {
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    photo: req.body.photo,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
  });
  createToken(user , 200 , res)
});
//login

exports.login = catchAsync(async (req,res,next)=>{
  //check if there is an email and password
  const {email , password} = req.body;
  if(!email || !password){
    return next(new AppError("Please provide email and password"));
  }
  //check if user exists
  const user = await User.findOne({email}).select('+password')
  if(!user || !password){
    return next(new AppError("please provide correct email and password"))
  }
  console.log(password)
  const correctPass = await user.correctPassword(password , user.password);
  if(!correctPass){
    return next(new AppError("Email or Password is not correct"))
  };
  
  // if everything is correct send jwt token
  createToken(user , 200 , res);
});


// Log out user

exports.logout = (req, res, next)=>{
  res.cookie('jwt' , 'Logged out' , {
    expires: new Date(
      Date.now()  + 10 * 100),
      httpOnly: true
  })
  res.status(200).json({
    status: "sucess",
  })
}
exports.forgotPassword = catchAsync(async(req,res,next)=>{
// Get the user based on email
const user = await User.findOne({email:req.body.email});
if(!user){
  return next(new AppError("user with this email is not found" , 404))
};
// Genrate random reset token
  const resetToken = user.passwordResetToken();
  await user.save({validateBeforeSave: false})
  //send it to users email
  try{
    const resetUrl = `${req.protocol}://${req.get(
      'host',
    )}/users/resetPassword/${resetToken}`;
    const message = `Forgot your Password?? submin a patch request with your new password and password confirm on ${resetUrl}`
    await sendEmail({
      email: user.email,
      subject: 'your password reset token valid for 10min',
      message: message
    })
    res.status(200).json({
      status: 'sucess' ,
      message: 'token send to email'
    })
  }catch(err){
    user.PasswordResetToken = undefined;
    user.PasswordResetExpires = undefined;
    res.status(400).json({
      status: 'failed',
      message: 'token was not genrated try again'
    })
  }
});
exports.resetPassword = catchAsync(async(req,res,next)=>{
  // Get user based on token
   const hashedtoken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');
  const user = await User.findOne({PasswordResetToken: hashedtoken})
  const checkexpiryToken = await User.findOne({
    PasswordResetExpires: {$gt: Date.now()}
  });
if(!user || !checkexpiryToken){
  return next(new AppError('Token is not valid or token has expired' , 401))
};
  // if token not expired and there is a user set new password
  user.password = req.body.password;
  user.confirmPassword = req.body.confirmPassword;
  user.PasswordResetToken = undefined;
  user.PasswordResetExpires = undefined;
  user.passwordChangedAt = Date.now();
  // update changed password in database
  await user.save(); 
  // log user in
  createToken(user, 200, res)
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    // roles = [admin, lead-guide]
    console.log(req.user)
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('you are not allowed to perform this action', 403),
      );
    }
    next();
  };
};

// only for checking if user is loggged in
exports.isLoggedIn = catchAsync(async (req, res, next) => {
  // getting token and check if its there
  // let token;
  if (req.cookies.jwt) {
    try{
    const decoded = await promisify(jwt.verify)(
      req.cookies.jwt,
      process.env.SECRET_KEY,
    );
    // checking if user still exists
    const freshUser = await User.findById(decoded.id);
    if (!freshUser) {
      return next();
    }

    // check if user change password after token was issued
    // if (freshUser.passwordChangedAfter(decoded.iat)) {
    //   return next();
    // }
    // there is a loggedin user
    res.locals.user = freshUser;
    return next();
  }catch(err){
    return next();
  }
  }
  next();
})
exports.protect =catchAsync(async(req,res,next)=>{
  
  // checking if token is comming with request
  let token;
  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    token = req.headers.authorization.split(' ')[1]
  }
  if(req.cookies.jwt){
    token = req.cookies.jwt;
  }
  if(!token){
    return next(new AppError('please login to get access' , 401))
  }
  // console.log(token)
  //checking if token is valid or not
  const decoded = await promisify(jwt.verify)(token , process.env.SECRET_KEY)
  const user = await User.findById(decoded.id);
  if(!user){
    return next(new AppError('Jwt token is not valid'))
  }
  req.user = user;
  next();
})