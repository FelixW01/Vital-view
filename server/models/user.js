const pool = require('../db/config'); 

const userSchema = async () => {
    const query = `CREATE TABLE IF NOT EXISTS users (
	userId CHAR(36) PRIMARY KEY,
	firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP);`
    try {
        // create the table
        await pool.query(query);
        console.log('User table present');
    } catch (err) {
        console.error('Could not create users table: ', err);
    }
}


module.exports = { userSchema };