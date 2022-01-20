// 로그인한 프로필 가져오기
async function getProfile() {
  const accountname = localStorage.getItem("accountname");

  const url = `http://146.56.183.55:5050/profile/${accountname}`;
  const token = localStorage.getItem("Token");
  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    },
  });

  const json = await res.json();
  console.log(json);
  console.log(
    "=-=-=-=-=-=-=-이 위는 개인프로필 정보입니다.=-=-=-=-=-=-=-=-=-=-=-="
  );
  const 이미지 = json.profile.image;
  const 이름 = json.profile.username;
  const 계정 = json.profile.accountname;
  const 소개 = json.profile.intro;
  const 팔로워수 = json.profile.followerCount;
  const 팔로잉수 = json.profile.followingCount;

  document.querySelector(".profile").innerHTML += `
  <a href="" class="display-inline basic-profile"><img src="${이미지}" alt=""></a>

  <div class="profile-desc">
  <h2>${이름}</h2>
  <small>@ ${계정}</small>
  <p>${소개}</p>
  </div>

  <div class="btn-set">
    <button type="submit" class="display-inline unfollow-btn">프로필 수정</button>
    <button type="submit" class="display-inline unfollow-btn">상품 등록</button>
  </div>
    `;

  document.querySelector(".followers-num").innerHTML += `
    <p class="followBtn">${팔로워수}</p>
    <small>followers</small>
  `;

  document.querySelector(".followings-num").innerHTML += `
  <p class="followingBtn">${팔로잉수}</p>
  <small>followeings</small>
`;

  const 팔로워 = document.querySelector(".followBtn");
  const 팔로잉 = document.querySelector(".followingBtn");

  팔로워.addEventListener("click", function () {
    location.href = "./followerlist.html";
  });
  팔로잉.addEventListener("click", function () {
    location.href = "./followinglist.html";
  });
}

getProfile();

const sellDiv = document.querySelector(".sell-items");

window.onload = function () {
  GetSaleInfo();
};
// 판매 게시글 가져오기
async function GetSaleInfo() {
  const token = localStorage.getItem("Token");
  const accountname = localStorage.getItem("accountname");
  const saleimgdata = await fetch(
    `http://146.56.183.55:5050/product/${accountname}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
    }
  );
  const salejson = await saleimgdata.json();
  const sale_pro = salejson.product;
  console.log(salejson);
  sale_pro.forEach((el) => {
    const itemName = el.itemName;
    const itemImg = el.itemImage;
    const itemLink = el.link;
    const itemPrice = el.price;
    let sellArt = document.createElement("article");
    sellArt.classList.add("display-sell");
    sellArt.innerHTML = `
      <a href="${itemLink}">
        <img src="${itemImg}" alt="">
        <p>${itemName}</p>
        <small>${itemPrice}원</small>
      </a>
    `;
    sellDiv.appendChild(sellArt);
  });
}

// 피드 보여주는 버튼 부분
const albumBtn = document.querySelector(".show-album img");
const listBtn = document.querySelector(".show-list img");
const albumSec = document.querySelector(".album");
const listSec = document.querySelector(".home-feed");

albumBtn.addEventListener("click", () => {
  albumBtn.src = "./img/icon-post-album-on.png";
  listBtn.src = "./img/icon-post-list-off.png";
  listSec.classList.add("hide");
  albumSec.classList.remove("hide");
  GetAlbum();
});

listBtn.addEventListener("click", () => {
  albumBtn.src = "./img/icon-post-album-off.png";
  listBtn.src = "./img/icon-post-list-on.png";
  albumSec.classList.add("hide");
  listSec.classList.remove("hide");
  GetList();
});

// 피드 가져오기 리스트형식
async function GetList() {
  const token = localStorage.getItem("Token");
  const accountname = localStorage.getItem("accountname");
  const albumPhotoDiv = document.querySelector(".album-photos");
  const albumimgdata = await fetch(
    `http://146.56.183.55:5050/post/${accountname}/userpost`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
    }
  );
  const album = await albumimgdata.json();
  const albumPost = album.post;
  albumPost.forEach((el) => {
    const imgsrc = el.image;
    console.log(imgsrc);
    let albumDiv = document.createElement("div");
    albumDiv.innerHTML = `
    <div>
      <a href="">
      <img src="${imgsrc}" alt="">
      </a>
    </div>
    `;
    albumPhotoDiv.appendChild(albumDiv);
  });
}

// 피드 가져오기 앨범형식
async function GetAlbum() {
  const token = localStorage.getItem("Token");
  const accountname = localStorage.getItem("accountname");
  const albumPhotoDiv = document.querySelector(".album-photos");
  const albumimgdata = await fetch(
    `http://146.56.183.55:5050/post/${accountname}/userpost`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
    }
  );
  const album = await albumimgdata.json();
  const albumPost = album.post;
  albumPost.forEach((el) => {
    const imgsrc = el.image;
    console.log(imgsrc);
    let albumDiv = document.createElement("div");
    albumDiv.innerHTML = `
    <div>
      <a href="">
      <img src="${imgsrc}" alt="">
      </a>
    </div>
    `;
    albumPhotoDiv.appendChild(albumDiv);
  });
}
