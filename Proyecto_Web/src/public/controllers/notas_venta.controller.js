const db = require("../models");
const NotasVenta = db.NotasVenta;
const CarritoProductoVenta = db.CarritoProductoVenta;

// Para debug, añade estas líneas:
console.log("Modelos disponibles:", Object.keys(db));
console.log("NotasVenta:", NotasVenta);

exports.createSaleNote = async (req, res) => {
    const { id_usuario, carrito_id, productos } = req.body;

    // Primero, verifica los datos que estás recibiendo
    console.log('Datos recibidos:', {
        id_usuario,
        carrito_id,
        productos
    });

    if (!id_usuario || !carrito_id || !Array.isArray(productos) || productos.length === 0) {
        return res.status(400).json({ 
            message: 'Faltan datos requeridos o formato de productos incorrecto',
            received: { id_usuario, carrito_id, productos }
        });
    }

    try {
        // Verificar si la combinación de id_usuario y carrito_id ya existe
        const existingSaleNote = await NotasVenta.findOne({
            where: { id_usuario, carrito_id }
        });

        if (existingSaleNote) {
            return res.status(400).json({ 
                message: 'Ya existe una nota de venta para este usuario y carrito' 
            });
        }

        // Crear la nota de venta
        const newSaleNote = await NotasVenta.create({ 
            id_usuario, 
            carrito_id 
        });
        
        // Registrar los productos en el carrito
        const saleNoteProducts = productos.map(producto => ({
            carrito_id,
            id_producto_venta: producto.id_producto_venta,
            cantidad: producto.cantidad
        }));

        await CarritoProductoVenta.bulkCreate(saleNoteProducts);

        res.status(201).json({ 
            message: 'Nota de venta registrada con éxito', 
            saleNote: newSaleNote 
        });
    } catch (error) {
        // Mostrar el error completo en la consola
        console.error('Error completo:', {
            message: error.message,
            stack: error.stack,
            error: error
        });
        
        // Enviar una respuesta más detallada
        res.status(500).json({ 
            message: 'Error al registrar la nota de venta',
            error: error.message,
            details: error.errors ? error.errors.map(e => e.message) : null
        });
    }
};