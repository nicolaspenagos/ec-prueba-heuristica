loadBarChar = () => {
    const DATA_COUNT = 7;
    const NUMBER_CFG = { count: DATA_COUNT, min: -100, max: 100 };
    console.log(dataToBarChar[0]);
    let dataToBarCharInv = transpose(dataToBarChar);
    console.log(dataToBarCharInv);
    //const labels = principles;
    const labels = principlesId;
    const data3 = {
        labels: labels,
        datasets: [{
                label: 'A1',
                data: dataToBarCharInv[0],
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgb(255, 99, 132)',

            },
            {
                label: 'A2',
                data: dataToBarCharInv[1],
                borderColor: 'rgb(255, 159, 64)',
                backgroundColor: 'rgb(255, 159, 64)',
            },
            {
                label: 'A3',
                data: dataToBarCharInv[2],
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgb(75, 192, 192)',

            },
            {
                label: 'A4',
                data: dataToBarCharInv[3],
                borderColor: 'rgb(255, 205, 86)',
                backgroundColor: 'rgb(255, 205, 86)',
            },
            {
                label: 'A5',
                data: dataToBarCharInv[4],
                borderColor: 'rgb(54, 162, 235)',
                backgroundColor: 'rgb(54, 162, 235)',

            },
            {
                label: 'A6',
                data: dataToBarCharInv[5],
                borderColor: 'rgb(153, 102, 255)',
                backgroundColor: 'rgb(153, 102, 255)',
            }, {
                label: 'A7',
                data: dataToBarCharInv[6],
                borderColor: 'rgb(201, 203, 207)',
                backgroundColor: 'rgb(201, 203, 207)',

            },
            {
                label: 'A8',
                data: dataToBarCharInv[7],
                borderColor: 'rgb(127, 255, 0)',
                backgroundColor: '	rgb(127, 255, 0)',
            },
            {
                label: 'A9',
                data: dataToBarCharInv[8],
                borderColor: 'rgb(178, 34, 34)',
                backgroundColor: 'rgb(178, 34, 34)',

            },
            {
                label: 'A10',
                data: dataToBarCharInv[9],
                borderColor: 'rgb(250, 128, 114)',
                backgroundColor: 'rgb(250, 128, 114)',
            },
            {
                label: 'A11',
                data: dataToBarCharInv[10],
                borderColor: 'rgb(238, 130, 238)',
                backgroundColor: 'rgb(238, 130, 238)',

            },
            {
                label: 'A12',
                data: dataToBarCharInv[11],
                borderColor: 'rgb(0, 128, 128)',
                backgroundColor: 'rgb(0, 128, 128)',
            },
        ]
    };







    const config3 = {
        type: 'bar',
        data: data3,
        options: {
            indexAxis: 'y',
            // Elements options apply to all of the options unless overridden in a dataset
            // In this case, we are setting the border of each horizontal bar to be 2px wide
            elements: {
                bar: {
                    borderWidth: 2,
                }
            },
            responsive: true,
            plugins: {
                legend: {
                    position: 'right',
                },

            }
        },
    };



    let myChart3 = new Chart(
        document.getElementById('myChart3'),
        config3
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