// carrito.routes.js
const express = require('express');
const router = express.Router();
const db = require('../models'); // Asegúrate de que este archivo apunta a tus modelos.

router.post('/agregar', async (req, res) => {
    const { productoId, cantidad } = req.body;
    
    try {
        // Encuentra el producto y verifica si existe
        const producto = await db.Producto.findByPk(productoId);
        if (!producto) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        // Agregar al carrito (puedes adaptar esta lógica a tu modelo de carrito)
        const carrito = await db.Carrito.findOrCreate({ where: { usuarioId: req.usuarioId } });
        await db.CarritoProductoVenta.create({
            carritoId: carrito[0].id,
            productoId: producto.id,
            cantidad,
        });

        res.status(200).json({ message: 'Producto añadido al carrito con éxito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al añadir producto al carrito' });
    }
});

// Ruta para obtener productos en el carrito
router.get('/productos', async (req, res) => {
    try {
        const carrito = await db.Carrito.findOne({
            where: { usuarioId: req.usuarioId },
            include: [{ model: db.Producto, through: { attributes: ['cantidad'] } }]
        });

        if (!carrito || carrito.Productos.length === 0) {
            return res.status(200).json({ productos: [] });
        }

        res.status(200).json({ productos: carrito.Productos });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener productos del carrito' });
    }
});

module.exports = router;
