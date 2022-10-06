const qtnDone = document.querySelector('.qtnDone');
qtnDone.addEventListener('click', () => {
    let link = "./report.html?id=" + loggedUser.id + "";

    window.location.href = link;


});


const userLoaded = () => {


    let container = document.querySelector('.loading__container');
    container.style.visibility = 'hidden';
    container.style.opacity = 0;

}