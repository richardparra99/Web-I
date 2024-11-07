const express = require("express");
const db = require("./public/models");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Importar y usar las rutas de usuario
require("./public/routes/usuario.routes")(app);

// Importar y usar las rutas de notas de venta
require("./public/routes/notas_venta.routes")(app);
require("./public/routes/carrito.routes")(app); 

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
app.get('/api/personas', (request, response) => {
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
});
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