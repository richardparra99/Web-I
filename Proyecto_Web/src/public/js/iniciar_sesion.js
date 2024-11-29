document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.form-encabezado'); // Selecciona el formulario
    const mensaje = document.getElementById('mensaje-exito'); // Contenedor para el mensaje

    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Evitar el comportamiento por defecto del formulario

        const nombre = document.getElementById('nombre_id').value.trim();
        const email = document.getElementById('correo').value.trim();
        const contrasena = document.getElementById('contrasena').value.trim();

        // Limpiar los mensajes de error previos
        const mensajeErrorNombre = document.getElementById('mensaje-error-nombre');
        const mensajeErrorEmail = document.getElementById('mensaje-error-email');
        const mensajeErrorContrasena = document.getElementById('mensaje-error-contrasena');

        if (mensajeErrorNombre) mensajeErrorNombre.remove();
        if (mensajeErrorEmail) mensajeErrorEmail.remove();
        if (mensajeErrorContrasena) mensajeErrorContrasena.remove();

        let validacionCorrecta = true;

        if (!nombre) {
            validacionCorrecta = false;
            const errorNombre = document.createElement('div');
            errorNombre.textContent = 'Por favor, ingresa un nombre válido.';
            errorNombre.style.color = 'red';
            errorNombre.id = 'mensaje-error-nombre'; // Asigna un id para limpiar errores futuros
            document.getElementById('nombre_id').insertAdjacentElement('afterend', errorNombre);
        }

        if (!email || !/\S+@\S+\.\S+/.test(email)) { // Validación de formato de correo
            validacionCorrecta = false;
            const errorEmail = document.createElement('div');
            errorEmail.textContent = 'Por favor, ingresa un correo electrónico válido.';
            errorEmail.style.color = 'red';
            errorEmail.id = 'mensaje-error-email'; // Asigna un id para limpiar errores futuros
            document.getElementById('correo').insertAdjacentElement('afterend', errorEmail);
        }

        if (!contrasena) {
            validacionCorrecta = false;
            const errorContrasena = document.createElement('div');
            errorContrasena.textContent = 'Por favor, ingresa una contraseña válida.';
            errorContrasena.style.color = 'red';
            errorContrasena.id = 'mensaje-error-contrasena'; // Asigna un id para limpiar errores futuros
            document.getElementById('contrasena').insertAdjacentElement('afterend', errorContrasena);
        }

        if (!validacionCorrecta) {
            return; // Si algún campo es inválido, no se enviará el formulario
        }

        // Enviar los datos al servidor mediante fetch si la validación es correcta
        try {
            const response = await fetch('/api/usuarios/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nombre: nombre,  // Incluye el nombre en la solicitud
                    email: email,
                    contrasena: contrasena,
                }),
            });

            const data = await response.json();

            if (response.status === 200) {
                // Guardar la información del usuario en localStorage
                localStorage.setItem('id_usuario', data.usuario.id); // Guarda el ID del usuario
                localStorage.setItem('nombre_usuario', data.usuario.nombre); // Guarda el nombre del usuario

                mensaje.textContent = '¡Inicio de sesión exitoso! Redirigiendo...';
                mensaje.style.color = 'green'; // Estilo para el mensaje de éxito
                mensaje.style.display = 'block'; // Hacer visible el mensaje

                // Redirigir según el rol del usuario
                setTimeout(() => {
                    if (data.usuario.isAdmin) {
                        window.location.href = '../administrador.html'; // Vista del administrador
                    } else {
                        window.location.href = '../Pagina_Principal.html'; // Vista del cliente
                    }
                }, 2000);

            } else {
                // Si hubo un error en el inicio de sesión
                mensaje.textContent = data.message || 'Usuario o contraseña incorrectos. Intenta nuevamente.';
                mensaje.style.color = 'red';
                mensaje.style.display = 'block';
            }
        } catch (error) {
            mensaje.textContent = 'Hubo un problema con la conexión. Intenta nuevamente.';
            mensaje.style.color = 'red';
            mensaje.style.display = 'block';
        }
    });
});