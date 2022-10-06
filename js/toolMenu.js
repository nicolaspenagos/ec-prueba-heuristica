const userName = document.querySelector('.userName');
const userEmail = document.querySelector('.userEmail');
const userCompany = document.querySelector('.userCompany');
const pdfButton = document.querySelector('.pdfButton');
const questionaryButton = document.querySelector('.questionaryButton');
const columnLeft = document.querySelector('.column__left');
const reportBtn = document.querySelector('.reportBtn');
const benchmarkingBtm = document.querySelector('.benchmarkingBtn');
const modal = document.querySelector('.modal');
const modalContent = document.querySelector('.modal__content');
const benchmarkingNo = document.querySelector('.benchmarkingNo');
const benchmarkingSi = document.querySelector('.benchmarkingSi');
const engButton = document.querySelector('.engButton');
const espButton = document.querySelector('.espButton');
let savedResults = false;

let ableQuestionaryBtn = false;
let ableReport = false;

let ableBenchmarkingBtn = false;



reportBtn.addEventListener('click', () => {


    if (ableReport) {

        window.location.href = './company_report.html';
    }

});

espButton.addEventListener('click', () => {
    //window.localStorage.setItem('guia', 1);
    //indow.location.href = './downloadHojaDeRuta.html';
    window.open('https://firebasestorage.googleapis.com/v0/b/economia-circular-icesi.appspot.com/o/GuiaEC_Esp.pdf?alt=media&token=258fea5c-3639-45ca-8ca6-2129f65816af', '_blank');
});

engButton.addEventListener('click', () => {
    //window.localStorage.setItem('guia', 1);
    //indow.location.href = './downloadHojaDeRuta.html';
    window.open("https://firebasestorage.googleapis.com/v0/b/economia-circular-icesi.appspot.com/o/User's%20Guide.pdf?alt=media&token=e310c5ef-d094-44dc-8186-e893fcbaf444", '_blank');
});

questionaryButton.addEventListener('click', () => {

    if (ableQuestionaryBtn && !savedResults)
        window.location.href = './questionary.html';
    else if (savedResults) {
        window.location.href = './erase_data.html';
    }

});


const updateMenuUser = () => {

    console.log(reportBtn);
    ableQuestionaryBtn = true;

    if (loggedUser.results) {

        // ableQuestionaryBtn = false;
        ableReport = true;
        savedResults = true;
        // questionaryButton.classList.add('noHover');
        // questionaryButton.classList.add('pressed');
        reportBtn.classList.remove('pressed');
        reportBtn.classList.remove('noHover');

        benchmarkingBtm.classList.remove('pressed');
        benchmarkingBtm.classList.remove('noHover');
        ableBenchmarkingBtn = true;

    }



    userName.innerText = loggedUser.name + ' ' + loggedUser.lastName;
    userEmail.innerText = loggedUser.email;
    userCompany.innerText = loggedUser.company;


    if (loggedUser.admin) {
        let button = document.createElement('button');
        button.classList.add('button');
        button.classList.add('form__button');
        button.innerText = 'Volver a administrador';
        columnLeft.appendChild(button);

        button.addEventListener('click', () => {
            window.location.href = './admin.html';
        });

    }


}


function handleOpenModal() {

    document.body.style.overflow = 'hidden';
    modal.style.display = 'block';
    setTimeout(handleModalAppear, 15);


}

function handleCloseModal() {
    modal.style.opacity = 0;
    modalContent.style.transform = 'translate(0px, -500px)';
    document.body.style.overflow = 'hidden scroll';
    document.body.style.overflowX = 'hidden';
    setTimeout(function() {
        modal.style.display = 'none';
    }, 500);
}

function handleModalAppear() {
    modal.style.opacity = 1;
    modalContent.style.transform = 'translate(0px, 0px)';
}

benchmarkingBtm.addEventListener('click', () => {
    if (loggedUser.benchmarking) {

        window.location.href = './benchmarking.html';

    } else {
        handleOpenModal();
    }
});

benchmarkingNo.addEventListener('click', () => {
    loggedUser.benchmarking = 'no';
    let ref = database.ref('users/' + loggedUser.id).set(loggedUser).then(
        () => {


            handleCloseModal();
            window.location.href = './benchmarking.html';
        }
    );
});

benchmarkingSi.addEventListener('click', () => {

    loggedUser.benchmarking = 'yes';
    let ref = database.ref('users/' + loggedUser.id).set(loggedUser).then(
        () => {


            handleCloseModal();
            window.location.href = './benchmarking.html';
        }
    );


});