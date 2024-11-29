module.exports = app => {
    const router = require("express").Router();
    const usuarioController = require("../controllers/usuario.controller.js");

    // Crear un nuevo usuario
    router.post('/', usuarioController.createUser);

    // Ruta para inicio de sesión
    router.post('/login', usuarioController.loginUser);

    // Middleware para depuración (opcional, útil para desarrollo)
    router.use((req, res, next) => {
        console.log(`Ruta solicitada: ${req.method} ${req.originalUrl}`);
        console.log('Body:', req.body);
        next();
    });

    // Ruta duplicada (se deja como ejemplo pero podría no ser necesaria)
    router.post('/', (req, res, next) => {
        console.log('Recibida petición POST a /usuarios');
        console.log('Body:', req.body);
        next();
    }, usuarioController.createUser);

    // Obtener todos los usuarios
    router.get('/', usuarioController.getAllUsers);

    // Registrar el router bajo la ruta base /api/usuarios
    app.use('/api/usuarios', router);
};
