document.getElementById('cerrarSesion').addEventListener('click', () => {
    // Redirigir a la página de inicio de sesión
    window.location.href = 'iniciar_sesion.html';
});

// Funcionalidad para gestionar productos
document.addEventListener("DOMContentLoaded", () => {
    const formAgregarProducto = document.getElementById("formAgregarProducto");
    const nombreProductoInput = document.getElementById("nombreProducto");
    const precioProductoInput = document.getElementById("precioProducto");
    const listaProductosDiv = document.getElementById("listaProductos");

    // Array para almacenar los productos temporalmente
    let productos = [];

    // Función para renderizar los productos en pantalla
    const renderizarProductos = () => {
        listaProductosDiv.innerHTML = ""; // Limpiar la lista antes de renderizar
        productos.forEach((producto, index) => {
            const productoItem = document.createElement("div");
            productoItem.classList.add("producto");
            productoItem.innerHTML = `
                <p><strong>Nombre:</strong> ${producto.nombre}</p>
                <p><strong>Precio:</strong> $${producto.precio}</p>
                <button class="eliminarProducto" data-index="${index}">Eliminar</button>
            `;
            listaProductosDiv.appendChild(productoItem);
        });
    };

    // Evento para agregar un producto
    formAgregarProducto.addEventListener("submit", async (e) => {
        e.preventDefault(); // Prevenir el envío del formulario
        const nombre = nombreProductoInput.value.trim();
        const precio = parseFloat(precioProductoInput.value);

        if (nombre && precio) {
            // Guardar el producto en el array de productos
            productos.push({ nombre, precio });

            // Enviar el producto al servidor para almacenarlo en la base de datos
            try {
                const response = await fetch('/api/productos', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ nombre, precio })
                });

                if (response.ok) {
                    // Si el producto se agrega correctamente a la base de datos
                    console.log("Producto agregado correctamente.");
                } else {
                    alert("Hubo un problema al agregar el producto.");
                }
            } catch (error) {
                console.error("Error al agregar el producto:", error);
                alert("Error de conexión al servidor.");
            }

            renderizarProductos(); // Actualizar la lista de productos
            formAgregarProducto.reset(); // Limpiar el formulario
        } else {
            alert("Debe ingresar todos los datos del producto.");
        }
    });

    // Delegación de eventos para eliminar un producto
    listaProductosDiv.addEventListener("click", async (e) => {
        if (e.target.classList.contains("eliminarProducto")) {
            const index = e.target.getAttribute("data-index");
            const producto = productos[index];
            productos.splice(index, 1); // Eliminar producto del array
            renderizarProductos(); // Actualizar la lista

            // Eliminar el producto de la base de datos
            try {
                const response = await fetch(`/api/productos/${producto.nombre}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    alert("Hubo un problema al eliminar el producto.");
                }
            } catch (error) {
                console.error("Error al eliminar el producto:", error);
                alert("Error de conexión al servidor.");
            }
        }
    });

    // Inicializar renderizado
    renderizarProductos();
});
