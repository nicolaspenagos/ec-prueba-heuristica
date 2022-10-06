let loggedUser = null;
const loggedUserTag = document.querySelector('.loggedUser');
const logoutGeneralButton = document.getElementById('logout');
const storage = firebase.storage();

if (logoutGeneralButton) {
    logoutGeneralButton.addEventListener('click', () => {
        firebase.auth().signOut();
    });
}


firebase.auth().onAuthStateChanged(

    (user) => {

        if (user !== null) {
            loggedUser = firebase.database().ref('users/' + user.uid).get().then((snapshot) => {

                if (snapshot.exists()) {
                    loggedUser = snapshot.val();

                    if (loggedUser.termsAndConditions) {
                        if (typeof goToMenu === 'function')
                            goToMenu();
                    }

                    if (typeof updateMenuUser === 'function')
                        updateMenuUser();

                    loggedUserTag.innerText = loggedUser.email;

                    if (typeof isAdmin === 'function')
                        isAdmin();

                    ;
                    if (typeof loadData === 'function')
                        loadData();

                    if (typeof loadSuggestions === 'function')
                        loadSuggestions();

                    if (typeof userLoaded === 'function')
                        userLoaded();

                } else {
                    console.log("No data available");
                }
            })
        } else {

            if (!nolgt) {
                //  window.location.href = './index.html'
            }




        }
    }
);