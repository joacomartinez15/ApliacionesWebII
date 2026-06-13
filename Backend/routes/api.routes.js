import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {authMiddleware} from '../middlewares/auth.middleware.js';
import Usuario from '../models/Usuario.js';
import Producto from '../models/Producto.js';
import Venta from '../models/Venta.js';

const router = express.Router();

router.get('/productos', async (req, res) => {
    try {
        let productos = await Producto.find();

        const categoria = req.query.categoria;

        if (categoria) {
            productos = productos.filter(p => p.categoria === categoria);
        }
        res.json(productos);
    }

    catch (error) {
        res.status(500).json({
            mensaje: 'Error al obtener productos'
        });

    }

});

router.get( '/ventas', async (req, res) => {

        try {
            const ventas =  await Venta.find() .populate('id_usuario').populate( 'productos.id_producto');

            const ventasCompletas =
                ventas.map(v => ({
                    id:
                        v._id,
                    usuario:
                        `${v.id_usuario.nombre} ${v.id_usuario.apellido}`,
                    total:
                        v.total,
                    fecha:
                        v.fecha,
                    direccion:
                        v.direccion,
                    entregado:
                        v.entregado,
                    productos:
                        v.productos.map(
                            p => ({
                                nombre:
                                    p.id_producto.nombre,
                                cantidad:
                                    p.cantidad,
                                precio_unitario:
                                    p.precio_unitario
                            })
                        )
                }));

            res.json(
                ventasCompletas
            );

        }

        catch (error) {
            res.status(500).json({
                mensaje: 'Error al obtener ventas'
            });

        }

    }
);

router.post('/crearUsuario', async (req, res) => {

    try {
        const nuevoUsuario = req.body;
        const usuarioExiste =
            await Usuario.findOne({
                email: nuevoUsuario.email
            });

        if (usuarioExiste) {
            return res.status(400).json({
                mensaje:
                    'Ya existe un usuario con ese email'
            });
        }

        const hash =
            await bcrypt.hash(
                nuevoUsuario.contraseña,
                10
            );

        nuevoUsuario.contraseña = hash;

        const usuarioCreado =
            await Usuario.create(nuevoUsuario);

        res.status(201).json({
            mensaje:
                'Usuario creado correctamente',
            usuario:
                usuarioCreado
        });
    }

    catch (error) {
        res.status(500).json({
            mensaje:
                'Error al crear usuario'
        });

    }

});

router.post('/login', async (req, res) => {

    try {
        const {email,  contraseña} = req.body;

        const usuario =
            await Usuario.findOne({
                email
            });

        if (!usuario || usuario.activo !== true) {
            return res.status(401).json({
                mensaje:
                    'Email o contraseña incorrectos'
            });
        }

        const passwordCorrecta =
            await bcrypt.compare( contraseña,  usuario.contraseña );

        if (!passwordCorrecta) {
            return res.status(401).json({
                mensaje:
                    'Email o contraseña incorrectos'
            });

        }

        const token =
            jwt.sign({
                    id:
                        usuario._id,
                    email:
                        usuario.email
                },

                process.env.JWT_SECRET,

                {
                    expiresIn:
                        '1h'
                }
            );

        res.json({
            mensaje: 'Login exitoso', usuario, token
        });

    }

    catch (error) {
        res.status(500).json({
            mensaje: 'Error al iniciar sesión'
        });

    }

});

router.post('/crearVenta', authMiddleware, async (req, res) => {
            
        try {

            const nuevaVenta = req.body;
            const usuarioExiste = await Usuario.findById( nuevaVenta.id_usuario);

            if (!usuarioExiste) {
                return res.status(400).json({
                    mensaje: 'El usuario indicado no existe'
                });
            }

            if (!nuevaVenta.productos || !Array.isArray(nuevaVenta.productos) || nuevaVenta.productos.length === 0) {
                return res.status(400).json({
                    mensaje:'La venta debe contener al menos un producto'
                });
            }

            for ( const item of nuevaVenta.productos) {

                const producto =  await Producto.findById(item.id_producto);

                if (!producto) {
                    return res.status(400).json({
                        mensaje: 'Producto inexistente'
                    });
                }

                if (producto.stock < item.cantidad) {
                    return res.status(400).json({
                        mensaje:`No hay stock suficiente para ${producto.nombre}`
                    });
                }
                producto.stock -= item.cantidad;
                await producto.save();
            }

            const ventaCreada = await Venta.create(nuevaVenta);

            res.status(201).json({
                mensaje:'Venta creada correctamente',
                venta: ventaCreada
            });

        }
        

        catch (error) {
            console.error(error);

            res.status(500).json({
                mensaje: 'Error al crear venta'
            });
        }

    }
);

router.put('/actualizarProducto/:id', async (req, res) => {
    try {
        const productoActualizado =
            await Producto.findByIdAndUpdate(req.params.id, req.body,{returnDocument: 'after'});

        if (!productoActualizado) {
            return res.status(404).json({
                mensaje: 'Producto no encontrado'
            });
        }

        res.json({
            mensaje: 'Producto actualizado correctamente', producto: productoActualizado
        });

    }
    catch (error) {
        res.status(500).json({
            mensaje: 'Error al actualizar producto'
        });

    }

});

router.delete('/eliminarUsuario/:id', async (req, res) => {

    try {

        const id = req.params.id;

        const usuarioExiste = await Usuario.findById(
            id
        );

        if (!usuarioExiste) {

            return res.status(404).json({
                mensaje: 'El usuario no existe'
            });

        }

        const tieneVentas = await Venta.exists({
            id_usuario: id
        });

        if (tieneVentas) {

            return res.status(409).json({
                mensaje: 'No se puede eliminar el usuario porque tiene ventas asociadas'
            });

        }

        await Usuario.findByIdAndDelete(
            id
        );

        res.json({
            mensaje: 'Usuario eliminado correctamente'
        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: 'Error interno del servidor'
        });

    }

});

export default router;
