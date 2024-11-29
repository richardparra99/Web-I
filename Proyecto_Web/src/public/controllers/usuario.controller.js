const db = require("../../public/models");
const Usuario = db.Usuario;

exports.createUser = async (req, res) => {
    const { Nombre, Contraseña, email } = req.body;

    // Verificar que los datos están siendo recibidos correctamente
    console.log('Datos recibidos:', req.body);

    if (!Nombre || !Contraseña || !email) {
        return res.status(400).json({ message: "Todos los campos son requeridos." });
    }

    try {
        const nuevoUser = await Usuario.create({
            nombre: Nombre,
            contrasena: Contraseña,
            email,
        });

        console.log('Usuario creado:', nuevoUser); // Verifica que se haya creado correctamente
        res.status(201).json(nuevoUser);
    } catch (error) {
        console.error('Error al crear el usuario:', error);
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


exports.loginUser = async (req, res) => {
    console.log('Datos recibidos:', req.body);
  
    const { email, contrasena } = req.body;
  
    if (!email || !contrasena) {
      return res.status(400).json({ message: "Todos los campos son requeridos." });
    }
  
    try {
      const usuario = await Usuario.findOne({ where: { email } });
  
      if (usuario && usuario.contrasena === contrasena) {
        // Incluye el campo administrador en la respuesta
        return res.status(200).json({
          message: "Inicio de sesión exitoso",
          usuario: {
            nombre: usuario.nombre,
            email: usuario.email,
            isAdmin: usuario.administrador, // Asegúrate de que este campo esté definido
          },
        });
      } else {
        return res.status(401).json({ message: "Credenciales incorrectas." });
      }
    } catch (error) {
      console.error('Error en inicio de sesión:', error);
      res.status(500).json({ message: "Ocurrió un error al procesar la solicitud." });
    }
  };
  


