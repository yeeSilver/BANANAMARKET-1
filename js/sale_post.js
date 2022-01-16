const saveBtn = document.querySelector('.profile-save');
const saleImg = document.querySelector('#product-img');
// const previewDiv = document.querySelector('.sale-img-bg');

const userToken = localStorage.getItem("Token");
// const accountname = localStorage.getItem("useraccount");
// console.log(accountname)
// console.log(userToken)
// console.log(useraccount)
// let imgName;
// saleImg.addEventListener('change',(event) => {
//   imgName = (event.target.files[0].name);
//   console.log(imgName)
// })
// saveBtn.addEventListener('click',(event) => {
//   imgName = (event.target.files[0].name);
// })

//입력하면 버튼 활성화
const saleName = document.querySelector('#product').value;
const salePrice = document.querySelector('#price').value;
const saleLink = document.querySelector('#sale-link').value;

// InputEvent.addEventListener("change", stateHandle);
function stateHandle(){
  if(saleName && salePrice && saleLink){
    saveBtn.disabled = false;
  }else{
    saveBtn.disabled = true;
  }
}

//이미지 등록하면 이미지 url을 보내줌. url을 이미지 
//이미지 업로드 ㅇㅋ
async function getSaleImgName(files) {
  const formData = new FormData();
  formData.append("image", files[0]); 
  const res = await fetch(`http://146.56.183.55:5050/image/uploadfile`, {
      method: "POST",
      body : formData
  })
  const data = await res.json()
  const productImgName = data["filename"];
  return productImgName;
}

// 미리보기 구현
async function profileImage(e) {
  const files = e.target.files
  const result = await getSaleImgName(files)
  saleImg.src = "http://146.56.183.55:5050" + "/" + result
  saleImgUrl  = saleImg.src
  console.log(saleImg.src)
  document.querySelector('.sale-img-bg').style.backgroundImage = `url(${saleImgUrl})`;
}

saleImg.addEventListener("change", profileImage);

// 판매 게시글 업로드 saleImg.src
async function UploadSalePost(e){
  const files = e.target.files
  const saleName = document.querySelector('#product').value;
  const salePrice = document.querySelector('#price').value;
  const saleLink = document.querySelector('#sale-link').value;
  const urlresult = await getSaleImgName(files);
  const imgUrl = "http://146.56.183.55:5050" + "/" + urlresult;
  // const imgUrl = imgName.src
  console.log(imgUrl)
  try{
    const res = await fetch("http://146.56.183.55:5050/product", {
        method: "POST",
        headers: {
          "Authorization" : `Bearer ${userToken}`,
          "Content-Type": "application/json",
        },
        body : JSON.stringify({
          "product":{
            "itemName": saleName,
            "price": salePrice,
            "link": saleLink,
            "itemImage":imgUrl,
          }
        })
    })
    const saleData = await res.json()
    console.log(saleData);
    const message =  saleData.message    
    if(res.status==200){
      console.log('완료')
      // location.href = "./index.html"
      }
      else{
          // console.log(saleData)
      }

  }catch(err){
    alert('오류가 났습니다.')
  }

}
saveBtn.addEventListener("click", UploadSalePost);

// 판매 게시글 가져오기
// async function GetSaleInfo(accountname){
//   const token = localStorage.getItem("Token")
//   const saleimgdata = await fetch(`http://146.56.183.55:5050/product/${accountname}`, {
//     method: "GET",
//     headers:{
//       "Authorization" : `Bearer ${userToken}`,
//       "Content-type" : "application/json"
//     }
//   })
//   const salejson = await saleimgdata.json();
//   console.log(salejson);

// }


// 이미지 주소를 받아오면 이미지 url에 넣어주면 됨 
// saveBtn.addEventListener('click',getSaleImgName);
// body:JSON.stringify({
//   "product":{
//     "itemName": saleName.value,
//     "price": salePrice.value,
//     "link": saleLink.value,
//     "itemImage":`http://146.56.183.55:5050/${imgFileName}`,
//   }
// })
