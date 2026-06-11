const URL = "/api";

export async function obtenerProductos() {

  const response =
    await fetch(`${URL}/productos`);

  return await response.json();

}

export async function crearVenta(venta) {

  const response = await fetch(
    `${URL}/crearVenta`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify(venta)
    }
  );

  return await response.json();

}

export async function login(
    email,
    contraseña
) {

    const response = await fetch(
        "/api/login",
        {
            method: "POST",

            headers: {
                "Content-Type":
                    "application/json"
            },

            body: JSON.stringify({
                email,
                contraseña
            })
        }
    );

    return await response.json();

}

export async function crearUsuario(
    usuario
) {

    const response = await fetch(
        "/api/crearUsuario",
        {
            method: "POST",

            headers: {
                "Content-Type":
                    "application/json"
            },

            body: JSON.stringify(usuario)
        }
    );

    return await response.json();

}