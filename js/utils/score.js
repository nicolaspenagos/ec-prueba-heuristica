const MATRIX_REF = database.ref('matrices/P-A');
let matrixPA;
let matrixScoresPA = [];
let scoresByActivities;
let scoresByActivitiesGlobal;

let scoresPerQuestionsMap = new Map();
let scoresByQuestionsMap = new Map();

MATRIX_REF.on('value', (snapshot) => {

    const data = snapshot.val();
    matrixPA = data.matrix;
    loadScoreHelperMatrices(matrixPA);
    let counters = [];

    for (let i = 0; i < matrixPA.length; i++) {
        let row = matrixPA[i];
        counters[i] = 0;
        matrixScoresPA.push([]);
        for (let j = 0; j < row.length; j++) {
            matrixScoresPA[i].push(0);
            if (matrixPA[i][j] == 1)
                counters[i]++;

        }
    };


    for (let i = 0; i < matrixPA.length; i++) {
        let row = matrixPA[i];

        for (let j = 0; j < row.length; j++) {
            if (matrixPA[i][j] == 1)
                matrixScoresPA[i][j] = 1000 / counters[i];
            else
                matrixScoresPA[i][j] = 0;
        }
    };


    scoresByActivities = [];
    for (let i = 0; i < matrixScoresPA.length; i++) {
        let sum = 0;
        for (let j = 0; j < matrixScoresPA.length; j++) {
            sum += matrixScoresPA[j][i];
        }
        scoresByActivities.push(sum);
    }






});

const scoresByQuestions = (results) => {

    scoresPerQuestionsMap = new Map();

    console.log(results)

    /*
        results.forEach(element => {



            let question = questions[searchQuestionsInArrayById2(element[0], questions)];

            let activity = question.activities[0];

            if (scoresPerQuestionsMap.get(activity)) {
                let counter = scoresPerQuestionsMap.get(activity) + 1;
                scoresPerQuestionsMap.set(activity, counter);
            } else {
                scoresPerQuestionsMap.set(activity, 1);
            }

        });*/


    questions.forEach(element => {

        let activity = element.activities[0];
        if (scoresPerQuestionsMap.get(activity)) {
            let counter = parseInt(scoresPerQuestionsMap.get(activity) + 1);
            scoresPerQuestionsMap.set(activity, counter);
        } else {
            scoresPerQuestionsMap.set(activity, 1);
        }

    });


    scoresByActivitiesGlobal = scoresByActivities;


    let counter = 1;
    while (counter <= 12) {

        let a = 'A' + counter;

        scoresByQuestionsMap.set(a, parseFloat(scoresByActivities[counter - 1] / scoresPerQuestionsMap.get(a)));

        counter++;
    }





    return scoresByQuestionsMap;






}

const getQuestionScore = (scoresByQuestionsMap) => {



}