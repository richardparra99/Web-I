module.exports = (sequelize, Sequelize) => {
    const ProductoVenta = sequelize.define("producto_venta", {
        id_producto_venta: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        id_producto: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'productos',
                key: 'id_producto'
            }
        },
        cantidad: {
            type: Sequelize.INTEGER,
            allowNull: true
        }
    }, {
        timestamps: false,
        tableName: 'producto_venta' // Especificar el nombre exacto de la tabla aquí
    });

    return ProductoVenta;
};