En esta segunda entrega se desarrolló un servidor utilizando Express.js que permite gestionar información de usuarios, productos y ventas a partir de archivos JSON.

El proyecto cumple con los requisitos solicitados en la consigna:

* 2 solicitudes GET
* 2 solicitudes POST
* 1 solicitud PUT
* 1 solicitud DELETE
* Validación de integridad de datos
* Uso de archivo `.gitignore`
* Documentación de endpoints

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

```text
http://localhost:3000
```

---

## Endpoints disponibles

## GET

### Obtener todos los productos

GET /api/productos

Devuelve la lista completa de productos almacenados en `productos.json`.


### Obtener todas las ventas

GET /api/ventas

Devuelve las ventas con información completa del usuario y detalle de productos comprados.


## POST

### Crear nuevo usuario

POST /api/CrearUsuario

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

POST /api/CrearVenta

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

Agrega una nueva venta a `ventas.json`.


## PUT

### Actualizar producto existente


PUT /api/ActualizarProducto/:id


### Ejemplo

PUT /api/productos/1

### Body ejemplo

```json
{
  "precio": 1300,
  "stock": 8
}
```

Actualiza un producto existente en `productos.json`.

## DELETE

### Eliminar usuario


DELETE /api/EliminarUsuario/:id

### Ejemplo

DELETE /api/usuarios/3

El usuario solo puede eliminarse si no posee ventas asociadas.

Esto garantiza la integridad de los datos.

---

## Validación importante

Si un usuario tiene ventas registradas, no puede ser eliminado.

Ejemplo:

* Usuario con ventas → no se elimina
* Usuario sin ventas → se elimina correctamente

Esto evita inconsistencias en la base de datos JSON.
