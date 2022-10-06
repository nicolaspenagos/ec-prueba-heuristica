const english = document.querySelector('.english');
const spanish = document.querySelector('.spanish');
const image = document.querySelector('.downloadHojaDeRuta__imagen');
let estado = 'es';





english.addEventListener('click', () => {
    image.src = 'images/hoja-de-ruta-en.png';
    estado = 'en';
    console.log(image);
    english.classList.add('menuCard__pdfButtons--lang--hr--pressed');
    spanish.classList.remove('menuCard__pdfButtons--lang--hr--pressed');
});

spanish.addEventListener('click', () => {
    console.log('Hola1');
    estado = 'es';
    image.src = 'images/hoja-de-ruta.png';
    english.classList.remove('menuCard__pdfButtons--lang--hr--pressed');
    spanish.classList.add('menuCard__pdfButtons--lang--hr--pressed');
});


loadSuggestions = () => {
    database.ref('actsuggestions/' + loggedUser.id).once('value', function(data) {
        let act = data.val();

        act.forEach(e => {
            let temp = document.querySelectorAll('.' + e);

            if (temp) {
                temp.forEach((e) => {
                    e.classList.remove('hidden')
                })
            }
        });


    });
}

document.querySelector('.buttonD').addEventListener('click', () => {
    if (estado == 'es') {
        window.open('https://firebasestorage.googleapis.com/v0/b/economia-circular-icesi.appspot.com/o/HojaDeRuta.pdf?alt=media&token=b0c8d18e-70ce-48e0-a8f6-2e0d01c79414', '_blank');
    } else {
        window.open('https://firebasestorage.googleapis.com/v0/b/economia-circular-icesi.appspot.com/o/RoadMap.pdf?alt=media&token=c8ed40f5-576c-441b-b96e-92bfd5d2724d', '_blank ');

    }
    //window.localStorage.setItem('guia', 0);
    // window.location.href = ('./downloadHojaDeRuta.html');
});