// 변수 설정
// 상단바 뒤로가기
document.querySelector(".icon-left-arrow").addEventListener("click", () => {
    window.history.back();
});
// 상단바 모달 설정 및 개인정보, 로그아웃
// 게시물 불러오기
const container = document.querySelector(".feed-main");
console.log(localStorage.getItem("Token"));
async function getFeed() {
    const url = "http://146.56.183.55:5050";
    const token = localStorage.getItem("Token");
    const res = await fetch(url + "/post/feed", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json",
        },
    });
    const json = await res.json();
    const posts = json.posts;
    if (posts.length !== 0) {
        posts.forEach((post) => {
            const authorImage = post.author.image;
            const authorAccount = post.author.accountname;
            const authorName = post.author.username;
            const commentCount = post.commentCount;
            const content = post.content;
            const image = post.image;
            const heartCount = post.heartCount;
            const update = post.updatedAt.slice(0, 10);
            document.querySelector(".home-feed-container").innerHTML += `
    <section class="home-feed">
        <article class="post-art">
            <div class="post-user">
                <div class="post-con-info">
    <img class="img-mini-profile" src=" ${authorImage}"/>
    <div>
    <h2 class="post-title"> ${authorName}</h2>
    <p class="post-user-id"> @${authorAccount}</p>
    </div>
    </div>
    </div>
    <div class="post-main">
    <div class="post-con-main">
    <p class="content">${content}</p>
    <img src=" ${image}"/>
    </div>
    <div class="reaction-con">
    <ul class="reaction-list">
    <li class="likes">
    <img class="img-heart" src="./img/2/heart.svg">
    <span class="number">${heartCount}</span>
    </li>
    <li class="comments">
    <img src="./img/2/footer-icon/chat.svg">
    <span class="number">${commentCount}</span>
    </li>
    <ul>
    <p class="post-date">${update}</p>
    </div>
          </div>
        </article>
      </section>
            `;
        });
    } else {
        feed_container.style.display = "block";
        home_feed_container.style.display = "none";
    }
}
getFeed();
// 게시물 모달 신고 표시
// 댓글 모달 삭제 표시
// 댓글 입력 게시 활성화
let inputText = document.querySelector(".textinput_input_text");
let button = document.querySelector(".textinput_button");
let dotBtn = document.querySelector(".icon-more");
let modalBg = document.querySelector(".modal_bg");
let modal = document.querySelector(".chatting_modal");

button.disabled = true;
inputText.addEventListener("keyup", listener);

function listener() {
    switch (!inputText.value) {
        case true:
            button.disabled = true;
            break;
        case false:
            button.disabled = false;
            break;
    }
}

const open = () => {
    modalBg.classList.add("on");
    modal.classList.add("on");
};
const close = () => {
    modalBg.classList.remove("on");
    modal.classList.remove("on");
};

dotBtn.addEventListener("click", open);
modalBg.addEventListener("click", close);
