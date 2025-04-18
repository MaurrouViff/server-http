const express = require('express');
const router = express.Router();
const tachesController = require('../controllers/tachesController');
const fs = require('fs');
const path = require('path');

// Routes pour les tâches
router.get('/', tachesController.getTaches);
router.post('/', tachesController.ajouterTache);
router.put('/:id', tachesController.modifierTache);
router.delete('/:id', tachesController.supprimerTache);

// router pour créer
router.get('/creer', (req, res) => {
  // Récupérer le titre depuis les paramètres d'URL
  const titre = req.query.titre;


  if (!titre) {
    return res.status(400).json({ message: "Le paramètre 'titre' est requis pour créer une tâche." });
  }

  // Lecture des tâches existantes
  const dataPath = path.join(__dirname, '../data/taches.json');
  let taches = [];
  try {
    const data = fs.readFileSync(dataPath, 'utf8');
    taches = JSON.parse(data);
  } catch (err) {
    console.error("Erreur de lecture du fichier des tâches :", err);
  }

  // Création de la nouvelle tâche
  const nouvelleTache = {
    id: taches.length + 1,
    titre: titre
  };

  // Ajout de la tâche à la liste et sauvegarde
  taches.push(nouvelleTache);
  try {
    fs.writeFileSync(dataPath, JSON.stringify(taches, null, 2), 'utf8');
  } catch (err) {
    console.error("Erreur lors de l'écriture des tâches :", err);
    return res.status(500).json({ message: 'Impossible de sauvegarder la tâche.' });
  }

  // Retourner une réponse avec la tâche créée
  res.status(201).json({ message: 'Tâche créée avec succès.', tache: nouvelleTache });
});

module.exports = router;