const User = require('../models/User')
const bcrypt = require('bcrypt')

// @desc Get all users
// @route GET /users
// @access Private
const getAllUsers = async (req, res) => {
    // Get all users from MongoDB
    const users = await User.find().select('-password').lean()

    // If no users 
    if (!users?.length) {
        return res.status(400).json({ message: 'No users found' })
    }

    res.json(users)
}

// @desc Create new user
// @route POST /users
// @access Public
const createNewUser = async (req, res) => {
    const { username, password, uid, isReception } = req.body

    // Confirm data
    if (!username || !password || !uid || typeof isReception !== 'boolean' ) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Check for duplicate user identity
    const duplicate = await User.findOne({ uid }).collation({ locale: 'en', strength: 2 }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate user identity' })
    }

    // Hash password 
    const hashedPwd = await bcrypt.hash(password, 10) // salt rounds

    const userObject = { username, "password": hashedPwd, uid, isReception }

    // Create and store new user 
    const user = await User.create(userObject)

    if (user) { //created 
        res.status(201).json({ message: `New user ${username} created` })
    } else {
        res.status(400).json({ message: 'Invalid user data received' })
    }
}


module.exports = {
    getAllUsers,
    createNewUser
}