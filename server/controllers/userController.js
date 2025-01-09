const bcrypt = require('bcrypt');
const pool = require('../db/config.js'); 
const { v4: uuidv4 } = require('uuid');

const registerUser = async (req, res) => {
    const { userName, email, password, firstName, lastName } = req.body
    console.log(userName, email, password, firstName, lastName, '<<<<<<<< REQ.BODY')
    if (!userName || !email || !password || !firstName || !lastName) {
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
            INSERT INTO users (id, username, firstName, lastName, email, password)
            VALUES (?, ?, ?, ?, ?, ?);
        `;
        await pool.query(query, [userId, userName, firstName, lastName, email, hashedPassword]);

        res.status(200).json({ message: 'Account created successfully' })

        // Logs in user upon successful register
        // await loginUser(req, res)

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

        res.status(200).json({ 
            message: 'Login successful', 
            user: {
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username, 
                id: user.id, 
                email: user.email
            }
        });

    } catch(err) {
        console.error('Could not find user: ', err);
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