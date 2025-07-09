document.getElementById('registroForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const form = e.target;

  const datosUsuario = {
    nombre: form.nombre.value,
    correo: form.correo.value,
    rol: form.role.value.toLowerCase(),
    contraseña: form.password.value,

  };

  try {
    const response = await fetch("https://tpi-render-3q09.onrender.com/usuarios", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(datosUsuario)
    });

    const data = await response.json();

    if (response.ok) {
      // Redirige al usuario a otra página login.html
      setTimeout(() => { window.location.href = '/tpi-render/frontTPI/html/login.html'; }, 1500);;
    } else {
      document.getElementById('mensaje').textContent = 'Error al crear usuario: ' + data.detail;
    }
  } catch (error) {
    document.getElementById('mensaje').textContent = 'Error en la solicitud: ' + error.message;
    console.error('Error:', error);
  }
});