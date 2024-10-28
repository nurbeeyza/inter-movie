// berfinesenn/BE-27
// POST isteği
// fetch("https://jsonplaceholder.typicode.com/posts", {
//   method: "POST",
//   body: JSON.stringify({
//     title: "foo",
//     body: "bar",
//     userId: 1,
//   }),
//   headers: {
//     "Content-type": "application/json; charset=UTF-8",
//   },
// })

document.addEventListener("DOMContentLoaded", function () {
  function showNotification(message, type = "info", duration = 3000) {
    const notification = document.getElementById("notification");

    notification.innerText = message;
    notification.classList.add(type);

    notification.style.top = "20px";

    setTimeout(function () {
      notification.style.top = "-100px";
      setTimeout(() => {
        notification.classList.remove(type);
      }, 500);
    }, duration);
  }

  const form = document.getElementById("registerForm");
  form.onsubmit = function (event) {
    event.preventDefault();
    const name = form.querySelector('input[type="text"]').value;
    const email = form.querySelector('input[type="email"]').value;
    const password = form.querySelector('input[type="password"]').value;
    const confirmPassword = form.querySelectorAll('input[type="password"]')[1]
      .value;
    const agreement = form.querySelector('input[type="checkbox"]').checked;

    // E-posta regex kontrolü (geçerli formatta olmalı) Regular Expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Şifre kontrolü (en az 8 karakter ve en az bir harf içermeli)
    const passwordRegex = /^(?=.*[A-Za-z]).{8,}$/;

    if (!name || !email || !password || !confirmPassword) {
      showNotification("Please fill out all the fields!", "error");
    } else if (!emailRegex.test(email)) {
      showNotification("Please enter a valid email address!", "error");
    } else if (!passwordRegex.test(password)) {
      showNotification(
        "Password must be at least 8 characters long and contain at least one letter!",
        "error"
      );
    } else if (password !== confirmPassword) {
      showNotification("Passwords do not match!", "error");
    } else if (!agreement) {
      showNotification("You must accept the terms and conditions!", "warning");
    } else {
      // Başarılı ise email ve şifreyi localStorage'a kaydet
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);

      showNotification("Successfully registered!", "info");

      // 2 saniye sonra login.html'e yönlendir
      setTimeout(function () {
        window.location.href = "login.html";
      }, 2000);
    }
  };
});

// berfinesenn/BE-27
