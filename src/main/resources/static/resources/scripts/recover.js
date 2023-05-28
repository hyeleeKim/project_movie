const recoverForm = document.getElementById('recoverForm');

// 아이디 비밀번호 찾기 보여주기
recoverForm.show = () => {
    recoverForm.classList.add('visible');
}


recoverForm.nameWarning = recoverForm.querySelector('[rel="nameWarning"]');
recoverForm.nameWarning.show = (text) => {
    recoverForm.nameWarning.innerText = text;
    recoverForm.nameWarning.classList.add('visible');
}
recoverForm.nameWarning.hide = () =>
    recoverForm.nameWarning.classList.remove('visible');

recoverForm.birthWarning = recoverForm.querySelector('[rel="birthWarning"]');
recoverForm.birthWarning.show = (text) => {
    recoverForm.birthWarning.innerText = text;
    recoverForm.birthWarning.classList.add('visible');
}
recoverForm.birthWarning.hide = () => {
    recoverForm.birthWarning.classList.remove('visible')
}


recoverForm.contactWarning = recoverForm.querySelector('[rel="contactWarning"]');
recoverForm.contactWarning.show = (text) => {
    recoverForm.contactWarning.innerText = text;
    recoverForm.contactWarning.classList.add('visible');
}
recoverForm.contactWarning.hide = () => recoverForm.contactWarning.classList.remove('visible');

recoverForm.contactCodeWarning = recoverForm.querySelector('[rel="contactCodeWarning"]');
recoverForm.contactCodeWarning.show = (text) => {
    recoverForm.contactCodeWarning.innerText = text;
    recoverForm.contactCodeWarning.classList.add('visible');
}
recoverForm.contactCodeWarning.classList.remove('visible');

recoverForm.emailWarning = recoverForm.querySelector('[rel="emailWarning"]');
recoverForm.emailWarning.show = (text) => {
    recoverForm.emailWarning.innerText = text;
    recoverForm.emailWarning.classList.add('visible');
}
recoverForm.emailWarning.classList.remove('visible');

recoverForm.pNameWarning = recoverForm.querySelector('[rel="pNameWarning"]');
recoverForm.pNameWarning.show = (text) => {
    recoverForm.pNameWarning.innerText = text;
    recoverForm.pNameWarning.classList.add('visible');
}
recoverForm.pNameWarning.classList.remove('visible');

recoverForm.pBirthWarning = recoverForm.querySelector('[rel="pBirthWarning"]');
recoverForm.pBirthWarning.show = (text) => {
    recoverForm.pBirthWarning.innerText = text;
    recoverForm.pBirthWarning.classList.add('visible');
}
recoverForm.pBirthWarning.classList.remove('visible');



// 아이디 찾기 미작성 제출 경고
recoverForm.onsubmit = e => {
    e.preventDefault();
    recoverForm.emailWarning.hide();
    recoverForm.nameWarning.hide();
    recoverForm.birthWarning.hide();
    recoverForm.contactWarning.hide();
    recoverForm.contactCodeWarning.hide();
    recoverForm.pNameWarning.hide();
    recoverForm.pBirthWarning.hide();
    if (recoverForm['option'].value === 'email') {
        if (recoverForm['eName'].value === '') {
            recoverForm.nameWarning.show('이름을 입력해 주세요');
            return;
        }
        if (recoverForm['eBirth'].value === '') {
            recoverForm.birthWarning.show('생년월일을 입력해 주세요');
            return;
        }

        if (recoverForm['eContact'].value === '') {
            recoverForm.contactWarning.show('연락처를 입력해 주세요');
            return;
        }
        if (recoverForm['eContactCode'].value === '') {
            recoverForm.contactCodeWarning.show('인증번호를 입력해 주세요');
            return;
        }

    }
    if (recoverForm['option'].value === 'password') {
        if (recoverForm['pMail'].value === '') {
            recoverForm.emailWarning.show('이메일을 입력해 주세요');
            return;
        }
        if(recoverForm['pName'].value === ''){
            recoverForm.pNameWarning.show('이름을 입력해 주세요');
            return;
        }
        if(recoverForm['pBirth'].value === ''){
            recoverForm.pBirthWarning.show('생년월일을 입력해 주세요');
        }

    }

}

