// Referencias a elementos del DOM
const mensajeCarrito = document.getElementById('mensajeCarrito');
const btnPagar = document.getElementById('btn-pagar');
const btnVerCompras = document.getElementById('btnVerCompras');
const modalCompras = document.getElementById('modalCompras');
const cerrarModal = document.getElementById('cerrarModal');
const listaCompras = document.getElementById('listaCompras');

// Cargar carrito desde almacenamiento local
const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Función para renderizar el carrito en el DOM
const renderCarrito = () => {
    if (carrito.length === 0) {
        mensajeCarrito.innerHTML = `<p class="carrito-vacio">EL CARRITO ESTÁ VACÍO</p>`;
        btnPagar.style.display = 'none'; // Ocultar el botón de pagar si el carrito está vacío
    } else {
        mensajeCarrito.innerHTML = carrito
            .map(
                (item, index) => `
                    <div class="tarjeta-producto">
                        <img src="images/product-placeholder.png" alt="Imagen del producto" class="producto-imagen">
                        <div class="producto-detalle">
                            <p><strong>${item.nombre}</strong></p>
                            <p>Cantidad: ${item.cantidad}</p>
                            <p>Precio: ${item.precio.toFixed(2)} bs</p>
                        </div>
                        <button class="btn-eliminar" onclick="eliminarProducto(${index})">Eliminar</button>
                    </div>
                `
            )
            .join('');
        btnPagar.style.display = 'block'; // Mostrar el botón de pagar si hay productos en el carrito
    }
};

// Función para eliminar un producto del carrito
const eliminarProducto = (index) => {
    carrito.splice(index, 1); // Elimina el producto del array
    localStorage.setItem('carrito', JSON.stringify(carrito)); // Actualiza el almacenamiento local
    renderCarrito(); // Re-renderiza el carrito en el DOM
};

// Función para manejar la compra
const realizarCompra = async () => {
    const idUsuario = localStorage.getItem('id_usuario') || 1; // Obtiene el id del usuario o asigna uno predeterminado

    try {
        const response = await fetch('/api/realizar-compra', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                carrito: carrito,
                idUsuario: idUsuario,
            }),
        });

        const data = await response.json();

        if (data.success) {
            alert('Compra realizada con éxito.');

            // Guardar la compra en el localStorage
            guardarCompra({
                nombre: carrito.map((item) => item.nombre).join(', '),
                cantidad: carrito.reduce((total, item) => total + item.cantidad, 0),
                precio: carrito.reduce((total, item) => total + item.precio * item.cantidad, 0).toFixed(2),
            });

            // Vaciar el carrito
            carrito.length = 0; // Vaciar el array local
            localStorage.setItem('carrito', JSON.stringify(carrito)); // Actualizar el localStorage
            renderCarrito(); // Actualizar el DOM
        } else {
            alert(data.message || 'Hubo un error al procesar tu compra.');
        }
    } catch (error) {
        alert('Error en la conexión con el servidor.');
    }
};

// Función para mostrar las compras realizadas en el modal (solo las del usuario actual)
const verMisCompras = () => {
    const idUsuarioActual = localStorage.getItem('id_usuario'); // Obtiene el ID del usuario actual
    const compras = JSON.parse(localStorage.getItem('compras')) || [];

    // Filtrar compras por el ID del usuario actual
    const comprasUsuario = compras.filter((compra) => compra.idUsuario === idUsuarioActual);

    if (comprasUsuario.length === 0) {
        listaCompras.innerHTML = `<p>No has realizado ninguna compra aún.</p>`;
    } else {
        listaCompras.innerHTML = comprasUsuario
            .map(
                (compra) => `
                    <div class="tarjeta-compra">
                        <p><strong>${compra.nombre}</strong></p>
                        <p>Cantidad: ${compra.cantidad}</p>
                        <p>Precio Total: ${compra.precio} bs</p>
                    </div>
                `
            )
            .join('');
    }

    modalCompras.style.display = 'block'; // Mostrar el modal
};

// Modificación en la función guardarCompra para incluir el ID del usuario
const guardarCompra = (compra) => {
    try {
        const idUsuarioActual = localStorage.getItem('id_usuario'); // ID del usuario actual
        compra.idUsuario = idUsuarioActual; // Asocia la compra al usuario actual

        let compras = JSON.parse(localStorage.getItem('compras')) || [];
        compras.push(compra);
        localStorage.setItem('compras', JSON.stringify(compras));
        console.log('Compra guardada:', compras); // Log para verificar
    } catch (error) {
        console.error('Error al guardar la compra:', error);
    }
};


// Función para cerrar el modal
const cerrarModalCompras = () => {
    modalCompras.style.display = 'none'; // Oculta el modal
};

// Agregar eventos a los botones
btnVerCompras.addEventListener('click', verMisCompras);
cerrarModal.addEventListener('click', cerrarModalCompras);
btnPagar.addEventListener('click', realizarCompra);

// Inicializar el carrito al cargar la página
document.addEventListener('DOMContentLoaded', renderCarrito);
