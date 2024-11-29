document.getElementById('cerrarSesion').addEventListener('click', () => {
    window.location.href = 'iniciar_sesion.html';
});

// Funcionalidad para gestionar productos
document.addEventListener("DOMContentLoaded", () => {
    const formAgregarProducto = document.getElementById("formAgregarProducto");
    const idProductoInput = document.getElementById("idProducto");
    const nombreProductoInput = document.getElementById("nombreProducto");
    const precioProductoInput = document.getElementById("precioProducto");
    const descripcionProductoInput = document.getElementById("descripcionProducto");
    const listaProductosDiv = document.getElementById("listaProductos");

    // Array para almacenar los productos temporalmente
    let productos = [];

    // Función para renderizar los productos en pantalla
    const renderizarProductos = () => {
        listaProductosDiv.innerHTML = ""; // Limpiar la lista antes de renderizar
        productos.forEach((producto) => {
            const productoItem = document.createElement("div");
            productoItem.classList.add("producto");
            productoItem.innerHTML = `
                <p><strong>ID:</strong> ${producto.id_producto}</p>
                <p><strong>Nombre:</strong> ${producto.nombre_producto}</p>
                <p><strong>Precio:</strong> $${producto.precio}</p>
                <p><strong>Descripción:</strong> ${producto.descripcion}</p>
                <button class="eliminarProducto" data-id="${producto.id_producto}">Eliminar</button>
            `;
            listaProductosDiv.appendChild(productoItem);
        });
    };

    // Función para cargar los productos desde el servidor
    const cargarProductos = async () => {
        try {
            const response = await fetch('/api/productos');
            if (response.ok) {
                productos = await response.json();
                renderizarProductos();
            } else {
                console.error("Error al cargar los productos.");
            }
        } catch (error) {
            console.error("Error de conexión al servidor:", error);
        }
    };

    // Evento para agregar un producto
    formAgregarProducto.addEventListener("submit", async (e) => {
        e.preventDefault(); // Prevenir el envío del formulario

        const id_producto = parseInt(idProductoInput.value);
        const nombre_producto = nombreProductoInput.value.trim();
        const precio = parseFloat(precioProductoInput.value);
        const descripcion = descripcionProductoInput.value.trim();

        if (id_producto && nombre_producto && precio) {
            // Crear el objeto producto
            const nuevoProducto = { id_producto, nombre_producto, precio, descripcion };

            try {
                // Enviar el producto al servidor
                const response = await fetch('/api/productos', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(nuevoProducto),
                });

                if (response.ok) {
                    const productoAgregado = await response.json();
                    productos.push(productoAgregado);
                    renderizarProductos(); // Actualizar la lista de productos
                    formAgregarProducto.reset(); // Limpiar el formulario
                    alert("Producto agregado correctamente.");
                } else {
                    alert("Error al agregar el producto.");
                }
            } catch (error) {
                console.error("Error al agregar el producto:", error);
                alert("Error de conexión al servidor.");
            }
        } else {
            alert("Debe ingresar todos los datos del producto.");
        }
    });

    // Evento para eliminar un producto
    listaProductosDiv.addEventListener("click", async (e) => {
        if (e.target.classList.contains("eliminarProducto")) {
            const id_producto = e.target.getAttribute("data-id");

            try {
                // Eliminar producto del servidor
                const response = await fetch(`/api/productos/${id_producto}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    // Actualizar la lista local de productos
                    productos = productos.filter(producto => producto.id_producto != id_producto);
                    renderizarProductos();
                    alert("Producto eliminado correctamente.");
                } else {
                    alert("Error al eliminar el producto.");
                }
            } catch (error) {
                console.error("Error al eliminar el producto:", error);
                alert("Error de conexión al servidor.");
            }
        }
    });

    // Cargar los productos al inicio
    cargarProductos();
});
