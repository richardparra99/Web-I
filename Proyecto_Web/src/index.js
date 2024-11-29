const express = require("express");
const db = require("./public/models");
const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Importar y usar las rutas de usuario
require("./public/routes/usuario.routes")(app);
require("./public/routes/producto.routes")(app);

// Importar y usar las rutas de notas de venta
require("./public/routes/notas_venta.routes")(app);

const carritoRoutes = require('./public/routes/carrito.routes');
app.use('/api/carrito', carritoRoutes);

// Simulamos una base de datos en memoria
let compras = []; // Array para almacenar las compras

// Ruta para manejar la compra
app.post('/api/realizar-compra', (req, res) => {
    const { carrito, idUsuario } = req.body;

    if (!carrito || carrito.length === 0) {
        return res.status(400).json({ success: false, message: 'El carrito está vacío' });
    }

    // Calculamos el total de la compra
    const totalCompra = carrito.reduce((total, item) => total + item.precio * item.cantidad, 0);

    // Guardamos la compra en la "base de datos"
    const compra = {
        idUsuario,
        productos: carrito,
        total: totalCompra,
        fecha: new Date().toISOString(),
    };

    compras.push(compra); // Guardamos la compra

    return res.status(200).json({ success: true, message: 'Compra realizada con éxito', compra });
});

// Endpoint para obtener las compras de un usuario
app.get('/api/compras/:idUsuario', async (req, res) => {
  const { idUsuario } = req.params;

  try {
      const compras = await pool.query(
          `
          SELECT 
              p.nombre_producto AS nombre,
              pv.cantidad,
              p.precio * pv.cantidad AS precio_total
          FROM notas_venta nv
          JOIN carrito c ON nv.carrito_id = c.carrito_id
          JOIN carrito_producto_venta cpv ON c.carrito_id = cpv.carrito_id
          JOIN producto_venta pv ON cpv.id_producto_venta = pv.id_producto_venta
          JOIN producto p ON pv.id_producto = p.id_producto
          WHERE nv.id_usuario = $1 AND cpv.visualizacion = TRUE
          `,
          [idUsuario]
      );

      res.json({ success: true, compras: compras.rows });
  } catch (error) {
      console.error('Error al obtener compras:', error);
      res.status(500).json({ success: false, message: 'Error al obtener las compras' });
  }
});

// Ruta para ver las compras de un usuario
app.get('/api/ver-compras/:idUsuario', (req, res) => {
    const idUsuario = req.params.idUsuario;
    // Filtramos las compras por el idUsuario
    const comprasUsuario = compras.filter(compra => compra.idUsuario == idUsuario);
    
    if (comprasUsuario.length === 0) {
        return res.status(404).json({ success: false, message: 'No se encontraron compras para este usuario' });
    }

    return res.status(200).json({ success: true, compras: comprasUsuario });
});


app.post('/api/productos', (req, res) => {
    const { nombre, precio } = req.body;

    // Verificar que los campos existan
    if (!nombre || !precio) {
        return res.status(400).json({ message: 'Nombre y precio son requeridos.' });
    }

    // Guardar el producto en una base de datos simulada o en memoria
    productosDB.push({ nombre, precio });

    res.status(201).json({ message: 'Producto agregado correctamente.' });
});

// Ruta para eliminar un producto
app.delete('/api/productos/:nombre', (req, res) => {
    const { nombre } = req.params;

    productosDB = productosDB.filter(producto => producto.nombre !== nombre);
    res.status(200).json({ message: 'Producto eliminado correctamente.' });
});


const PORT = process.env.PORT || 3000;

db.sequelize.sync({ force: false })  // Solo una llamada a sync es suficiente
  .then(() => {
    console.log("Modelos sincronizados con la base de datos");
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error al sincronizar los modelos:", err);
  });

  // Ruta principal
app.get('/', (request, response) => {
  response.sendFile(__dirname + '/public/index.html'); // Asegúrate de que index.html esté en el directorio 'public'
});

