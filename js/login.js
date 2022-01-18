const login = document.querySelector('.login-email')
const join = document.querySelector('.join-email')
const splash = document.querySelector('.splash');

setTimeout(function() {
  splash.style.opacity = '0'
  splash.style.zIndex = '-1'
}, 1000)


login.addEventListener('click', function() {
    location.href = "./login_email.html"
})

join.addEventListener('click', function() {
    location.href = "./join_email.html"
})
