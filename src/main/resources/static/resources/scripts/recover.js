const recoverForm = document.getElementById('recoverForm');

// 아이디 비밀번호 찾기 보여주기
recoverForm.show = () => {
    recoverForm.classList.add('visible');
}


// 아이디 찾기 경고
recoverForm.nameWarning = recoverForm.querySelector('[rel="eNameWarning"]');
recoverForm.nameWarning.show = (text) => {
    recoverForm.nameWarning.innerHTML = text;
    recoverForm.nameWarning.classList.add('visible');
}
recoverForm.nameWarning.hide = () =>
    recoverForm.nameWarning.classList.remove('visible');

recoverForm.birthWarning = recoverForm.querySelector('[rel="eBirthWarning"]');
recoverForm.birthWarning.show = (text) => {
    recoverForm.birthWarning.innerHTML = text;
    recoverForm.birthWarning.classList.add('visible');
}
recoverForm.birthWarning.hide = () => {
    recoverForm.birthWarning.classList.remove('visible')
}

recoverForm.contactWarning = recoverForm.querySelector('[rel="eContactWarning"]');
recoverForm.contactWarning.show = (text) => {
    recoverForm.contactWarning.innerHTML = text;
    recoverForm.contactWarning.classList.add('visible');
}
recoverForm.contactWarning.hide = () => recoverForm.contactWarning.classList.remove('visible');

recoverForm.contactCodeWarning = recoverForm.querySelector('[rel="eContactCodeWarning"]');
recoverForm.contactCodeWarning.show = (text) => {
    recoverForm.contactCodeWarning.innerHTML = text;
    recoverForm.contactCodeWarning.classList.add('visible');
}
recoverForm.contactCodeWarning.classList.remove('visible');


//비밀번호 재설정 경고
recoverForm.emailWarning = recoverForm.querySelector('[rel="pMailWarning"]');
recoverForm.emailWarning.show = (text) => {
    recoverForm.emailWarning.innerHTML = text;
    recoverForm.emailWarning.classList.add('visible');
}
recoverForm.emailWarning.classList.remove('visible');

recoverForm.pNameWarning = recoverForm.querySelector('[rel="pNameWarning"]');
recoverForm.pNameWarning.show = (text) => {
    recoverForm.pNameWarning.innerHTML = text;
    recoverForm.pNameWarning.classList.add('visible');
}
recoverForm.pNameWarning.classList.remove('visible');

recoverForm.pBirthWarning = recoverForm.querySelector('[rel="pBirthWarning"]');
recoverForm.pBirthWarning.show = (text) => {
    recoverForm.pBirthWarning.innerHTML = text;
    recoverForm.pBirthWarning.classList.add('visible');
}
recoverForm.pBirthWarning.classList.remove('visible');

// 이메일 확인 팜업 (비밀번호 재설정 이동)
const cover = document.getElementById('cover');
const popUp = document.getElementById('popUp');
const recoverPwd = document.querySelector('[data-method="recoverPassword"]');
const radios = recoverForm.elements.option;
const email = document.getElementsByClassName('.text.email');
const name = document.getElementsByClassName('.text.user');

// 이메일 확인 후 이동
recoverPwd.onclick = () => {
    cover.classList.remove('visible');
    popUp.classList.remove('visible');
    radios.value = 'password';
}


