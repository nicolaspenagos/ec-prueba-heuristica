// -------------------------------------
// FIREBASE CONSTANTS
// -------------------------------------


// -------------------------------------
// DECLARATIONS
// -------------------------------------
const logoutButton = document.getElementById('logout');
const adminName = document.getElementById('adminName');
const adminEmail = document.getElementById('adminEmail');
const requestscontainer = document.getElementById('requestscontainer');
const acceptedcontainer = document.getElementById('acceptedcontainer');
const adminText = document.getElementById('textadmin');
const adminFormButton = document.querySelector('.buttom__form');
const results = document.querySelector('.results');
const btnDownloadAll = document.querySelector('.btnDownloadAll');
let companiesInfoArray = [];
btnDownloadAll.addEventListener('click', () => {

    downloadCompaniesExcel();
});

const downloadCompaniesExcel = () => {

    var wb = XLSX.utils.book_new();
    wb.Props = {
        Title: 'Companies EC',
        Subject: 'Companies',
        Author: 'EC ICESI',
        CreatedDate: new Date()
    }

    wb.SheetNames.push('Companies');

    var ws_data = [
        ['COMPANIA', 'NOMBRE', 'EMAIL', 'CARGO', 'MACROSECTOR', 'SECTOR', 'BENCHMARKING', 'RESULTADOS', 'FECHA DE REGISTRO']
    ];


    companiesInfoArray.forEach(company => {
        if (company.accepted && (!company.admin)) {

            let row = [];

            row.push(company.name + ' ' + company.lastName);
            row.push(company.email);
            row.push(company.position);
            if (company.macrosector) {
                row.push(company.macrosector);
            } else {
                row.push("N/A");
            }
            if (company.sector) {
                row.push(getSector(company.sector));
            } else {
                row.push("N/A");
            }
            if (company.results) {
                row.push("SI");
            } else {
                row.push("Sin finalizar cuestionario");
            }
            row.push(company.requestDate);

            ws_data.push(row);


        }

    });



    var ws = XLSX.utils.aoa_to_sheet(ws_data);
    wb.Sheets['Usuarios'] = ws;

    var wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });

    function s2ab(s) {
        var buf = new ArrayBuffer(s.length);
        var view = new Uint8Array(buf);
        for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
    }

    saveAs(new Blob([s2ab(wbout)], { type: 'application/octec-stream' }), 'Usuarios' + '.xlsx');
}

// -------------------------------------
// USER AUTHENTICATION
// -------------------------------------
auth.onAuthStateChanged(

    (user) => {

        if (user == null) {
            window.location.href = 'login.html';
        } else {

            database.ref('users/' + user.uid).once('value', function(data) {
                let userDb = data.val();
                adminName.innerHTML = userDb.name + ' ' + userDb.lastName;
                adminEmail.innerHTML = userDb.email;
                adminText.style.visibility = 'visible';
            });
        }

    }

);

// -------------------------------------
// EVENTS
// -------------------------------------
logout.addEventListener('click', () => {

    auth.signOut().then(

        () => {
            window.location.href = './login.html';
        }

    ).catch(
        (error) => {
            alert(error.message);
        }
    );

});

// -------------------------------------
// READING
// -------------------------------------
database.ref('pending').on('value', function(data) {
    requestscontainer.innerHTML = '';
    let counter = 0;

    data.forEach(

        request => {

            let val = request.val();
            let requestQueue = new Request(val, counter);
            requestscontainer.appendChild(requestQueue.render());
            counter++;

        }

    );

});


database.ref('users').on('value', function(data) {
    acceptedcontainer.innerHTML = '';
    let counter = 0;

    data.forEach(

        accepted => {

            let val = accepted.val();
            companiesInfoArray.push(val);


            if (val.accepted) {
                let requestQueue = new Accepted(val, counter);

                acceptedcontainer.appendChild(requestQueue.render());
                counter++;
            }


        }

    );




});








const downloadResultsMatrix = () => {
    let matrixToPrint = [];

    questions.forEach((e, i) => {

        let f = [];
        f.push(i + 1);
        f.push('');
        matrixToPrint.push(f);
        let row1 = [];
        row1.push('Pregunta');
        row1.push(e.statment);
        matrixToPrint.push(row1);
        e.results.forEach((o, io) => {
            let row = [];
            row.push('Opción: ' + io);
            row.push(e.options[io].statment);
            row.push(o);
            matrixToPrint.push(row);
        });

        if (e.justifications) {
            e.justifications.forEach((j, ij) => {
                let row = [];
                row.push(j[1]);
                row.push(j[2]);
                matrixToPrint.push(row);
            });
        }

    });

    let csvContent = "data:text/csv;charset=utf-8,";

    matrixToPrint.forEach(function(rowArray) {
        let row = rowArray.join(",");
        csvContent += row + "\r\n";
    });

    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", 'Resultados' + ".csv");
    document.body.appendChild(link); // Required for FF
    link.click();





}



results.addEventListener('click', () => {
    window.location.href = './results.html';
});

const isAdmin = () => {

    if (!loggedUser.admin) {

        window.location.href = './index.html';




        //answers = new Map(JSON.parse(miStorage.getItem(loggedUser.id)));




    } else {
        let container = document.querySelector('.loading__container');
        container.style.visibility = 'hidden';
        container.style.opacity = 0;
    }
}


let getSector = (s) => {
    if (s == 1)
        return "Agricultura, Ganadería, Caza, Silvicultura y Pesca";
    if (s == 2)
        return "Explotación de Minas y Canteras";
    if (s == 3)
        return "Industrias Manufactureras";
    if (s == 4)
        return "Suministro de Electricidad, Gas, Vapor y Aire Acondicionado";
    if (s == 5)
        return "Distribución de Agua; Evacuación y Tratamiento de Aguas Residuales";
    if (s == 6)
        return "Construcción";
    if (s == 7)
        return "Comercio al por Mayor y al por Menor; Reparación de Vehículos Automotores y Motocicletas";
    if (s == 8)
        return "Transporte y Almacenamiento";
    if (s == 9)
        return "Alojamiento y Servicios de Comida";
    if (s == 10)
        return "Información y Comunicaciones";
    if (s == 11)
        return "Actividades Financieras y de Seguros";
    if (s == 12)
        return "Actividades Inmobiliarias";
    if (s == 13)
        return "Actividades Profesionales, Científicas y Técnicas";
    if (s == 14)
        return "Actividades de Servicios Administrativos y de Apoyo";
    if (s == 15)
        return "Administración Pública y Defensa; Planes de Seguridad Social de Afiliación Obligatoria";
    if (s == 16)
        return "Educación";
    if (s == 17)
        return "Actividades de Atención de la Salud Humana y de Asistencia Social";
    if (s == 18)
        return "Actividades Artísticas, de Entretenimiento y Recreación";
    if (s == 19)
        return "Otras Actividades de Servicios";

}