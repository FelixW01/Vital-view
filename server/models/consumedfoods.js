const pool = require('../db/config'); 

const consumedFoodSchema = async () => {
    const query = `CREATE TABLE IF NOT EXISTS users (
        foodid INT AUTO_INCREMENT PRIMARY KEY,
        id INT AUTO_INCREMENT, 
        foodname VARCHAR(100) NOT NULL,
        consumption_date DATE NOT NULL
);`
        try {
        // create the table
        await pool.query(query);
        console.log('Consumed foods table present');
    } catch (err) {
        console.error('Could not create consumed foods table: ', err);
    }
}

module.exports = { consumedFoodSchema };