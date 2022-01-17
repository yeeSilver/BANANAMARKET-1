
const sellDiv = document.querySelector('.sell-items');

window.onload = function(){
  GetSaleInfo();
}
// 판매 게시글 가져오기
async function GetSaleInfo(){
  const token = localStorage.getItem("Token")
  const accountname = localStorage.getItem("accountname")
  const saleimgdata = await fetch(`http://146.56.183.55:5050/product/${accountname}`, {
    method: "GET",
    headers:{
      "Authorization" : `Bearer ${token}`,
      "Content-type" : "application/json"
    }
  })
  const salejson = await saleimgdata.json();
  const sale_pro = salejson.product;
  console.log(salejson);
  sale_pro.forEach((el)=>{
    const itemName = el.itemName;
    const itemImg = el.itemImage;
    const itemLink = el.link;
    const itemPrice = el.price;
    console.log(itemImg);
    let sellArt = document.createElement('article');
    sellArt.classList.add('display-sell');
    sellArt.innerHTML = 
    `
      <a href="${itemLink}">
        <img src="${itemImg}" alt="">
        <p>${itemName}</p>
        <small>${itemPrice}원</small>
      </a>
    `
    sellDiv.appendChild(sellArt);
  })
}
