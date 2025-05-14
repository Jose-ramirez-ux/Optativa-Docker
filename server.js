const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;

// Conexión con la base de datos MongoDB
mongoose.connect('mongodb://mongo:27017/lockus', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Conexión exitosa a MongoDB'))
  .catch((err) => console.log('Error en la conexión a MongoDB:', err));

// Endpoint simple
app.get('/', (req, res) => {
  res.send('¡Hola desde el endpoint!');
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
