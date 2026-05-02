// const fs = require('fs');

// function leerJSON(ruta) {
//     return JSON.parse(fs.readFileSync(ruta, 'utf-8'));
// }

// function listarProductos() {
//     const productos = leerJSON('./data/productos.json');

//     console.log('\nPRODUCTOS\n');

//     productos.forEach(p => {
//         console.log(`- ${p.nombre} ($${p.precio})`);
//     });
// }

// function listarUsuarios() {
//     const usuarios = leerJSON('./data/usuarios.json');

//     console.log('\nUSUARIOS\n');

//     usuarios.forEach(u => {
//         console.log(`- ${u.nombre} ${u.apellido} (${u.email})`);
//     });
// }

// function listarVentas(usuarioId = null) {
//     const ventas = leerJSON('./data/ventas.json');
//     const usuarios = leerJSON('./data/usuarios.json');
//     const productos = leerJSON('./data/productos.json');

//     let resultado = ventas;

//     if (usuarioId !== null) {
//         resultado = ventas.filter(v => v.id_usuario === usuarioId);
//     }

//     console.log('\nVENTAS\n');

//     resultado.forEach(v => {
//         const usuario = usuarios.find(u => u.id === v.id_usuario);

//         console.log(`Venta ID: ${v.id}`);
//         console.log(`Usuario: ${usuario?.nombre || 'Desconocido'}`);
//         console.log(`Total: $${v.total}`);
//         console.log(`Fecha: ${v.fecha}`);

//         console.log('Productos:');

//         v.productos.forEach(p => {
//             const prod = productos.find(pr => pr.id === p.id_producto);

//             console.log(`   - ${prod?.nombre || 'Producto desconocido'} x${p.cantidad} ($${p.precio_unitario})`);
//         });

//         console.log('-----------------------------');
//     });

//     if (resultado.length === 0) {
//         console.log('No hay ventas para ese usuario.');
//     }
// }

// listarProductos();
// listarUsuarios();
// listarVentas();
// listarVentas(1);

//El código anterior corresponde a la primer entrega del trabajo practico.


import express from 'express';
import apiRoutes from './routes/api.routes.js';

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Servidor funcionando correctamente');
});

app.use('/api', apiRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});