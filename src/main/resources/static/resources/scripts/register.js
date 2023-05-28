const registerForm = document.getElementById('registerForm');

// 회원가입 보여주기
registerForm.show = () => {
    registerForm.classList.remove('step-1', 'step-2', 'step-3','step-4');
    registerForm.classList.add('step-1', 'visible');
}

registerForm.onsubmit = e =>{
    e.preventDefault();
    if(registerForm.classList.contains('step-1')){

       registerForm.classList.remove('step-1');
       registerForm.classList.add('step-2');
    } else if(registerForm.classList.contains('step-2')){

        registerForm.classList.remove('step-2');
        registerForm.classList.add('step-3');
    } else if(registerForm.classList.contains('step-3')){

        registerForm.classList.remove('step-3');
        registerForm.classList.add('step-4');
    } 
}