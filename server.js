const express = require('express');
const tachesRoutes = require('./routes/taches');

const app = express();
const port = 8080;

// Middleware pour parser le JSON dans les requêtes
app.use(express.json());

// Routes
app.use('/taches', tachesRoutes);

// Démarrage du serveur
app.listen(port, () => {
  console.log(`Serveur en écoute sur http://localhost:${port}`);
});