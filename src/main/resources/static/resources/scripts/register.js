const registerForm = document.getElementById('registerForm');


// 회원가입 보여주기
registerForm.show = () => {
    registerForm.classList.remove('step-1', 'step-2', 'step-3', 'step-4');
    registerForm.classList.add('step-1', 'visible');
}

// 경고 보이게 하기
function showWarning(element, text) {
    element.innerHTML = text;
    element.classList.add('visible');
}

function hideWarning(element) {
    element.classList.remove('visible');
}

// 1단계 경고 (연락처 인증)
registerForm.cContactWarning = document.querySelector('[rel ="cContactWarning"]');
registerForm.cContactWarning.show = (text) => showWarning(registerForm.cContactWarning, text);
registerForm.cContactWarning.hide = () => hideWarning(registerForm.cContactWarning);

registerForm.cContactCodeWarning = document.querySelector('[rel="cContactCodeWarning"]');
registerForm.cContactCodeWarning.show = (text) => showWarning(registerForm.cContactCodeWarning, text);
registerForm.cContactCodeWarning.hide = () => hideWarning(registerForm.cContactCodeWarning);

//2단계 경고 (이용약관 체크)
registerForm.agreeWarning = document.querySelector('[rel="agreeWarning"]');
registerForm.agreeWarning.show = (text) => showWarning(registerForm.agreeWarning, text);
registerForm.agreeWarning.hide = () => hideWarning(registerForm.agreeWarning);


//3단계 경고 (개인정보 입력)
registerForm.nameWarning = document.querySelector('[rel="nameWarning"]');
registerForm.nameWarning.show = (text) => showWarning(registerForm.nameWarning, text);
registerForm.nameWarning.hide = () => hideWarning(registerForm.nameWarning);


registerForm.birthWarning = document.querySelector('[rel="birthWarning"]');
registerForm.birthWarning.show = (text) => showWarning(registerForm.birthWarning, text);
registerForm.birthWarning.hide = () => hideWarning(registerForm.birthWarning);

registerForm.emailWarning = document.querySelector('[rel="emailWarning"]');
registerForm.emailWarning.show = (text) => showWarning(registerForm.emailWarning, text);
registerForm.emailWarning.hide = () => hideWarning(registerForm.emailWarning);


registerForm.passwordWarning = document.querySelector('[rel="passwordWarning"]');
registerForm.passwordWarning.show = (text) => showWarning(registerForm.passwordWarning, text);
registerForm.passwordWarning.hide = () => hideWarning(registerForm.passwordWarning);

registerForm.passwordCheckWarning = document.querySelector('[rel="passwordCheckWarning"]');
registerForm.passwordCheckWarning.show = (text) => showWarning(registerForm.passwordCheckWarning, text);
registerForm.passwordCheckWarning.hide = () => hideWarning(registerForm.passwordCheckWarning);


registerForm.nicknameWarning = document.querySelector('[rel="nicknameWarning"]');
registerForm.nicknameWarning.show = (text) => showWarning(registerForm.nicknameWarning, text);
registerForm.nicknameWarning.hide = () => hideWarning(registerForm.nicknameWarning);



