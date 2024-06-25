import express from 'express';
import bcrypt from 'bcrypt';
import User from './Model/UserSchema.js';
import Friend from './Model/FriendSchema.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const router = express.Router();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = 'uploads/';
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath);
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    },
});
const upload = multer({ storage: storage });

// User registration
router.post('/register', async (req, res) => {
    try {
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists with the given email' });
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = new User({
            email: req.body.email,
            password: hashedPassword,
        });
        const newUser = await user.save();
        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: newUser._id,
                email: newUser.email,
            },
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// User login
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user && await bcrypt.compare(req.body.password, user.password)) {
            res.status(200).send({ message: 'Login success', userId: user._id, profileSetup: user.profileSetup });
        } else {
            res.status(401).send({ message: 'Login failed' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add or update user profile
router.post('/users/:id/profile', upload.single('photo'), async (req, res) => {
    console.log(`Received request to update profile for user ${req.params.id}`);
    try {
        console.log(`Request body: ${JSON.stringify(req.body)}`);
        console.log(`req.file: ${JSON.stringify(req.file)}`);
        console.log(`req.files: ${JSON.stringify(req.files)}`);
        console.log(`Uploaded file: ${req.file ? req.file.path : 'No file uploaded'}`);
        
        const updates = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            birthday: req.body.birthday,
            profileSetup: true,
        };

        if (req.file) {
            updates.photo = req.file.path.replace(/\\/g, '/');
            console.log(`Photo path to be saved: ${req.file.path}`);
        } else {
            console.log('No photo uploaded');
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.id, updates, { new: true });
        if (updatedUser) {
            console.log("Updated user:", updatedUser);
            res.json(updatedUser);
        } else {
            res.status(404).send({ message: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

// Add or update friend profile
router.post('/friends', upload.single('photo'), async (req, res) => {
    try {
        const friendData = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            description: req.body.description,
        };

        if (req.file) {
            friendData.photo = req.file.path.replace(/\\/g, '/');
        }

        const newFriend = new Friend(friendData);
        const savedFriend = await newFriend.save();
        res.status(200).json(savedFriend);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all users
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

export default router;