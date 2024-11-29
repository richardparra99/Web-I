document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.form-encabezado'); // Selecciona el formulario
    const mensaje = document.getElementById('mensaje-exito'); // Contenedor para el mensaje

    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Evitar el comportamiento por defecto del formulario

        // Obtén los valores de los campos y elimina los espacios en blanco al principio y al final
        const nombre = document.getElementById('nombre_id').value.trim();
        const contrasena = document.getElementById('contrasena').value.trim();
        const email = document.getElementById('correo').value.trim();

        // Limpiar los mensajes de error previos
        const mensajeErrorNombre = document.getElementById('mensaje-error-nombre');
        const mensajeErrorContrasena = document.getElementById('mensaje-error-contrasena');
        const mensajeErrorEmail = document.getElementById('mensaje-error-email');

        if (mensajeErrorNombre) mensajeErrorNombre.remove();
        if (mensajeErrorContrasena) mensajeErrorContrasena.remove();
        if (mensajeErrorEmail) mensajeErrorEmail.remove();

        let validacionCorrecta = true;

        // Validación de campos
        if (!nombre) {
            validacionCorrecta = false;
            const errorNombre = document.createElement('div');
            errorNombre.textContent = 'Por favor, ingresa un nombre válido (sin espacios).';
            errorNombre.style.color = 'red';
            document.getElementById('nombre_id').insertAdjacentElement('afterend', errorNombre);
        }

        if (!contrasena) {
            validacionCorrecta = false;
            const errorContrasena = document.createElement('div');
            errorContrasena.textContent = 'Por favor, ingresa una contraseña válida (sin espacios).';
            errorContrasena.style.color = 'red';
            document.getElementById('contrasena').insertAdjacentElement('afterend', errorContrasena);
        }

        if (!email) {
            validacionCorrecta = false;
            const errorEmail = document.createElement('div');
            errorEmail.textContent = 'Por favor, ingresa un correo electrónico válido (sin espacios).';
            errorEmail.style.color = 'red';
            document.getElementById('correo').insertAdjacentElement('afterend', errorEmail);
        }

        if (!validacionCorrecta) {
            return; // Si algún campo es inválido, no se enviará el formulario
        }

        // Enviar los datos al servidor mediante fetch si la validación es correcta
        try {
            const response = await fetch('/api/usuarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Nombre: nombre,
                    Contraseña: contrasena,
                    email: email,
                }),
            });

            const data = await response.json();

            // Si la respuesta es exitosa (201 Created)
            if (response.status === 201) {
                mensaje.textContent = '¡Registro con éxito! Ahora puedes iniciar sesión.';
                mensaje.style.color = 'green'; // Estilo para el mensaje de éxito
                mensaje.style.display = 'block'; // Hacer visible el mensaje

                // Redirigir a la página de inicio de sesión después de 3 segundos
                setTimeout(() => {
                    window.location.href = '../iniciar_sesion.html'; // Cambia esta URL por la de tu página de inicio de sesión
                }, 3000); // 3 segundos de espera antes de redirigir
            } else {
                // Si hubo un error en el registro
                mensaje.textContent = 'Hubo un problema al registrar el usuario. Intenta nuevamente.';
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
