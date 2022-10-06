const reportContainer = document.querySelector('.report_container');
const companyText = document.querySelector('.company');
const dateText = document.querySelector('.date');
const contactText = document.querySelector('.contact');
const table1 = document.querySelector('.table1');
const table2 = document.querySelector('.table2');
const generateQR = document.querySelector('.generateQR');

const english = document.querySelector('.english');
const spanish = document.querySelector('.spanish');
const image = document.querySelector('.downloadHojaDeRuta__imagen');

let table1Ready = false;
let table2Ready = false;

const printBtn = document.querySelector('.printBtn');
const copyBtn = document.querySelector('.copyLink');
if (copyBtn) {
    copyBtn.addEventListener('click', () => {
        copyToClipboard('https://economia-circular-icesi.web.app/report.html?id=' + id);
    });
}

function copyToClipboard(text) {
    const type = 'text/plain';
    const blob = new Blob([text], { type });
    let data = [new ClipboardItem({
        [type]: blob
    })];

    navigator.clipboard.write(data).then(function() {
        alert('El link se ha copiado en el portapeles');
    }, function() {

    });
}

if (printBtn) {
    printBtn.addEventListener('click', () => {
        window.print();
    });
}

let estado = 'es';

if (english) {
    english.addEventListener('click', () => {
        image.src = 'images/hoja-de-ruta-en.png';
        estado = 'en';

        english.classList.add('menuCard__pdfButtons--lang--hr--pressed');
        spanish.classList.remove('menuCard__pdfButtons--lang--hr--pressed');
    });
}

if (spanish) {
    spanish.addEventListener('click', () => {

        estado = 'es';
        image.src = 'images/hoja-de-ruta.png';
        english.classList.remove('menuCard__pdfButtons--lang--hr--pressed');
        spanish.classList.add('menuCard__pdfButtons--lang--hr--pressed');
    });
}





const reportGoBackBtn = document.querySelector('.reportGoBackBtn');
reportGoBackBtn.addEventListener('click', () => {
    if (loggedUser.admin) {
        window.location.href = './results.html';
    } else {
        window.location.href = './tool-menu.html';
    }
});
if (generateQR) {
    generateQR.addEventListener('click', () => {
        let img = document.querySelector(".qrcode");
        img.classList.remove('hidden');

        new QRious({
            element: document.querySelector("#codigo"),
            value: "https://economia-circular-icesi.web.app/login.html", // La URL o el texto
            size: 200,
            backgroundAlpha: 1, // 0 para fondo transparente
            foreground: "#000000", // Color del QR
            level: "H", // Puede ser L,M,Q y H (L es el de menor nivel, H el mayor)
        });
        const enlace = document.createElement("a");
        enlace.href = img.src;
        enlace.download = "EC_QR.png";
        enlace.click();
    });

}

let activitiesSuggestions = [];

let totalScoreByP = 0;
let dataPolar = [];

let userID = '';

let scoresByActivitiesResults;
let matrixActivitiesVsScore = [];
let actividadesId = ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9', 'A10', 'A11', 'A12'];
let actividades = ['Desarrollo o implementación de tecnologías que impulsan la EC.', 'Mantener el equilibrio ecosistémico en las zonas de operación de la organización.', 'Devolver los recursos biológicos recuperados a la biosfera.', 'Energías no convencionales', 'Alianzas para el desarrollo de la EC con organizaciones y grupos de interés.', 'Remanufacturar productos o componentes.', 'Gestionar(administrar, coordinar, organizar, evaluar) para la mitigación de impacto.', 'Educar a los actores de la cadena e interesados sobre la EC.', 'Diseño para la prolongación de la vida útil (Ecodiseño o DfE)', 'Economía Colaborativa (Productor - Productor, Consumidor - consumidor)', 'Producto como servicio (PSS)', 'Recuperación y re circulación de materiales. ( reciclaje de insumos, materias primas y residuos)'];

