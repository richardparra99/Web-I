const db = require("../../public/models");
const Producto = db.Producto;

// Crear un nuevo producto
// Crear un nuevo producto
exports.create = async (req, res) => {
    try {
        console.log("Datos recibidos:", req.body); // Verifica los datos recibidos

        const { id_producto, nombre_producto, precio, descripcion } = req.body;

        if (!id_producto || !nombre_producto || !precio || !descripcion) {
            return res.status(400).send({ message: "Todos los campos son requeridos." });
        }

        const producto = await Producto.create({
            id_producto,
            nombre_producto,
            precio,
            descripcion
        });

        res.status(201).send(producto);
    } catch (error) {
        console.error("Error al crear producto:", error); // Registro de errores detallado
        res.status(500).send({ message: error.message });
    }
};



// Obtener todos los productos
exports.findAll = async (req, res) => {
    try {
        const productos = await Producto.findAll();
        res.status(200).send(productos);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

// Obtener un producto por ID
exports.findOne = async (req, res) => {
    try {
        const { id } = req.params;
        const producto = await Producto.findByPk(id);

        if (!producto) {
            return res.status(404).send({ message: `Producto con ID ${id} no encontrado.` });
        }

        res.status(200).send(producto);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

// Actualizar un producto
exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre_producto, precio, descripcion } = req.body;

        const [updated] = await Producto.update(
            { nombre_producto, precio, descripcion },
            { where: { id_producto: id } }
        );

        if (!updated) {
            return res.status(404).send({ message: `Producto con ID ${id} no encontrado.` });
        }

        res.status(200).send({ message: "Producto actualizado con éxito." });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

// Eliminar un producto
exports.delete = async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await Producto.destroy({ where: { id_producto: id } });

        if (!deleted) {
            return res.status(404).send({ message: `Producto con ID ${id} no encontrado.` });
        }

        res.status(200).send({ message: "Producto eliminado con éxito." });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
