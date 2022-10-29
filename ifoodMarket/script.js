//Script para o menu-bar do site

let menu = document.querySelector('#menu-bars');
let nav = document.querySelector('.navegacao');

menu.onclick = () =>{
  menu.classList.toggle('fa-times');
  nav.classList.toggle('active');
}

window.onscroll = () =>{
  menu.classList.remove('fa-times');
  nav.classList.remove('active');

  if (window.scrollY > 60) {
    document.querySelector('#scroll').classList.add('active');
  } else {
    document.querySelector('#scroll').classList.remove('active');
  }
}