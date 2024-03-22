const catchAsync = require('../utils/catchAsync');
const user = require('../Model/userModel')
const Chat = require('../Model/chatModel')
const authCotroller = require('../controller/authenticationController')
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
exports.chat = catchAsync(async(req,res,next)=>{
    let token = req.cookies.jwt
    const user = await authCotroller.userId(token)
    // console.log(user._id)
    const chats = await Chat.find()
    // console.log(chats)
    res.status(200).render('chat', {
        chats,
    })
})
exports.adminPanel = catchAsync(async(req,res,next)=>{
    let token = req.cookies.jwt
    const User = await authCotroller.userId(token)
    // console.log(User._id)
    const users = await user.find({_id: {$ne:User._id}})
    const chat = await Chat.find();
    // console.log(users)
    res.status(200).render('chatAdmin' , {
        Allusers: users,
        Chat: chat
    })
})