document
  .getElementById("loginForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const contraseña = document.getElementById("password").value;
    const datosUsuario = { email, contraseña };
    try {
      const response = await fetch(
        "https://tpi-render-3q09.onrender.com/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(datosUsuario),
        }
      );

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.usuario.id);
        localStorage.setItem("usuarioLogueado", JSON.stringify(data.usuario)); // 👈 AGREGÁ ESTA LÍNEA

        if (data.usuario.rol === "administrador") {
          setTimeout(() => {
            window.location.href = "/tpi-render/frontTPI/html/admin.html";
          }, 150);
        } else {
          setTimeout(() => {
            window.location.href = "/tpi-render/frontTPI/html/index.html";
          }, 150);
        }
      }

    } catch (error) {
      console.error("Error en el login:", error);
      alert("Ocurrió un error al intentar iniciar sesión");
    }
  });