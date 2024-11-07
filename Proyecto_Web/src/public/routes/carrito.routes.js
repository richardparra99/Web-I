module.exports = app => {
    const router = require("express").Router();
    const carritoController = require("../controllers/carrito.controller.js");

    // Crear un nuevo carrito
    router.post('/carritos', carritoController.createCart);

    app.use('/api', router);
};