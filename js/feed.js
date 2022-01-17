const search_btn1 = document.querySelector(".search-btn.first");
const search_btn2 = document.querySelector(".search-btn.second");
const search_btn3 = document.querySelector(".search-btn.third");
const feed_container = document.querySelector(".feed-container");
const home_feed_container = document.querySelector(".home-feed-container")
const splash = document.querySelector('.splash');

const home = document.querySelector(".img-home");
const chat = document.querySelector(".img-chat");
const plus = document.querySelector(".img-plus");
const profile = document.querySelector(".img-profile");

// setTimeout(function() {
//   splash.style.opacity = '0'
//   splash.style.zIndex = '-1'
// }, 3000)

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
  if(posts.length !== 0) {
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

} 
else {
    feed_container.style.display = "block";
    home_feed_container.style.display = "none"
}
}
getFeed();
