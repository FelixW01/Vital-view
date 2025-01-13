const pool = require('../db/config'); 

const bloodSugarSchema = async () => {
    const query = `CREATE TABLE IF NOT EXISTS bloodsugar (
        sugarId INT AUTO_INCREMENT PRIMARY KEY,
        userId CHAR(36) NOT NULL,
        measurement_date DATE DEFAULT (CURRENT_TIMESTAMP),
        level DECIMAL(5,2),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (userId) REFERENCES users(userId)
    );`;

        try {
        // create the table
        await pool.query(query);
        console.log('Blood Sugar table present');
    } catch (err) {
        console.error('Could not create blood sugar table: ', err);
    }
}

module.exports = { bloodSugarSchema };