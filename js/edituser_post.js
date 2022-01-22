const postId = localStorage.getItem("postId");
const profile = document.querySelector(".img-profile");
const $image = document.querySelector(".textinput_input_file");
const $content = document.querySelector(".user_post-inp");
const $uploadBtn = document.querySelector(".upload-btn");
document.querySelector(".icon-left-arrow").addEventListener("click", () => {
    location.href = "./feed.html"
});

const form_txt = document.querySelector('.user_post-article-cont');
$uploadBtn.disabled = true;
$content.addEventListener('keyup', listener );

function listener() {
    switch (!$content.value){
        case true: $uploadBtn.disabled = true; break;
        case false: $uploadBtn.disabled = false; break;
    }
}

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
    const 이미지 = json.profile.image;
    const 계정 = json.profile.accountname;
    document.querySelector(".main-img").innerHTML=`
    <img class="profile-img-small" src="${이미지}" alt="${계정}의 프로필 사진">
    `;
}
getProfile();
async function imageDisplay() {}
async function imageUpload(files, index) {
    const formData = new FormData();
    formData.append("image", files[index]);
    const res = await fetch(`http://146.56.183.55:5050/image/uploadfile`, {
        method: "POST",
        body: formData,
    });
    const data = await res.json();
    const productImgName = data["filename"];
    return productImgName;
}
async function createPost() {
    const url = "http://146.56.183.55:5050";
    const token = localStorage.getItem("Token");
    const contentText = $content.value;
    const imageUrls = [];
    const files = $image.files;
    if (files.length <= 3) {
        for (let index = 0; index < files.length; index++) {
            const imgurl = await imageUpload(files, index);
            imageUrls.push(url + "/" + imgurl);
        }
        const res = await fetch(url + `/post/${postId}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`, 
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                post: {
                    content: contentText,
                    image: imageUrls + "",
                },
            }),
        });
        const json = await res.json();
        location.href = "./userpage.html"
    } else {
        alert("아 이미지 갯수가 너무 많소");
    }
}

$uploadBtn.addEventListener("click", function() {
    createPost();
});