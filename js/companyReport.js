const byLevels = document.querySelector('.byLevelsBtn');
const byPrinciplesVsActivities = document.querySelector('.byPrinciplesVsActivities');
const repuni = document.querySelector('.repuni');
let ableRepuni = false;

const userLoaded = () => {

    ableRepuni = true;

    repuni.classList.remove('pressed');
    repuni.classList.remove('noHover');

}

repuni.addEventListener('click', () => {
    if (ableRepuni) {
        let link = "./report.html?id=" + loggedUser.id + "";

        window.location.href = link;
    }

});

byLevels.addEventListener('click', () => {

    window.location.href = './report_by_levels.html';

});

byPrinciplesVsActivities.addEventListener('click', () => {

    window.location.href = './report_by_principles_activities.html';

});

const routeButton = document.querySelector('.downloadRoute');

console.log(routeButton);
routeButton.addEventListener('click', () => {



    window.location.href = './hdr.html';


});