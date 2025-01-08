const bcrypt = require('bcrypt');
const pool = require('../db/config.js'); 

const registerUser = async (req, res) => {
    // req.body from front-end
    try {
        console.log('HIT')
        // Select * FROM users
        // WHERE email = ? [userInput.email]

        // if(userExists) then 
        // res.status(400).json({message: 'Email already registered'})
        
        // Hash password with bcrypt
        //  const hashedPassword = await bcrypt.hash(password, 10);

        // INSERT INTO users(username, firstName, lastName, email, password) VALUES(?, ?, ?, ?, ?);
        // [username.input], etc

    } catch(err) {
        console.error('Could not register user: ', err);
    }
}

const getUsers = async (req, res) => {
    try {
        const [rows, fields] = await pool.query('SELECT * FROM users');
        res.json(rows);
    } catch (err) {
        console.log('Error fetching users', err)
    }
}

module.exports = { registerUser, getUsers };