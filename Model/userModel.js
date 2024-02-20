const mongoose = require('mongoose');
const crypto = require('crypto')
const validator = require('validator');
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [5, 'minimum length should be 5'],
    // maxlength: [10, 'maximum length should be 10'],
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'please provide email'],
    validate: [validator.isEmail, 'please provide a valid email'],
  },
  photo: {
    type:String,
    default: 'default.jpg'
  },
  role: {
    type: String ,
    enum: [ 'user' , 'admin'],
    default: 'user' 
  },
  password: {
    type: String,
    // minlength: [8, 'minimum length should be 8'],
    maxlength: [1000, 'maximum length should be 20'],
    required: [true, 'password is required'],
    select: false
  },
  confirmPassword: {
    type: String,
    require: [true, 'confirm password is required'],
    //this works on only save
    validate: {
      validator: function(el){
        return el === this.password
      },
      message: 'passwords are not same'
    },
  },
  balance:{
    type: Number,
    default: 0
  },
  phone:{
    type: Number,
  },
  passwordChangedAt: Date,
  PasswordResetToken: String,
  PasswordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false
  }
});

userSchema.pre('save' , async function (next){
  //checks if password was actually modified
  if(!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password , 12);
  // Delete password confirm field
  this.confirmPassword = undefined;
});
// comparing password
userSchema.methods.correctPassword = async function(candidatePassword , userPassword){
  return await bcrypt.compare(candidatePassword , userPassword);
}
// Genrating random bytes of string to reset password
userSchema.methods.passwordResetToken = function(){
  const resetToken = crypto.randomBytes(32).toString('hex')
  this.PasswordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  console.log(this.PasswordResetToken);
  this.PasswordResetExpires = Date.now() + 10 *60 * 1000;
  return resetToken;
}

const User = mongoose.model('Users', userSchema);

module.exports = User;