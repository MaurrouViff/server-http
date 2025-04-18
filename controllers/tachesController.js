const fs = require('fs');
const path = require('path');

// Chemin vers le fichier de données
const dataPath = path.join(__dirname, '../data/taches.json');

// Lire les tâches depuis le fichier JSON
const lireTaches = () => {
  try {
    const data = fs.readFileSync(dataPath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
};

// Écrire dans le fichier JSON
const ecrireTaches = (taches) => {
  fs.writeFileSync(dataPath, JSON.stringify(taches, null, 2), 'utf8');
};

// Récupérer toutes les tâches
exports.getTaches = (req, res) => {
  const taches = lireTaches();
  res.status(200).json(taches);
};

// Ajouter une nouvelle tâche
exports.ajouterTache = (req, res) => {
  const taches = lireTaches();
  const nouvelleTache = { id: taches.length + 1, ...req.body };
  taches.push(nouvelleTache);
  ecrireTaches(taches);
  res.status(201).json(nouvelleTache);
};

// Modifier une tâche
exports.modifierTache = (req, res) => {
  const taches = lireTaches();
  const id = parseInt(req.params.id, 10);
  const index = taches.findIndex((t) => t.id === id);

  if (index !== -1) {
    taches[index] = { ...taches[index], ...req.body };
    ecrireTaches(taches);
    res.status(200).json(taches[index]);
  } else {
    res.status(404).json({ message: "Tâche non trouvée" });
  }
};

// Supprimer une tâche
exports.supprimerTache = (req, res) => {
  const taches = lireTaches();
  const id = parseInt(req.params.id, 10);
  const index = taches.findIndex((t) => t.id === id);

  if (index !== -1) {
    taches.splice(index, 1);
    ecrireTaches(taches);
    res.status(204).send();
  } else {
    res.status(404).json({ message: "Tâche non trouvée" });
  }
};