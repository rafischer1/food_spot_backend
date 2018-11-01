///test out random functionality

let testBtn = document.getElementById('testBtn')
let promoterSubmit = document.getElementById('promoterSubmitPopup')
let promoterSubmitBtn = document.getElementById('promoterSubmit')

testBtn.addEventListener('click', (e) => {
  e.preventDefault()
  console.log(e.target)
  setTimeout(() => {
    promoterSubmit.style.display = "inline"

  }, 500)


})

promoterSubmitBtn.addEventListener('click', (e) => {
  console.log(e.target)
  e.preventDefault()
  promoterSubmit.style.animation = "fade-out 3s linear 1 forwards"
  promoterSubmit.style.display = "none"
})