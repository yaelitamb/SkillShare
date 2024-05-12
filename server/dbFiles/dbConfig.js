//dbConfig.js
const config = {
    user: 'AdminLogin',
    password: '12345',
    server: 'LAPTOP-3F8GF3BH',
    database: 'SkillShare',
    options: {
        trustServerCertificate: true,
        trustedConnection: false,
        enableArithAbort: true,
        instancename: ''
    },
    port: 1433
}

module.exports = config;