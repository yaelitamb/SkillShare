// abilityController.js
const dbOperation = require('./dbOperation');
const fs = require('fs');
const path = require('path');

async function uploadAbility(req, res) {
    try {
        const { abilityName, briefDescription } = req.body;
        const { photoFile } = req.files; // Obtener la imagen del archivo enviado

        // Guardar la imagen en el servidor
        const uploadDir = path.join(__dirname, 'uploads');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }
        const fileName = Date.now() + '_' + photoFile.name;
        const filePath = path.join(uploadDir, fileName);
        await photoFile.mv(filePath);

        // Guardar la URL de la imagen en la base de datos
        const photoURL = `/uploads/${fileName}`; // URL de la imagen relativa al servidor
        await dbOperation.uploadAbility(abilityName, photoURL, briefDescription);

        res.status(201).json({ message: 'Ability uploaded successfully' });
    } catch (error) {
        console.error('Error uploading ability:', error);
        res.status(500).json({ error: 'An error occurred while uploading ability' });
    }
}

module.exports = {
    uploadAbility
};
