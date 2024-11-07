module.exports = (sequelize, Sequelize) => {
    const ProductoCategoria = sequelize.define("producto_categoria", {
        id_producto_categoria: {
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
        id_categoria: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'categorias',
                key: 'id_categoria'
            }
        }
    });

    return ProductoCategoria;
};