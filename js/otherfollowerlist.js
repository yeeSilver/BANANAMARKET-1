const 뒤로가기 = document.querySelector('.back')
const home = document.querySelector(".img-home");
const chat = document.querySelector(".img-chat");
const plus = document.querySelector(".img-plus");
const profile = document.querySelector(".img-profile");

뒤로가기.addEventListener('click', function() {
    location.href = "./otherpage.html"
})
home.addEventListener('click', function() {
    location.href = "./feed.html"
})

chat.addEventListener('click', function() {
    location.href = "./chatting.html"
})

plus.addEventListener('click', function() {
    location.href = "./sale_post.html"
})

profile.addEventListener('click', function() {
    location.href = "./userpage.html"
})

async function getFollow() {
    const authorAccount = localStorage.getItem("authorAccoutName")

    const url = `http://146.56.183.55:5050/profile/${authorAccount}/follower?limit=20&skip=0`
    const token = localStorage.getItem("Token")
    const res = await fetch(url,{
        method:"GET",
        headers:{
            "Authorization" : `Bearer ${token}`,
            "Content-type" : "application/json"
        }
    })
    const json = await res.json()
    json.forEach(i => {
        const 팔로우이미지 = i.image
        const 팔로우이름 = i.username
        const 팔로우소개 = i.intro

        const li = document.createElement('li')
        li.classList.add('follow-list')
        li.innerHTML = `
        <li class="follow-list">
            <img class="display-inline" src="${팔로우이미지}"/>
            <div class="follower-desc display-inline">
                <p>${팔로우이름}</p>
                <small>${팔로우소개}</small>
            </div>
            <button type="submit" class="cancel-btn fBtn">취소</button>
        </li>
        `;
        ['fBtn']
        .forEach(cls => {
        li
        .querySelector(`.${cls}`)
        .addEventListener('click', () => followBtn());
            });
        document.querySelector(".container").appendChild(li)
    });
function followBtn() {
    let fBtn = document.querySelectorAll(".fBtn")
    fBtn.forEach((e) => { 
    e.addEventListener("click", function() {
        if (e.innerText === '팔로우') {
            e.classList.remove('follow-btn');
            e.classList.add('cancel-btn');
            e.innerText = '취소';
        } else{
            e.classList.remove('cancel-btn')
            e.classList.add('follow-btn');
            e.innerText = '팔로우';
        }
    });
})
}
}

getFollow()
