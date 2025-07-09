// 1. Verificar si hay usuario logueado
const usuario = JSON.parse(localStorage.getItem("usuarioLogueado"));
if (!usuario) {
  alert("Debes iniciar sesión para ver tus reservas.");
  window.location.href = "login.html";
}

// 2. Obtener ID del usuario
const usuarioActual = Number(localStorage.getItem("userId"));

// 3. Función para formatear fecha de ISO a dd/mm/aaaa
function formatearFecha(fechaISO) {
  const [año, mes, dia] = fechaISO.substring(0, 10).split("-");
  return `${dia}/${mes}/${año}`;
}

// 4. Función para cargar reservas activas
function reservas() {
  const lista = document.getElementById("reservas-container");
  lista.innerHTML = "";

  fetch(`https://tpi-render-3q09.onrender.com/Reserva/activas/${usuarioActual}`)
    .then((response) => {
      if (!response.ok) throw new Error("Error al traer reservas");
      return response.json();
    })
    .then((data) => {
      if (data.length === 0) {
        lista.innerHTML = "<p>No tienes reservas activas aún.</p>";
        return;
      }

      data.forEach((reserva) => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
          <p><strong>Desde:</strong> ${formatearFecha(reserva.fecha_reserva)}</p>
          <p><strong>Hasta:</strong> ${formatearFecha(reserva.fecha_devolucion)}</p>
        `;

        // Pedir datos del vehículo relacionado
        fetch(`https://tpi-render-3q09.onrender.com/vehiculos/${reserva.vehiculo_id}`)
          .then((res) => res.json())
          .then((vehiculo) => {
            const datosVehiculo = document.createElement("div");
            datosVehiculo.innerHTML = `
              <h3>${vehiculo.marca}</h3>
              <span>Modelo: ${vehiculo.modelo}</span><br/>
              <span>Año: ${vehiculo.año}</span><br/>
              <span>Capacidad: ${vehiculo.capacidad} personas</span><br/><br/>
            `;

            // Botón eliminar
            const btnEliminar = document.createElement("button");
            btnEliminar.textContent = "Eliminar reserva";
            btnEliminar.style.backgroundColor = "#c0392b";
            btnEliminar.style.color = "white";
            btnEliminar.style.padding = "6px 12px";
            btnEliminar.style.border = "none";
            btnEliminar.style.borderRadius = "4px";
            btnEliminar.style.cursor = "pointer";

            btnEliminar.onclick = () => {
              if (confirm("¿Estás seguro de eliminar esta reserva?")) {
                fetch(`https://tpi-render-3q09.onrender.com/Reserva/${reserva.id}`, {
                  method: "DELETE",
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
                })
                  .then((r) => {
                    if (!r.ok) throw new Error("Error al eliminar reserva");
                    alert("Reserva eliminada correctamente");
                    reservas();
                  })
                  .catch((error) => {
                    console.error(error);
                    alert("Hubo un error al eliminar la reserva.");
                  });
              }
            };

            datosVehiculo.appendChild(btnEliminar);
            card.appendChild(datosVehiculo);
            lista.appendChild(card);
          });
      });
    })
    .catch((error) => {
      console.error(error);
      lista.innerHTML = "<p>Error al cargar las reservas.</p>";
    });
}

// 5. Ejecutar la función al cargar
reservas();
