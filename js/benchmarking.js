const tableContainer = document.querySelector('.benchmarking__container');
const sectorsSelector = document.querySelector('.sectors');

let data = [];
let dataBackup = [];

sectorsSelector.addEventListener('change', () => {

    if (sectorsSelector.value == '0') {
        filltable(dataBackup);

    } else {
        console.log('OEEE');
        let temp;
        switch (sectorsSelector.value) {

            case "1":

                temp = [];
                for (let i = 0; i < dataBackup.length; i++) {


                    if (dataBackup[i][13] == 1) {
                        temp.push(dataBackup[i]);
                    }

                }
                temp.sort(compareInv);
                filltable(temp);
                break;
            case "2":

                temp = [];
                for (let i = 0; i < dataBackup.length; i++) {
                    if (dataBackup[i][13] == 2) {
                        temp.push(dataBackup[i]);
                    }

                }
                temp.sort(compareInv);
                filltable(temp);
                break;
            case "3":

                temp = [];
                for (let i = 0; i < dataBackup.length; i++) {
                    console.log(dataBackup[i]);
                    if (dataBackup[i][13] == 3) {
                        temp.push(dataBackup[i]);
                    }

                }

                temp.sort(compareInv);
                filltable(temp);
                break;
            case "4":

                temp = [];
                for (let i = 0; i < dataBackup.length; i++) {
                    if (dataBackup[i][13] == 4) {
                        temp.push(dataBackup[i]);
                    }

                }
                temp.sort(compareInv);
                filltable(temp);
                break;
            case "5":

                temp = [];
                for (let i = 0; i < dataBackup.length; i++) {
                    if (dataBackup[i][13] == 5) {
                        temp.push(dataBackup[i]);
                    }

                }
                temp.sort(compareInv);
                filltable(temp);
                break;
            case "6":

                temp = [];
                for (let i = 0; i < dataBackup.length; i++) {
                    if (dataBackup[i][13] == 6) {
                        temp.push(dataBackup[i]);
                    }

                }
                temp.sort(compareInv);
                filltable(temp);
                break;
            case "7":

                temp = [];
                for (let i = 0; i < dataBackup.length; i++) {
                    if (dataBackup[i][13] == 7) {
                        temp.push(dataBackup[i]);
                    }

                }
                temp.sort(compareInv);
                filltable(temp);
                break;
            case "8":

                temp = [];
                for (let i = 0; i < dataBackup.length; i++) {
                    if (dataBackup[i][13] == 8) {
                        temp.push(dataBackup[i]);
                    }

                }
                temp.sort(compareInv);
                filltable(temp);
                break;
            case "9":

                temp = [];
                for (let i = 0; i < dataBackup.length; i++) {
                    if (dataBackup[i][13] == 9) {
                        temp.push(dataBackup[i]);
                    }

                }
                temp.sort(compareInv);
                filltable(temp);
                break;
            case "10":

                temp = [];
                for (let i = 0; i < dataBackup.length; i++) {
                    if (dataBackup[i][13] == 10) {
                        temp.push(dataBackup[i]);
                    }

                }
                temp.sort(compareInv);
                filltable(temp);
                break;
            case "11":

                temp = [];
                for (let i = 0; i < dataBackup.length; i++) {
                    if (dataBackup[i][13] == 11) {
                        temp.push(dataBackup[i]);
                    }

                }
                temp.sort(compareInv);
                filltable(temp);
                break;
            case "12":

                temp = [];
                for (let i = 0; i < dataBackup.length; i++) {
                    if (dataBackup[i][13] == 12) {
                        temp.push(dataBackup[i]);
                    }

                }
                temp.sort(compareInv);
                filltable(temp);
                break;
            case "13":

                temp = [];
                for (let i = 0; i < dataBackup.length; i++) {
                    if (dataBackup[i][13] == 13) {
                        temp.push(dataBackup[i]);
                    }

                }
                temp.sort(compareInv);
                filltable(temp);
                break;
            case "14":

                temp = [];
                for (let i = 0; i < dataBackup.length; i++) {
                    if (dataBackup[i][13] == 14) {
                        temp.push(dataBackup[i]);
                    }

                }
                temp.sort(compareInv);
                filltable(temp);
                break;
            case "15":

                temp = [];
                for (let i = 0; i < dataBackup.length; i++) {
                    if (dataBackup[i][13] == 15) {
                        temp.push(dataBackup[i]);
                    }

                }
                temp.sort(compareInv);
                filltable(temp);
                break;
            case "16":

                temp = [];
                for (let i = 0; i < dataBackup.length; i++) {
                    if (dataBackup[i][13] == 16) {
                        temp.push(dataBackup[i]);
                    }

                }
                temp.sort(compareInv);
                filltable(temp);
                break;
            case "17":

                temp = [];
                for (let i = 0; i < dataBackup.length; i++) {
                    if (dataBackup[i][13] == 17) {
                        temp.push(dataBackup[i]);
                    }

                }
                temp.sort(compareInv);
                filltable(temp);
                break;
        }


    }

});

