const pool = require('../db/config'); 

const savedFoodSchema = async () => {
    const query = `CREATE TABLE IF NOT EXISTS food (
        id INT AUTO_INCREMENT PRIMARY KEY, 
        uri VARCHAR(100),
        calories INT,
        nutrition VARCHAR(200),
        quanity INT
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