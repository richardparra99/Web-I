module.exports = (sequelize, Sequelize) => {
    const NotasVenta = sequelize.define("notas_venta", {
        id_usuario: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            references: {
                model: 'usuario',
                key: 'id_usuario'
            }
        },
        carrito_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            references: {
                model: 'carrito',
                key: 'carrito_id'
            }
        }
    }, {
        timestamps: false,
        tableName: 'notas_venta' // Especificar el nombre exacto de la tabla aquí
    });

    return NotasVenta;
};