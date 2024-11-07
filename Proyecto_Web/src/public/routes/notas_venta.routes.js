//http://localhost:3000/api/notas_venta
module.exports = app => {
    const router = require("express").Router();
    const notasVentaController = require("../controllers/notas_venta.controller.js");

    // Crear una nueva nota de venta
    router.post('/notas_venta', notasVentaController.createSaleNote);

    app.use('/api', router);
};