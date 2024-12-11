document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let valid = true;

    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmarPass = document.getElementById('confirm-password');

    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const passError = document.getElementById('passwordError');
    const confirmarPassError = document.getElementById('confirmPasswordError');
    
    if (name.value.trim() === ('')) {
        nameError.style.display = 'block';
        valid = false;
    } else {
        nameError.style.display = 'none'
    }

    if (email.value.trim() === ('') || !email.validity.valid) {
        emailError.style.display = 'block';
        valid = false;
    } else {
        emailError.style.display = 'none'
    }

    if (password.value.trim() === ('') ){
        passError.style.display = 'block';
        valid = false;
    } else {
        passError.style.display = 'none';
    }

    if (confirmarPass.value.trim() === '' || confirmarPass.valude !== confirmarPass.value) {
        confirmarPassError.style.display = 'block';
        value = false;
    } else {
        confirmarPassError.style.display = 'none';
    }

    if (valid) {
        const formData = {
            name: name.value.trim(),
            email: email.value.trim(),
            password: password.value.trim()
        };

        console.log(JSON.stringify(formData, null, 2));

        alert('Datos JSON:\n' + JSON.stringify(formData, null, 2));

    }
    
});