let principlesId = ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8', 'P9', 'P10', 'P11', 'P12'];
let principles = ['Capital natural', 'Tecnologías para la EC', 'Pensamiento sistémico', 'Pensamiento en cascada', 'Ecoeficiencia (Enfoque en el rendimiento)', 'Innovación', 'Gestión del impacto', 'Optimización de valor', 'Pensamiento local', 'Resiliencia para la diversidad', 'Circularidad y longevidad', 'Diseño para prevención de residuos'];

let principlesScoresPercetages;

/*
principlesScoresPercetages.set('P1', { vals: [{ name: 'A2', value: 0.5 }, { name: 'A3', value: 0.3448227 }] });
principlesScoresPercetages.set('P2', { vals: [{ name: 'A1', value: 0.435 }, { name: 'A4', value: 0.67 }] });
principlesScoresPercetages.set('P3', { vals: [{ name: 'A2', value: 0.25 }, { name: 'A4', value: 0.21 }, { name: 'A8', value: 0.50 }, { name: 'A10', value: 0.36 }] });
principlesScoresPercetages.set('P4', { vals: [{ name: 'A3', value: 0.17 }, { name: 'A5', value: 0.25 }, { name: 'A9', value: 0.14 }, { name: 'A12', value: 0.24 }] });
principlesScoresPercetages.set('P5', { vals: [{ name: 'A7', value: 0.30 }, { name: 'A10', value: 0.36 }, { name: 'A11', value: 0.36 }, { name: 'A12', value: 0.24 }] });
principlesScoresPercetages.set('P6', { vals: [{ name: 'A1', value: 0.217 }, { name: 'A4', value: 0.33 }, { name: 'A9', value: 0.14 }, { name: 'A11', value: 0.36 }] });
principlesScoresPercetages.set('P7', { vals: [{ name: 'A4', value: 0.29 }, { name: 'A7', value: 0.40 }, { name: 'A9', value: 0.19 }] });
principlesScoresPercetages.set('P8', { vals: [{ name: 'A4', value: 0.29 }, { name: 'A5', value: 0.34 }, { name: 'A12', value: 0.32 }] });
principlesScoresPercetages.set('P9', { vals: [{ name: 'A2', value: 0.25 }, { name: 'A4', value: 0.21 }, { name: 'A7', value: 0.30 }, { name: 'A8', value: 0.50 }] });
principlesScoresPercetages.set('P10', { vals: [{ name: 'A1', value: 0.174 }, { name: 'A5', value: 0.20 }, { name: 'A9', value: 0.12 }, { name: 'A10', value: 0.29 }, { name: 'A11', value: 0.29 }] });
principlesScoresPercetages.set('P11', { vals: [{ name: 'A1', value: 0.174 }, { name: 'A3', value: 0.14 }, { name: 'A5', value: 0.20 }, { name: 'A9', value: 0.12 }, { name: 'A12', value: 0.19 }] });
principlesScoresPercetages.set('P12', { vals: [{ name: 'A3', value: 0.34 }, { name: 'A9', value: 0.29 }] });
console.log(principlesScoresPercetages)*/


let dataToBarChar = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

];
let reservedWords = ['Ninguno', 'Ninguna', 'No sé', 'No realiza', 'No implementado'];


const params = new URLSearchParams(location.search);
const id = params.get('id');

const downloadUsers = () => {


    let ref = database.ref('users').once('value', function(data) {
        data.forEach(element => {

            let user = element.val();

            if (user.results) {
                users.set(user.id, user);
            }

        });

        let userToGetData = loggedUser;

        if (id) {
            userToGetData = users.get(id);
        }



        companyText.innerText = userToGetData.company;
        var date = new Date(parseFloat(userToGetData.resultsDate));
        var dd = String(date.getDate()).padStart(2, '0');
        var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = date.getFullYear();
        dateText.innerText = mm + '/' + dd + '/' + yyyy;
        contactText.innerText = userToGetData.name + ' ' + userToGetData.lastName;
        userID = userToGetData.id;



        getScoresByActivity(userToGetData.results);




    });


}

loadData = () => {


    downloadUsers();



}

let grandTotalScore = 0;

