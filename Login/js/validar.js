document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita el envío del formulario

    let valid = true;

    // Obtener los elementos de entrada
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirm-password');

    // Obtener los elementos de mensaje de error
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');

    // Validar campo nombre
    if (name.value.trim() === '') {
        nameError.style.display = 'block';
        valid = false;
    } else {
        nameError.style.display = 'none';
    }

    // Validar campo correo electrónico
    if (email.value.trim() === '' || !email.validity.valid) {
        emailError.style.display = 'block';
        valid = false;
    } else {
        emailError.style.display = 'none';
    }

    // Validar campo contraseña
    if (password.value.trim() === '') {
        passwordError.style.display = 'block';
        valid = false;
    } else {
        passwordError.style.display = 'none';
    }

    // Validar confirmación de contraseña
    if (confirmPassword.value.trim() === '' || confirmPassword.value !== password.value) {
        confirmPasswordError.style.display = 'block';
        valid = false;
    } else {
        confirmPasswordError.style.display = 'none';
    }

    if (valid) {
        // Crear el objeto JSON
        const formData = {
            name: name.value.trim(),
            email: email.value.trim(),
            password: password.value.trim(),
        };

        // Mostrar el JSON en consola
        console.log(JSON.stringify(formData, null, 2));

        // Opcional: Mostrar el JSON en pantalla
        alert('Datos en formato JSON:\n' + JSON.stringify(formData, null, 2));
    }
});
