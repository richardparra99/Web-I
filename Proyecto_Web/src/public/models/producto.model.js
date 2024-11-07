module.exports = (sequelize, Sequelize) => {
    const Producto = sequelize.define("producto", {
        id_producto: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        nombre_producto: {
            type: Sequelize.STRING(30),
            allowNull: false
        },
        precio: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        descripcion: {
            type: Sequelize.STRING(400),
            allowNull: true
        }
    });

    return Producto;
};