getScoresByActivity = (results) => {



    var ws_data = [
        ['ENUNCIADO', 'RESPUESTAS', 'JUSTIFICACIÓN', 'ACTIVIDAD', 'PUNTAJE']
    ];


    let scoresByActivities = scoresByQuestions(results);

    //console.log(scoresByActivities)

    scoresByActivitiesResults = new Map();


    let a9Counter = 0;


    results.forEach(e => {


        let currentQuestion = questions[searchQuestionsInArrayById2(e[0], questions)];
        if (currentQuestion.activities[0] == 'A9') {

            e[1].forEach(a => {
                if (a == '0') {
                    a9Counter++;
                }
            })
        }


    });

    // console.log(a9Counter)


    results.forEach(e => {



        let currentQuestion = questions[searchQuestionsInArrayById2(e[0], questions)];




        if (currentQuestion.activities[0] != 'A9') {





            let score = getScore(scoresByActivities, currentQuestion, e[1]);
            score = score.toFixed(2);

            if (scoresByActivitiesResults.get(currentQuestion.activities[0])) {
                let s = parseFloat(scoresByActivitiesResults.get(currentQuestion.activities[0]));
                s += parseFloat(score);
                scoresByActivitiesResults.set(currentQuestion.activities[0], s);
            } else {
                scoresByActivitiesResults.set(currentQuestion.activities[0], score);
            }



            grandTotalScore += parseFloat(score);



            let currentRow = [];
            currentRow.push(currentQuestion.statment);

            let answers = '';

            let answersArray = e[1];

            for (let i = 0; i < answersArray.length; i++) {
                if (i + 1 == answersArray.length) {
                    answers += (parseInt(answersArray[i]));
                } else {
                    answers += (parseInt(answersArray[i])) + ';';
                }
            }

            currentRow.push(answers);

            if (e[2]) {
                currentRow.push(e[2]);
            } else {
                currentRow.push(' ');
            }

            currentRow.push(currentQuestion.activities[0]);
            currentRow.push(' ' + score);

            ws_data.push(currentRow)

        } else {


            let scoreA9 = 1733.36 / (8 - a9Counter);
            //let totalScoreA9 = 0;
            //  console.log(e[1]);
            //  console.log(scoreA9);
            if (e[1] == '2') {
                scoreA9
                //console.log(scoreA9)
            } else {

                grandTotalScore += parseFloat(scoreA9);
                if (scoresByActivitiesResults.get(currentQuestion.activities[0])) {
                    let s = parseFloat(scoresByActivitiesResults.get(currentQuestion.activities[0]));
                    s += parseFloat(scoreA9);
                    scoresByActivitiesResults.set(currentQuestion.activities[0], s);
                } else {
                    scoresByActivitiesResults.set(currentQuestion.activities[0], scoreA9);
                }
            }

            ///////////

            /*
            scoreA9 = parseFloat(scoreA9.toFixed(2));
            let currentRow = [];

            currentRow.push(currentQuestion.statment);

            let answers = '';

            let answersArray = e[1];

            for (let i = 0; i < answersArray.length; i++) {
                if (i + 1 == answersArray.length) {
                    answers += (parseInt(answersArray[i]));
                } else {
                    answers += (parseInt(answersArray[i])) + ';';
                }
            }

            currentRow.push(answers);

            if (e[2]) {
                currentRow.push(e[2]);
            } else {
                currentRow.push(' ');
            }

            currentRow.push(currentQuestion.activities[0]);
            currentRow.push(' ' + scoreA9);
            console.log(currentRow);
            */
            // ws_data.push(currentRow)
        }


    });



    ws_data = [];


    for (var [key, value] of scoresByActivitiesResults) {
        ws_data.push([key, parseFloat(value)]);
    }

    // console.log(ws_data)
    //  ws_data.push(['TOTAL:', grandTotalScore]);

    createTable(ws_data);


}