// Middleware para procesar cookies
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// Ruta para cerrar sesión
app.post('/logout', (req, res) => {
    // Si usas un token JWT en la cookie, puedes eliminarla así
    res.clearCookie('token');  // Nombre de la cookie que contiene el token
    res.status(200).json({ message: 'Sesión cerrada correctamente' });
});


//`Servidor corriendo en el puerto ${PORT}`

// Sincronizar modelos y iniciar servidor
/*db.sequelize.sync({ force: false })
  .then(() => {
    console.log("Modelos sincronizados con la base de datos");
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error al sincronizar los modelos:", err);
  });*/

// Rutas
/*app.get('/api/personas', (request, response) => {
    response.contentType('application/json');
    response.send(personas);
});

app.post('/api/personas', (request, response) => {
    const personaDatos = request.body;
    const newPersona = {
        nombre: personaDatos.nombre,
        edad: personaDatos.edad
    };
    personas.push(newPersona);
    response.send(newPersona);
});

app.put('/api/personas', (request, response) => {
    const params = request.body;
    const index = params.index;
    const personaExistente = personas[index];

    if (!personaExistente) {
        response.status(404).send('La persona no se encuentra');
        return;
    }

    personaExistente.nombre = params.person.nombre;
    personaExistente.edad = params.person.edad;
    response.send(personaExistente);
});

app.delete('/api/persona/:index', (request, response) => {
    const index = request.params.index;
    const persona = personas[index];

    if (!persona) {
        response.status(404).send('La persona no se encuentra');
        return;
    }

    personas.splice(index, 1);
    response.send(persona);
});

// Endpoints básicos
app.get('/', (request, response) => {
    response.send('Hola Mundoo!!!');
});

app.get('/hello', (request, response) => {
    response.send('hello');
});

app.get('/ping', (request, response) => {
    response.send('pong');
});/*
/*const express = require("express");
const db = require("./public/models");
const app = express();

app.use(express.json());
app.use(express.static('public'));

const PORT = process.env.PORT || 3000;

db.sequelize.sync({ force: false })
  .then(() => {
    console.log("Modelos sincronizados con la base de datos");
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error al sincronizar los modelos:", err);
  });

/*const personas = [
    {
        nombre: "Angelo Lanzarte",
        edad: 24
    },
    {
        nombre: "Richard Parra",
        edad: 25
    },
];*/



// localhost:3000/api/personas
/*app.get('/api/personas', (request, response) => {
    response.contentType('application/json');
    response.send(personas);
});

app.post('/api/personas', (request, response) => {
    const personaDatos = request.body;

    const newPersona = {
        nombre: personaDatos.nombre,
        edad: personaDatos.edad
    };

    personas.push(newPersona);
    response.send(newPersona);
});

app.put('/api/personas', (request, response) => {
    const params = request.body;
    const index = params.index;
    
    // Acceder al array global `personas` para verificar si la persona existe en la posición indicada
    const personaExistente = personas[index];

    if (!personaExistente) {
        response.status(404).send('La persona no se encuentra');
        return;
    }

    // Actualizar los datos de la persona existente
    personaExistente.nombre = params.person.nombre;
    personaExistente.edad = params.person.edad;

    response.send(personaExistente);
});


// http://localhost:3000/api/persona/1
app.delete('/api/persona/:index', (request, response) => {
    const index = request.params.index;
    const persona = personas[index];

    if (!persona) {
        response.status(404).send('La persona no se encuentra');
        return;
    }

    personas.splice(index, 1); // Corrección: cambiamos `solice` a `splice`
    response.send(persona); // Retorna la persona eliminada
});





// endpoint
app.get('/', (request, response) => {
    response.send('Hola Mundoo!!!')
});

app.get('/hello', (request, response) => {
    response.send('hello')
});

app.get('/ping', (request, response) => {
    response.send('pong')
});

app.listen(3000, function() {
    console.log('Server is running on port 3000');
});*/