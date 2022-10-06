loadPolarGraph = () => {

    let dataPolar1 = [];
    let dataPolar2 = [];
    let dataPolar3 = [];
    for (let i = 0; i < dataPolar.length; i++) {

        if (i < 5) {

            dataPolar1.push(dataPolar[i]);

        } else if (i >= 5 && i < 9) {
            dataPolar2.push(dataPolar[i]);
        } else {
            dataPolar3.push(dataPolar[i]);
        }

    }


    const data = {
        labels: [
            'Capital natural',
            'Tecnología para al EC',
            'Pensamiento sistémico',
            'Pensamiento en cascada',
            'Ecoeficiencia'
        ],
        datasets: [{
            label: 'My First Dataset',
            data: dataPolar1,
            fill: false,
            backgroundColor: [
                'rgba(255, 99, 132, 0.8)',
                'rgba(75, 192, 192, 0.8)',
                'rgba(255, 205, 86, 0.8)',
                'rgba(201, 203, 207, 0.8)',
                'rgba(54, 162, 235, 0.8)',

            ]
        }]
    };

    const data1 = {
        labels: [
            'Innovación',
            'Gestión del impacto',
            'Optimización de valor',
            'Pensamiento local',
        ],
        datasets: [{
            label: 'My First Dataset',
            data: dataPolar2,
            fill: false,
            backgroundColor: [
                'rgba(255, 99, 132, 0.8)',
                'rgba(75, 192, 192, 0.8)',
                'rgba(255, 205, 86, 0.8)',
                'rgba(201, 203, 207, 0.8)',
                'rgba(54, 162, 235, 0.8)',

            ]
        }]
    };

    const data2 = {
        labels: [
            'Resiliencia para la diversidad',
            'Circularidad y longevidad ',
            'Diseño para prevención de residuos',

        ],
        datasets: [{
            label: 'My First Dataset',
            data: dataPolar3,
            fill: false,
            backgroundColor: [
                'rgba(255, 99, 132, 0.8)',
                'rgba(75, 192, 192, 0.8)',
                'rgba(255, 205, 86, 0.8)',
                'rgba(201, 203, 207, 0.8)',
                'rgba(54, 162, 235, 0.8)',

            ]
        }]
    };

    const config = {
        type: 'polarArea',
        data: data,
        options: {}
    };

    const config1 = {
        type: 'polarArea',
        data: data1,
        options: {}
    };

    const config2 = {
        type: 'polarArea',
        data: data2,
        options: {}
    };



    let myChart = new Chart(
        document.getElementById('myChart'),
        config
    );



    let myChart1 = new Chart(
        document.getElementById('myChart1'),
        config1
    );



    let myChart2 = new Chart(
        document.getElementById('myChart2'),
        config2
    );

    let chainScore = document.querySelector('.chainScore');
    if (chainScore) {
        let total = 5000;
        let sum = 0
        dataPolar1.forEach(element => {
            sum = sum + parseInt(element);
        });
        chainScore.innerHTML = 'Puntaje total nivel Cadena: ' + sum;
        w = sum * 100 / total;
        // console.log(w);
        document.querySelector(".innerBar1").style.width = '' + w + '%';
    }

    let companyScore = document.querySelector('.companyScore');
    if (companyScore) {
        let total = 4000;
        let sum = 0
        dataPolar2.forEach(element => {
            sum = sum + parseInt(element);
        });
        companyScore.innerHTML = 'Puntaje total nivel Empresa: ' + sum;
        w = sum * 100 / total;
        // console.log(w);
        document.querySelector(".innerBar2").style.width = '' + w + '%';
    }

    let productScore = document.querySelector('.productScore');
    if (productScore) {
        let total = 3000;
        let sum = 0
        dataPolar3.forEach(element => {
            sum = sum + parseInt(element);
        });
        productScore.innerHTML = 'Puntaje total nivel Producto: ' + sum;
        w = sum * 100 / total;
        // console.log(w);
        document.querySelector(".innerBar3").style.width = '' + w + '%';
    }

}