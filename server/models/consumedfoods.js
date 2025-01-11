const pool = require('../db/config'); 

const savedFoodSchema = async () => {
    const query = `CREATE TABLE IF NOT EXISTS food (
        foodId INT AUTO_INCREMENT PRIMARY KEY, 
        userId CHAR(36) NOT NULL,
        uri VARCHAR(100),
        calories INT,
        nutrition VARCHAR(200),
        quantity INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (userId) REFERENCES users(userId)
);`
        try {
        // create the table
        await pool.query(query);
        console.log('Saved foods table present');
    } catch (err) {
        console.error('Could not create saved foods table: ', err);
    }
}

module.exports = { savedFoodSchema };