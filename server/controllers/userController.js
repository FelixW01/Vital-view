const bcrypt = require('bcrypt');
const pool = require('../db/config.js'); 
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    const { email, password, firstName, lastName } = req.body
    console.log(email, password, firstName, lastName, '<<<<<<<< REQ.BODY')
    if (!email || !password || !firstName || !lastName) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        
        const hashedPassword = await bcrypt.hash(password, 10)
        const userId = uuidv4();

        const [rows, fields] = await pool.query('SELECT * FROM users WHERE email = ?;', [email])
        if (rows.length > 0) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        const query = `
            INSERT INTO users (id, firstName, lastName, email, password)
            VALUES (?, ?, ?, ?, ?);
        `;
        await pool.query(query, [userId, firstName, lastName, email, hashedPassword]);


        // Generate JWT token on register
        const token = jwt.sign(
            { id: userId, firstName:firstName, lastName: lastName, email: email },
            process.env.SECRET_KEY,
            { expiresIn: '2d' }
        );

        // Users are logged in as soon as they register
        res.status(200).json({
            message: 'Account created successfully',
            user: {
                firstName: firstName,
                lastName: lastName,
                id: userId,
                email: email
            },
            token // Send the JWT token
        });

    } catch(err) {
        console.error('Could not register user: ', err);
        res.status(500).json({ message: 'Server Error' });
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body
    try {

        const [rows, fields] = await pool.query('SELECT * FROM users WHERE email = ?;', [email])

        if (rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        // If user exists, it should be in rows[0]
        const user = rows[0]

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.SECRET_KEY,
            { expiresIn: '2d' }
        );

        res.status(200).json({ 
            message: 'Login successful', 
            // Send JWT token with result payload
            token,
        });

    } catch(err) {
        console.error('Error during login', err);
        res.status(500).json({ message: 'Server Error' });
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

module.exports = { registerUser, getUsers, loginUser };