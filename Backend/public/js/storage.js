export function obtenerCarrito() {

  return JSON.parse(
    localStorage.getItem("carrito")
  ) || [];

}

export function guardarCarrito(carrito) {

  localStorage.setItem(
    "carrito",
    JSON.stringify(carrito)
  );

}

export function agregarAlCarrito(producto) {

  const carrito = obtenerCarrito();

  carrito.push(producto);

  guardarCarrito(carrito);

}

export function eliminarProducto(id) {

  let carrito = obtenerCarrito();

  carrito = carrito.filter(
    producto => producto.id !== id
  );

  guardarCarrito(carrito);

}

export function vaciarCarrito() {

  localStorage.removeItem("carrito");

}