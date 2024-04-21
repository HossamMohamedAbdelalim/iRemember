/*********** Define all your API routes ***********/


const express = require('express');
const bcrypt = require('bcrypt');
const User = require('./Model/UserSchema');

const router = express.Router();

// Display all stored users 
router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Update a user by ID
router.put('/users/:id', async (req, res) => {
    const updates = req.body;
    try {
        // If updating password, hash the new password before saving
        if (updates.password) {
            updates.password = await bcrypt.hash(updates.password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.id, updates, { new: true });
        if (updatedUser) {
            res.json(updatedUser);
        } else {
            res.status(404).send({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a single user by ID
router.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).send({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Delete a user by ID
router.delete('/users/:id', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (deletedUser) {
            res.status(200).send({ message: 'User deleted successfully' });
        } else {
            res.status(404).send({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// User login
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findOne({ name: req.body.name });
        if (user && await bcrypt.compare(req.body.password, user.password)) {
            res.status(200).send({ message: 'Login success' });
        } else {
            res.status(401).send({ message: 'Login failed' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Registration (and user creation) endpoint
router.post('/register', async (req, res) => {
    try {
        // Validate the incoming request...
        
        // Check if the user already exists by email
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists with the given email' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // Create the new user
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        });

        // Save the new user
        const newUser = await user.save();

        // Respond to the request
        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
            },
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});




module.exports = router;
