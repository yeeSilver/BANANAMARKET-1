const 뒤로가기 = document.querySelector(".back");
const home = document.querySelector(".img-home");
const chat = document.querySelector(".img-chat");
const plus = document.querySelector(".img-plus");
const profile = document.querySelector(".img-profile");
const myAccountname = localStorage.getItem("accountname");

뒤로가기.addEventListener("click", function () {
  location.href = "./otherpage.html";
});

async function getFollow() {
  const authorAccount = localStorage.getItem("authorAccountName");
  const userid = localStorage.getItem("userid");
  const url = `http://146.56.183.55:5050/profile/${authorAccount}/follower?limit=100&skip=0`;
  const token = localStorage.getItem("Token");
  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    },
  });
  const json = await res.json();
  let 팔로우버튼 = '취소';
  console.log(json);
  json.forEach((i) => {
    console.log(i);
    const 팔로우이미지 = i.image;
    const 팔로우이름 = i.username;
    const 팔로우소개 = i.intro;
    const accountName = i.accountname;
    let fBtn = 'fBtn';
    if(i._id === userid){
      console.log(i._id);
      console.log(userid);
      fBtn = 'hide';
    }
    let 팔로우버튼 = '취소';
    const li = document.createElement("li");
    li.classList.add("follow-list");
    li.insertAdjacentHTML (
      "afterbegin",`
        <li class="follow-list">
            <img class="display-inline" src="${팔로우이미지}"/>
            <div class="follower-desc display-inline">
                <p class="followName">${팔로우이름}</p>
                <small class="followIntro">${팔로우소개}</small>
            </div>
            <button type="submit" class="cancel-btn ${fBtn}">${팔로우버튼}</button>
        </li>
        `);
    [`${fBtn}`].forEach((cls) => {
      li.querySelector(`.${cls}`).addEventListener("click", () => followBtn());
    });
    ["display-inline", "followName", "followIntro"].forEach((cls) => {
      li.querySelector(`.${cls}`).addEventListener("click", () =>
        GoToPage(accountName)
      );
    });
    document.querySelector(".container").appendChild(li);
  });
  
  let fBtn = document.querySelectorAll(".fBtn");
    fBtn.forEach((e) => {
      e.addEventListener("click", function() {
        if (e.innerText === "팔로우") {
          e.classList.remove("follow-btn");
          e.classList.add("cancel-btn");
          e.innerText = "취소";
        } else {
          e.classList.remove("cancel-btn");
          e.classList.add("follow-btn");
          e.innerText = "팔로우";
        }
      });
    });
}

function GoToPage(accountName) {
    if(myAccountname == accountName) {
      location.href = "./userpage.html"
    } else  {
    localStorage.setItem("authorAccountName", accountName)
    location.href = "./otherpage.html"
    }
}

getFollow();