const createTable = (data) => {




    let tableData = fillMatrix(data);

    let htmlTable = document.createElement('table');
    htmlTable.className = 'table';

    let innerTableHtml = '';


    for (let i = 0; i < tableData.length; i++) {

        innerTableHtml += '<tr>';

        let row = tableData[i];

        if (i > 0 && parseInt(tableData[i][3]) <= 400) {
            activitiesSuggestions.push(tableData[i][0]);

        }


        for (let j = 0; j < row.length; j++) {

            let tdHtml = `

                <td>

                    ${row[j]}
                </td>
            
            
            `;

            innerTableHtml += tdHtml;


        }

        innerTableHtml += '</tr>';

    }

    innerTableHtml += `
            <tr>
            <td></td>
                <td></td>
                    <td>12000</td>
                        <td>${grandTotalScore.toFixed(0)}</td>
                         <td>${((grandTotalScore/12000)*100).toFixed(0)+'%'}</td>
            </tr>
        
        `;


    htmlTable.innerHTML = innerTableHtml;

    if (table1) {
        if (!table1Ready) {
            table1.appendChild(htmlTable);
            table1Ready = true;
        }

    }

    createTableP();











}

const fillMatrix = (data) => {



    let map = new Map();
    for (let i = 0; i < data.length; i++) {

        map.set(data[i][0], data[i][1]);
    }

    actividadesId.forEach((e) => {
        if (!map.has(e)) {
            map.set(e, 0);
        }
    });



    let completeData = Array.from(map, ([name, value]) => ({ name, value }));

    completeData.sort(function(a, b) {
            if (parseFloat(a.name.substring(1, a.name.length)) > parseFloat(b.name.substring(1, b.name.length))) {

                return 1;
            }
            if (parseFloat(a.name.substring(1, a.name.length)) < parseFloat(b.name.substring(1, b.name.length))) {

                return -1;
            }
            // a must be equal to b
            return 0;
        }



    );


    let matrix = [];


    matrix.push(['#', 'ACTIVIDAD', 'PUNTAJE POSIBLE', 'PUNTAJE OBTENIDO', 'PORCENTAJE']);

    for (let i = 0; i < actividadesId.length; i++) {

        let p = completeData[i].value / scoresByActivitiesGlobal[i] * 100;
        let row = [actividadesId[i], actividades[i], scoresByActivitiesGlobal[i].toFixed(0), completeData[i].value.toFixed(0), p.toFixed(0) + '%'];
        matrix.push(row);


    }

    return matrix;


}


const getScore = (scoresByActivities, q, r) => {



    let options = q.options;

    let containsReserverWord = false;

    let flag = false;
    for (let i = 0; i < options.length && !flag; i++) {


        if (reservedWords.includes(options[i].statment)) {

            flag = true;
        }

    }




    if (q.kindOfQuestion == 'multiple_choice') {
        if (flag) {




            let zero = false;
            r.forEach((e) => {

                let index = parseInt(e);


                if (reservedWords.includes(options[index].statment)) {


                    zero = true;

                }
            });



            if (zero) {


                return 0;
            }

            let score = scoresByActivities.get(q.activities[0]);

            return score / (q.options.length - 1) * r.length;


        } else {
            let score = scoresByActivities.get(q.activities[0]);


            return score / (q.options.length) * r.length;
        }
    }

    if (q.kindOfQuestion == 'multiple_choice_scale') {
        let totalScore = scoresByActivities.get(q.activities[0]);

        if (flag) {
            let scorePerOption = totalScore / (q.options.length - 1);
            if (q.activities[0] == 'A1') {


            }



            return scorePerOption * parseInt(r[0]);

        } else {

            let scorePerOption = totalScore / q.options.length;
            return scorePerOption * parseInt(r[0]);
        }

    }

    if (q.kindOfQuestion == 'multiple_choice_single_answer') {

        if (false) {





        } else {
            if (flag) {




                let zero = false;
                r.forEach((e) => {

                    let index = parseInt(e);


                    if (reservedWords.includes(options[index].statment)) {


                        zero = true;

                    }
                });



                if (zero) {
                    return 0;
                }

                let score = scoresByActivities.get(q.activities[0]);

                return score;
            } else {
                let score = scoresByActivities.get(q.activities[0]);

                return score;
            }
        }

    }



    /*
    if (q.kindOfQuestion == 'multiple_choice') {

        if (r.includes('0'))
            if (!q.noNothing)
                return 0;
            else {
                let score = scoresByActivities.get(q.activities[0]);
                return score / (q.options.length) * r.length;
            }
        else {

            if (q.noNothing) {
                let score = scoresByActivities.get(q.activities[0]);
                return score / (q.options.length) * r.length;
            } else {
                let score = scoresByActivities.get(q.activities[0]);
                return score / (q.options.length - 1) * r.length;

            }



        }

    }

    if (q.kindOfQuestion == 'multiple_choice_scale') {
        let totalScore = scoresByActivities.get(q.activities[0]);



        if (q.noNothing) {



            let scorePerOption = totalScore / q.options.length;
            return scorePerOption * parseInt(r[0]);
        } else {
            let scorePerOption = totalScore / (q.options.length - 1);
            if (q.activities[0] == 'A1') {
                console.log(scorePerOption);
                console.log(totalScore);
                x(totalScore);

            }



            return scorePerOption * parseInt(r[0]);
        }





    }*/


    return 0;




}


