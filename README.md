En esta segunda entrega se desarrolló un servidor utilizando Express.js con arquitectura de rutas separadas y manejo de información mediante archivos JSON.

El proyecto permite gestionar usuarios, productos y ventas a través de una API REST funcional.

La información se almacena en archivos JSON dentro de la carpeta `data/`.

## Estructura del proyecto


AplicacionesWebII/
│
├── data/
│   ├── usuarios.json
│   ├── productos.json
│   └── ventas.json
│
├── routes/
│   └── api.routes.js
│
├── index.js
├── package.json
├── .gitignore
└── README.md

## Instalación

### 1. Inicializar proyecto

```bash
npm init -y
```

### 2. Instalar dependencias

```bash
npm install express
```

### 3. Ejecutar servidor

```bash
node index.js
```

Servidor disponible en:


http://localhost:3000


## Base de la API

Todos los endpoints utilizan el prefijo:

/api

Ejemplo:


http://localhost:3000/api/productos


# Endpoints disponibles


## GET

### Obtener todos los productos

GET /api/productos

Devuelve la lista completa de productos almacenados en `productos.json`.


### Obtener todas las ventas

GET /api/ventas


Devuelve las ventas con:

* datos del usuario comprador
* detalle de productos comprados
* total
* fecha
* dirección
* estado de entrega

## POST

### Crear nuevo usuario

POST /api/crearUsuario


### Body ejemplo

```json
{
  "nombre": "Carlos",
  "apellido": "Lopez",
  "email": "carlos@gmail.com",
  "contraseña": "123456",
  "activo": true
}
```

Agrega un nuevo usuario a `usuarios.json`.


### Crear nueva venta

POST /api/crearVenta


### Body ejemplo

```json
{
  "id_usuario": 2,
  "fecha": "2026-04-20",
  "total": 900,
  "direccion": "San Martín 500",
  "entregado": false,
  "productos": [
    {
      "id_producto": 2,
      "cantidad": 1,
      "precio_unitario": 900
    }
  ]
}
```

Agrega una nueva venta a `ventas.json` y además:

* valida que el usuario exista
* valida que los productos existan
* valida que haya al menos un producto
* valida que la cantidad sea mayor a 0
* valida stock disponible
* descuenta automáticamente el stock del producto vendido

Esto evita ventas inválidas y mejora la integridad del sistema.


## PUT

### Actualizar producto existente

PUT /api/actualizarProducto/:id


### Ejemplo


PUT /api/actualizarProducto/1

### Body ejemplo

```json
{
  "precio": 1300,
  "stock": 8
}
```

Actualiza un producto existente en `productos.json`.

Si el producto no existe, devuelve error 404.

## DELETE

### Eliminar usuario

DELETE /api/eliminarUsuario/:id


### Ejemplo

DELETE /api/eliminarUsuario/3

Antes de eliminar se valida:

* que el usuario exista
* que no tenga ventas asociadas

Si el usuario tiene ventas registradas, no puede eliminarse.

Esto garantiza la integridad de los datos.

---

## Validaciones implementadas

### Usuarios

* validación de existencia antes de eliminar

### Productos

* validación de existencia antes de actualizar
* control de stock al vender

### Ventas

* validación de usuario existente
* validación de productos existentes
* validación de cantidades válidas
* validación de stock disponible
* prevención de ventas vacías

Estas validaciones fueron agregadas como mejora solicitada en la devolución docente.

---

## Pruebas

Todos los endpoints fueron testeados utilizando Postman.

Se verificó:

* lectura correcta de datos
* escritura real sobre archivos JSON
* actualización de productos
* eliminación controlada de usuarios
* bloqueo de ventas inválidas
* control de integridad entre estructuras relacionadas

---

## Autor

Joaquín Martínez
