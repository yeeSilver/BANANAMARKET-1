// 뒤로 가기 버튼
// const prevBtn = document.querySelector(".prev-btn");
// prevBtn.addEventListener("click", () => {
//   history.back();
// });


// 검색 기능 구현
const TOKEN = localStorage.getItem("Token");
const userList = document.querySelector(".search-result-list");
const searchInput = document.querySelector(".user-search-input");

async function searchId(search) {
  const url = "http://146.56.183.55:5050/user";
  const reqData = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-type": "application/json",
    },    
  });
  
  const data = await reqData.json();
  const SEARCH_API = await fetch(`${url}/user/searchuser/?keyword=${search}`);
  localStorage.setItem("SEARCH_API", SEARCH_API);
  localStorage.setItem("reqData", reqData);
  console.log(data)
  data.forEach(user => {
    const authorName = user.username;
    const authorAccount = user.accountname;
    const profileImg = user.image;
    const li = document.createElement("li");
    li.classList.add("user-list");

    const copyAuthorName = authorName
      .split(search)
      .join(`<span class="orange">${search}</span>`);
    const copyauthorAccount = authorAccount
      .split(search)
      .join(`<span class="orange">${search}</span>`);

    li.innerHTML = `
    <div class="post-con-info">
      <img
        src="${profileImg}"
        alt=""
        class="img-mini-profile"
      />
      <div>
        <h2 class="post-title">${copyAuthorName}</h2>
        <p class="post-user-id">${copyauthorAccount}</p>
      </div>
    </div>
    `;
    searchInput.appendChild(li);
  });
}
searchId();

searchInput.addEventListener('keyup', (e) => {
  if(e.isComposing && e.keycode === 229) return;
  if(e.target.value === ""){
    removeAllList(userList);
  } else {
    removeAllList(userList);
    getUser(e.target.value);
  }
})

function removeAllList(ele){
  while(ele.hasChildNodes()){
    ele.removeChild(ele.firstChild);
  }
}


async function getUser(searchQuery) {
  const SEARCH_API = localStorage.getItem("SEARCH_API");
  const reqData = localStorage.getItem("reqData");
  const response = fetch(`${SEARCH_API}${searchQuery}`, reqData);
  return response;
}

// function removeAllChilden(parentNode) {
//   while (parentNode.hasChildNodes()) {
//     parentNode.removeChild(parentNode.firstChild);
//   }
// }

// document.querySelector("form").addEventListener("keyup", (event) => {
//   const userList = document.querySelector("main .search-user-cont");
//   removeAllChilden(userList);

//   getUser(event.target.value)
//     .then((res) => res.json())
//     .then((datas) => {
//       if (datas[0]) {
//         const frag = document.createDocumentFragment("ul");
//         datas.forEach((user) => {
//           const li = document.createElement("li");
//           li.className = "user-search";
//           li.innerHTML = `
//           <a href="#none">
//             <img src=${user.image} alt="프로필 사진" class="avatar-img">
//             <p class="user-info">
//               <strong class="market-name">${user.username}</strong>
//               <span class="user-name">@ ${user.accountname}</span>
//             </p>
//           </a>
//         `;
//           frag.appendChild(li);
//         });
//         userList.appendChild(frag);
//       }
//     });
// });
