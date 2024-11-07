const db = require("../models");
const Carrito = db.Carrito;

exports.createCart = async (req, res) => {
    const { carrito_id } = req.body;

    // Validar que se proporcione un carrito_id
    if (!carrito_id) {
        return res.status(400).json({
            message: 'Se requiere proporcionar un carrito_id'
        });
    }

    try {
        // Verificar si el carrito ya existe
        const existingCart = await Carrito.findOne({
            where: { carrito_id: carrito_id }
        });

        if (existingCart) {
            return res.status(400).json({
                message: `El carrito con ID ${carrito_id} ya existe`
            });
        }

        // Si no existe, crear el nuevo carrito
        const newCart = await Carrito.create({
            carrito_id: carrito_id
        });
        
        res.status(201).json({
            message: 'Carrito creado con éxito',
            carrito: newCart
        });
    } catch (error) {
        console.error('Error al crear carrito:', error);
        res.status(500).json({
            message: 'Error al crear el carrito',
            error: error.message
        });
    }
};