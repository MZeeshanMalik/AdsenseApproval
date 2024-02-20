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
        function getJwtToken() {
            // Split document.cookie string into individual cookies
            const cookies = document.cookie.split(';');
            // Loop through each cookie
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                // Check if the cookie starts with 'jwt='
                if (cookie.startsWith('jwt=')) {
                    // Return everything after 'jwt='
                    return cookie.substring('jwt='.length);
                }
            }
            // If 'jwt' cookie is not found, return null
            return null;
        }
        const jwtToken = getJwtToken();
        console.log(jwtToken)
        const decodedToken = jwt.decode(jwtToken) 
        console.log(decodedToken)
        const userId = decodedToken.id
        console.log(userId)
        placeOrder(plan,url,creditionls,userId)
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
      console.log(res)
      if (res.data.message === 'sucess') {
        window.setTimeout(() => {
            showAlert("your Fund Addition request  has been submitted sucessfully.", "success");
            // location.assign("/user");
          }, 2000);
      }
    } catch (err) {
      console.error(err);
      showAlert(err.response.data.msg, 'error');
    }
  };
  
  if (fundsForm) {
    fundsForm.addEventListener('submit', (e) => {
        console.log(fundsForm)
        console.log('hi')
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
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
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