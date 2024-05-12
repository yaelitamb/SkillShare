const express = require('express');
const cors = require('cors');
const multer = require('multer');
const abilityController = require('./abilityController');

const app = express();
app.use(express.json());
app.use(cors());

const upload = multer({ dest: 'uploads/' }); // Directorio donde se guardarán los archivos

// Ruta para subir habilidades con carga de archivos
app.post('/uploadAbility', upload.single('photoFile'), abilityController.uploadAbility);

// Otras rutas para obtener y manipular habilidades
app.get('/getAbilities', abilityController.getAbilities);
app.get('/ability/:id', abilityController.getAbilityById);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
