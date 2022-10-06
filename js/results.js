const usersContainer = document.querySelector('.results__container');

let reservedWords = ['Ninguno', 'Ninguna', 'No sé', 'No realiza', 'No implementado'];


const isAdmin = () => {
    if (!loggedUser.admin) {
        window.location.href = './index.html';
    } else {

        downloadUsers();

    }

}

const downloadUsers = () => {


    let ref = database.ref('users').once('value', function(data) {
        data.forEach(element => {

            let user = element.val();
            console.log(user);
            if (user.results) {
                users.set(user.id, user);
            }

        });


        //renderUsers();
        renderTable();

    });


}

const renderTable = () => {

    let innerHTML = '';
    let i = 0;
    for (var [key, value] of users) {

        i++;

        let noTop = '';



        let date = new Date(value.resultsDate);
        innerHTML += `<tr class="table__row">
                        <td><div class="table__number">${i}</div></td>
                        <td>${value.name}</td>
                        <td>${value.lastName}</td>
                        <td>${value.company}</td>
                        <td>${date.getDay()+'/'+date.getMonth()+'/'+date.getFullYear()}</td>
                        <td><button class="results__button">Descargar</button></td>
                        <td><a href="./report.html?id=${value.id}" class="results__button">Ver reporte</button></td>
                       </tr>`;

    }

    usersContainer.innerHTML = innerHTML;
}

const renderUsers = () => {


    let counter = 1;
    for (var [key, value] of users) {

        let rowDiv = document.createElement('tr');
        rowDiv.className = 'row';
        rowDiv.classList.add('row--results');

        let date = new Date(value.resultsDate);

        let noTop = 'row--noTop';

        if (counter > 1) {
            rowDiv.classList.add(noTop);
        }

        let html = `<td>${counter}</td><td>${value.name} ${value.lastName}</td><td>${value.company}</td><td>${date.getDay()+'/'+date.getMonth()+'/'+date.getFullYear()}</td><td><button class="results__button">Descargar</button></td><td><a href="./report.html?id=${value.id}" class="results__button">Ver reporte</button></td>`;

        rowDiv.innerHTML = html;

        let val = value;

        rowDiv.querySelector('.results__button').addEventListener('click', () => {

            //console.log(questions);
            downloadResults(val.results, val.company, val.name, val.lastName);
        });

        if (usersContainer)
            usersContainer.appendChild(rowDiv);
        counter++;

    }

}

const downloadResults = (results, company, name, lastName) => {


    downloadResultsExcel(results, company, name, lastName);

}

const downloadResultsExcel = (results, company, name, lastName) => {

    var wb = XLSX.utils.book_new();
    wb.Props = {
        Title: '' + company + '_' + name + lastName,
        Subject: 'Results',
        Author: 'EC ICESI',
        CreatedDate: new Date()
    }

    wb.SheetNames.push('Resultados');

    var ws_data = [
        ['ENUNCIADO', 'RESPUESTAS', 'JUSTIFICACIÓN', 'ACTIVIDAD', 'PUNTAJE']
    ];


    let scoresByActivities = scoresByQuestions(results);

    let scoresByActivitiesResults = new Map();

    let grandTotalScore = 0;
    let a9Counter = 0;


    results.forEach(e => {


        let currentQuestion = questions[searchQuestionsInArrayById2(e[0], questions)];
        if (currentQuestion.activities[0] == 'A9') {
            console.log(e);
            e[1].forEach(a => {
                if (a == '0') {
                    a9Counter++;
                }
            })
        }


    });

    console.log(a9Counter);
    results.forEach(e => {



        let currentQuestion = questions[searchQuestionsInArrayById2(e[0], questions)];




        if (currentQuestion.activities[0] != 'A9') {
            if (currentQuestion.kindOfQuestion == 'multiple_choice_single_answer') {
                console.log(currentQuestion);
            }





            let score = getScore(scoresByActivities, currentQuestion, e[1]);
            score = score.toFixed(2);

            if (scoresByActivitiesResults.get(currentQuestion.activities[0])) {
                let s = parseFloat(scoresByActivitiesResults.get(currentQuestion.activities[0]));
                s += parseFloat(score);
                scoresByActivitiesResults.set(currentQuestion.activities[0], s);
            } else {
                scoresByActivitiesResults.set(currentQuestion.activities[0], score);
            }

            if (currentQuestion.id === '-MjAece_ZHWVadYopsD4') {
                console.log(e);
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
            if (e[1] == '2') {
                scoreA9
            }

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

            ws_data.push(currentRow)
        }


    });


    console.log(scoresByActivitiesResults);

    ws_data.push(['Puntajes por actividad:']);

    for (var [key, value] of scoresByActivitiesResults) {
        ws_data.push([key, value]);
    }

    ws_data.push(['TOTAL:', grandTotalScore]);



    var ws = XLSX.utils.aoa_to_sheet(ws_data);
    wb.Sheets['Resultados'] = ws;

    var wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });

    function s2ab(s) {
        var buf = new ArrayBuffer(s.length);
        var view = new Uint8Array(buf);
        for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
    }

    saveAs(new Blob([s2ab(wbout)], { type: 'application/octec-stream' }), company + ' ' + name + lastName + '.xlsx');










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
                console.log(scorePerOption);
                console.log(totalScore);
                console.log(totalScore);

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
                console.log(scoresByActivities);
                return score;
            } else {
                let score = scoresByActivities.get(q.activities[0]);
                console.log(scoresByActivities.get(q.activities[0]));
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
                console.log(totalScore);

            }



            return scorePerOption * parseInt(r[0]);
        }





    }*/


    return 0;




}