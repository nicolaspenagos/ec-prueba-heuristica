class Accepted {
    constructor(accepted, counter) {
        this.accepted = accepted;
        this.counter = counter;
    }
    render = () => {

        let component = document.createElement('div');
        component.className = 'accepted';

        let sepline = document.createElement('div');
        sepline.className = 'request__sepline';
        if (this.counter != 0) {
            component.appendChild(sepline);
        }


        let left = document.createElement('div');
        left.className = 'accepted__left';
        component.appendChild(left);


        let right = document.createElement('div');
        right.className = 'accepted__right';
        component.appendChild(right);

        let name = document.createElement('p');
        name.className = 'text text__subheading';
        name.innerHTML = this.accepted.name + ' ' + this.accepted.lastName;
        left.appendChild(name);

        let id = document.createElement('p');
        id.className = 'text text__cuerpo';
        //id.innerHTML = 'id:' + this.accepted.id;
        left.appendChild(id);

        let date = document.createElement('p');
        date.className = 'text text__cuerpo';
        date.innerHTML = '' + this.accepted.requestDate;
        left.appendChild(date);

        let email = document.createElement('div');
        email.className = 'accepted__row';

        let email_icon = document.createElement('img');
        email_icon.className = 'job_icon';
        email_icon.src = './images/email.png';
        email.appendChild(email_icon);

        let company_icon = document.createElement('img');
        company_icon.className = 'company_icon';
        company_icon.src = './images/company.png';


        let job_icon = document.createElement('img');
        job_icon.className = 'job_icon';
        job_icon.src = './images/job.png';


        let company = document.createElement('div');
        company.className = 'accepted__row';
        company.appendChild(company_icon);

        let job = document.createElement('div');
        job.className = 'accepted__row';
        job.appendChild(job_icon);

        let job_name = document.createElement('p');
        job_name.innerHTML = this.accepted.position;
        job_name.className = 'text text__cuerpo text__cuerpo--list';
        job.appendChild(job_name);

        let company_name = document.createElement('p');
        company_name.innerHTML = this.accepted.company;
        company_name.className = 'text text__cuerpo text__cuerpo--list';
        company.appendChild(company_name);

        let email_text = document.createElement('p');
        email_text.innerHTML = this.accepted.email
        email_text.className = 'text text__cuerpo text__cuerpo--list';
        email.appendChild(email_text);

        let deleteButton = document.createElement('button');
        deleteButton.className = 'button button--red button__delete';
        deleteButton.innerHTML = 'Eliminar';



        deleteButton.addEventListener('click', () => {
            database.ref('accepted/' + this.accepted.id).set(null);
            this.accepted.accepted = false;
            database.ref('users/' + this.accepted.id).set(this.accepted);
        });

        let seeMoreBtn = document.createElement('p');
        seeMoreBtn.innerHTML = 'Ver todo';
        seeMoreBtn.className = 'seeMoreBtn';
        seeMoreBtn.addEventListener('click', () => {
            if (seeMoreBtn.innerHTML == 'Ver todo') {
                let className = '.addInfo' + this.accepted.id;

                let divAddInfo = document.querySelector(className);
                divAddInfo.classList.remove('hidden');
                seeMoreBtn.innerHTML = 'Ver menos';
            } else {
                let className = '.addInfo' + this.accepted.id;

                let divAddInfo = document.querySelector(className);
                divAddInfo.classList.add('hidden');
                seeMoreBtn.innerHTML = 'Ver todo';
            }

        });

        let addInfo = document.createElement('div');
        addInfo.className = 'hidden addInfo ' + 'addInfo' + this.accepted.id;;

        let macroSector = document.createElement('p');
        macroSector.className = 'text text__cuerpo ';
        if (this.accepted.macrosector) {
            macroSector.innerHTML = '<strong>Macrosector:</strong> ' + this.accepted.macrosector;
        } else {
            macroSector.innerHTML = '<strong>Macrosector:</strong> N/A';
        }
        let sector = document.createElement('p');
        sector.className = 'text text__cuerpo ';
        if (this.accepted.sector) {
            sector.innerHTML = '<strong>Sector:</strong> ' + getSector1(this.accepted.sector);
        } else {
            sector.innerHTML = '<strong>Sector:</strong> N/A';
        }
        let benchmarking = document.createElement('p');
        benchmarking.className = 'text text__cuerpo ';
        if (this.accepted.benchmarking == 'yes') {
            benchmarking.innerHTML = '<strong>Benchmarking:</strong> Si';
        } else {
            benchmarking.innerHTML = '<strong>Benchmarking:</strong> No';
        }
        let questionaryFinished = document.createElement('p');
        questionaryFinished.className = 'text text__cuerpo ';
        if (this.accepted.results) {
            questionaryFinished.innerHTML = '<strong>Cuestionario:</strong> Finalizado';
        } else {
            questionaryFinished.innerHTML = '<strong>Cuestionario:</strong> No finalizado';
        };



        addInfo.appendChild(macroSector);
        addInfo.appendChild(sector);
        addInfo.appendChild(benchmarking);
        addInfo.appendChild(questionaryFinished);


        right.appendChild(email);
        right.appendChild(company);
        right.appendChild(job);
        right.appendChild(addInfo);
        right.appendChild(deleteButton);



        right.appendChild(seeMoreBtn);

        return component;

    }
}

let getSector1 = (s) => {
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