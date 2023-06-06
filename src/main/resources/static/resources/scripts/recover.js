const recoverForm = document.getElementById('recoverForm');

// 아이디 비밀번호 찾기 보여주기
recoverForm.show = () => {
    recoverForm.classList.add('visible');
}


// 아이디 찾기 경고
recoverForm.nameWarning = recoverForm.querySelector('[rel="eNameWarning"]');
recoverForm.nameWarning.show = (text) => {
    recoverForm.nameWarning.innerText = text;
    recoverForm.nameWarning.classList.add('visible');
}
recoverForm.nameWarning.hide = () =>
    recoverForm.nameWarning.classList.remove('visible');

recoverForm.birthWarning = recoverForm.querySelector('[rel="eBirthWarning"]');
recoverForm.birthWarning.show = (text) => {
    recoverForm.birthWarning.innerText = text;
    recoverForm.birthWarning.classList.add('visible');
}
recoverForm.birthWarning.hide = () => {
    recoverForm.birthWarning.classList.remove('visible')
}

recoverForm.contactWarning = recoverForm.querySelector('[rel="eContactWarning"]');
recoverForm.contactWarning.show = (text) => {
    recoverForm.contactWarning.innerText = text;
    recoverForm.contactWarning.classList.add('visible');
}
recoverForm.contactWarning.hide = () => recoverForm.contactWarning.classList.remove('visible');

recoverForm.contactCodeWarning = recoverForm.querySelector('[rel="eContactCodeWarning"]');
recoverForm.contactCodeWarning.show = (text) => {
    recoverForm.contactCodeWarning.innerText = text;
    recoverForm.contactCodeWarning.classList.add('visible');
}
recoverForm.contactCodeWarning.classList.remove('visible');


//비밀번호 재설정 경고
recoverForm.emailWarning = recoverForm.querySelector('[rel="pMailWarning"]');
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


// 이메일 찾기 인증번호 전송
recoverForm['eContactSend'].onclick = () => {
    if (recoverForm['eContact'].value === '') {
        recoverForm.contactWarning.show('연락처를 입력해주세요.');
        return;
    }

    if (!RegExp(/^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/).test(recoverForm['eContact'].value)) {
        recoverForm.contactWarning.show('정확한 휴대전화번호를 입력해주세요.');
        return;
    }

    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    xhr.open('POST','/registerSendCode');
    formData.append("name",recoverForm['eName'].value);
    formData.append("birth",recoverForm['eBirth'].value);
    formData.append("eContact",recoverForm['eContact'].value);
    xhr.onreadystatechange = () => {
        if(xhr.readyState === XMLHttpRequest.DONE){
            if(xhr.status >=200 && xhr.status <300){
                alert('성공');
            }else{

            }
        }
    };
    xhr.send(formData);


}



// 아이디 찾기 경고
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
    // 비밀번호 재설정
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

