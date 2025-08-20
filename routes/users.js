const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const { protect, authorize } = require('../middleware/auth');

// @route   GET /api/users/profile
// @desc    Get current user profile
// @access  Private
router.get('/profile', protect, async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
            .populate('enrolledCourses')
            .select('-password');
        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', [
    protect,
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Please include a valid email').isEmail()
    ]
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, bio, avatar } = req.body;

    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if email is already taken
        if (email !== user.email) {
            const emailExists = await User.findOne({ email });
            if (emailExists) {
                return res.status(400).json({ message: 'Email already exists' });
            }
        }

        user.name = name;
        user.email = email;
        if (bio) user.bio = bio;
        if (avatar) user.avatar = avatar;

        await user.save();

        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   GET /api/users/enrolled-courses
// @desc    Get user's enrolled courses
// @access  Private
router.get('/enrolled-courses', protect, async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
            .populate({
                path: 'enrolledCourses',
                populate: {
                    path: 'instructor',
                    select: 'name avatar'
                }
            });
        
        res.json(user.enrolledCourses);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   GET /api/users/wishlist
// @desc    Get user's wishlist
// @access  Private
router.get('/wishlist', protect, async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
            .populate({
                path: 'wishlist',
                populate: {
                    path: 'instructor',
                    select: 'name avatar'
                }
            });
        
        res.json(user.wishlist);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   POST /api/users/wishlist/:courseId
// @desc    Add course to wishlist
// @access  Private
router.post('/wishlist/:courseId', protect, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if course is already in wishlist
        if (user.wishlist.includes(req.params.courseId)) {
            return res.status(400).json({ message: 'Course already in wishlist' });
        }

        user.wishlist.push(req.params.courseId);
        await user.save();

        res.json({ message: 'Course added to wishlist' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   DELETE /api/users/wishlist/:courseId
// @desc    Remove course from wishlist
// @access  Private
router.delete('/wishlist/:courseId', protect, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.wishlist = user.wishlist.filter(
            courseId => courseId.toString() !== req.params.courseId
        );
        
        await user.save();

        res.json({ message: 'Course removed from wishlist' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   GET /api/users/instructors
// @desc    Get all instructors
// @access  Public
router.get('/instructors', async (req, res) => {
    try {
        const instructors = await User.find({ role: 'instructor' })
            .select('name avatar bio')
            .populate({
                path: 'enrolledCourses',
                select: 'title image'
            });
        
        res.json(instructors);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router; 