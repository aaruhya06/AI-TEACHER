/* ================================
   GLOBAL SCRIPT.JS
   AI TEACHER PROJECT
================================ */

document.addEventListener("DOMContentLoaded", () => {

  /* ===== LOGIN / SIGNUP PAGE ===== */
  const loginTab = document.getElementById("loginTab");
  const signupTab = document.getElementById("signupTab");
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");

  if (loginTab && signupTab && loginForm && signupForm) {

    // Switch to Login
    loginTab.addEventListener("click", () => {
      loginTab.classList.add("active");
      signupTab.classList.remove("active");
      loginForm.classList.remove("hidden");
      signupForm.classList.add("hidden");
    });

    // Switch to Signup
    signupTab.addEventListener("click", () => {
      signupTab.classList.add("active");
      loginTab.classList.remove("active");
      signupForm.classList.remove("hidden");
      loginForm.classList.add("hidden");
    });

    // Temporary login submit
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      window.location.href = "role.html";
    });

    // Temporary signup submit
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      window.location.href = "role.html";
    });
  }

  /* ===== ROLE SELECTION PAGE ===== */
  const studentBtn = document.getElementById("studentRole");
  const teacherBtn = document.getElementById("teacherRole");

  if (studentBtn) {
    studentBtn.addEventListener("click", () => {
      sessionStorage.setItem("role", "student");
      window.location.href = "category.html";
    });
  }

  if (teacherBtn) {
    teacherBtn.addEventListener("click", () => {
      sessionStorage.setItem("role", "teacher");
      window.location.href = "category.html";
    });
  }

  /* ===== CATEGORY PAGE ===== */
  const categoryForm = document.getElementById("categoryForm");

  if (categoryForm) {
    categoryForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const role = sessionStorage.getItem("role");

      if (role === "teacher") {
        window.location.href = "t-dash.html";
      } else {
        window.location.href = "s-dash.html";
      }
    });
  }

  /* ===== DASHBOARD → UPLOAD ===== */
  const uploadBtns = document.querySelectorAll(".go-upload");

  uploadBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      window.location.href = "upload.html";
    });
  });

});
