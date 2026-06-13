import { obtenerProductos }
from "./api.js";

import { agregarAlCarrito }
from "./storage.js";

const contenedor =
    document.getElementById("productos");

const buscador =
    document.getElementById("buscador");

const filtroCategoria =
    document.getElementById("filtroCategoria");

let productos = [];

async function cargarProductos() {

    productos = await obtenerProductos();

    productos = productos.filter(
        producto => producto.activo
    );

    renderizarProductos(productos);

}

function renderizarProductos(lista) {

    contenedor.innerHTML = "";

    lista.forEach(producto => {

        contenedor.innerHTML += `
        <div class="col-md-4 mb-4">

            <div class="card h-100 shadow-sm">

                <img
                    src="./img/${producto.imagen}"
                    class="card-img-top"
                    alt="${producto.nombre}"
                    style="height:220px; object-fit:cover"
                >

                <div class="card-body d-flex flex-column">

                    <h5 class="card-title">
                        ${producto.nombre}
                    </h5>

                    <p class="badge bg-secondary w-auto">
                        ${producto.categoria}
                    </p>

                    <p class="card-text">
                        ${producto.desc}
                    </p>

                    <p>
                        Stock: ${producto.stock}
                    </p>

                    <h4 class="mt-auto">
                        $${producto.precio}
                    </h4>

                    <button
                        class="btn btn-primary mt-3"
                        data-id="${producto._id}"
                    >
                        Agregar al carrito
                    </button>

                </div>

            </div>

        </div>
        `;

    });

    agregarEventos();

}

function agregarEventos() {

    const botones =
        document.querySelectorAll(".btn-primary");

    botones.forEach(boton => {

        boton.addEventListener("click", () => {

            const id =
                boton.dataset.id;

            const producto =
                productos.find(
                    p => p._id === id
                );

            agregarAlCarrito(producto);

            alert("Producto agregado");

        });

    });

}

function aplicarFiltros() {

    const texto =
        buscador.value.toLowerCase();

    const categoria =
        filtroCategoria.value;

    const filtrados =
        productos.filter(producto => {

            const coincideTexto =
                producto.nombre
                    .toLowerCase()
                    .includes(texto);

            const coincideCategoria =
                categoria === "Todos"
                ||
                producto.categoria === categoria;

            return (
                coincideTexto &&
                coincideCategoria
            );

        });

    renderizarProductos(filtrados);

}

if (buscador) {

    buscador.addEventListener(
        "input",
        aplicarFiltros
    );

}

if (filtroCategoria) {

    filtroCategoria.addEventListener(
        "change",
        aplicarFiltros
    );

}

cargarProductos();