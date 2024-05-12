// userController.js
const dbOperation = require('./dbOperation');

async function registerUser(req, res) {
    try {
        const { email, password, firstName, lastName, city, description, profilePhotoURL } = req.body;
        const result = await dbOperation.registerUser(email, password, firstName, lastName, city, description, profilePhotoURL);
        res.status(201).json({ message: 'Registration successful' });
    } catch (error) {
        console.error('Error registering user:', error);
        if (error.code === 'EREQUEST' && error.number === 2627) {
            res.status(400).json({ error: 'Email already exists' });
        } else {
            res.status(500).json({ error: 'An error occurred while registering user' });
        }
    }
}


async function loginUser(req, res) {
    try {
        const { email, password } = req.body;
        const user = await dbOperation.loginUser(email, password);
        if (user) {
            res.status(200).json({ message: 'Login successful', user });
        } else {
            res.status(401).json({ error: 'Invalid email or password' });
        }
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ error: 'An error occurred while logging in user' });
    }
}

module.exports = {
    registerUser,
    loginUser
};
