const $search_btn = document.querySelector('.search-btn.first')
const search_btn = document.querySelector('.search-btn.second')

$search_btn.addEventListener('click', function () {
    location.href = "./search.html"
})

search_btn.addEventListener('click', function () {
    location.href = "./search.html"
})

const container = document.querySelector('.feed-main');
    console.log(localStorage.getItem("Token"))
    if(localStorage.getItem("Token")){
        getFeed()
    }
    else {
        location.href = './login.html'
    }

    async function getFeed() {
        const url = "http://146.56.183.55:5050"
        const token = localStorage.getItem("Token")
        const res = await fetch(url+"/post/feed",{
            method:"GET",
            headers:{
                "Authorization" : `Bearer ${token}`,
                "Content-type" : "application/json"
            }
        })
        const json = await res.json()
        const posts = json.posts
        console.log(posts)
        posts.forEach(post => {
            const authorImage = post.author.image
            const authorAccount = post.author.accountname
            const authorName = post.author.username
            const commentCount = post.commentCount
            const content = post.content
            const heartCount = post.heartCount
            const hearted = post.hearted
            const update = post.updatedAt.slice(0,10)
            console.log(update)
            document.querySelector(".post-con-info").innerHTML+=`
                <img class="img-mini-profile" src="${authorImage}"/>
                <div class="h">${authorAccount}</div>
                <div class="h">${authorName}</div>
                <div class="h">${content}</div>
                <div class="h">${commentCount}</div>
                <div class="h">${update}</div>
            `
        });
    }
    getFeed()
