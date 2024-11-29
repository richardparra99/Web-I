module.exports = (sequelize, Sequelize) => {
    const Usuario = sequelize.define("usuario", {
        id_usuario: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true, // Permitir autoincremento
        },
        nombre: {
            type: Sequelize.STRING(30),
            allowNull: false,
        },
        contrasena: {
            type: Sequelize.STRING(10),
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING(30),
            allowNull: false,
        },
        administrador: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
    }, {
        timestamps: false,
        tableName: 'usuario',
    });

    return Usuario;
};