const createTableP = (data) => {



    let tableData = fillMatrixP(data);

    //console.log(tableData)
    let htmlTable = document.createElement('table');
    htmlTable.className = 'table';

    let innerTableHtml = '';

    let ref = database.ref('benchmarking/' + userID);
    let principlesResults = [];
    principlesResults.push(userID);

    for (let i = 0; i < tableData.length; i++) {

        innerTableHtml += '<tr>';

        let row = tableData[i];


        for (let j = 0; j < row.length; j++) {

            if (j == 3 && i > 0)
                principlesResults.push(row[j]);

            //   console.log(row[j] + ' ' + j);
            let rowColData = row[j];

            if (i > 0) {
                if (j == 3 || j == 4) {


                    rowColData = parseFloat(rowColData).toFixed();
                    if (j == 4) {
                        rowColData = rowColData + '%';
                    }
                }

            }


            let tdHtml = `

                <td>

                    ${rowColData}
                    

                </td>
            
            
            `;

            innerTableHtml += tdHtml;


        }

        innerTableHtml += '</tr>';


    }





    ref.set(principlesResults);

    htmlTable.innerHTML = innerTableHtml;

    if (table2) {
        if (!table2Ready) {
            table2.appendChild(htmlTable);
            table2Ready = true;
        }

    }




    loadPageCompleted();







}

const fillMatrixP = () => {

    let matrix = [];

    principlesScoresPercetages = principlesScoresPercetagesMap;
    totalScoreByP = 0;
    matrix.push(['#', 'PRINCIPIOS', 'PUNTAJE POSIBLE', 'PUNTAJE OBTENIDO', 'PORCENTAJE']);

    for (let i = 0; i < principlesId.length; i++) {
        let score = 0;


        if (principlesScoresPercetages.has(principlesId[i])) {


            let indexI = parseInt(principlesId[i].substring(1, principlesId[i].length)) - 1;

            let vals = principlesScoresPercetages.get(principlesId[i]).vals;

            vals.forEach(val => {





                if (scoresByActivitiesResults.get(val.name)) {
                    let indexJ = parseInt(val.name.substring(1, val.name.length)) - 1;

                    dataToBarChar[indexI][indexJ] = (parseFloat(scoresByActivitiesResults.get(val.name)) * val.value);
                    score += (parseFloat(scoresByActivitiesResults.get(val.name)) * val.value);

                } else {
                    score += 0;
                }




            });
        }


        totalScoreByP += score;
        dataPolar.push(score.toFixed(1));

        matrix.push([principlesId[i], principles[i], 1000, score.toFixed(1), (score / 10).toFixed(1)]);
    }

    return matrix;

}


const loadPageCompleted = () => {
    let ref = database.ref('actsuggestions/' + id).set(activitiesSuggestions);
    hideSuggestions();
    let container = document.querySelector('.loading__container');
    container.style.visibility = 'hidden';
    container.style.opacity = 0;
    if (typeof loadPolarGraph === 'function')
        loadPolarGraph();
    if (typeof loadStackedBarChar === 'function')
        loadStackedBarChar();
}

const hideSuggestions = () => {
    activitiesSuggestions.forEach(e => {
        let temp = document.querySelectorAll('.' + e);

        if (temp) {
            temp.forEach((e) => {
                e.classList.remove('hidden')
            })
        }
    });
}

loadData();