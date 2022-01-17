{/* <article class="display-inline">
                <a href=""><img src="img/tangerine1.png" alt=""></a>
                <p>애월읍 노지 감귤</p>
                <small>35,000원</small>
            </article> */}
const sellDiv = document.querySelector('.sell-items');
// 판매 게시글 가져오기
// window.onload = function(){
//   GetSaleInfo(accountname);
// }

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
  // console.log(salejson);
  // console.log(salejson.product[1].itemImage);
  // const itemName = salejson.product[0].itemName;
  // const itemImg = salejson.product[0].itemImage;
  // const itemLlink = salejson.product[0].link;
  sale_pro.forEach((el)=>{
    const itemName = el.itemName;
    const itemImg = el.itemImage;
    const itemLink = el.link;
    const itemPrice = el.price;
    // console.log(itemImg);
    sellDiv.innerHTML = 
    `
    <article class="display-inline">
      <a href="${itemLink}"><img src="${itemImg}" alt=""></a>
      <p>${itemName}</p>
      <small>${itemPrice}</small>
    </article>
    `
  })
}
GetSaleInfo()
// const itemLink = salejson.product[0].link;
// const itemPrice = salejson.product[0].price;