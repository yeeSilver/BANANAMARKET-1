const saveBtn = document.querySelector('.profile-save');

const saleImgForm = document.querySelector('.product-img-form');
const saleForm = document.querySelector('.product-sale-form');

const saleName = document.querySelector('.product');
const salePrice = document.querySelector('.price');
const saleLink = document.querySelector('.sale-link');
const saleImg = document.querySelector('#product-img');
// const previewDiv = document.querySelector('.sale-img-bg');

const userToken = localStorage.getItem("Token");
const useraccount = localStorage.getItem("useraccount");

let imgName;

saleImg.addEventListener('change',(event) => {
  imgName = (event.target.files[0].name);
})

// 이미지 등록
// async function getSaleImgName(){
//   const dataform = new FormData();
//   dataform.append('image',`${imgName}`);
//   태그에 들어간 파일 네임을 이벤트 객체로 가져와야 함.
//   const imgdata = await fetch(`http://146.56.183.55:5050/image/uploadfile`, {
//       method: "POST", 
//       body : (
//         {
//           "image": `${imgName}`
//       }
//       )
//   })
//   const data = await imgdata.json();
//   console.log(data.filename);
//   const imgFileName = data.filename;
//   return uploadSaleImg(imgFileName);
// }
// console.log(getSaleImgName())

async function getSaleImgName(files){
  const dataform = new FormData();
  dataform.append('image',files[0]);
  // 태그에 들어간 파일 네임을 이벤트 객체로 가져와야 함.
  const imgdata = await fetch(`http://146.56.183.55:5050/image/uploadfile`, {
      method: "POST", 
      body : dataform
  })
  const data = await imgdata.json();
  const imgFileName = data.filename;
  return imgFileName;
}
// console.log(imgFileName)

async function profileImage(e) {
  const files = e.target.files
  const result = await getSaleImgName(files);
  saleImg.src = "http://146.56.183.55:5050" + "/" + result;
  console.log(saleImg.src)
  console.log(result)
  const saleImgUrl = saleImg.src;
  document.querySelector('.sale-img-bg').style.backgroundImage = `url(${saleImgUrl})`;
}
saleImg.addEventListener("change", profileImage);

// //판매 게시글 등록
// async function uploadSaleImg(imgFileName){
//   const saleimgdata = await fetch("http://146.56.183.55:5050/product/${useraccount}", {
//     method: "POST",
//     headers:{
//       "Authorization" : `Bearer ${userToken}`,
//       "Content-type" : application/json
//     },
//     body:JSON.stringify({
//       "product":{
// 				"itemName": saleName.value,
// 				"price": salePrice.value,
// 				"link": saleLink.value,
// 				"itemImage": `${imgFileName}`
//       }
//     })
//   })  
// }
// saveBtn.addEventListener('click',getSaleImgName);