// 이메일 찾기 인증번호 전송
recoverForm['eContactSend'].onclick = () => {
    recoverForm.emailWarning.hide();
    recoverForm.birthWarning.hide();
    recoverForm.contactWarning.hide();
    recoverForm.contactCodeWarning.hide();

    if (recoverForm['eContact'].value === '') {
        recoverForm.contactWarning.show('연락처를 입력해주세요.');
        return;
    }

    if (!RegExp(/^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/).test(recoverForm['eContact'].value)) {
        recoverForm.contactWarning.show('정확한 휴대전화번호를 입력해 주세요.');
        return;
    }

    const xhr = new XMLHttpRequest();
    xhr.open('GET', `/contactCodeRec?contact=${recoverForm['eContact'].value}`);
    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status >= 200 && xhr.status < 300) {
                const responseObject = JSON.parse(xhr.responseText);
                switch (responseObject.result) {
                    case 'success':
                        recoverForm['eContact'].setAttribute('disabled', 'disabled');
                        recoverForm['eContactSend'].setAttribute('disabled', 'disabled');
                        recoverForm['eContactCode'].removeAttribute('disabled');
                        recoverForm['eContactVerify'].removeAttribute('disabled');
                        recoverForm['eContactSalt'].value = responseObject.salt;
                        recoverForm.contactWarning.show('입력하신 연락처로 인증번호를 전송했습니다.<br> 5분 이내로 입력해 주세요. ');
                        recoverForm['eContactCode'].focus();
                        break;
                    case 'failure':
                        recoverForm.contactWarning.show('인증번호 전송에 실패했습니다. 잠시 후 다시 시도해 주세요.');
                        break;
                    default:
                        recoverForm.contactWarning.show('알 수 없는 이유로 인증번호 전송에 실패했습니다. 잠시 후 다시 시도해 주세요.');
                }
            } else {
                recoverForm.contactWarning.show('서버와 통신하지 못했습니다. 잠시 후 다시 시도해 주세요.');
            }
        }
    };
    xhr.send();

}

recoverForm['eContactVerify'].onclick = () => {
    recoverForm.emailWarning.hide();
    recoverForm.nameWarning.hide();
    recoverForm.birthWarning.hide();
    recoverForm.contactWarning.hide();
    recoverForm.contactCodeWarning.hide();

    if (recoverForm['eContactCode'].value === '') {
        recoverForm.contactCodeWarning.show('인증번호를 입력해 주세요');
        recoverForm['eContactCode'].focus();
        return;
    }

    if (!new RegExp(/^[0-9]{6}$/).test(recoverForm['eContactCode'].value)) {
        recoverForm.contactCodeWarning.show('올바른 인증번호를 입력해 주세요.');
        recoverForm['eContactCode'].focus();
        recoverForm['eContactCode'].select();
        return;
    }

    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append("contact",recoverForm['eContact'].value);
    formData.append("code", recoverForm['eContactCode'].value);
    formData.append("salt", recoverForm['eContactSalt'].value);
    xhr.open('PATCH','contactCodeRec');
    xhr.onreadystatechange = () => {
        if(xhr.readyState === XMLHttpRequest.DONE){
            if(xhr.status >=200 && xhr.status <300){
                const responseText = JSON.parse(xhr.responseText);
                switch(responseText.result){
                    case 'failure':
                        recoverForm.contactCodeWarning.show('인증번호를 잘못 입력 하셨습니다. 다시 한번 확인해 주세요.');
                        break;
                    case'failure_expired':
                        recoverForm.contactCodeWarning.show('해당 번호는 유효기간이 만료되었습니다. 다시 처음부터 진행해 주세요.');
                        break;
                    case'success':
                        recoverForm.contactCodeWarning.show('인증번호 인증이 완료되었습니다. <br> 아이디 찾기 버튼을 눌러 주세요.');
                        recoverForm['eContactCode'].setAttribute('disabled','disabled');
                        recoverForm['eContactVerify'].setAttribute('disabled','disabled');
                        break;
                    default :
                        recoverForm.contactCodeWarning.show('인증번호 인증에 실패했습니다. 잠시 후 다시 시도해 주세요.');
                }
            }else{
                recoverForm.contactCodeWarning.show('서버와 통신하지 못했습니다. 잠시 후 다시 시도해 주세요.');

            }
        }
    };
    xhr.send(formData);
}



