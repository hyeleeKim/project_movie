HTMLElement.prototype.show =function () {
    this.classList.add('visible');
};

HTMLElement.prototype.hide =function () {
    this.classList.remove('visible');
};


//data-method form show,hide 정의
const methods = {
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

