const english = document.querySelector('.english');
const spanish = document.querySelector('.spanish');




english.addEventListener('click', () => {

    console.log(window.localStorage.getItem('guia') == 1);
    if (window.localStorage.getItem('guia') == 1) {
        console.log('HOLA');
        window.open('https://firebasestorage.googleapis.com/v0/b/economia-circular-icesi.appspot.com/o/GuiaDeUsuario%20copia_compressed.pdf?alt=media&token=7ec26af0-7426-4928-be4f-d31ed5ae40f2', '_blank');
    }
    // 
    else {
        window.open('https://firebasestorage.googleapis.com/v0/b/economia-circular-icesi.appspot.com/o/HojaDeRuta.pdf?alt=media&token=b0c8d18e-70ce-48e0-a8f6-2e0d01c79414', '_blank');

        console.log('HOLA1');
    }

});