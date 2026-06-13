import { crearVenta } from "./api.js";

import {
    obtenerCarrito,
    eliminarProducto,
    vaciarCarrito
} from "./storage.js";

import {
    estaLogueado,
    obtenerUsuario
} from "./auth.js";

const carritoContainer =
    document.getElementById("carritoContainer");

const totalElemento =
    document.getElementById("total");

const btnVaciar =
    document.getElementById("vaciarCarrito");

const btnComprar =
    document.getElementById("comprarBtn");

let carrito = obtenerCarrito();

//------------------------------------------------
// Renderizar carrito
//------------------------------------------------
function renderizarCarrito() {

    carritoContainer.innerHTML = "";

    // eliminar posibles null del localStorage
    carrito = carrito.filter(producto => producto !== null);

    if (carrito.length === 0) {

        carritoContainer.innerHTML = `
            <div class="alert alert-info">
                El carrito está vacío
            </div>
        `;

        totalElemento.textContent =
            "Total: $0";

        return;
    }

    let total = 0;

    carrito.forEach(producto => {

        total += producto.precio;

        carritoContainer.innerHTML += `
            <div class="card shadow-sm mb-3">

                <div
                    class="card-body d-flex justify-content-between align-items-center"
                >

                    <div>

                        <h5>${producto.nombre}</h5>

                        <p>${producto.desc}</p>

                    </div>

                    <div class="text-end">

                        <h5>$${producto.precio}</h5>

                        <button
                            class="btn btn-danger eliminar-btn"
                            data-id="${producto._id}"
                        >
                            Eliminar
                        </button>

                    </div>

                </div>

            </div>
        `;
    });

    totalElemento.textContent =
        `Total: $${total}`;

    eventosEliminar();
}

//------------------------------------------------
// Eliminar producto
//------------------------------------------------
function eventosEliminar() {

    const botones =
        document.querySelectorAll(".eliminar-btn");

    botones.forEach(boton => {

        boton.addEventListener("click", () => {

            const id =
                boton.dataset.id;

            eliminarProducto(id);

            carrito =
                obtenerCarrito();

            renderizarCarrito();

        });

    });

}

//------------------------------------------------
// Vaciar carrito
//------------------------------------------------
btnVaciar.addEventListener(
    "click",
    () => {

        vaciarCarrito();

        carrito = [];

        renderizarCarrito();

    }
);

//------------------------------------------------
// Comprar
//------------------------------------------------
btnComprar.addEventListener(
    "click",
    async () => {

        //------------------------------------------------
        // verificar login
        //------------------------------------------------
        if (!estaLogueado()) {

            localStorage.setItem(
                "redirectAfterLogin",
                "/carrito.html"
            );

            window.location.href =
                "/login.html";

            return;
        }

        //------------------------------------------------
        // carrito vacío
        //------------------------------------------------
        if (carrito.length === 0) {

            alert(
                "El carrito está vacío"
            );

            return;
        }

        //------------------------------------------------
        // armar productos de la venta
        //------------------------------------------------
        const productosVenta =
            carrito.map(
                producto => ({

                    id_producto:
                        producto._id,

                    cantidad:
                        1,

                    precio_unitario:
                        producto.precio

                })
            );

        //------------------------------------------------
        // calcular total
        //------------------------------------------------
        const total =
            carrito.reduce(
                (acc, producto) =>
                    acc + producto.precio,
                0
            );

        //------------------------------------------------
        // objeto venta
        //------------------------------------------------
        const venta = {

            id_usuario:
                obtenerUsuario()._id,

            fecha:
                new Date()
                    .toISOString()
                    .split("T")[0],

            total,

            direccion:
                "Av. Siempre Viva 742",

            entregado:
                false,

            productos:
                productosVenta

        };

        //------------------------------------------------
        // enviar venta
        //------------------------------------------------
        const respuesta =
            await crearVenta(venta);

        if (respuesta.venta) {

            alert(
                "Compra realizada correctamente"
            );

            vaciarCarrito();

            carrito = [];

            renderizarCarrito();

        }
        else {

            alert(
                respuesta.mensaje
            );

        }

    }
);

renderizarCarrito();