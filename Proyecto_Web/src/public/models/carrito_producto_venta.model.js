module.exports = (sequelize, Sequelize) => {
    const CarritoProductoVenta = sequelize.define("carrito_producto_venta", {
        id_carrito_producto_venta: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        visualizacion: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        carrito_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'carritos',
                key: 'carrito_id'
            }
        },
        id_producto_venta: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'producto_ventas',
                key: 'id_producto_venta'
            }
        }
    }, {
        timestamps: false, // Añade esta línea para deshabilitar los timestamps
        tableName: 'carrito_producto_venta' // Asegúrate de que el nombre de la tabla sea correcto
    });

    return CarritoProductoVenta;
};