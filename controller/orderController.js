const Order = require('../Model/orderModel')
const catchAsync = require('../utils/catchAsync')
const jwt = require('jsonwebtoken')
// const AppError  = require('../utils/appError')
const handleFactory = require('./handleFactory')
// exports.createNeworder = (handleFactory.Addnew(Order))
exports.createNeworder = catchAsync(async(req,res,next)=>{
        const jwtToken = req.cookies.jwt
        const decodedToken = jwt.decode(jwtToken) 
        const userId = decodedToken.id;
    const order = Order.create({
        plan: req.body.plan,
        webUrl: req.body.webUrl,
        webCredetionals:req.body.webCredetionals,
        customer: userId
    })
    res.status(200).json({
        status: 'sucess',
    })
})
