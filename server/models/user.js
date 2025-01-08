const pool = require('../db/config'); 

const userSchema = async () => {
    const query = `CREATE TABLE IF NOT EXISTS users (
	id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
	firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    sugarId INT,
    foodId INT,
    FOREIGN KEY (sugarId) REFERENCES bloodsugar(sugarId),
    FOREIGN KEY (foodId) REFERENCES food(foodId),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);`
    try {
        // create the table
        await pool.query(query);
        console.log('User table present');
    } catch (err) {
        console.error('Could not create users table: ', err);
    }
}


module.exports = { userSchema };