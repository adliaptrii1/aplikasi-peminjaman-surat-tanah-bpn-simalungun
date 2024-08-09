const setNavbar = (pengguna) => {
    if (pengguna === undefined || pengguna === null) {
        document.getElementById('navbarNav').innerHTML = `
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link" href="/">
                    <strong class="text-light">Home</strong>
                </a>
              </li>
          </ul>
          
          <!-- Buat login dan register -->
          <div class="ms-auto">
              <ul class="navbar-nav" id="navbar-right">
                <li class="nav-item login">
                    <a class="nav-link" href="/login">Login</a>
                </li>
                <li class="nav-item register">
                    <a class="nav-link" href="/register">Register</a>
                </li>
              
              </ul>
              
          </div>
        `;
        return;
    } 

    // Apabila pengguna adalah pengguna biasa
    if (pengguna.getIsAdmin() === 0 || pengguna.getIsAdmin() === false) {
        document.getElementById('li-berita-acara').classList.add('d-none');
    }

    // Apabila pengguna adalah staff
    if (pengguna.getIsAdmin() <= 1 || pengguna.getIsAdmin() === true) {
        document.getElementById('li-basis-data').classList.add('d-none');
    }

    document.getElementById('navbar-right').innerHTML = `
        <li class="nav-item dropdown profile-settings">
            <span class="profile-picture">
                <img src="/img/profile.png" class="rounded-circle" alt="profile" width="30px">
            </span>
            <a class="nav-link dropdown-toggle ps-3 pe-3" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <span class="profile-name">
                    ${pengguna.getNama()}
                </span>
            </a>
            <ul class="dropdown-menu">
                <li><button class="dropdown-item" href="/profile/">My Profile</button></li>
                <li><button class="dropdown-item" id="btn-logout">Logout</button></li>
            </ul>
        </li>
    `;

    return;
    
    
}
export default setNavbar;