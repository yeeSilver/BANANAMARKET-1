const 뒤로가기 = document.querySelector('.back')
const home = document.querySelector(".img-home");
const chat = document.querySelector(".img-chat");
const plus = document.querySelector(".img-plus");
const profile = document.querySelector(".img-profile");

뒤로가기.addEventListener('click', function() {
    location.href = "./userpage.html"
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

async function getFollowing() {
    const accountname = localStorage.getItem("accountname")

    const url = `http://146.56.183.55:5050/profile/${accountname}/following`
    const token = localStorage.getItem("Token")
    const res = await fetch(url,{
        method:"GET",
        headers:{
            "Authorization" : `Bearer ${token}`,
            "Content-type" : "application/json"
        }
    })
    console.log(res);
    const json = await res.json()
    console.log(json)
    console.log("=-=-=-=-=-=-=-이 위는 팔로잉리스트 정보입니다.=-=-=-=-=-=-=-=-=-=-=-=")

    //forEach문으로 받아온 데이터 전부 살펴보면서 그려주는 부분
    json.forEach(i => {
        const 팔로우이미지 = i.image
        const 팔로우이름 = i.username
        const 팔로우소개 = i.intro

        document.querySelector(".container").innerHTML+=`
        <li>
            <img class="display-inline" src="${팔로우이미지}"/>
            <div class="follower-desc display-inline">
                <p>${팔로우이름}</p>
                <small>${팔로우소개}</small>
            </div>
            <button type="submit" class="follow-btn fBtn">팔로우</button>
        </li>
        `
    });

    let fBtn = document.querySelector(".fBtn")

    fBtn.addEventListener("click", function() {
        if(fBtn.innerText === '팔로우') {
            fBtn.classList.remove('follow-btn');
            fBtn.classList.add('cancel-btn');
            fBtn.innerText = '취소';
        }else{
            fBtn.classList.remove('cancel-btn')
            fBtn.classList.add('follow-btn');
            fBtn.innerText = '팔로우';
        }
    });

}

getFollowing()