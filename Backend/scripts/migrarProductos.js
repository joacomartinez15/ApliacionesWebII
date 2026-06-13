import fs from 'fs/promises';
import dotenv from 'dotenv';

import conectarDB from '../config/database.js';

import Producto from '../models/Producto.js';

dotenv.config();

await conectarDB();

try {

    const data =
        await fs.readFile(
            './data/productos.json',
            'utf-8'
        );

    const productos =
        JSON.parse(data);

    await Producto.deleteMany();

    await Producto.insertMany(
        productos
    );

    console.log(
        'Productos migrados correctamente'
    );

    process.exit();

}

catch (error) {

    console.log(error);

    process.exit(1);

}