principlesPercetangeRepartitionMatrix = []
totalPointsByActivitiesArray = []
principlesScoresPercetagesMap = new Map();

loadScoreHelperMatrices = (matrixPa) => {
    getPrinciplesPercetangeRepartitionMatrix(matrixPa);
    getTotalPointsByActivitiesArray();
    getPrinciplesScoresPercetagesMap();


}

getPrinciplesScoresPercetagesMap = () => {

    for (let i = 0; i < principlesPercetangeRepartitionMatrix.length; i++) {
        valsArray = []
        for (let j = 0; j < principlesPercetangeRepartitionMatrix.length; j++) {
            if (principlesPercetangeRepartitionMatrix[i][j] != 0) {
                v = (principlesPercetangeRepartitionMatrix[i][j] * 1000) / totalPointsByActivitiesArray[j];
                valsArray.push({ name: 'A' + (j + 1), value: v });
            }
        }

        let key = 'P' + (i + 1);
        principlesScoresPercetagesMap.set(key, { vals: valsArray });
    }
    //console.log(principlesScoresPercetagesMap);
}

getTotalPointsByActivitiesArray = () => {
    for (let i = 0; i < principlesPercetangeRepartitionMatrix.length; i++) {
        activityScore = 0;
        for (let j = 0; j < principlesPercetangeRepartitionMatrix.length; j++) {
            activityScore += principlesPercetangeRepartitionMatrix[j][i] * 1000;

        }

        totalPointsByActivitiesArray.push(activityScore)
    }
    //console.log(totalPointsByActivitiesArray)
}

getPrinciplesPercetangeRepartitionMatrix = (matrixPa) => {
    for (let i = 0; i < matrixPa.length; i++) {

        rowCounter = 0;
        for (let j = 0; j < matrixPa.length; j++) {

            if (matrixPa[i][j] == '1')
                rowCounter++;
        }
        let fillRow = [];
        percentage = 1 / rowCounter;
        for (let j = 0; j < matrixPa.length; j++) {

            if (matrixPa[i][j] == '1')
                fillRow.push(percentage);
            else
                fillRow.push(0);

        }
        principlesPercetangeRepartitionMatrix.push(fillRow);
    }

    //console.log(principlesPercetangeRepartitionMatrix);
}