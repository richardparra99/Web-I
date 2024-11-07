module.exports = (sequelize, Sequelize) => {
    const Carrito = sequelize.define("carrito", {
        carrito_id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        }
    }, {
        timestamps: false,
        tableName: 'carrito' // Especificar el nombre exacto de la tabla aquí
    });

    return Carrito;
};