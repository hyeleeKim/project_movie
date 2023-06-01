const registerForm = document.getElementById('registerForm');



// 회원가입 보여주기
registerForm.show = () => {
    registerForm.classList.remove('step-1', 'step-2', 'step-3','step-4');
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

registerForm.eNameWarning = document.querySelector('[rel="eNameWarning"]');
registerForm.eNameWarning.show = (text) => showWarning(registerForm.eNameWarning, text);
registerForm.eNameWarning.hide = () => hideWarning(registerForm.eNameWarning);

registerForm.contactWarning = document.querySelector('[rel ="eContactWarning"]');
registerForm.contactWarning.show = (text) => showWarning(registerForm.contactWarning, text);
registerForm.contactWarning.hide = () => hideWarning(registerForm.contactWarning);

registerForm.contactCodeWarning = document.querySelector('[rel="eContactCodeWarning"]');
registerForm.contactCodeWarning.show = (text) => showWarning(registerForm.contactCodeWarning,text);
registerForm.contactCodeWarning.hide = () => hideWarning(registerForm.contactCodeWarning);

registerForm.agreeWarning = document.querySelector('[rel="agreeWarning"]');
registerForm.agreeWarning.show = (text) => showWarning(registerForm.agreeWarning, text);
registerForm.agreeWarning.hide = () => hideWarning(registerForm.agreeWarning);

registerForm.nameWarning = document.querySelector('[rel="nameWarning"]');
registerForm.nameWarning.show = (text) => showWarning(registerForm.nameWarning, text);
registerForm.nameWarning.hide = () => hideWarning(registerForm.nameWarning);



registerForm.onsubmit = e =>{
    e.preventDefault();
    registerForm.eNameWarning.hide();
    registerForm.contactWarning.hide();
    if(registerForm.classList.contains('step-1')){
        if(registerForm['eName'].value === ''){
            registerForm.eNameWarning.show("이름을 입력해 주세요.");
            registerForm['eName'].focus();
            return;
        }
        if(registerForm['eContact'].value === ''){
            registerForm.contactWarning.show("연락처를 입력해 주세요.");
            registerForm['eContact'].focus();
            return;
        }
        if(registerForm['eContact'].value.length !== 11 ){
            registerForm.contactWarning.show("올바른 연락처를 입력해 주세요.");
            registerForm['eContact'].focus();
            return;
        }
        if(registerForm['eContactCode'].value === ''){
            registerForm.contactCodeWarning.show("인증번호를 입력해 주세요.");
            registerForm['eContactCode'].focus();
            return;
        }

       registerForm.classList.remove('step-1');
       registerForm.classList.add('step-2');
    } else if(registerForm.classList.contains('step-2')){
        if(!registerForm['agreeService'].checked){
            registerForm.agreeWarning.show("서비스 이용약관 동의해 주세요.");
            registerForm['agreeService'].select();
            return;
        }
        if(!registerForm['agreePrivacy'].checked){
            registerForm.agreeWarning.show("개인정보 수집 및 이용 동의해 주세요.");
            return;
        }

        registerForm.classList.remove('step-2');
        registerForm.classList.add('step-3');
    } else if(registerForm.classList.contains('step-3')){
        if(registerForm['name'].value ===''){
            registerForm.nameWarning.show("이름을 입력해 주세요.");
            return;
        }
        if(registerForm['birth'].value ===''){

            return;
        }
        if(registerForm['mail'].value ===''){
            return;
        }
        if(registerForm['password'].value ===''){
            return;
        }
        if(registerForm['passwordCheck'].value ===''){
            return;
        }
        if(registerForm['nickname'].value ===''){
            return;
        }

        registerForm.classList.remove('step-3');
        registerForm.classList.add('step-4');
    }
}