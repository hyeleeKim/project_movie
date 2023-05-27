const loginForm = document.getElementById('loginForm');
const recoverForm = document.getElementById('recoverForm');
const registerForm = document.getElementById('registerForm');

// 로그인 보여주기
loginForm.show = () => {
    loginForm.classList.add('visible');
    loginForm['email'].value = '';
    loginForm['email'].focus();
    loginForm['password'].value = '';
};

// 아이디 비밀번호 찾기 보여주기
recoverForm.show = () => {
    recoverForm.classList.add('visible');
}

// 로그인 경고창 show,hide 정의 (이메일, 비밀번호 미작성, 불일치)
loginForm.emailWarning = loginForm.querySelector('[rel="emailWarning"]');
loginForm.emailWarning.show = (text) => {
    loginForm.emailWarning.innerText = text;
    loginForm.emailWarning.classList.add('visible');
}
loginForm.emailWarning.hide = () => loginForm.emailWarning.classList.remove('visible');

loginForm.passwordWarning = loginForm.querySelector('[rel="passwordWarning"]');
loginForm.passwordWarning.show = (text) => {
    loginForm.passwordWarning.innerText = text;
    loginForm.passwordWarning.classList.add('visible');
}
loginForm.passwordWarning.hide = () => loginForm.passwordWarning.classList.remove('visible');

loginForm.loginWarning = loginForm.querySelector('[rel="loginWarning"]');
loginForm.loginWarning.show = (text) => {
    loginForm.loginWarning.innerText = text;
    loginForm.loginWarning.classList.add('visible');
}


//data-method form show,hide 정의
const methods = {
    hideLogin: (x, e) => {
        e.preventDefault();

        loginForm.hide();
    },

    hideRegister: (x, e) => {
        e.preventDefault();
        registerForm.hide();
    },

    showLogin: (x, e) => {
        e.preventDefault();
        loginForm.show();
    },
    showRegister: (x, e) => {
        e.preventDefault();
        loginForm.hide();
        registerForm.show();
    },

    showRecover: (x, e) => {
        e.preventDefault();
        loginForm.hide();
        recoverForm.show();
    },

    // logout: (x, e) => {
    //     alert('로그아웃 해야함');
    // }

};

//data-method collection (각 클릭하면)
document.body.querySelectorAll('[data-method]').forEach(x => {
    if (typeof methods[x.dataset.method] === 'function') {
        x.addEventListener('click', e => {
            methods[x.dataset.method](x, e);
        });
    }
});


//로그인 미작성 제출 경고
loginForm.onsubmit = e => {
    e.preventDefault();
    loginForm.emailWarning.hide();
    loginForm.passwordWarning.hide();
    if (loginForm['email'].value === '') {
        loginForm.emailWarning.show('아이디(이메일)를 입력해 주세요');
        return;
    }
    if (loginForm['password'].value === '') {
        loginForm.passwordWarning.show('비밀번호를 입력해 주세요');
        return;
    }

    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append("email",loginForm['email'].value);
    formData.append("password",loginForm['password'].value);
    xhr.open('POST','user/login');
    xhr.onreadystatechange = () =>{
        if(xhr.readyState === XMLHttpRequest.DONE){
            if(xhr.status >= 200 && xhr.status < 400){

            } else {

            }
        }
    };
    xhr.send(formData);
}

// 아이디,비밀번호 재설정 경고

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
            return;
        }

    }

}

