export {isLoggedIn, login, logout};


function isLoggedIn() {
     return !(sessionStorage.getItem('currentUser') == '');
}

function login() {
      window.location.replace("http://localhost:3000/");
}

function logout() {
      sessionStorage.setItem('currentUser', '');
      window.location.replace("http://localhost:3000/");
}