HTMLElement.prototype.show =function () {
    this.classList.add('visible');
};

HTMLElement.prototype.hide =function () {
    this.classList.remove('visible');
};




// 현재시간 구하기(yyyymmdd)
const today = new Date();
function formatDate() {
    const year = today.getFullYear();
    const month = ('0' + (today.getMonth() + 1)).slice(-2);
    const day = ('0' + today.getDate()).slice(-2);

    return  year + month  + day;
}

