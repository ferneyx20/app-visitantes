const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Configurar variables de entorno
dotenv.config();

// Crear app de Express
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
const usuariosRoutes = require('./routes/usuarios');
const visitasRoutes = require('./routes/visitas');

// Prefijo para rutas de usuarios
app.use('/api/usuarios', usuariosRoutes);

// Prefijo para rutas de visitas
app.use('/api/visitas', visitasRoutes);

// Ruta base de prueba
app.get('/', (req, res) => {
  res.send('✅ API Visitantes corriendo correctamente.');
});

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🌐 Servidor corriendo en http://localhost:${PORT}`);
});
