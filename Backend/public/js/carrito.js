import { crearVenta }
from "./api.js";

import {
  obtenerCarrito,
  eliminarProducto,
  vaciarCarrito
}
from "./storage.js";

import {
    estaLogueado,
    obtenerUsuario
}
from "./auth.js";

const carritoContainer =
  document.getElementById("carritoContainer");

const totalElemento =
  document.getElementById("total");

const btnVaciar =
  document.getElementById("vaciarCarrito");

const btnComprar =
  document.getElementById("comprarBtn");

let carrito = obtenerCarrito();

function renderizarCarrito() {

  carritoContainer.innerHTML = "";

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
      <div class="card shadow-sm">

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
              data-id="${producto.id}"
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

function eventosEliminar() {

  const botones =
    document.querySelectorAll(".eliminar-btn");

  botones.forEach(boton => {

    boton.addEventListener("click", () => {

      const id =
        Number(boton.dataset.id);

      eliminarProducto(id);

      carrito = obtenerCarrito();

      renderizarCarrito();

    });

  });

}

btnVaciar.addEventListener("click", () => {

  vaciarCarrito();

  carrito = [];

  renderizarCarrito();

});

btnComprar.addEventListener("click", async () => {

  if (!estaLogueado()) {

    localStorage.setItem(
        "redirectAfterLogin",
        "/carrito.html"
    );

    window.location.href =
        "/login.html";

    return;
}

  if (carrito.length === 0) {

    alert("El carrito está vacío");

    return;

  }

  const productosVenta = carrito.map(
    producto => ({
      id_producto: producto.id,
      cantidad: 1,
      precio_unitario: producto.precio
    })
  );

  const total =
    carrito.reduce(
      (acc, producto) =>
        acc + producto.precio,
      0
    );

  const venta = {

    id_usuario: obtenerUsuario().id,

    fecha:
      new Date()
        .toISOString()
        .split("T")[0],

    total,

    direccion:
      "Av. Siempre Viva 742",

    entregado: false,

    productos: productosVenta

  };

  const respuesta =
    await crearVenta(venta);

  if (respuesta.mensaje) {

    alert("Compra realizada");

    vaciarCarrito();

    carrito = [];

    renderizarCarrito();

  } else {

    alert("Error al crear venta");

  }

});

renderizarCarrito();