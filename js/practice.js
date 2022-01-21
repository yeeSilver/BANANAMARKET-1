const accountname = localStorage.getItem("accountname");
const ENDPOINT = "http://146.56.183.55:5050";
const authorAccount = localStorage.getItem("authorAccountName")
function searchParam(key) {
    return new URLSearchParams(location.search).get(key); 
  }
  const postId = searchParam("id"); 

async function getCommentList() {
    const reqOption = {
      method: "GET",
      headers: HEADERS,
    }
    const res = await fetch(`${ENDPOINT}/post/${postId}/comments`, reqOption);
    const json = await res.json();
    const commentList = document.querySelector(".comment-list");
    // 예외처리
    if (json.status === 404) {
      // 404 페이지 이동 로직 추가 예정
      // location.href = "/views/error.html";
      alert(json.message);
    } else {
      json.comments.forEach((el) => {
        const { author, content, createdAt, id } = el;
        const [ date, time ] = createdAt.split("T");
        const [ year, month, day ] = date.split("-");
        const [ hour, min, sec ] = time.split(":");
        const strDateList = [ month, day, hour, min ];
        const compareTime = checkCompareTime(strDateList);
        commentList.innerHTML += `
          <li class="comment-card">
            <div class="comment-info">
              <div class="image-wrapper">
                <img src="${author.image}" alt="프로필 이미지">
              </div>
              <p> ${author.username}<span>${compareTime} 전</span></p>
              <button id=${id} class="button-more" type="button">
                <span class="text-hide">설정 더보기</span>
              </button>
            </div>
            <p class="comment-detail">${content}</p>
          </li>
        `;
      });
    }
  }
  
  // 페이지 로드 될 때 댓글 리스트 불러오기
  window.onload = getCommentList;