/*
data.push(['IKEA', 100, 700, 800, 700, 1000, 600, 900, 500, 350, 750, 300, 500]);
data.push(['Canon', 200, 800, 600, 200, 500, 400, 100, 800, 950, 150, 560, 300]);
data.push(['SONY', 600, 400, 200, 800, 800, 600, 200, 600, 350, 850, 150, 240]);
data.push(['YAHOO', 500, 600, 300, 800, 300, 900, 700, 800, 150, 250, 550, 740]);
data.push(['Pepsi', 300, 700, 800, 700, 1000, 600, 900, 500, 350, 750, 300, 500]);
data.push(['Google', 200, 800, 600, 200, 500, 400, 100, 800, 950, 150, 560, 300]);
data.push(['Apple', 600, 400, 200, 800, 800, 600, 200, 600, 350, 850, 150, 240]);
data.push(['MCM', 500, 600, 300, 800, 300, 900, 700, 800, 150, 250, 550, 740]);*/

let tableContent = '';

let localUsers = new Map();
let benchArray = new Map();




let ref = database.ref('users').once('value', function(data) {
    data.forEach(element => {

        let user = element.val();

        let companyName = 'Anónimo';
        if (user.benchmarking == 'yes') {
            companyName = user.company;
        }

        //localUsers.set(user.id, user.company);
        localUsers.set(user.id, { company: companyName, sector: user.sector });


    });
    let ref1 = database.ref('benchmarking').once('value', function(data) {
        data.forEach(element => {

            let bench = element.val();
            let results = [];
            for (let i = 1; i < bench.length; i++) {
                results.push(bench[i]);

            }
            benchArray.set(bench[0], results);



        });
        loadPageCompleted();


        let arrayToPut = [];

        for (var [key, value] of benchArray) {
            let arr = [];

            if (localUsers.get(key)) {
                arr.push(localUsers.get(key).company);
                let sum = 0;
                value.forEach(e => {
                    arr.push(e);

                    sum += parseFloat(e);


                });




                arr.push(localUsers.get(key).sector);
                arr.push(sum);

                arrayToPut.push(arr);

            }


        }

        arrayToPut.sort(compare)
        dataBackup = arrayToPut;
        filltable(arrayToPut);

    });


});

const loadPageCompleted = () => {

    let container = document.querySelector('.loading__container');
    container.style.visibility = 'hidden';
    container.style.opacity = 0;

    if (typeof loadPolarGraph === 'function')
        loadPolarGraph();
    if (typeof loadStackedBarChar === 'function')
        loadStackedBarChar();
}



function compare(a, b) {

    if (a[0] < b[0])
        return -1;
    if (a[0] > b[0])
        return 1;
    return 0;

}

function compareInv(a, b) {

    if (a[a.length - 1] < b[b.length - 1])
        return 1;
    if (a[a.length - 1] > b[b.length - 1])
        return -1;
    return 0;

}

filltable = (data) => {

    let companies = '';
    for (let i = 0; i < data.length; i++) {
        let name = data[i][0];
        let pies = '';

        for (let j = 1; j < 13; j++) {
            let percentaje = data[i][j] / 10;
            let punt = data[i][j];

            let defaultVar = 100 - percentaje;

            let color = '';

            switch (j) {
                case 1:
                    color = '#E7223C';
                    break;
                case 2:
                    color = '#E5B633';
                    break;
                case 3:
                    color = '#4C9F46';
                    break;
                case 4:
                    color = '#C41F2E';
                    break;
                case 5:
                    color = '#EF402B';
                    break;
                case 6:
                    color = '#60B6EF';
                    break;
                case 7:
                    color = '#16486A';
                    break;
                case 8:
                    color = '#06699C';
                    break;
                case 9:
                    color = '#C8992E';
                    break;
                case 10:
                    color = '#DD1768';
                    break;
                case 11:
                    color = '#F19DF2';
                    break;
                case 12:
                    color = '#519B9B';
                    break;
            }


            let pie = `
            <td class="td tr">
                  <div id="${name+j}" class="pie" style="  background: conic-gradient( ${color} ${percentaje}%, #BFBFBF ${percentaje}% );;border-radius: 50%;height: 50px;width: 50px"></div>
                  <div class="pie__tag pie__tag--hidden">${punt}</div>
                 
            </td>
            `;
            pies += pie;
        }

        tableRow = `
            <tr>
                <td>
                    ${name}
                </td>
                ${pies}
            </tr>
        
        `;

        companies += tableRow;


    }

    tableContainer.innerHTML = `
        <table class="benchmarking-table">
                <tr class="fixed tr">
                    <td class="thTitle">Empresa</th>
                    <th class="thTitle">P1 <br>Capital natural</th>
                    <th class="thTitle">P2 <br>Tecnologías para la EC</th>
                    <th class="thTitle">P3 <br>Pensamiento sistémico</th>
                    <th class="thTitle">P4 <br>Pensamiento en cascada</th>

                    <th class="thTitle">P5 <br>Ecoeficiencia</th>
                    <th class="thTitle">P6 <br>Innovacióno</th>
                    <th class="thTitle">P7 <br>Gestión del impacto</th>
                    <th class="thTitle">P8 <br>Optimización de valor</th>

                    <th class="thTitle">P9 <br>Pensamiento local</th>
                    <th class="thTitle">P10 <br>Resiliencia para la diversidad</th>
                    <th class="thTitle">P11 <br>Circularidad y longevidad</th>
                    <th class="thTitle">P12 <br>Diseño para prevención de residuos</th>
                </tr>
                ${companies}
        </table>`;
}