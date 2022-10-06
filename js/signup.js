// -------------------------------------
// FIREBASE CONSTANTS
// -------------------------------------
const database = firebase.database();
const auth = firebase.auth();

// -------------------------------------
// DECLARATIONS
// -------------------------------------
const nameInput = document.getElementById('name');
const lastNameInput = document.getElementById('lastName');
const emailInput = document.getElementById('email');
const positionInput = document.getElementById('position');
const companyInput = document.getElementById('company');
const passwordInput = document.getElementById('password');
const rePasswordInput = document.getElementById('repassword');
const yesCheckBox = document.getElementById('yes');
const noCheckBox = document.getElementById('no');
const signupButton = document.getElementById('signup');
const macroSelect = document.querySelector('.macrosector');
const incomingsSelect = document.querySelector('.incomings');
const sectorSelect = document.querySelector('.sector');



// -------------------------------------
// USER AUTHENTICATION
// -------------------------------------
var isSigningUp = false;

sectorSelect.addEventListener('change', (event) => {

    if (sectorSelect.value == 'no_type') {
        sectorSelect.classList.remove('inputSU__done');
    } else {
        sectorSelect.classList.add('inputSU__done');
    }

});

incomingsSelect.addEventListener('change', (event) => {

    if (incomingsSelect.value == 'no_type') {
        incomingsSelect.classList.remove('inputSU__done');
    } else {
        incomingsSelect.classList.add('inputSU__done');
    }

});


macroSelect.addEventListener('change', (event) => {

    console.log(macroSelect.value);
    if (macroSelect.value == 'no_type') {

        incomingsSelect.classList.add('hidden');
        macroSelect.classList.remove('inputSU__done');


    } else {

        macroSelect.classList.add('inputSU__done');
        incomingsSelect.classList.remove('hidden');

        if (incomingsSelect.options.length > 1) {
            let lenght = incomingsSelect.options.length;
            for (let i = 1; i < lenght; i++) {
                incomingsSelect.options[1] = null;
            }
        }



        switch (macroSelect.value) {

            case 'Manufactura':

                let newOption = new Option('Hasta $855.525.404', 'm_micro');
                let newOption1 = new Option('Desde $855.525.404 hasta $7.442.958.460', 'm_peque');
                let newOption2 = new Option('Desde $7.442.958.460 hasta $63.051.202.020', 'm_med');
                let newOption3 = new Option('Mas de $63.051.202.020', 'm_gra');

                incomingsSelect.options[1] = newOption;
                incomingsSelect.options[2] = newOption1;
                incomingsSelect.options[3] = newOption2;
                incomingsSelect.options[4] = newOption3;

                break;

            case 'Servicios':



                let newOption4 = new Option('Hasta $1 .197 .728 .304', 's_micro');
                let newOption5 = new Option('Desde $1 .197 .728 .304 hasta $4 .790 .876 .908', 's_peque');
                let newOption6 = new Option('Desde $4 .790 .876 .908 hasta $17 .537 .998 .472', 's_med');
                let newOption7 = new Option('Mas de $17 .537 .998 .472', 's_gra');

                incomingsSelect.options[1] = newOption4;
                incomingsSelect.options[2] = newOption5;
                incomingsSelect.options[3] = newOption6;
                incomingsSelect.options[4] = newOption7;

                break;

            case 'Comercios':


                let newOption8 = new Option('Hasta $1 .625 .472 .852', 'c_micro');
                let newOption9 = new Option('Desde $1 .625 .472 .852 hasta $15 .655 .864 .368', 'c_peque');
                let newOption10 = new Option('Desde $15 .655 .864 .368 hasta $78 .450 .405 .136', 'c_med');
                let newOption11 = new Option('Mas de $78 .450 .405 .136', 'c_gra');

                incomingsSelect.options[1] = newOption8;
                incomingsSelect.options[2] = newOption9;
                incomingsSelect.options[3] = newOption10;
                incomingsSelect.options[4] = newOption11;
                break;

        }

        console.log(incomingsSelect.options);
    }

});

auth.onAuthStateChanged(

    (user) => {

        if (user != null) {
            if (isSigningUp) {

                let nameValue = nameInput.value;
                let lastNameValue = lastNameInput.value;
                let emailValue = emailInput.value;
                let companyValue = companyInput.value;
                let positionValue = positionInput.value;
                let f = new Date();
                let macrosector = macroSelect.value;
                let incomings = incomingsSelect.value;
                let sector = sectorSelect.value;

                let userDatabase = {
                    admin: false,
                    accepted: false,
                    id: user.uid,
                    name: nameValue,
                    lastName: lastNameValue,
                    email: emailValue,
                    company: companyValue,
                    position: positionValue,
                    macrosector,
                    incomings,
                    sector,
                    requestDate: f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear()
                }

                nameInput.value = '';
                lastNameInput.value = '';
                emailInput.value = '';
                companyInput.value = '';
                positionInput.value = '';
                passwordInput.value = '';
                rePasswordInput.value = '';

                database.ref('pending/' + userDatabase.id).set(userDatabase);
                database.ref('users/' + userDatabase.id).set(userDatabase).then(
                    () => {
                        window.location.href = './denied.html';
                    }
                );

            } else {

            }
        }
    }

);

// -------------------------------------
// EVENTS
// -------------------------------------
signupButton.addEventListener('click', () => {

    let name = nameInput.value;
    let lastName = lastNameInput.value;
    let email = emailInput.value;
    let company = companyInput.value;
    let position = positionInput.value;
    let password = passwordInput.value;
    let repassword = rePasswordInput.value;
    let checked = yesCheckBox.checked;
    let sector = macroSelect.value;
    let incomings = incomingsSelect.value;
    let msector = sectorSelect.value;


    if (msector != 'no_type' && incomings != 'no_type' && sector != 'no_type' && name != '' && lastName != '' && email != '' && company != '' && position != '' && password != null && repassword != '') {

        if (password != repassword) {
            alert("Las contraseñas no son iguales");
        } else {

            if (checked) {

                isSigningUp = true;
                auth.createUserWithEmailAndPassword(email, password);

            } else {
                alert("Debes aceptar los terminos y condiciones y politicas de privacidad");
            }

        }

    } else {
        alert("Por favor digite todos los campos para completar el registro");
    }

});

yesCheckBox.addEventListener('click', () => {

    if (noCheckBox.checked) {
        noCheckBox.checked = false;
    }

});

noCheckBox.addEventListener('click', () => {

    if (yesCheckBox.checked) {
        yesCheckBox.checked = false;
    }

});