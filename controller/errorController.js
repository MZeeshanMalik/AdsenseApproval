const dotenv = require('dotenv');
const AppError = require('../utils/appError')
const sendErrorDevolpment = (err,res)=>{
  console.log(err)
  res.status(err.statusCode).json({
    err: err.status,
    error: err,
    message: err.message,
    stack: err.stack
})}
const sendErrorProduction = (err,res)=>{
  console.error("Error" , err);
  if(err.isOpreational){
    res.status(err.statusCode).render('error' , {
      title: 'Error',
      msg: err.message
    })
  }else{
      res.status(500).render('error' , {
        title: 'oops something went wrong',
        msg: 'Please try again later'
      })
    }
}
const castErrorHandler = (err)=>{
 const message = `invalid ${err.path} - value: ${err.value}`
  return(new AppError(message , 400))
  // res.status(400).json()
}
const validareErrorHandler = (err)=>{
  console.log("i am in validateError handler")
  const errors = Object.values(err.errors).map(el=>el.message);
  const message = errors.join(/n/);
  return(new AppError(message , 400))
}
const duplicateKeyErrorHandler = (err)=>{
  const val = Object.keys(err.keyValue)[0];
  return (new AppError(`This ${val} is Already registered.Please provide a different ${val}` , 406))
}
const jsonWebtokenerrorHandler = (err)=>{
  const error = err.message
  return (new AppError(`please log in again ,  ${error}`,401))
}
module.exports = (err,req,res,next)=>{
  // console.log(process.env.NODE_ENV)
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";
    if(process.env.NODE_ENV == "devolpment"){
      sendErrorDevolpment(err,res);
      }else if(process.env.NODE_ENV == "production"){
        let error = { ...err }
        error.name = err.name
        error.message = err.message
        if(error.name === "CastError"){ 
          error = castErrorHandler(error);}
        if(error.name === "ValidationError"){
          error = validareErrorHandler(error);
        }
        if(error.code === 11000){
          error = duplicateKeyErrorHandler(error)
        }
        if(error.name === "JsonWebTokenError") {
          error = jsonWebtokenerrorHandler(error);
        }
        sendErrorProduction(error,res);
    }
  }