const pool = require('../db/config.js');

const storeSugar = async (req, res) => {
    const { sugar } = req.body;
    const { user } = req;

    if (!user) {
        return res.status(401).json({ message: 'User not authenticated' });
    }
    
    try {
        const query = `
            INSERT INTO bloodsugar (userId, level)
            VALUES (?, ?);
        `;
        await pool.query(query, [user.id, sugar])
        res.status(200).json({ message: 'Blood sugar levels recorded' });
    } catch (err) {
        console.log('Error recording blood sugar levels', err);
        res.status(500).json({ message: 'Error recording blood sugar levels' });
    }
};

module.exports = { storeSugar };