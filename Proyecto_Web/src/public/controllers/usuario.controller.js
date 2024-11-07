const db = require("../../public/models");
const Usuario = db.Usuario;

exports.createUser = async (req, res) => {
    try {
        const nuevoUser = await Usuario.create(req.body);
        res.status(201).json(nuevoUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll(); // Obtiene todos los usuarios
        res.status(200).json(usuarios); // Devuelve los usuarios en formato JSON
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
