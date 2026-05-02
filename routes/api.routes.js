import express from 'express';
import fs from 'fs';

const router = express.Router();

function leerJSON(ruta) {
    return JSON.parse(fs.readFileSync(ruta, 'utf-8'));
}

function escribirJSON(ruta, datos) {
    fs.writeFileSync(ruta, JSON.stringify(datos, null, 2));
}

const rutaUsuarios = './data/usuarios.json';
const rutaProductos = './data/productos.json';
const rutaVentas = './data/ventas.json';


router.get('/productos', (req, res) => {
    const productos = leerJSON(rutaProductos);
    res.json(productos);
});

router.get('/ventas', (req, res) => {
    const ventas = leerJSON(rutaVentas);
    const usuarios = leerJSON(rutaUsuarios);
    const productos = leerJSON(rutaProductos);

    const ventasCompletas = ventas.map(v => {
        const usuario = usuarios.find(u => u.id === v.id_usuario);

        const productosDetalle = v.productos.map(p => {
            const prod = productos.find(pr => pr.id === p.id_producto);

            return {
                nombre: prod ? prod.nombre : 'Producto desconocido',
                cantidad: p.cantidad,
                precio_unitario: p.precio_unitario
            };
        });

        return {
            id: v.id,
            usuario: usuario
                ? `${usuario.nombre} ${usuario.apellido}`
                : 'Desconocido',
            total: v.total,
            fecha: v.fecha,
            direccion: v.direccion,
            entregado: v.entregado,
            productos: productosDetalle
        };
    });

    res.json(ventasCompletas);
});


router.post('/crearUsuario', (req, res) => {
    const usuarios = leerJSON(rutaUsuarios);
    const nuevoUsuario = req.body;

    nuevoUsuario.id = usuarios.length + 1;

    usuarios.push(nuevoUsuario);
    escribirJSON(rutaUsuarios, usuarios);

    res.status(201).json({
        mensaje: 'Usuario creado correctamente',
        usuario: nuevoUsuario
    });
});

router.post('/crearVenta', (req, res) => {
    const ventas = leerJSON(rutaVentas);
    const usuarios = leerJSON(rutaUsuarios);
    const productos = leerJSON(rutaProductos);

    const nuevaVenta = req.body;

    const usuarioExiste = usuarios.some(
        u => u.id === nuevaVenta.id_usuario
    );

    if (!usuarioExiste) {
        return res.status(400).json({
            mensaje: 'El usuario indicado no existe'
        });
    }

    if (
        !nuevaVenta.productos ||
        !Array.isArray(nuevaVenta.productos) ||
        nuevaVenta.productos.length === 0
    ) {
        return res.status(400).json({
            mensaje: 'La venta debe contener al menos un producto'
        });
    }

    for (const item of nuevaVenta.productos) {
        const producto = productos.find(
            p => p.id === item.id_producto
        );

        if (!producto) {
            return res.status(400).json({
                mensaje: `El producto con ID ${item.id_producto} no existe`
            });
        }

        if (item.cantidad <= 0) {
            return res.status(400).json({
                mensaje: `La cantidad del producto ${item.id_producto} debe ser mayor a 0`
            });
        }

        if (producto.stock < item.cantidad) {
            return res.status(400).json({
                mensaje: `No hay stock suficiente para ${producto.nombre}`
            });
        }
    }

    nuevaVenta.productos.forEach(item => {
        const producto = productos.find(
            p => p.id === item.id_producto
        );

        producto.stock -= item.cantidad;
    });

    nuevaVenta.id = ventas.length + 1;

    ventas.push(nuevaVenta);

    escribirJSON(rutaVentas, ventas);
    escribirJSON(rutaProductos, productos);

    res.status(201).json({
        mensaje: 'Venta creada correctamente',
        venta: nuevaVenta
    });
});



router.put('/actualizarProducto/:id', (req, res) => {
    const productos = leerJSON(rutaProductos);
    const id = parseInt(req.params.id);

    const index = productos.findIndex(
        p => p.id === id
    );

    if (index === -1) {
        return res.status(404).json({
            mensaje: 'Producto no encontrado'
        });
    }

    productos[index] = {
        ...productos[index],
        ...req.body
    };

    escribirJSON(rutaProductos, productos);

    res.json({
        mensaje: 'Producto actualizado correctamente',
        producto: productos[index]
    });
});


router.delete('/eliminarUsuario/:id', (req, res) => {
    const usuarios = leerJSON(rutaUsuarios);
    const ventas = leerJSON(rutaVentas);
    const id = parseInt(req.params.id);

    const usuarioExiste = usuarios.some(
        u => u.id === id
    );

    if (!usuarioExiste) {
        return res.status(404).json({
            mensaje: 'El usuario no existe'
        });
    }

    const tieneVentas = ventas.some(
        v => v.id_usuario === id
    );

    if (tieneVentas) {
        return res.status(400).json({
            mensaje: 'No se puede eliminar el usuario porque tiene ventas asociadas'
        });
    }

    const nuevosUsuarios = usuarios.filter(
        u => u.id !== id
    );

    escribirJSON(rutaUsuarios, nuevosUsuarios);

    res.json({
        mensaje: 'Usuario eliminado correctamente'
    });
});

export default router;