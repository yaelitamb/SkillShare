// apiService.js

const BASE_URL = 'http://localhost:5000'; // Actualiza con la URL de tu servidor

export const registerUser = async (email, password, firstName, lastName, city, description, profilePhotoURL) => {
    try {
        const response = await fetch(`${BASE_URL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, firstName, lastName, city, description, profilePhotoURL })
        });
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
};

export const loginUser = async (email, password) => {
    try {
        const response = await fetch(`${BASE_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
};

export const uploadAbility = async (formData) => {
    try {
        const response = await fetch(`${BASE_URL}/uploadAbility`, {
            method: 'POST',
            body: formData // Usa el FormData directamente como cuerpo de la solicitud
        });
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
};

export const getAbilities = async () => {
    try {
        const response = await fetch(`${BASE_URL}/getAbilities`);
        if (!response.ok) {
            throw new Error('Failed to fetch abilities');
        }
        const data = await response.json();
        return data.abilities || [];
    } catch (error) {
        throw error;
    }
};

