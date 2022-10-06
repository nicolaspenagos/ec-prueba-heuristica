const reDo = document.querySelector('.redoBtn');

reDo.addEventListener('click', () => {

    database.ref('users/' + loggedUser.id + '/results/').set(null).then(() => {
        window.location.href = 'questionary.html';
    });
});