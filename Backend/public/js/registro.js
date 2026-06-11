import {
    crearUsuario
}
from "./api.js";

const form =
    document.getElementById(
        "registroForm"
    );

form.addEventListener(
    "submit",
    async e => {

        e.preventDefault();

        const usuario = {

            nombre:
                document.getElementById(
                    "nombre"
                ).value,

            apellido:
                document.getElementById(
                    "apellido"
                ).value,

            email:
                document.getElementById(
                    "email"
                ).value,

            contraseña:
                document.getElementById(
                    "password"
                ).value,

            activo: true

        };

        const respuesta =
            await crearUsuario(
                usuario
            );

        alert(
            respuesta.mensaje
        );

        window.location.href =
            "/login.html";

    }
);