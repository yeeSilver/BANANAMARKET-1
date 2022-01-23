const search_btn1 = document.querySelector(".search-btn.first");
const search_btn2 = document.querySelector(".search-btn.second");
const search_btn3 = document.querySelector(".search-btn.third");
const feed_container = document.querySelector(".feed-container");
const home_feed_container = document.querySelector(".home-feed-container");
const splash = document.querySelector(".splash");

const home = document.querySelector(".img-home");
const chat = document.querySelector(".img-chat");
const plus = document.querySelector(".img-plus");
const profile = document.querySelector(".img-profile");

home.addEventListener("click", function () {
  location.href = "./feed.html";
});

chat.addEventListener("click", function () {
  location.href = "./chatting.html";
});

plus.addEventListener("click", function () {
  location.href = "./sale_post.html";
});

profile.addEventListener("click", function () {
  location.href = "./userpage.html";
});

search_btn1.addEventListener("click", function () {
  location.href = "./search.html";
});

search_btn2.addEventListener("click", function () {
  location.href = "./search.html";
});
search_btn3.addEventListener("click", function () {
  location.href = "./search.html";
});

const container = document.querySelector(".feed-main");
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
  let data = [];
  const heartedlist = [];
  const json = await res.json();
  const post = json.posts;
  if (post.length !== 0) {
    for (let i = 0; i < post.length; i++) {
      const postId = post[i].id
      const authorImage = post[i].author.image;
      const authorAccount = post[i].author.accountname;
      const authorName = post[i].author.username;
      const commentCount = post[i].commentCount;
      const content = post[i].content;
      const image = post[i].image;
      const heartCount = post[i].heartCount;
      const num = String.fromCharCode(65 + i);
      const update = post[i].updatedAt.slice(0, 10);
      const section = document.createElement("section");
      section.classList.add("home-feed");
      section.innerHTML = `
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
    <img src=" ${image}" onerror="this.style.display='none'" />
    </div>
    <div class="reaction-con">
    <ul class="reaction-list">
    <li class="likes">
    <svg width="18" height="18" viewBox="0 0 18 18" fill="#fff" stroke="#767676" xmlns="http://www.w3.org/2000/svg">
      <path d="M15.9201 3.0132C15.5202 2.60553 15.0455 2.28213 14.523 2.06149C14.0005 1.84085 13.4405 1.72728 12.8749 1.72728C12.3093 1.72728 11.7492 1.84085 11.2267 2.06149C10.7042 2.28213 10.2295 2.60553 9.82965 3.0132L8.99985 3.85888L8.17004 3.0132C7.3624 2.19011 6.267 1.72771 5.12483 1.72771C3.98265 1.72771 2.88725 2.19011 2.07961 3.0132C1.27197 3.83629 0.818237 4.95264 0.818237 6.11667C0.818237 7.28069 1.27197 8.39704 2.07961 9.22013L2.90941 10.0658L8.99985 16.2727L15.0903 10.0658L15.9201 9.22013C16.3201 8.81265 16.6374 8.32884 16.8539 7.79633C17.0704 7.26383 17.1819 6.69307 17.1819 6.11667C17.1819 5.54026 17.0704 4.96951 16.8539 4.437C16.6374 3.9045 16.3201 3.42069 15.9201 3.0132Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <span class="heartnumber">${heartCount}</span>
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
      ["img-mini-profile", "post-title", "post-user-id"].forEach((cls) => {
        section
          .querySelector(`.${cls}`)
          .addEventListener("click", () => GoToPage(authorAccount));
      });
      ["likes"].forEach((cls) => {
        section
          .querySelector(`.${cls}`)
          .addEventListener("click", () => heartClick(postId));
      });
      ["comments"].forEach((cls) => {
        section
          .querySelector(`.${cls}`)
          .addEventListener("click", () => commentClick(postId));
      });
      document.querySelector(".home-feed-container").appendChild(section);
    }
  } else {
    feed_container.style.display = "block";
    home_feed_container.style.display = "none";
  }
  
  //  좋아요 구현
  const likesBtns = document.querySelectorAll(".likes svg");
  const likeNums = document.querySelectorAll('.heartnumber');
  heartedlist.forEach((list, i) => {
    if (list === true){
      likesBtns[i].classList.add("likes-on");
    } 
  })

  likesBtns.forEach((likeBtn, i) => {
    likeBtn.addEventListener("click", function () {
      if (likeBtn.classList.contains("likes-on")) {
        likeBtn.classList.remove("likes-on");
        likeNums[i].innerText = (+(likeNums[i].innerText) - 1);
      } else {
        likeBtn.classList.add("likes-on");
        likeNums[i].innerText = (+(likeNums[i].innerText) + 1);
      }
    });
  });
}

getFeed();

function GoToPage(authorAccount) {
  localStorage.setItem("authorAccountName", authorAccount);
  location.href = "otherpage.html";
}

function heartClick(postId, hearted) {
  if(hearted){
    DeleteLikes(postId)
  }else{
    UploadLikes(postId)
  }
}

function commentClick(postId) {
  localStorage.setItem("postId", postId);
  location.href = "posting.html";
}

// 좋아요 올리는 부분
async function UploadLikes(postId) {
  const token = localStorage.getItem("Token");
  // const dataform = new FormData();
  // dataform.append("heartCount", heartState);
  const likedata = await fetch(
    `http://146.56.183.55:5050/post/${postId}/heart`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      }
    }
  );
}

//좋아요 취소
async function DeleteLikes(postId) {
  const token = localStorage.getItem("Token");
  const likedata = await fetch(
    `http://146.56.183.55:5050/post/${postId}/unheart`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      }
    }
  );
}

