const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const usuariosRoutes = require('./routes/usuarios');
const { verificarToken } = require('./middlewares/auth');

// Configurar dotenv para usar variables de entorno
dotenv.config();

// Inicializar express
const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Habilitar CORS
app.use(cors());

// Rutas
app.use('/api/usuarios', usuariosRoutes);

// Ruta raíz
app.get('/', (req, res) => {
  res.send('Bienvenido a la API de Registro de Visitantes');
});

// Iniciar el servidor
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`🌐 Servidor corriendo en http://localhost:${port}`);
});

const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync("admin123", salt);

// Luego actualiza la base de datos con el hash generado
