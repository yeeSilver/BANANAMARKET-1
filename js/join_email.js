const $emailPw = document.querySelector(".cont-banana");
const $id_error = document.querySelector(".join-id-error");
const $pw_error = document.querySelector(".join-pw-error");
<<<<<<< HEAD
const $profile = document.querySelector(".profile")
const $profileImg = document.querySelector(".profile-img")
const $loginBtn = document.querySelector(".login-button")

=======
>>>>>>> 5123afe93447f8b42fcf3ce04d093a43f1adfc8f

async function checkEmailValid(email) {
  const url = "http://146.56.183.55:5050";
  const res = await fetch(url + "/user/emailvalid", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user: {
        email: email,
      },
    }),
  });
  const json = await res.json();
  return json.message == "사용 가능한 이메일 입니다." ? true : false;
}

document.querySelector(".login-button").addEventListener("click", async () => {
  const email = document.querySelector("#join-id").value;
  const pw = document.querySelector("#join-pw").value;
  const exptext = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
    if (exptext.test(email) === false) {
        $id_error.innerHTML = "*올바르지 않은 이메일 형식입니다.";
    }
    if (pw.length < 6)
      $pw_error.innerHTML = "*비밀번호는 6자 이상이어야 합니다.";
    else {
    if (exptext.test(email) === true) {
    const emailValid = await checkEmailValid(email);
    if (emailValid) {
      $emailPw.style.display = "none";
<<<<<<< HEAD
      $profile.style.display = "flex"
=======
>>>>>>> 5123afe93447f8b42fcf3ce04d093a43f1adfc8f
    } else {
      $id_error.innerHTML = "*이미 가입된 이메일 주소입니다.";
    }
  }
}
<<<<<<< HEAD
});

// 이미지 등록

async function imageUpload(files) {
  const formData = new FormData();
  formData.append("image", files[0]); 
  const res = await fetch(`http://146.56.183.55:5050/image/uploadfile`, {
      method: "POST",
      body : formData
  })
  const data = await res.json()
  const productImgName = data["filename"];
  return productImgName;
}


async function profileImage(e) {
  const files = e.target.files
  const result = await imageUpload(files)
  $profileImg.src = "http://146.56.183.55:5050" + "/" + result
  console.log(result)
  document.querySelector('.profile-user-image').src =  $profileImg.src
}
document.querySelector("#profileImg").addEventListener("change", profileImage)

async function join(){
  const email = document.querySelector("#join-id").value;
  const password = document.querySelector("#join-pw").value;
  const userName = document.querySelector("#userNameInput").value;
  const userId = document.querySelector("#userIdInput").value;
  const intro = document.querySelector("#userIntroInput").value;
  const imageUrl = document.querySelector("#profileImg").src
  try {
      const res = await fetch("http://146.56.183.55:5050/user", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body : JSON.stringify({
              "user": {
                  "email": email,
                  "password": password,
                  "username": userName,
                  "accountname": userId,
                  "intro": intro,
                  "image": imageUrl,
              }
          })
      })
      console.log(res)
      const json = await res.json()
      if(res.status==200){
          location.href = "./index.html"
      }
      else{
          console.log(json)
      }
  }catch(err){
      alert(err)
  }
}
$loginBtn.addEventListener("click",join)
=======
if(pw.length > 5 && exptext.test(email) === true && checkEmailValid(email)) {
    location.href = "setting.html"
}
});
>>>>>>> 5123afe93447f8b42fcf3ce04d093a43f1adfc8f
