module.exports = app => {
    const router = require("express").Router();
    const usuarioController = require("../controllers/usuario.controller.js");

    // Crear un nuevo usuario
    // router.post('/usuarios', usuarioController.createUser);

    // En usuario.routes.js
    router.post('/usuarios', (req, res, next) => {
        console.log('Recibida petición POST a /usuarios');
        console.log('Body:', req.body);
        next();
    }, usuarioController.createUser);

    // Obtener todos los usuarios
    router.get('/usuarios', usuarioController.getAllUsers);

    app.use('/api', router);
};
