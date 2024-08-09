import refreshToken from './utils/refresh-token.js';
import setNavbar from './utils/views-controller.js';
import LogoutSession from './utils/logout-session.js';
import { closeAlert } from './utils/alert-message.js';

// PROGRAM UTAMA
const user = await refreshToken();
setNavbar(user);

const btnLogout = document.getElementById('btn-logout');

if (btnLogout) {
    btnLogout.addEventListener('click', LogoutSession);
}

const btnCloseAlert = document.getElementById('btn-close-alert')

if (btnCloseAlert) {
    btnCloseAlert.addEventListener('click', closeAlert);
}