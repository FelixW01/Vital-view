const pool = require('../db/config.js');

const storeRecipe = async (req, res) => {
    const { label, source, image, url, calories, sugar } = req.body;
    const { user } = req;

    if (!user) {
        return res.status(401).json({ message: 'User not authenticated' });
    }
    
    try {
        const query = `
            INSERT INTO food (userId, label, source, image, url, calories, sugar)
            VALUES (?, ?, ?, ?, ?, ?, ?);
        `;
        await pool.query(query, [user.id, label, source, image, url, calories, sugar])
        res.status(200).json({ message: 'Recipe recorded' });
    } catch (err) {
        console.log('Error recording blood sugar levels', err);
        res.status(500).json({ message: 'Error recording Recipe levels' });
    }
};

const getRecipe = async (req, res) => {
    try {
        const user = req.user;

        const query = ` 
        SELECT * 
        FROM food
        INNER JOIN users
        ON food.userId = users.userId
        WHERE food.userId = ?;
        `
        const [results] = await pool.query(query, [user.id]);
        
        if (results.length === 0) {
            return res.status(404).json({ message: 'No recipes found for this user' });
        }
        const safeResults = results.map(row => {
            const { email, password, userId, recipeId, firstName, lastName, ...safeRecipeData } = row;
            console.log(safeRecipeData);
            return safeRecipeData;
        });

        res.status(200).json({ recipeData: safeResults });

    } catch (err) {
        console.log('Error fetching recipe information', err);
        res.status(500).json({ error: 'Server error' });
    }
}

 
module.exports = { storeRecipe, getRecipe };