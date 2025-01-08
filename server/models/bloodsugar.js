const pool = require('../db/config'); 

const bloodSugarSchema = async () => {
    const query = `CREATE TABLE IF NOT EXISTS users (
        entryid INT AUTO_INCREMENT PRIMARY KEY,
        id INT AUTO_INCREMENT, 
        measurement_date DATE,
        level DECIMAL (3,2)
);`
        try {
        // create the table
        await pool.query(query);
        console.log('Blood Sugar table present');
    } catch (err) {
        console.error('Could not create blood sugar table: ', err);
    }
}

module.exports = { bloodSugarSchema };