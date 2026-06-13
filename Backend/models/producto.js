import mongoose from 'mongoose';

const productoSchema =
    new mongoose.Schema({

        nombre: String,

        desc: String,

        precio: Number,

        imagen: String,

        stock: Number,

        categoria: String,

        activo: Boolean

    });

export default mongoose.model(
    'Producto',
    productoSchema
);