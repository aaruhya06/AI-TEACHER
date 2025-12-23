// ---------- Login / Signup Toggle ----------
function showLogin() {
  document.getElementById('loginForm').classList.remove('hidden');
  document.getElementById('signupForm').classList.add('hidden');

  document.getElementById('loginTab').classList.add('active');
  document.getElementById('signupTab').classList.remove('active');
}

function showSignup() {
  document.getElementById('signupForm').classList.remove('hidden');
  document.getElementById('loginForm').classList.add('hidden');

  document.getElementById('signupTab').classList.add('active');
  document.getElementById('loginTab').classList.remove('active');
}



// ---------- Login Page ----------
function goToRole() {
  sessionStorage.clear(); // fresh start
  window.location.href = 'role.html';
}

// ---------- Role Selection ----------
function selectRole(role) {
  sessionStorage.setItem('role', role);
  window.location.href = 'category.html';
}

// ---------- Category Page ----------
const role = sessionStorage.getItem('role');
const categoryTitle = document.getElementById('categoryTitle');

if (categoryTitle) {
  if (role === 'teacher') {
    categoryTitle.textContent = 'You are a Teacher at?';
  } else {
    categoryTitle.textContent = 'You are a Student at?';
  }
}

function selectCategory(category) {
  sessionStorage.setItem('category', category);

  const role = sessionStorage.getItem('role');

  if (role === 'teacher') {
    window.location.href = 't-dash.html';
  } else {
    window.location.href = 's-dash.html';
  }
}

function logout() {
  sessionStorage.clear();
  window.location.href = 'index.html';
}
// ---------- Feature Selection ----------
function selectFeature(feature) {
  sessionStorage.setItem('feature', feature);
  window.location.href = 'upload.html';
}
