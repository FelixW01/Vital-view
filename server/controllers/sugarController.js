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

const getSugar = async (req, res) => {
    try {
        const user = req.user;

        const query = ` 
        SELECT * 
        FROM bloodsugar
        INNER JOIN users
        ON bloodsugar.userId = users.userId
        WHERE bloodsugar.userId = ?;
        `
        const [results] = await pool.query(query, [user.id]);
        
        if (results.length === 0) {
            return res.status(404).json({ message: 'No blood sugar records found for this user' });
        }
        const safeResults = results.map(row => {
            const { email, password, userId, sugarId, firstName, lastName, ...safeSugarData } = row;
            return safeSugarData;
        });

        res.status(200).json({ bloodSugarData: safeResults });

    } catch (err) {
        console.log('Error fetching user', err);
        res.status(500).json({ error: 'Server error' });
    }
}


module.exports = { storeSugar, getSugar };