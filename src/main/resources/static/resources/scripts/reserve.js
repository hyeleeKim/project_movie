const numberEl = document.querySelectorAll('.number-input');
const number = document.querySelectorAll('.number');
const payForm = document.getElementById('payForm');
const container = document.getElementById('container');
const cardForm = document.getElementById('cardForm');

cardForm.onloadstart  = () => {
    numberEl[0].focus();
}



// 번호 입력 시 카드 번호 보이기
for (let i = 0; i < numberEl.length; i++) {
    numberEl[i].oninput = () =>{
        number[i].innerText = numberEl[i].value;

        if (numberEl[i].value.length === numberEl[i].maxLength) {
            if (i < numberEl.length - 1) {
                numberEl[i + 1].focus();
            }
        }
    }
}



const expireEl = document.querySelectorAll('.expire-input');
const month = document.querySelector('.month');
const year = document.querySelector('.year');

expireEl[0].oninput = () => {
    month.innerText = expireEl[0].value;
    if(expireEl[0].value.length >= expireEl[0].maxLength){
        expireEl[1].focus();
    }
}

expireEl[1].oninput = () => year.innerText = expireEl[1].value;

payForm.onsubmit = e => {
    e.preventDefault();
    container.classList.add('visible');
    payForm.classList.remove('visible');
}


container.show = () => {
    container.classList.add('visible');
}

container.hide = () => {
    container.classList.remove('visible');
}