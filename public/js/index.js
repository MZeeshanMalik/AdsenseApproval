import { login, logout, signup, placeOrder } from "./login";
import axios from "axios";
import { showAlert } from "./alert";
import { Jwt } from "jsonwebtoken";
const jwt = require("jsonwebtoken");
var OrderForm = document.getElementById("order--form");
const loginForm = document.getElementById("login--form");
const signUpForm = document.getElementById("signup--form");
const fundsForm = document.getElementById("fundsForm");
const contactform = document.getElementById("contact--form");
const logoutBtn = document.getElementById("logout");
// const checkbtn = document.getElementsByClassName('checkbtn')
// if(containor){
// checkbtn.addEventListener('click' , ()=>{
//   var styles = window.getComputedStyle(containor)
//   var diplayproperty = styles.getPropertyValue('display')
//   console.log(diplayproperty)
//   // if(diplayproperty=== '')
// })
// }

document.addEventListener("DOMContentLoaded", function () {
  const checkBtn = document.querySelector(".checkbtn");
  const ul = document.querySelector("nav ul");
  const containor = document.getElementById("containor1");
  if (checkBtn) {
    checkBtn.addEventListener("click", function () {
      const currentLeft = parseInt(
        window.getComputedStyle(ul).getPropertyValue("left")
      );

      if (currentLeft === 0) {
        if (containor) {
          containor.style.display = "block";
          ul.style.left = "-100";
        }
        ul.style.left = "-100%";
      } else {
        if (containor) {
          containor.style.display = "none";
          ul.style.left = "0";
        }
        ul.style.left = "0";
      }
    });
  }
});

if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    login(email, password);
  });
}
if (signUpForm) {
  signUpForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    if (password === confirmPassword) {
      signup(email, name, phone, password, confirmPassword);
    } else {
      showAlert("Password And Confirm Password Are not Matched", "warning");
    }
  });
}

if (OrderForm) {
  OrderForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const plan = document.getElementById("options").value;
    const url = document.getElementById("url").value;
    const creditionls = document.getElementById("creditionls").value;
    placeOrder(plan, url, creditionls);
  });
}

export const AddFundRequest = async (amount, transactionId, image) => {
  try {
    const formData = new FormData();
    formData.append("amount", amount);
    formData.append("transactionId", transactionId);
    formData.append("Image", image);

    const res = await axios({
      method: "post",
      url: "api/v1/AddFund",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (res.data.message === "sucess") {
      window.setTimeout(() => {
        showAlert(
          "your Fund Addition request  has been submitted sucessfully.",
          "success"
        );
        // location.assign("/user");
      }, 2000);
    }
  } catch (err) {
    showAlert(err.response.data.message, "error");
  }
};

if (fundsForm) {
  fundsForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const amount = document.getElementById("amount").value;
    const transId = document.getElementById("transId").value;
    const image = document.getElementById("img").files[0];
    AddFundRequest(amount, transId, image);
  });
}
const contactForm = async (name, email, phone, problem) => {
  try {
    const res = await axios({
      method: "post",
      url: "api/v1/contact",
      data: {
        name,
        email,
        phone,
        problem,
      },
    });
    console.log(res);
    console.log(res);
    if (res.data.status === "sucess") {
      window.setTimeout(() => {
        showAlert("your  request  has been submitted sucessfully.", "success");
        // location.assign("/user");
      }, 1000);
    }
  } catch (err) {
    console.log(err);
  }
};
if (contactform) {
  contactform.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("_name").value;
    const email = document.getElementById("_email").value;
    const phone = document.getElementById("phone").value;
    const problem = document.getElementById("problem").value;
    contactForm(name, email, phone, problem);
  });
}
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    logout();
  });
}
// socket io code

// const socket = io();
// import { io } from "https://cdn.socket.io/4.7.4/socket.io.esm.min.js";

