const catchAsync = require('../utils/catchAsync');
exports.getHomePage = catchAsync(async(req,res,next)=>{
    const base = 'helo'
    res.status(200).render('home')
})
exports.login = catchAsync(async(req,res,next)=>{
    res.status(200).render('login')
})
exports.signup = catchAsync(async(req,res,next)=>{
    res.status(200).render('signup')
})
exports.user = catchAsync(async(req,res,next)=>{
    res.status(200).render('user_template')
})
exports.order = catchAsync(async(req,res,next)=>{
    res.status(200).render('order')
})
exports.addFunds = catchAsync(async(req,res,next)=>{
    res.status(200).render('addfund')
})
exports.contact = catchAsync(async(req,res,next)=>{
    res.status(200).render('contact')
})
exports.about = catchAsync(async(req,res,next)=>{
    res.status(200).render('about')
})