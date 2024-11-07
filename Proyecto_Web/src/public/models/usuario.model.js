module.exports = (sequelize, Sequelize) => {
    const Usuario = sequelize.define("usuario", {
        id_usuario: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        nombre: {
            type: Sequelize.STRING(30),
            allowNull: false
        },
        telefono: {
            type: Sequelize.STRING(10),
            allowNull: false
        },
        direccion: {
            type: Sequelize.STRING(30),
            allowNull: false
        },
        administrador: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    }, {
        timestamps: false,
        tableName: 'usuario' // Especificar el nombre exacto de la tabla aquí
    });

    return Usuario;
};