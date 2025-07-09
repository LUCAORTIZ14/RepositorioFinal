document.addEventListener("DOMContentLoaded", async () => {
  try {
    const vehi = await fetch("https://tpi-render-3q09.onrender.com/vehiculos");
    const davehiclesta = await vehi.json();

    document.getElementById("totalVehiculos").textContent = davehiclesta.length;

    const token = localStorage.getItem("token");
    const reserv = await fetch("https://tpi-render-3q09.onrender.com/Reserva", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const reserva = await reserv.json();

    document.getElementById("reservasActivas").textContent = reserva.length;

   
  } catch (error) {
    console.error("Error al cargar indicadores:", error);
  }
});
const usuario = JSON.parse(localStorage.getItem("usuarioLogueado"));
if (usuario && usuario.rol === "admin") {
  // mostrar acceso al dashboard
  document.getElementById("linkDashboard").style.display = "block";
}
