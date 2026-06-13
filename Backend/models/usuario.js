import mongoose from 'mongoose';

const usuarioSchema =
    new mongoose.Schema({

        nombre: String,

        apellido: String,

        email: {

            type: String,

            unique: true

        },

        contraseña: String,

        activo: Boolean

    });

export default mongoose.model(
    'Usuario',
    usuarioSchema
);