// dbOperation.js

const config = require('./dbConfig');
const sql = require('mssql');

async function registerUser(email, password, firstName, lastName, city, description, profilePhotoURL) {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('Email', sql.NVarChar(255), email)
            .input('Password', sql.NVarChar(255), password)
            .input('FirstName', sql.NVarChar(255), firstName)
            .input('LastName', sql.NVarChar(255), lastName)
            .input('City', sql.NVarChar(255), city)
            .input('Description', sql.NVarChar(sql.MAX), description)
            .input('ProfilePhotoURL', sql.NVarChar(255), profilePhotoURL)
            .query('INSERT INTO [User] (Email, Password, FirstName, LastName, City, Description, ProfilePhotoURL) VALUES (@Email, @Password, @FirstName, @LastName, @City, @Description, @ProfilePhotoURL)');
        return result;
    } catch (error) {
        throw error;
    }
}

async function loginUser(email, password) {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('Email', sql.NVarChar(255), email)
            .input('Password', sql.NVarChar(255), password)
            .query('SELECT * FROM [User] WHERE Email = @Email AND Password = @Password');
        return result.recordset[0];
    } catch (error) {
        throw error;
    }
}

async function uploadAbility(userID, abilityName, photoURL, briefDescription) {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request()
            .input('UserID', sql.NVarChar(255), userID)
            .input('AbilityName', sql.NVarChar(255), abilityName)
            .input('PhotoURL', sql.NVarChar(255), photoURL)
            .input('BriefDescription', sql.NVarChar(sql.MAX), briefDescription)
            .query('INSERT INTO [Ability] (UserID, AbilityName, PhotoURL, BriefDescription) VALUES (@UserID, @AbilityName, @PhotoURL, @BriefDescription)');
        return result;
    } catch (error) {
        throw error;
    }
}

async function getAbilities() {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request().query('SELECT * FROM [Ability]');
        return result.recordset;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    registerUser,
    loginUser,
    uploadAbility,
    getAbilities
};
