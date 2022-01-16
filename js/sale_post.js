const saveBtn = document.querySelector('.profile-save');
let saleImg = document.querySelector('#product-img');
// const previewDiv = document.querySelector('.sale-img-bg');

const userToken = localStorage.getItem("Token");
// const accountname = localStorage.getItem("useraccount");


console.log(userToken)

// console.log(accountname)
// console.log(userToken)
// console.log(useraccount)
// let imgName;
// saleImg.addEventListener('change',(event) => {
//   imgName = (event.target.files[0].name);
//   console.log(imgName)
// })

//입력하면 버튼 활성화

let saleName;
let salePrice;
let saleLink;
// console.log(saleName && salePrice && saleLink);

// function listner(){
//   switch(!inputText.value){
//     case true: button.disabled = true; break;
//     case false: button.disabled = false; break;
//   }
// }
// input.addEventListener('keyup', checkInput);
//   function checkInput(){
//     saleName = document.querySelector('#product').value;
//     salePrice = document.querySelector('#price').value;
//     saleLink = document.querySelector('#sale-link').value;
//     if(saleName)
//   }
//이미지 등록하면 이미지 url을 보내줌. url을 이미지 

//이미지 업로드 
async function uploadSaleImgName(files){
  const dataform = new FormData();
  dataform.append('image',files[0]);
      const imgdata = await fetch(`http://146.56.183.55:5050/image/uploadfile`, {
        method: "POST", 
        body : dataform
    })
    const data = await imgdata.json();
    const saleImgFileName = data.filename;
    return saleImgFileName;
}


saleImg.addEventListener("change", getSaleImgName);


// 미리보기 구현
async function profileImage(e) {
  const files = e.target.files
  const result = await uploadSaleImgName(files);
  saleImg.src = "http://146.56.183.55:5050" + "/" + result;
  const saleImgUrl = saleImg.src;
  document.querySelector('.sale-img-bg').style.backgroundImage = `url(${saleImgUrl})`;
}

saleImg.addEventListener("change", profileImage);

// 판매 게시글 업로드 saleImg.src
async function UploadSalePost(e){
  // const saleName = document.querySelector('#product').value;
  // const salePrice = document.querySelector('#price').value;
  // const saleLink = document.querySelector('#sale-link').value;
  const files = e.target.files
  const urlresult = await uploadSaleImgName(files);
  const imgUrl = "http://146.56.183.55:5050" + "/" + urlresult;
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
            "itemImage":imgUrl

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
          console.log(saleData)
      }

  }catch(err){
    alert('오류가 났습니다.')
}}


// saveBtn.addEventListener('click',() => {
// const form_img = document.querySelector('.product-img-form');
const form_txt = document.querySelector('.product-sale-form');
saveBtn.addEventListener('click',() => {
  saleImg = document.querySelector('#product-img').files[0].name;
  saleName = document.querySelector('#product').value;
  salePrice = document.querySelector('#price').value;
  saleLink = document.querySelector('#sale-link').value;
  console.log(saleName, salePrice, saleLink, saleImg);
  if(saleName && salePrice && saleLink && saleImg){
    saveBtn.style.backgroundColor="orange";
    // upload;
    console.log(saleName && salePrice && saleLink && saleImg);
    console.log("clear");
  }else{
    alert("모두 입력해주세요!")
  }
})

// function upload(){
//   uploadSaleImgName;
//   UploadSalePost;
// }
// saveBtn.addEventListener("click", UploadSalePost);

// 판매 게시글 가져오기
async function GetSaleInfo(accountname){
  const token = localStorage.getItem("Token")
  const saleimgdata = await fetch(`http://146.56.183.55:5050/product/${accountname}`, {
    method: "GET",
    headers:{
      "Authorization" : `Bearer ${userToken}`,
      "Content-type" : "application/json"
    }
  })
  const salejson = await saleimgdata.json();
  console.log(salejson);

}


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

