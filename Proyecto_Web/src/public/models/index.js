const dbConfig = require("../config/base.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        port: dbConfig.PORT,
        dialect: dbConfig.dialect,
        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle
        }
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Importar los modelos
db.Usuario = require("./usuario.model.js")(sequelize, Sequelize);
db.Categoria = require("./categoria.model")(sequelize, Sequelize);
db.Producto = require("./producto.model")(sequelize, Sequelize);
db.ProductoCategoria = require("./producto_categoria.model")(sequelize, Sequelize);
db.ProductoVenta = require("./producto_venta.model")(sequelize, Sequelize);
db.Carrito = require("./carrito.model")(sequelize, Sequelize);
db.CarritoProductoVenta = require("./carrito_producto_venta.model")(sequelize, Sequelize);
db.NotasVenta = require("./notas_venta.model")(sequelize, Sequelize);

// Definir las relaciones
db.Usuario.hasMany(db.NotasVenta, { foreignKey: 'id_usuario' });
db.Carrito.hasMany(db.NotasVenta, { foreignKey: 'carrito_id' });
db.Producto.hasMany(db.ProductoVenta, { foreignKey: 'id_producto' });
db.ProductoCategoria.belongsTo(db.Producto, { foreignKey: 'id_producto' });
db.ProductoCategoria.belongsTo(db.Categoria, { foreignKey: 'id_categoria' });
db.CarritoProductoVenta.belongsTo(db.Carrito, { foreignKey: 'carrito_id' });
db.CarritoProductoVenta.belongsTo(db.ProductoVenta, { foreignKey: 'id_producto_venta' });

// Prueba la conexión
db.sequelize.authenticate()
  .then(() => {
    console.log('Conexión establecida correctamente.');
  })
  .catch(err => {
    console.error('No se pudo conectar a la base de datos:', err);
  });

module.exports = db;