const express = require('express');
const router = express.Router();
const db = require('../models'); // Asegúrate de que apunta a los modelos correctos
const pool = require('../config/base'); // Si usas Sequelize, este no es necesario

// Ruta para registrar una compra
router.post('/realizar-compra', async (req, res) => {
    const { carrito, idUsuario } = req.body;

    try {
        if (!carrito || carrito.length === 0) {
            return res.status(400).json({ success: false, message: 'El carrito está vacío.' });
        }

        // Crear un nuevo carrito
        const carritoResult = await pool.query(
            `INSERT INTO carrito DEFAULT VALUES RETURNING carrito_id`
        );
        const carritoId = carritoResult.rows[0].carrito_id;

        // Insertar productos en el carrito
        for (const producto of carrito) {
            // Crear producto_venta
            const productoVentaResult = await pool.query(
                `
                INSERT INTO producto_venta (id_producto, cantidad)
                VALUES ($1, $2)
                RETURNING id_producto_venta
                `,
                [producto.id, producto.cantidad]
            );

            const idProductoVenta = productoVentaResult.rows[0].id_producto_venta;

            // Asociar producto_venta al carrito
            await pool.query(
                `
                INSERT INTO carrito_producto_venta (carrito_id, id_producto_venta)
                VALUES ($1, $2)
                `,
                [carritoId, idProductoVenta]
            );
        }

        // Crear nota de venta
        await pool.query(
            `
            INSERT INTO notas_venta (id_usuario, carrito_id)
            VALUES ($1, $2)
            `,
            [idUsuario, carritoId]
        );

        res.json({ success: true, message: 'Compra realizada con éxito.' });
    } catch (error) {
        console.error('Error al realizar la compra:', error);
        res.status(500).json({ success: false, message: 'Error al registrar la compra.' });
    }
});

// Ruta para obtener compras de un usuario
router.get('/compras/:idUsuario', async (req, res) => {
    const { idUsuario } = req.params;

    try {
        const compras = await pool.query(
            `
            SELECT 
                p.nombre_producto AS nombre,
                pv.cantidad,
                p.precio * pv.cantidad AS precio_total
            FROM notas_venta nv
            JOIN carrito c ON nv.carrito_id = c.carrito_id
            JOIN carrito_producto_venta cpv ON c.carrito_id = cpv.carrito_id
            JOIN producto_venta pv ON cpv.id_producto_venta = pv.id_producto_venta
            JOIN producto p ON pv.id_producto = p.id_producto
            WHERE nv.id_usuario = $1
            `,
            [idUsuario]
        );

        res.json({ success: true, compras: compras.rows });
    } catch (error) {
        console.error('Error al obtener compras:', error);
        res.status(500).json({ success: false, message: 'Error al obtener las compras.' });
    }
});

module.exports = router;
