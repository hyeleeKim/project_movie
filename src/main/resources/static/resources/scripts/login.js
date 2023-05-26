const loginForm = document.getElementById('loginForm');
const recoverForm = document.getElementById('recoverForm');


loginForm.show = () => {
    loginForm.classList.add('visible');
    loginForm['email'].value = '';
    loginForm['email'].focus();
    loginForm['password'].value = '';
};

recoverForm.show = () => {
    recoverForm.classList.add('visible');
}

const methods = {
    // hideLogin: (x, e) => {
    //     coverElement.hide();
    //     loginForm.hide();
    // },
    //
    // hideRegister: (x, e) => {
    //     coverElement.hide();
    //     registerForm.hide();
    // },

    showLogin: (x, e) => {
        loginForm.show();
    },
    showRegister: (x, e) => {
        loginForm.hide();
    },

    showRecover : (x, e) => {
        e.preventDefault();
        loginForm.hide();
        recoverForm.show();
    },

    // logout: (x, e) => {
    //     alert('로그아웃 해야함');
    // }

};

document.body.querySelectorAll('[data-method]').forEach(x => {
    if (typeof methods[x.dataset.method] === 'function') {
        x.addEventListener('click', e => {
            methods[x.dataset.method](x, e);
        });
    }
});


