document.addEventListener("DOMContentLoaded", function () {
  const cerrarSesionBtn = document.getElementById("cerrarSesionBtn");

  cerrarSesionBtn.addEventListener("click", function () {
      // Hacer una solicitud POST para cerrar sesión
      fetch("/logout", {
          method: "POST",
          credentials: "include", // Si usas cookies para la autenticación
      })
          .then((response) => {
              if (response.ok) {
                  return response.json();
              } else {
                  throw new Error("Error al cerrar sesión");
              }
          })
          .then((data) => {
              console.log(data.message); // Mensaje de éxito
              // Eliminar usuario_id del almacenamiento local
              localStorage.removeItem("usuario_id");
              // Redirigir al inicio de sesión
              window.location.href = "../iniciar_sesion.html";
          })
          .catch((error) => {
              console.error("Error al cerrar sesión:", error);
          });
  });
});
