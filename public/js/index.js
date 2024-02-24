import { login , logout ,signup,placeOrder} from "./login";
import axios from "axios";
import { showAlert } from "./alert";
import { Jwt } from "jsonwebtoken";
const jwt = require('jsonwebtoken')
var OrderForm = document.getElementById('order--form');
const loginForm = document.getElementById('login--form');
const signUpForm = document.getElementById('signup--form');
const fundsForm = document.getElementById('fundsForm')
const contactform  = document.getElementById('contact--form')
const logoutBtn = document.getElementById('logout')
// const checkbtn = document.getElementsByClassName('checkbtn')
// if(containor){
// checkbtn.addEventListener('click' , ()=>{
//   var styles = window.getComputedStyle(containor)
//   var diplayproperty = styles.getPropertyValue('display')
//   console.log(diplayproperty)
//   // if(diplayproperty=== '')
// })
// }

document.addEventListener("DOMContentLoaded", function() {
  const checkBtn = document.querySelector('.checkbtn');
  const ul = document.querySelector('nav ul');
  const containor = document.getElementById('containor1');

  checkBtn.addEventListener('click', function() {
      const currentLeft = parseInt(window.getComputedStyle(ul).getPropertyValue('left'));

      if (currentLeft === 0) {
        if(containor){
          containor.style.display = 'block';
          ul.style.left = '-100';
        }
          ul.style.left = '-100%';
      } else {
        if(containor){
          containor.style.display = 'none';
          ul.style.left = '0';
        }
          ul.style.left = '0';
      }
  });
});


if(loginForm){
    loginForm.addEventListener('submit', (e)=>{
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        login(email,password)
    })
}
if(signUpForm){
    signUpForm.addEventListener('submit' , (e)=>{
        e.preventDefault();
        const email = document.getElementById('email').value;
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        if(password === confirmPassword){
            signup(email,name,phone,password,confirmPassword)
        }else{
            showAlert('Password And Confirm Password Are not Matched'  , 'warning')
        }

    })
}

if(OrderForm){
    OrderForm.addEventListener('submit', (e)=>{
        e.preventDefault();
        const plan = document.getElementById('options').value;
        const url = document.getElementById('url').value;
        const creditionls = document.getElementById('creditionls').value;
        placeOrder(plan,url,creditionls)
    })
}

export const AddFundRequest = async (amount, transactionId, image) => {
    try {
      const formData = new FormData();
      formData.append('amount', amount);
      formData.append('transactionId', transactionId);
      formData.append('Image', image);
  
      const res = await axios({
        method: 'post',
        url: 'api/v1/AddFund',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (res.data.message === 'sucess') {
        window.setTimeout(() => {
            showAlert("your Fund Addition request  has been submitted sucessfully.", "success");
            // location.assign("/user");
          }, 2000);
      }
    } catch (err) {
      showAlert(err.response.data.message, 'error');
    }
  };
  
  if (fundsForm) {
    fundsForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const amount = document.getElementById('amount').value;
      const transId = document.getElementById('transId').value;
      const image = document.getElementById('img').files[0];
      AddFundRequest(amount, transId, image);
    });
  }
  const contactForm = async(name,email,phone,problem)=>{
    try{
      const res= await axios({
        method: "post",
        url: "api/v1/contact",
        data: {
          name,
          email,
          phone,
          problem
        }
      })
      console.log(res)
      console.log(res)
      if(res.data.status === 'sucess'){
        window.setTimeout(() => {
          showAlert("your  request  has been submitted sucessfully.", "success");
          // location.assign("/user");
        }, 1000);
      }
    }catch(err){
      console.log(err)
    }
  }
  if(contactform){
    contactform.addEventListener('submit' , (e)=>{
      e.preventDefault();
      const name = document.getElementById('_name').value;
      const email = document.getElementById('_email').value;
      const phone = document.getElementById('phone').value;
      const problem = document.getElementById('problem').value;
      contactForm(name,email,phone,problem)
    })
  }
  if(logoutBtn){
    logoutBtn.addEventListener('click' , ()=>{
      logout();
    } )
  }