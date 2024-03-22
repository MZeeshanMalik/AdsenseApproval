// document.querySelector('.chat[data-chat=person2]').classList.add('active-chat');
// document.querySelector('.person[data-chat=person2]').classList.add('active');
const persons = document.querySelector('.person')
persons.classList.add('active')
const active_chat = document.querySelector('active-chat')

if(active_chat){
  document.addEventListener("DOMContentLoaded", function(event) { 
    active_chat.scrollTop = chatDiv.scrollHeight;
});
}
let friends = {
  list: document.querySelector('ul.people'),
  all: document.querySelectorAll('.left .person'),
  name: '' },

chat = {
  container: document.querySelector('.container .right'),
  current: null,
  person: null,
  name: document.querySelector('.container .right .top .name') };


friends.all.forEach(f => {
  f.addEventListener('mousedown', () => {
    f.classList.contains('active') || setAciveChat(f);
  });
});

function setAciveChat(f) {
 let a =  friends.list.querySelector('.active');
 if(a){
   a.classList.remove('active')
 }
  f.classList.add('active');
  chat.current = chat.container.querySelector('.active-chat');

  chat.person = f.getAttribute('data-chat');
  // console.log(chat)
  let activeChat = chat.current
  if(activeChat){
    activeChat.classList.remove('active-chat');
  }
  // console.log(chat.container)
// console.log(chat.person)
  chat.container.querySelector('[data-chat="' + chat.person + '"]').classList.add('active-chat');
  friends.name = f.querySelector('.name').innerText;
  chat.name.innerHTML = friends.name;
}