// const socket = io('http://localhost:3000');
import { io } from "socket.io-client";
import { chat } from "../../controller/viewController";
const socket = io();
function addMessage(messageContent, type,img) {
  const messageContainer = document.querySelector(".chat__conversation-board");
  if(messageContainer){
    const newMessageContainer = document.createElement("div");
  
  if (type === "reversed") {
    newMessageContainer.classList.add("reversed");
  }
  newMessageContainer.classList.add(
    "chat__conversation-board__message-container"
  );
  newMessageContainer.innerHTML = `
    <div class="chat__conversation-board__message__person">
      <div class="chat__conversation-board__message__person__avatar"><img src="/images/${img}" alt="Dennis Mikle"/></div><span class="chat__conversation-board__message__person__nickname">You</span>
    </div>
    <div class="chat__conversation-board__message__context">
      <div class="chat__conversation-board__message__bubble"> <span>${messageContent}</span></div>
    </div>
    <div class="chat__conversation-board__message__options">
      <button class="btn-icon chat__conversation-board__message__option-button option-item emoji-button">
        <svg class="feather feather-smile sc-dnqmqq jxshSx" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
          <line x1="9" y1="9" x2="9.01" y2="9"></line>
          <line x1="15" y1="9" x2="15.01" y2="9"></line>
        </svg>
      </button>
      <button class="btn-icon chat__conversation-board__message__option-button option-item more-button">
        <svg class="feather feather-more-horizontal sc-dnqmqq jxshSx" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="1"></circle>
          <circle cx="19" cy="12" r="1"></circle>
          <circle cx="5" cy="12" r="1"></circle>
        </svg>
      </button>
    </div>
  `;

  messageContainer.appendChild(newMessageContainer); // Append new message container
  messageContainer.scrollTop = messageContainer.scrollHeight; // Scroll to bottom
  }
}
function addMessageAdminPanel(message, type, id) {
  const chat = document.querySelector(`.chat[data-chat="${id}"]`);
  console.log(chat)
  if (chat) {
    const newMessage = document.createElement("div");
    newMessage.classList.add("bubble");
    newMessage.innerText = message;

    if (type === "me") {
      newMessage.classList.add("me");
    } else {
      newMessage.classList.add("you");
    }

    chat.appendChild(newMessage);
    chat.scrollTop = chat.scrollHeight;
  }
  else{
    let activeChat = document.querySelector(".chat.active-chat");
    const newMessage = document.createElement("div");
    newMessage.classList.add("bubble");
    newMessage.innerText = message;

    if (type === "me") {
      newMessage.classList.add("me");
    } else {
      newMessage.classList.add("you");
    }

    activeChat.appendChild(newMessage);
    activeChat.scrollTop = activeChat.scrollHeight;
  }
}
// sending message to other uers through admin panel
const adminPaneInput = document.querySelector(".AdminInput");
if (adminPaneInput) {
  adminPaneInput.addEventListener("keydown", function (event) {
    let receiverId = document.querySelector(".active");
    var receiver = "";
    receiver = receiverId.dataset.chat;
    if (event.keyCode === 13) {
      event.preventDefault();
      let message = adminPaneInput.value.trim();
      console.log(receiver);
      if (message !== "") {
        socket.emit("message", receiver, message);
        addMessageAdminPanel(message, "me");
        adminPaneInput.value = "";
      }
    }
  });
}
// adding message to admin panel sent by the user
socket.on("message", async (data) => {
  addMessageAdminPanel(data.message , 'you' , data.senderId)
});
const inputField = document.querySelector(".chat__conversation-panel__input");
const chatElement = document.getElementById('chat');
const scrollElement = document.querySelector('.chat__conversation-board ')
if(scrollElement){
  scrollElement.scrollTop = chatElement.scrollHeight;
  const messages = chatElement.querySelectorAll('.chat__conversation-board__message-container');
        const lastMessage = messages[messages.length - 1];
        lastMessage.scrollIntoView({ behavior: 'auto', block: 'end' });
}
if (inputField) {
  // const userId = inputField.dataset.uesrid;
  inputField.addEventListener("keydown", function (event) {
    if (event.keyCode === 13) {
      // Enter key pressed
      event.preventDefault(); 
      sendMessage();
    }
  });

  chatElement.addEventListener("click", function () {
    sendMessage();
  });

  function sendMessage() {
    const message = inputField.value.trim(); 
    if (message !== "") {
      console.log(message);
      const receiver = "65ec202f1b07619a01af238b";
      socket.emit("message", receiver, message);
      addMessage(message, "reversed",'default.jpg');
      inputField.value = ""; 
    }
  }
}
  
  socket.on("message", (data) => {
    console.log(data);
    if (data.sender !== socket.id) {
      console.log("message received", data);
      addMessage(data.message, 'new' , 'adsense.png');
    }
  });

