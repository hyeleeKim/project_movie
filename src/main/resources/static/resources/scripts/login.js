const loginForm = document.getElementById('loginForm');

// 로그인 보여주기
loginForm.show = () => {
    loginForm.classList.add('visible');
    loginForm['email'].value = '';
    loginForm['email'].focus();
    loginForm['password'].value = '';
};


// 로그인 경고창 show,hide 정의 (이메일, 비밀번호 미작성, 불일치)
loginForm.emailWarning = loginForm.querySelector('[rel="emailWarning"]');
loginForm.emailWarning.show = (text) => {
    loginForm.emailWarning.innerHTML = text;
    loginForm.emailWarning.classList.add('visible');
}
loginForm.emailWarning.hide = () => loginForm.emailWarning.classList.remove('visible');

loginForm.passwordWarning = loginForm.querySelector('[rel="passwordWarning"]');
loginForm.passwordWarning.show = (text) => {
    loginForm.passwordWarning.innerHTML = text;
    loginForm.passwordWarning.classList.add('visible');
}
loginForm.passwordWarning.hide = () => loginForm.passwordWarning.classList.remove('visible');

loginForm.loginWarning = loginForm.querySelector('[rel="loginWarning"]');
loginForm.loginWarning.show = (text) => {
    loginForm.loginWarning.innerHTML = text;
    loginForm.loginWarning.classList.add('visible');
}





//로그인 미작성 제출 경고
loginForm.onsubmit = e => {
    e.preventDefault();
    loginForm.emailWarning.hide();
    loginForm.passwordWarning.hide();
    loginForm.loginWarning.hide();

    if (loginForm['email'].value === '') {
        loginForm.emailWarning.show('아이디(이메일)를 입력해 주세요');
        return;
    }

    if (!new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(loginForm['email'].value)) {
        loginForm.emailWarning.show('잘못된 이메일 형식입니다. 다시 한번 확인해 주세요.');
        loginForm['email'].focus();
        loginForm['email'].select();
        return;
    }

    if (loginForm['password'].value === '') {
        loginForm.passwordWarning.show('비밀번호를 입력해 주세요');
        return;
    }

    if (!new RegExp(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/).test(loginForm['password'].value)) {

        loginForm.passwordWarning.show('형식에 맞게 비밀번호를 적어주세요. <br> 대문자+소문자+숫자+특수문자 1개이상포함 8~20자리');
        loginForm['password'].focus();
        loginForm['password'].select();
        return;
    }

    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append("email",loginForm['email'].value);
    formData.append("password",loginForm['password'].value);
    xhr.open('POST','./login');
    xhr.onreadystatechange = () =>{
        if(xhr.readyState === XMLHttpRequest.DONE){
            if(xhr.status >= 200 && xhr.status < 400){
                const responseObject = JSON.parse(xhr.responseText);
                switch(responseObject.result){
                    case 'success':
                        location.href = '/';
                        break;
                    case 'failure':
                        loginForm.loginWarning.show('로그인에 실패했습니다. <br>잠시 후 다시 시도해 주세요.');
                        break;
                    case 'failure_wrong_id':
                        loginForm.loginWarning.show('아이디 혹은 비밀번호를 잘못 입력하셨습니다. <br> 다시 한번 확인해 주세요.');
                        break;
                    case 'failure_wrong_pwd':
                        loginForm.loginWarning.show('아이디 혹은 비밀번호를 잘못 입력하셨습니다. <br> 다시 한번 확인해 주세요.');
                        break;
                    case 'failure_deleted':
                        loginForm.loginWarning.show('해당 계정은 삭제된 계정입니다.');
                        break;
                    case 'failure_suspended':
                        loginForm.loginWarning.show('해당 계정은 이용이 정지된 계정입니다. <br>관리자에게 문의해 주세요.')
                        break;
                    default :
                        loginForm.loginWarning.show('알 수 없는 이유로 로그인에 실패했습니다.<br> 잠시 후 다시 시도해 주세요.');
                }
            } else {
                loginForm.loginWarning.show('서버 통신에 실패했습니다. <br> 잠시 후 다시 시도해 주세요.');
            }
        }
    };
    xhr.send(formData);
}

