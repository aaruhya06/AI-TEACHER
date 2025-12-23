/* ================================
   GLOBAL SCRIPT.JS
   AI TEACHER PROJECT
================================ */

document.addEventListener("DOMContentLoaded", () => {

  /* ================================
     LOGIN / SIGNUP PAGE
  ================================= */
  const loginTab = document.getElementById("loginTab");
  const signupTab = document.getElementById("signupTab");
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");

  if (loginTab && signupTab && loginForm && signupForm) {

    // Tabs
    loginTab.addEventListener("click", () => {
      loginTab.classList.add("active");
      signupTab.classList.remove("active");
      loginForm.classList.remove("hidden");
      signupForm.classList.add("hidden");
    });

    signupTab.addEventListener("click", () => {
      signupTab.classList.add("active");
      loginTab.classList.remove("active");
      signupForm.classList.remove("hidden");
      loginForm.classList.add("hidden");
    });
  }

  /* ===== LOGIN SUBMIT WITH LOADER ===== */
  const loginBtn = document.getElementById("loginBtn");
  const loginText = document.getElementById("loginText");
  const loginLoader = document.getElementById("loginLoader");

  loginForm?.addEventListener("submit", (e) => {
    e.preventDefault();

    if (loginText && loginLoader) {
      loginText.classList.add("hidden");
      loginLoader.classList.remove("hidden");
    }

    setTimeout(() => {
      window.location.href = "role.html";
    }, 1200);
  });

  signupForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    window.location.href = "role.html";
  });

  /* ===== PASSWORD VISIBILITY ===== */
  const toggleLoginPass = document.getElementById("toggleLoginPass");
  const loginPassword = document.getElementById("loginPassword");

  toggleLoginPass?.addEventListener("click", () => {
    loginPassword.type =
      loginPassword.type === "password" ? "text" : "password";
  });

  const toggleSignupPass = document.getElementById("toggleSignupPass");
  const signupPassword = document.getElementById("signupPassword");

  toggleSignupPass?.addEventListener("click", () => {
    signupPassword.type =
      signupPassword.type === "password" ? "text" : "password";
  });

  /* ===== FORGOT PASSWORD MODAL ===== */
  const forgotPassword = document.getElementById("forgotPassword");
  const forgotModal = document.getElementById("forgotModal");
  const closeModal = document.getElementById("closeModal");

  forgotPassword?.addEventListener("click", () => {
    forgotModal.classList.remove("hidden");
  });

  closeModal?.addEventListener("click", () => {
    forgotModal.classList.add("hidden");
  });

  /* ================================
     ROLE SELECTION PAGE
  ================================= */
  const studentBtn = document.getElementById("studentRole");
  const teacherBtn = document.getElementById("teacherRole");

  studentBtn?.addEventListener("click", () => {
    sessionStorage.setItem("role", "student");
    window.location.href = "category.html";
  });

  teacherBtn?.addEventListener("click", () => {
    sessionStorage.setItem("role", "teacher");
    window.location.href = "category.html";
  });

  /* ================================
     CATEGORY SELECTION PAGE
  ================================= */
  const categoryCards = document.querySelectorAll(".category-card");

  categoryCards.forEach(card => {
    card.addEventListener("click", () => {
      const selectedCategory = card.getAttribute("data-category");
      sessionStorage.setItem("category", selectedCategory);

      const role = sessionStorage.getItem("role");
      window.location.href =
        role === "teacher" ? "t-dash.html" : "s-dash.html";
    });
  });

  /* ================================
     DASHBOARD → UPLOAD
  ================================= */
  const uploadBtns = document.querySelectorAll(".go-upload");

  uploadBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      window.location.href = "upload.html";
    });
  });

  /* ================================
     UPLOAD PAGE
  ================================= */
  const dropZone = document.getElementById("dropZone");
  const pdfInput = document.getElementById("pdfInput");
  const uploadBtn = document.getElementById("uploadBtn");
  const fileInfo = document.getElementById("fileInfo");
  const fileName = document.getElementById("fileName");
  const progressWrap = document.getElementById("progressWrap");
  const progressFill = document.getElementById("progressFill");

  if (dropZone && pdfInput) {

    dropZone.addEventListener("click", () => pdfInput.click());

    dropZone.addEventListener("dragover", e => {
      e.preventDefault();
      dropZone.style.borderColor = "gold";
    });

    dropZone.addEventListener("dragleave", () => {
      dropZone.style.borderColor = "rgba(255, 215, 0, 0.35)";
    });

    dropZone.addEventListener("drop", e => {
      e.preventDefault();
      dropZone.style.borderColor = "rgba(255, 215, 0, 0.35)";
      pdfInput.files = e.dataTransfer.files;
      handleFile();
    });

    pdfInput.addEventListener("change", handleFile);

    function handleFile() {
      if (!pdfInput.files.length) return;
      fileName.textContent = pdfInput.files[0].name;
      fileInfo.classList.remove("hidden");
      uploadBtn.classList.remove("hidden");
    }

    uploadBtn?.addEventListener("click", () => {
      uploadBtn.disabled = true;
      progressWrap.classList.remove("hidden");

      let progress = 0;
      const timer = setInterval(() => {
        progress += 10;
        progressFill.style.width = progress + "%";

        if (progress >= 100) {
          clearInterval(timer);

          sessionStorage.setItem(
            "summary",
            "This is an AI-generated summary.\n\n• Key concept 1\n• Key concept 2\n• Key concept 3"
          );

          window.location.href = "result.html";
        }
      }, 250);
    });
  }

  /* ================================
     RESULT PAGE
  ================================= */
  const summaryTextEl = document.getElementById("summaryText");
  const uploadAnotherBtn = document.getElementById("uploadAnotherBtn");
  const downloadBtn = document.getElementById("downloadBtn");

  if (summaryTextEl) {
    summaryTextEl.textContent =
      sessionStorage.getItem("summary") ||
      "No summary available. Upload a PDF.";
  }

  uploadAnotherBtn?.addEventListener("click", () => {
    window.location.href = "upload.html";
  });

  downloadBtn?.addEventListener("click", () => {
    const text = summaryTextEl.textContent;
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "AI_Summary.txt";
    a.click();

    URL.revokeObjectURL(url);
  });

});
