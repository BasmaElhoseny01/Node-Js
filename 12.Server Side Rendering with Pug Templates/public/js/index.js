import '@babel/polyfill'
import { login, logOut } from './login'
import { displayMap } from './mapbox';


const mapBox = document.getElementById('map')
const loginForm = document.querySelector('.form')
const logOutBtn = document.querySelector('.nav__el--logout');


if (mapBox) {
    const locations = JSON.parse(document.getElementById('map').dataset.locations);
    displayMap(locations);
}

if (loginForm) {
    loginForm.addEventListener('submit', e => {
        e.preventDefault();

        //values
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        login(email, password)

    })
}

if (logOutBtn) {
    logOutBtn.addEventListener('click', logOut);
}

