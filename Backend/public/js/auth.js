export function guardarUsuario(usuario) {

    localStorage.setItem(
        "usuarioLogueado",
        JSON.stringify(usuario)
    );

}

export function obtenerUsuario() {

    return JSON.parse(
        localStorage.getItem("usuarioLogueado")
    );

}

export function estaLogueado() {

    return obtenerUsuario() !== null;

}

export function logout() {

    localStorage.removeItem(
        "usuarioLogueado"
    );

}