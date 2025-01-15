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
            VALUES (?, ?, ?, ?, ?, ?, ?)`;
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
            return {
                foodId: row.foodId,
                label: row.label,
                source: row.source,
                image: row.image,
                url: row.url,
                calories: row.calories,
                sugar: row.sugar,
                created_at: row.created_at,
                updated_at: row.updated_at
            };
        });
        
        
        // Send sanitized data in the response
        res.status(200).json({ recipeData: safeResults });

    } catch (err) {
        console.log('Error fetching recipe information', err);
        res.status(500).json({ error: 'Server error' });
    }
}

const deleteRecipe = async (req, res) => {
    try {
        const user = req.user;
        const { foodId } = req.body;

        const checkQuery = `
            SELECT * 
            FROM food
            WHERE foodId = ? AND userId = ?;
        `;
        
        const [checkResults] = await pool.query(checkQuery, [foodId, user.id]);

        if (checkResults.length === 0) {
            return res.status(404).json({ message: 'Recipe not found or not owned by user' });
        }

        // Delete the recipe
        const deleteQuery = `
            DELETE FROM food
            WHERE foodId = ? AND userId = ?;
        `;

        const [deleteResult] = await pool.query(deleteQuery, [foodId, user.id]);

        if (deleteResult.affectedRows === 0) {
            return res.status(500).json({ message: 'Error deleting recipe' });
        }

        // Send success response
        res.status(200).json({ message: 'Recipe deleted successfully' });

    } catch (err) {
        console.log('Error deleting recipe', err);
        res.status(500).json({ error: 'Server error' });
    }
};
 
module.exports = { storeRecipe, getRecipe, deleteRecipe };