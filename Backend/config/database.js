import mongoose from 'mongoose';

const conectarDB = async () => {

    try {

        console.log(process.env.MONGO_URI);
        await mongoose.connect(
            process.env.MONGO_URI
        );

        console.log(
            'MongoDB conectado correctamente'
        );

    }

    catch (error) {

        console.error(
            'Error al conectar MongoDB'
        );

        console.error(
            error.message
        );

        process.exit(1);

    }

};

export default conectarDB;