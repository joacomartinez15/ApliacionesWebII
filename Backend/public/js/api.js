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