const registerForm = document.getElementById('registerForm');


// 회원가입 보여주기
registerForm.show = () => {
    registerForm.classList.remove('step-1', 'step-2', 'step-3', 'step-4');
    registerForm.classList.add('step-1', 'visible');
}

// 경고 보이게 하기
function showWarning(element, text) {
    element.innerText = text;
    element.classList.add('visible');
}

function hideWarning(element) {
    element.classList.remove('visible');
}

// 1단계 경고 (연락처 인증)
registerForm.cNameWarning = document.querySelector('[rel="cNameWarning"]');
registerForm.cNameWarning.show = (text) => showWarning(registerForm.cNameWarning, text);
registerForm.cNameWarning.hide = () => hideWarning(registerForm.cNameWarning);

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
    if (registerForm['cContact'].value === '') {
        registerForm.contactWarning.show("전화번호를 입력해주세요.");
        return;
    }
    if(!RegExp(/^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/).test(registerForm['cContact'].value)){
        registerForm.contactWarning.show('올바른 전화번호를 입력해주세요.');
        return;
    }

    registerForm['cContact'].setAttribute('disabled','disabled');
    registerForm['cContactSend'].setAttribute('disabled','disabled');
    registerForm['cContactCode'].removeAttribute('disabled');
    registerForm['cContactVerify'].removeAttribute('disabled');
}



registerForm.onsubmit = e => {
    e.preventDefault();

    registerForm.cNameWarning.hide();
    registerForm.cContactWarning.hide();
    registerForm.cContactCodeWarning.hide();
    registerForm.nameWarning.hide();
    registerForm.emailWarning.hide();
    registerForm.passwordWarning.hide();
    registerForm.passwordCheckWarning.hide();
    registerForm.nicknameWarning.hide();

    if (registerForm.classList.contains('step-1')) {
        if (registerForm['cName'].value === '') {
            registerForm.cNameWarning.show("이름을 입력해 주세요.");
            registerForm['cName'].focus();
            return;
        }
        if (registerForm['cContact'].value === '') {
            registerForm.cContactWarning.show("연락처를 입력해 주세요.");
            registerForm['cContact'].focus();
            return;
        }
        if (registerForm['cContact'].value.length !== 11) {
            registerForm.cContactWarning.show("올바른 연락처를 입력해 주세요.");
            registerForm['cContact'].focus();
            return;
        }
        if (registerForm['cContactCode'].value === '') {
            registerForm.cContactCodeWarning.show("인증번호를 입력해 주세요.");
            registerForm['cContactCode'].focus();
            return;
        }

        registerForm.classList.remove('step-1');
        registerForm.classList.add('step-2');
    } else if (registerForm.classList.contains('step-2')) {
        registerForm.agreeWarning.hide();
        if (!registerForm['agreeService'].checked) {
            registerForm.agreeWarning.show("서비스 이용약관 동의해 주세요.");
            registerForm['agreeService'].select();
            return;
        }
        if (!registerForm['agreePrivacy'].checked) {
            registerForm.agreeWarning.show("개인정보 수집 및 이용 동의해 주세요.");
            return;
        }

        registerForm.classList.remove('step-2');
        registerForm.classList.add('step-3');
    } else if (registerForm.classList.contains('step-3')) {
        if (registerForm['name'].value === '') {
            registerForm.nameWarning.show("이름을 입력해 주세요.");
            registerForm['name'].focus();
            return;
        }
        if (registerForm['birth'].value === '') {
            registerForm.birthWarning.show('생일을 입력해 주세요.');
            registerForm['birth'].focus();
            return;
        }
        if (registerForm['email'].value === '') {
            registerForm.emailWarning.show("이메일을 입력해 주세요.")
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
            registerForm.nicknameWarning.show("닉네임을 입력해 주세요");
            registerForm['nickname'].focus();
            return;
        }

        registerForm.classList.remove('step-3');
        registerForm.classList.add('step-4');
    }
}