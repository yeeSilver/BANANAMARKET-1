const join = document.querySelector('.join-email')
const error = document.querySelector('.error-msg')
function getInput() {
    console.log(document.querySelector("#login-id").value)
    console.log(document.querySelector("#login-pw").value)
}

async function login() {
    const email = document.querySelector("#login-id").value
    const pw = document.querySelector("#login-pw").value
    const url = "http://146.56.183.55:5050"
    const loginData = {
            "user":{
                    "email": email,
                    "password": pw
                    }
            }
    
        const res = await fetch(url+'/user/login',{
        method:"POST",
        headers:{
            "Content-type" : "application/json"
        },
        
        body:JSON.stringify(loginData)
    })
    const json = await res.json()
    if(json.status === 422) {
        error.innerHTML = `*${json.message}`    
    }
    localStorage.setItem("Token", json.user.token)
    location.href = "./feed.html"  

}
const $loginBtn = document.querySelector('.login-button')
$loginBtn.addEventListener("click", login)

join.addEventListener('click', function() {
    location.href = "./join_email.html"
})

