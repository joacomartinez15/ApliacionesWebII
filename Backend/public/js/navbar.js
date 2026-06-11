import {
    estaLogueado,
    obtenerUsuario,
    logout
}
from "./auth.js";

const contenedor =
    document.getElementById(
        "usuarioNav"
    );

if (contenedor) {

    if (estaLogueado()) {

        const usuario =
            obtenerUsuario();

        contenedor.innerHTML = `

            <span
                class="navbar-text text-white me-3"
            >
                Hola ${usuario.nombre}
            </span>

            <button
                id="btnLogout"
                class="btn btn-outline-light btn-sm"
            >
                Salir
            </button>

        `;

        document
            .getElementById(
                "btnLogout"
            )
            .addEventListener(
                "click",
                () => {

                    logout();

                    window.location.href =
                        "/";

                }
            );

    } else {

        contenedor.innerHTML = `

            <a
                class="nav-link"
                href="/login.html"
            >
                Login
            </a>

        `;

    }

}