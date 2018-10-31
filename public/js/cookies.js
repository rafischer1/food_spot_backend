/////////COOKIE FUNCTIONS!!!!\\\\\\\\\

let myCookie = document.cookie
console.log('cookie: ', myCookie)
let signInBtn = document.getElementById('signInBtn')
let createBtn = document.getElementById('createBtn')

if (myCookie == '') {
  console.log('nocookie')
  signInBtn.setAttribute("style", "display:inline");
  createBtn.setAttribute("style", "display:none");
} else {
  console.log('hide sign in')
  createBtn.setAttribute("style", "display:inline");
  signInBtn.setAttribute("style", "display:none");
}