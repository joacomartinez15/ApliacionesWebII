import mongoose from 'mongoose';

const ventaSchema =
    new mongoose.Schema({

        id_usuario: {

            type:
                mongoose.Schema.Types.ObjectId,

            ref:
                'Usuario'

        },

        fecha: String,

        total: Number,

        direccion: String,

        entregado: Boolean,

        productos: [

            {

                id_producto: {

                    type:
                        mongoose.Schema.Types.ObjectId,

                    ref:
                        'Producto'

                },

                cantidad: Number,

                precio_unitario: Number

            }

        ]

    });

export default mongoose.model(
    'Venta',
    ventaSchema
);