// MainPage.js
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { uploadAbility, getAbilities } from './apiService'; // Importa las funciones de servicio API
import './MainPage.css'; // Importa el archivo CSS

function MainPage() {
    const [abilities, setAbilities] = useState([]);
    const [newAbility, setNewAbility] = useState({
        abilityName: '',
        briefDescription: '',
        photoFile: null // Agrega un estado para la imagen
    });
    const [uploadError, setUploadError] = useState('');
    const history = useHistory();

    useEffect(() => {
        fetchAbilities();
    }, []);

    const fetchAbilities = async () => {
        try {
            const fetchedAbilities = await getAbilities();
            setAbilities(fetchedAbilities);
        } catch (error) {
            console.error('Error fetching abilities:', error);
        }
    };

    const handleAbilityInputChange = (e) => {
        setNewAbility({
            ...newAbility,
            [e.target.name]: e.target.value
        });
    };

    const handlePhotoFileChange = (e) => {
        setNewAbility({
            ...newAbility,
            photoFile: e.target.files[0] // Guarda el archivo de imagen en el estado
        });
    };

    const handleAbilitySubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('abilityName', newAbility.abilityName);
            formData.append('briefDescription', newAbility.briefDescription);
            formData.append('photoFile', newAbility.photoFile); // Agrega la imagen al FormData

            await uploadAbility(formData);
            setUploadError('');
            setNewAbility({
                abilityName: '',
                briefDescription: '',
                photoFile: null // Restablece el estado del archivo de imagen después de subirlo
            });
            fetchAbilities();
        } catch (error) {
            console.error('Error uploading ability:', error);
            setUploadError('Error uploading ability. Please try again.');
        }
    };

    return (
        <div>
            <h2>Upload Ability</h2>
            <div className="upload-section">
                <form onSubmit={handleAbilitySubmit} encType="multipart/form-data" className="ability-form">
                    <input type="text" name="abilityName" placeholder="Ability Name" value={newAbility.abilityName} onChange={handleAbilityInputChange} />
                    <input type="file" name="photoFile" onChange={handlePhotoFileChange} />
                    <hr/>
                    <input type="text" name="briefDescription" placeholder="Brief Description" value={newAbility.briefDescription} onChange={handleAbilityInputChange} />
                    <button type="submit">Upload</button>
                </form>
                {uploadError && <p className="error-message">{uploadError}</p>}
            </div>
            <div className="abilities-section">
                <h3>Abilities</h3>
                <ul>
                    {abilities.map((ability) => (
                        <li key={ability.id}>
                            <img src={ability.photoURL} alt={ability.abilityName} />
                            <p>{ability.abilityName}</p>
                            <p>{ability.briefDescription}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default MainPage;
