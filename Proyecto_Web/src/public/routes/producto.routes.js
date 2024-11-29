module.exports = app => {
    const router = require("express").Router();
    const productoController = require("../controllers/producto.controller");

    // Crear un nuevo producto
    router.post("/", productoController.create);

    // Obtener todos los productos
    router.get("/", productoController.findAll);

    // Obtener un producto por ID
    router.get("/:id", productoController.findOne);

    // Actualizar un producto por ID
    router.put("/:id", productoController.update);

    // Eliminar un producto por ID
    router.delete("/:id", productoController.delete);

    // Middleware para depuración (opcional, útil para desarrollo)
    router.use((req, res, next) => {
        console.log(`Ruta solicitada: ${req.method} ${req.originalUrl}`);
        console.log("Body:", req.body);
        next();
    });

    // Ruta duplicada (ejemplo adicional, pero no necesaria)
    router.post("/", (req, res, next) => {
        console.log("Recibida petición POST a /productos");
        console.log("Body:", req.body);
        next();
    }, productoController.create);

    // Registrar el router bajo la ruta base /api/productos
    app.use("/api/productos", router);
};
