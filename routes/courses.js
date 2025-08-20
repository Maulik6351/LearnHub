const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Course = require('../models/Course');
const { protect, authorize } = require('../middleware/auth');

// @route   GET /api/courses
// @desc    Get all courses
// @access  Public
router.get('/', async (req, res) => {
    try {
        const { category, search, page = 1, limit = 10 } = req.query;
        
        let query = { isPublished: true };
        
        // Filter by category
        if (category && category !== 'all') {
            query.category = category;
        }
        
        // Search functionality
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }
        
        const courses = await Course.find(query)
            .populate('instructor', 'name avatar')
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({ createdAt: -1 });
            
        const total = await Course.countDocuments(query);
        
        res.json({
            courses,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            total
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   GET /api/courses/:id
// @desc    Get single course
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const course = await Course.findById(req.params.id)
            .populate('instructor', 'name avatar bio')
            .populate('ratings.user', 'name avatar');
            
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        
        res.json(course);
    } catch (error) {
        console.error(error.message);
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   POST /api/courses
// @desc    Create a course
// @access  Private (Instructor/Admin)
router.post('/', [
    protect,
    authorize('instructor', 'admin'),
    [
        check('title', 'Title is required').not().isEmpty(),
        check('description', 'Description is required').not().isEmpty(),
        check('category', 'Category is required').not().isEmpty(),
        check('price', 'Price is required').isNumeric(),
        check('duration', 'Duration is required').not().isEmpty(),
        check('level', 'Level is required').not().isEmpty()
    ]
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const course = new Course({
            ...req.body,
            instructor: req.user.id
        });

        await course.save();
        res.status(201).json(course);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   PUT /api/courses/:id
// @desc    Update a course
// @access  Private (Instructor/Admin)
router.put('/:id', [
    protect,
    authorize('instructor', 'admin')
], async (req, res) => {
    try {
        let course = await Course.findById(req.params.id);
        
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        
        // Make sure user is course instructor or admin
        if (course.instructor.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({ message: 'Not authorized' });
        }
        
        course = await Course.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        
        res.json(course);
    } catch (error) {
        console.error(error.message);
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   DELETE /api/courses/:id
// @desc    Delete a course
// @access  Private (Instructor/Admin)
router.delete('/:id', [
    protect,
    authorize('instructor', 'admin')
], async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        
        // Make sure user is course instructor or admin
        if (course.instructor.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({ message: 'Not authorized' });
        }
        
        await course.remove();
        res.json({ message: 'Course removed' });
    } catch (error) {
        console.error(error.message);
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   POST /api/courses/:id/rate
// @desc    Rate a course
// @access  Private
router.post('/:id/rate', [
    protect,
    [
        check('rating', 'Rating is required').isInt({ min: 1, max: 5 }),
        check('review', 'Review is required').not().isEmpty()
    ]
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const course = await Course.findById(req.params.id);
        
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        
        // Check if user already rated
        const existingRating = course.ratings.find(
            rating => rating.user.toString() === req.user.id
        );
        
        if (existingRating) {
            return res.status(400).json({ message: 'Course already rated' });
        }
        
        const newRating = {
            user: req.user.id,
            rating: req.body.rating,
            review: req.body.review
        };
        
        course.ratings.unshift(newRating);
        await course.calculateAverageRating();
        
        res.json(course);
    } catch (error) {
        console.error(error.message);
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router; 