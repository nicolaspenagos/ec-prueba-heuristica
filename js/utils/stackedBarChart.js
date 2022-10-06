loadStackedBarChar = () => {
    const DATA_COUNT = 7;
    const NUMBER_CFG = { count: DATA_COUNT, min: -100, max: 100 };
    //console.log(dataToBarChar[0]);
    let dataToBarCharInv = toFixedArray(transpose(dataToBarChar));


    //const labels = principles;
    const labels = principlesId;
    const data4 = {
        labels: labels,
        datasets: [{
                label: 'A1',
                data: dataToBarCharInv[0],
                borderColor: 'rgba(255, 99, 132, 0.8)',
                backgroundColor: 'rgba(255, 99, 132, 0.8)',

            },
            {
                label: 'A2',
                data: dataToBarCharInv[1],
                borderColor: 'rgba(255, 159, 64, 0.8)',
                backgroundColor: 'rgba(255, 159, 64, 0.8)',
            },
            {
                label: 'A3',
                data: dataToBarCharInv[2],
                borderColor: 'rgba(75, 192, 192, 0.8)',
                backgroundColor: 'rgba(75, 192, 192, 0.8)',

            },
            {
                label: 'A4',
                data: dataToBarCharInv[3],
                borderColor: 'rgba(255, 205, 86, 0.8)',
                backgroundColor: 'rgba(255, 205, 86, 0.8)',
            },
            {
                label: 'A5',
                data: dataToBarCharInv[4],
                borderColor: 'rgba(54, 162, 235, 0.8)',
                backgroundColor: 'rgba(54, 162, 235, 0.8)',

            },
            {
                label: 'A6',
                data: dataToBarCharInv[5],
                borderColor: 'rgba(153, 102, 255, 0.8)',
                backgroundColor: 'rgba(153, 102, 255, 0.8)',
            }, {
                label: 'A7',
                data: dataToBarCharInv[6],
                borderColor: 'rgba(201, 203, 207, 0.8)',
                backgroundColor: 'rgba(201, 203, 207, 0.8)',

            },
            {
                label: 'A8',
                data: dataToBarCharInv[7],
                borderColor: 'rgba(127, 255, 0, 0.8)',
                backgroundColor: 'rgba(127, 255, 0, 0.8)',
            },
            {
                label: 'A9',
                data: dataToBarCharInv[8],
                borderColor: 'rgba(178, 34, 34, 0.8)',
                backgroundColor: 'rgba(178, 34, 34, 0.8)',

            },
            {
                label: 'A10',
                data: dataToBarCharInv[9],
                borderColor: 'rgba(250, 128, 114, 0.8)',
                backgroundColor: 'rgba(250, 128, 114, 0.8)',
            },
            {
                label: 'A11',
                data: dataToBarCharInv[10],
                borderColor: 'rgba(238, 130, 238, 0.8)',
                backgroundColor: 'rgba(238, 130, 238, 0.8)',

            },
            {
                label: 'A12',
                data: dataToBarCharInv[11],
                borderColor: 'rgba(0, 128, 128, 0.8)',
                backgroundColor: 'rgba(0, 128, 128, 0.8)',
            },
        ]
    };







    const config4 = {
        type: 'bar',
        data: data4,
        options: {
            plugins: {
                title: {
                    display: true,
                    text: ''
                },
            },
            responsive: true,
            scales: {
                x: {
                    stacked: true,
                },
                y: {
                    stacked: true
                }
            }
        }
    };



    let myChart3 = new Chart(
        document.getElementById('myChart3'),
        config4
    );
}


function transpose(a) {

    // Calculate the width and height of the Array
    var w = a.length || 0;
    var h = a[0] instanceof Array ? a[0].length : 0;

    // In case it is a zero matrix, no transpose routine needed.
    if (h === 0 || w === 0) { return []; }

    /**
     * @var {Number} i Counter
     * @var {Number} j Counter
     * @var {Array} t Transposed data is stored in this array.
     */
    var i, j, t = [];

    // Loop through every item in the outer array (height)
    for (i = 0; i < h; i++) {

        // Insert a new row (array)
        t[i] = [];

        // Loop through every item per item in outer array (width)
        for (j = 0; j < w; j++) {

            // Save transposed data.
            t[i][j] = a[j][i];
        }
    }

    return t;
}


function toFixedArray(arrays) {

    for (i = 0; i < arrays.length; i++) {


        for (j = 0; j < arrays[i].length; j++) {

            console.log();
            arrays[i][j] = arrays[i][j].toFixed(1);;
        }
    }

    return arrays;
}