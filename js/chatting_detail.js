// 상단바 뒤로가기
document.querySelector(".icon-left-arrow").addEventListener("click", () => {
    window.history.back();
});

// 버튼 활성화
let inputText = document.querySelector(".textinput_input_text")
let inputImg = document.querySelector(".textinput_input_file")
let button = document.querySelector(".textinput_button")

button.disabled = true;
inputText.addEventListener('keyup', listener );
// inputImg.addEventListener('click', listener );

function listener() {
    switch (!inputText.value){
        case true: button.disabled = true; break;
        case false: button.disabled = false; break;
    }
}

// 모달창
let dotBtn = document.querySelector(".icon-more")
let modalBg = document.querySelector(".modal_bg")
let modal = document.querySelector(".chatting_modal")

const open = () => {
    modalBg.classList.add("on")
    modal.classList.add("on")
}
const close = () => {
    modalBg.classList.remove("on")
    modal.classList.remove("on")
}

dotBtn.addEventListener("click", open);
modalBg.addEventListener("click", close);