// 아이디 찾기 , 비밀번호 재설정 확인
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
            recoverForm['eName'].focus();
            return;
        }

        if (!new RegExp(/^[가-힣]{2,4}|[a-zA-Z]{2,10}\s[a-zA-Z]{2,10}$/).test(recoverForm['eName'].value)) {
            recoverForm.nameWarning.show('이름을 정확하게 입력해 주세요.');
            recoverForm['eName'].focus();
            recoverForm['eName'].select();
            return;
        }


        if (recoverForm['eBirth'].value === '') {
            recoverForm.birthWarning.show('생년월일을 입력해 주세요');
            recoverForm['eBirth'].focus();
            return;
        }

        if (recoverForm['eBirth'].value > formatDate(new Date())) {
            recoverForm.birthWarning.show('정확한 생년월일을 입력해주세요.');
            recoverForm['eBirth'].focus();
            recoverForm['eBirth'].select();
            return;
        }

        if (!new RegExp(/^(19[0-9][0-9]|20\d{2})-(0[0-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/).test(recoverForm['eBirth'].value)) {
            recoverForm.birthWarning.show('형식에 맞는 생년월일을 입력해 주세요.');
            recoverForm['eBirth'].focus();
            recoverForm['eBirth'].select();
            return;
        }

        if (recoverForm['eContact'].value === '') {
            recoverForm.contactWarning.show('연락처를 입력해 주세요');
            recoverForm['eContact'].focus();
            return;
        }

        if (!new RegExp(/^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/).test(recoverForm['eContact'].value)) {
            recoverForm.contactWarning.show('올바른 전화번호를 입력해주세요.');
            recoverForm['eContact'].focus();
            recoverForm['eContact'].select();
            return;
        }
        if (recoverForm['eContactCode'].value === '') {
            recoverForm.contactCodeWarning.show('인증번호를 입력해 주세요');
            recoverForm['eContactCode'].focus();
            return;
        }

        if (!new RegExp(/^[0-9]{6}$/).test(recoverForm['eContactCode'].value)) {
            recoverForm.contactCodeWarning.show('올바른 인증번호를 입력해 주세요.');
            recoverForm['eContactCode'].focus();
            recoverForm['eContactCode'].select();
            return;
        }

        if (recoverForm['eContactSalt'].value === '') {
            recoverForm.contactCodeWarning.show('인증번호 확인을 진행해 주세요.');
            recoverForm['eContactCode'].focus();
            return;
        }

        const xhr = new XMLHttpRequest();
        const formData = new FormData();
        formData.append('name',recoverForm['eName'].value);
        formData.append('birthStr',recoverForm['eBirth'].value);
        formData.append('contact',recoverForm['eContact'].value);
        xhr.open('POST', 'searchId');
        xhr.onreadystatechange = () => {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status >= 200 && xhr.status < 400) {
                 const responseText = JSON.parse(xhr.responseText);
                 switch (responseText.result){
                     case'failure':
                         recoverForm.contactCodeWarning.show('회원정보를 잘못 입력하셨거나 가입한 회원이 아닙니다.');
                         break;
                     case 'failure_not_verify':
                         recoverForm.contactCodeWarning.show('연락처 인증을 완료해 주세요.');
                         break;
                     case 'success':
                         cover.classList.add('visible');
                         popUp.classList.add('visible');
                         user.innerText = responseText.name;
                         email.innerText = responseText.email;
                         break;
                 }
                } else {
                    recoverForm.contactCodeWarning.show('서버와 통신하지 못했습니다. 잠시 후 다시 시도해 주세요.');
                }
            }
        };
        xhr.send();

    }
    // 비밀번호 재설정
    if (recoverForm['option'].value === 'password') {
        if (recoverForm['pMail'].value === '') {
            recoverForm.emailWarning.show('이메일을 입력해 주세요');
            return;
        }
        if (recoverForm['pName'].value === '') {
            recoverForm.pNameWarning.show('이름을 입력해 주세요');
            return;
        }
        if (recoverForm['pBirth'].value === '') {
            recoverForm.pBirthWarning.show('생년월일을 입력해 주세요');
        }

    }

}

