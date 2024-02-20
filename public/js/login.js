import axios from "axios";
import { showAlert, hideAlert } from "./alert";

export const login = async (email, password) => {
  try {
    const res = await axios({
      method: "post",
      url: "api/v1/users/login",
      data: {
        email,
        password,
      },
    });
    if (res.data.status === "sucess") {
      showAlert("Logged in SucessFully", "success");
      window.setTimeout(() => {
        location.assign("/");
      }, 1200);
    }
  } catch (err) {
    console.log(err)
    showAlert(err.response.data.msg, "error");
  }
};
export const logout = async () => {
  try {
    const res = await axios({
      method: "Get",
      url: "api/v1/users/logout",
    });
    if (res.data.status === "sucess") {
      window.setTimeout(() => {
        showAlert("logged out sucessfully", "success");
        // location.reload(true);
        location.assign("/");
      }, 1200);
    }
  } catch (err) {
    showAlert("error", "Failed to logout ! Please try again.");
  }
};
export const signup = async (email, name, phone, password, confirmPassword) => {
  try {
    const res = await axios({
      method: "post",
      url: "api/v1/users/signup",
      data: {
        email,
        name,
        phone,
        password,
        confirmPassword: confirmPassword,
      },
    });
    console.log(res)
    if (res.data.status === "sucess") {
      window.setTimeout(() => {
        showAlert("Sucessfully Signed Up", "success");
        location.assign("/");
      }, 4000);
    }
  } catch (err) {
    console.log(err)
    showAlert(err.response.data.msg , 'error')
  }
};
export const placeOrder = async(plan,webUrl,creditionls,customer)=>{
  try{
    const res = await axios({
      method: 'post',
      url: 'api/v1/order/api/v1',
      data:{
        plan,
        webUrl,
        webCredetionals: creditionls,
        customer 
      }
    })
    console.log(res)
    if(res.data.status === 'sucess'){
      window.setTimeout(() => {
        showAlert("your request has been submitted sucessfully.", "success");
        location.assign("/user");
      }, 4000);
    }
  }catch(err){
    console.log(err)
    showAlert(err.response.data.msg , 'error')
  }
}
export const AddFundRequest = async(amount,transctionId,image)=>{
  try{
    const res = await axios({
      method: 'post',
      url: 'api/v1/AddFund',
      data: {
        amount,
        transctionId,
        Image: image
      }
    })
    if(res.data.status === 'sucess'){
      window.setTimeout(() => {
        showAlert("your Fund Addition request  has been submitted sucessfully.", "success");
        location.assign("/user");
      }, 3000);
    }
  }catch(err){
    console.log(err)
    showAlert(err.response.data.msg , 'error')
  }
}