const $emailPw = document.querySelector(".cont-banana");
const $id_error = document.querySelector(".join-id-error");
const $pw_error = document.querySelector(".join-pw-error");

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
    } else {
      $id_error.innerHTML = "*이미 가입된 이메일 주소입니다.";
    }
  }
}
if(pw.length > 5 && exptext.test(email) === true && checkEmailValid(email)) {
    location.href = "setting.html"
}
});
