import { login }
from "./api.js";

import {
    guardarUsuario
}
from "./auth.js";

const form =
    document.getElementById(
        "loginForm"
    );

form.addEventListener(
    "submit",
    async e => {

        e.preventDefault();

        const email =
            document.getElementById(
                "email"
            ).value;

        const contraseña =
            document.getElementById(
                "password"
            ).value;

        const respuesta =
            await login(
                email,
                contraseña
            );

        if (respuesta.usuario) {

            guardarUsuario(
                respuesta.usuario
            );

            const volver =
                localStorage.getItem(
                    "redirectAfterLogin"
                );

            if (volver) {

                localStorage.removeItem(
                    "redirectAfterLogin"
                );

                window.location.href =
                    volver;

            } else {

                window.location.href =
                    "/";

            }

        } else {

            alert(
                respuesta.mensaje
            );

        }

    }
);