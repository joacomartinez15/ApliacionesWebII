export function guardarUsuario(usuario) {

    localStorage.setItem(
        "usuarioLogueado",
        JSON.stringify(usuario)
    );

}

export function obtenerUsuario() {

    return JSON.parse(
        localStorage.getItem(
            "usuarioLogueado"
        )
    );

}

export function guardarToken(token) {

    localStorage.setItem(
        "token",
        token
    );

}

export function obtenerToken() {

    return localStorage.getItem(
        "token"
    );

}

export function estaLogueado() {

    return obtenerUsuario() !== null
        &&
        obtenerToken() !== null;

}

export function logout() {

    localStorage.removeItem(
        "usuarioLogueado"
    );

    localStorage.removeItem(
        "token"
    );

}