// 회원가입 휴대폰 인증
registerForm['cContactSend'].onclick = () => {
    registerForm.cContactWarning.hide();


    if (registerForm['cContact'].value === '') {
        registerForm.cContactWarning.show('휴대전화 번호를 입력해주세요.');
        registerForm['cContact'].focus();
        return;
    }
    if(!RegExp(/^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/).test(registerForm['cContact'].value)) {
        registerForm.cContactWarning.show('올바른 전화번호를 입력해주세요.');
        registerForm['cContact'].focus();
        registerForm['cContact'].select();
        return;
    }

    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append("contact",registerForm['cContact'].value);
    xhr.open('POST','/sendContactCode');
    xhr.onreadystatechange = () =>{
        if(xhr.readyState === XMLHttpRequest.DONE){
            if(xhr.status >= 200 && xhr.status < 400){
                const responseObject = JSON.parse(xhr.responseText);
                switch(responseObject['result']){
                    case 'success' :
                        registerForm['cContact'].setAttribute('disabled','disabled');
                        registerForm['cContactSend'].setAttribute('disabled','disabled');
                        registerForm['cContactCode'].removeAttribute('disabled');
                        registerForm['cContactVerify'].removeAttribute('disabled');
                        registerForm['cContactCode'].focus();
                        registerForm.cContactWarning.show('입력하신 번호로 인증번호롤 전송했습니다. <br> 아래 확인란에 5분 이내로 입력해 주세요.');
                        break;
                    case 'failure_duplicate':
                        registerForm.cContactWarning.show('이미 회원가입된 번호입니다. 가입하신 아이디로 로그인해주세요.<br>기억이 나지 않으시면 아이디 찾기를 이용해 주세요.');
                        break;
                    default :
                        registerForm.cContactWarning.show('인증번호 전송에 실패했습니다. 잠시 후 다시 시도해 주세요.');
                }
            } else {
              registerForm.cContactWarning.show('서버와 통신하지 못했습니다. 잠시 후 다시 시도해 주세요.');
            }
        }
    };
    xhr.send(formData);
    




}



registerForm.onsubmit = e => {
    e.preventDefault();

    registerForm.cContactWarning.hide();
    registerForm.cContactCodeWarning.hide();
    registerForm.nameWarning.hide();
    registerForm.emailWarning.hide();
    registerForm.passwordWarning.hide();
    registerForm.passwordCheckWarning.hide();
    registerForm.nicknameWarning.hide();

    if (registerForm.classList.contains('step-1')) {

        if (registerForm['cContact'].value === '') {
            registerForm.cContactWarning.show('휴대전화 번호를 입력해 주세요.');
            registerForm['cContact'].focus();
            return;
        }
        if(!RegExp(/^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/).test(registerForm['cContact'].value)){
            registerForm.cContactWarning.show('올바른 전화번호를 입력해주세요.');
            return;
        }
        if (registerForm['cContactCode'].value === '') {
            registerForm.cContactCodeWarning.show('인증번호를 입력해 주세요.');
            registerForm['cContactCode'].focus();
            return;
        }

        registerForm.classList.remove('step-1');
        registerForm.classList.add('step-2');
    } else if (registerForm.classList.contains('step-2')) {
        registerForm.agreeWarning.hide();
        if (!registerForm['agreeService'].checked) {
            registerForm.agreeWarning.show('서비스 이용약관 동의해 주세요.');
            registerForm['agreeService'].select();
            return;
        }
        if (!registerForm['agreePrivacy'].checked) {
            registerForm.agreeWarning.show('개인정보 수집 및 이용 동의해 주세요.');
            return;
        }

        registerForm.classList.remove('step-2');
        registerForm.classList.add('step-3');
    } else if (registerForm.classList.contains('step-3')) {
        if (registerForm['name'].value === '') {
            registerForm.nameWarning.show('이름을 입력해 주세요.');
            registerForm['name'].focus();
            return;
        }
        if (registerForm['birth'].value === '') {
            registerForm.birthWarning.show('생일을 입력해 주세요.');
            registerForm['birth'].focus();
            return;
        }
        if (registerForm['email'].value === '') {
            registerForm.emailWarning.show('이메일을 입력해 주세요.')
            registerForm['email'].focus();
            return;
        }
        if (registerForm['password'].value === '') {
            registerForm.passwordWarning.show('비밀번호를 입력해 주세요.');
            registerForm['password'].focus();
            return;
        }
        if (registerForm['passwordCheck'].value === '') {
            registerForm.passwordCheckWarning.show('비밀번호를 다시 한번 입력해 주세요.');
            registerForm['passwordCheck'].focus();
            return;
        }
        if (registerForm['nickname'].value === '') {
            registerForm.nicknameWarning.show('닉네임을 입력해 주세요');
            registerForm['nickname'].focus();
            return;
        }

        registerForm.classList.remove('step-3');
        registerForm.classList.add('step-4');
    }
}