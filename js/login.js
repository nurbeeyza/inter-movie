// berfinesen/BE-27

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

  const form = document.getElementById("loginForm");
  form.onsubmit = function (event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // LocalStorage'dan email ve şifreyi al
    const storedEmail = localStorage.getItem("email");
    const storedPassword = localStorage.getItem("password");

    // Giriş bilgilerini kontrol et

    if (!email || !password) {
      showNotification("Email and password fields cannot be empty!", "error");
    } else if (email === storedEmail && password === storedPassword) {
      // Giriş başarılıysa isLogin'i true yap ve index.html'e yönlendir
      localStorage.setItem("isLogin", true);
      showNotification("You have successfully logged in!", "info");

      setTimeout(function () {
        window.location.href = "index.html";
      }, 2000);
    } else {
      // Giriş bilgileri yanlışsa hata mesajı göster
      showNotification("Email or password is incorrect!", "error");
    }
  };
});

// berfinesenn//BE-27
