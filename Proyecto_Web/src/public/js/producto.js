const productos = [
    {
        id: 1,
        nombre: "Scarface",
        categoria: "Acción",
        descripcion: "Scarface (1983), dirigida por Brian De Palma y escrita por Oliver Stone, es un clásico del cine de gánsteres. La película narra la historia de Tony Montana (interpretado por Al Pacino), un inmigrante cubano que llega a Miami en busca del 'sueño americano'.",
        precio: "25.00bs.-",
        imagen: "../images/scarface.jpg"
    },
    {
        id: 7,
        nombre: "Scarface",
        categoria: "Acción",
        descripcion: "Scarface (1983), dirigida por Brian De Palma y escrita por Oliver Stone, es un clásico del cine de gánsteres. La película narra la historia de Tony Montana (interpretado por Al Pacino), un inmigrante cubano que llega a Miami en busca del 'sueño americano'.",
        precio: "25.00bs.-",
        imagen: "../images/scarface.jpg"
    },
    {
        id: 8,
        nombre: "Scarface",
        categoria: "Acción",
        descripcion: "Scarface (1983), dirigida por Brian De Palma y escrita por Oliver Stone, es un clásico del cine de gánsteres. La película narra la historia de Tony Montana (interpretado por Al Pacino), un inmigrante cubano que llega a Miami en busca del 'sueño americano'.",
        precio: "25.00bs.-",
        imagen: "../images/scarface.jpg"
    },
    {
        id: 9,
        nombre: "Scarface",
        categoria: "Acción",
        descripcion: "Scarface (1983), dirigida por Brian De Palma y escrita por Oliver Stone, es un clásico del cine de gánsteres. La película narra la historia de Tony Montana (interpretado por Al Pacino), un inmigrante cubano que llega a Miami en busca del 'sueño americano'.",
        precio: "25.00bs.-",
        imagen: "../images/scarface.jpg"
    },
    {
        id: 2,
        nombre: "Luna de miel en familia",
        categoria: "Comedia",
        descripcion: "Una divertida comedia sobre una pareja que se conoce en una cita a ciegas fallida y terminan en un viaje inolvidable.",
        precio: "35.00bs.-",
        imagen: "../images/luna-de-miel-en-familia.png"
    },
    {
        id: 3,
        nombre: "Freddy vs. Jason",
        categoria: "Terror",
        descripcion: "Una épica batalla entre los icónicos villanos Freddy Krueger y Jason Voorhees. Dos fuerzas sobrenaturales chocan en una lucha por el dominio del terror.",
        precio: "30.00bs.-",
        imagen: "../images/freddy-vs-jason.jpg"
    },
    {
        id: 4,
        nombre: "Dragon Ball: La fusión",
        categoria: "Animación",
        descripcion: "Una emocionante película de la saga Dragon Ball donde los guerreros Z enfrentan a un nuevo enemigo utilizando la técnica de la fusión.",
        precio: "50.00bs.-",
        imagen: "../images/DBZ_Película_12_póster.png"
    },
    {
        id: 5,
        nombre: "En busca de la felicidad",
        categoria: "Drama",
        descripcion: "Inspiradora película basada en hechos reales sobre la lucha de Chris Gardner por alcanzar sus sueños a pesar de las adversidades. Protagonizada por Will Smith.",
        precio: "40.00bs.-",
        imagen: "../images/en-busca-de-la-felicidad.jpg"
    },
    {
        id: 6,
        nombre: "Toda una vida en un año",
        categoria: "Drama",
        descripcion: "Un joven descubre que su novia tiene solo un año de vida, por lo que decide hacer que viva todas las experiencias posibles en ese corto tiempo.",
        precio: "45.00bs.-",
        imagen: "../images/toda-una-vida-en-un-ano.jpg"
    }
    // Agrega más productos aquí...
];

// Obtener el parámetro `id` de la URL
const params = new URLSearchParams(window.location.search);
const idProducto = parseInt(params.get("id"));

// Buscar el producto correspondiente
const producto = productos.find((prod) => prod.id === idProducto);

if (producto) {
    // Actualizar la página con la información del producto
    document.querySelector(".imagen_pelicula").src = producto.imagen;
    document.querySelector(".imagen_pelicula").alt = `Poster de ${producto.nombre}`;
    document.querySelector(".texto_pelicula h3").textContent = producto.nombre;
    document.querySelector(".texto_pelicula h4").textContent = producto.categoria;
    document.querySelector(".texto_pelicula p").textContent = producto.descripcion;
    document.querySelector(".parrafo_precio").textContent = producto.precio;
} else {
    // Si no se encuentra el producto, mostrar un mensaje
    document.querySelector(".detalle_pelicula").innerHTML = "<p>Producto no encontrado.</p>";
}

// Obtener elementos del DOM
const btnAgregarCarrito = document.getElementById("btnAgregarCarrito");
const contadorCarrito = document.getElementById("contadorCarrito");

// Inicializar carrito desde almacenamiento local o crear uno vacío
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Función para actualizar el contador de carrito
const actualizarContadorCarrito = () => {
    const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0);
    contadorCarrito.textContent = `(${totalItems})`;
};

// Evento para añadir al carrito
btnAgregarCarrito.addEventListener("click", () => {
    const cantidadInput = document.getElementById("cantidad_id");
    const cantidad = parseInt(cantidadInput.value) || 1; // Por defecto 1 si no se ingresa cantidad

    const productoCarrito = {
        id: producto.id,
        nombre: producto.nombre,
        precio: parseFloat(producto.precio.replace("bs.-", "").trim()),
        cantidad,
    };

    // Verificar si el producto ya está en el carrito
    const index = carrito.findIndex((item) => item.id === productoCarrito.id);

    if (index !== -1) {
        carrito[index].cantidad += cantidad; // Incrementar cantidad si ya existe
    } else {
        carrito.push(productoCarrito); // Agregar nuevo producto
    }

    // Guardar carrito actualizado en almacenamiento local
    localStorage.setItem("carrito", JSON.stringify(carrito));

    // Actualizar contador en el botón
    actualizarContadorCarrito();

    alert("Producto añadido al carrito");
});

// Inicializar contador al cargar la página
document.addEventListener("DOMContentLoaded", actualizarContadorCarrito);
