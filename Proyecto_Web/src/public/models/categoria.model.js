module.exports = (sequelize, Sequelize) => {
    const Categoria = sequelize.define("categoria", {
        id_categoria: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        nombre_categoria: {
            type: Sequelize.STRING(30),
            allowNull: false
        }
    });

    return Categoria;
};