const express = require('express');
const router = express.Router();
const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');
const User = require('../models/User');
const { protect } = require('../middleware/auth');

// @route   POST /api/enrollments/:courseId
// @desc    Enroll in a course
// @access  Private
router.post('/:courseId', protect, async (req, res) => {
    try {
        const course = await Course.findById(req.params.courseId);
        
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        // Check if user is already enrolled
        const existingEnrollment = await Enrollment.findOne({
            student: req.user.id,
            course: req.params.courseId
        });

        if (existingEnrollment) {
            return res.status(400).json({ message: 'Already enrolled in this course' });
        }

        // Create enrollment
        const enrollment = new Enrollment({
            student: req.user.id,
            course: req.params.courseId
        });

        await enrollment.save();

        // Add course to user's enrolled courses
        const user = await User.findById(req.user.id);
        user.enrolledCourses.push(req.params.courseId);
        await user.save();

        // Add student to course's enrolled students
        course.enrolledStudents.push(req.user.id);
        await course.save();

        res.status(201).json(enrollment);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   GET /api/enrollments/my-enrollments
// @desc    Get user's enrollments
// @access  Private
router.get('/my-enrollments', protect, async (req, res) => {
    try {
        const enrollments = await Enrollment.find({ student: req.user.id })
            .populate({
                path: 'course',
                populate: {
                    path: 'instructor',
                    select: 'name avatar'
                }
            })
            .sort({ enrolledAt: -1 });

        res.json(enrollments);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   GET /api/enrollments/:enrollmentId
// @desc    Get specific enrollment
// @access  Private
router.get('/:enrollmentId', protect, async (req, res) => {
    try {
        const enrollment = await Enrollment.findById(req.params.enrollmentId)
            .populate({
                path: 'course',
                populate: {
                    path: 'instructor',
                    select: 'name avatar'
                }
            });

        if (!enrollment) {
            return res.status(404).json({ message: 'Enrollment not found' });
        }

        // Check if user owns this enrollment
        if (enrollment.student.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        res.json(enrollment);
    } catch (error) {
        console.error(error.message);
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Enrollment not found' });
        }
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   PUT /api/enrollments/:enrollmentId/complete-lesson
// @desc    Mark lesson as completed
// @access  Private
router.put('/:enrollmentId/complete-lesson', protect, async (req, res) => {
    try {
        const { lessonId } = req.body;
        
        const enrollment = await Enrollment.findById(req.params.enrollmentId);

        if (!enrollment) {
            return res.status(404).json({ message: 'Enrollment not found' });
        }

        // Check if user owns this enrollment
        if (enrollment.student.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        // Check if lesson is already completed
        const lessonCompleted = enrollment.completedLessons.find(
            lesson => lesson.lessonId.toString() === lessonId
        );

        if (lessonCompleted) {
            return res.status(400).json({ message: 'Lesson already completed' });
        }

        // Add lesson to completed lessons
        enrollment.completedLessons.push({
            lessonId,
            completedAt: new Date()
        });

        await enrollment.calculateProgress();
        await enrollment.save();

        res.json(enrollment);
    } catch (error) {
        console.error(error.message);
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Enrollment not found' });
        }
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   DELETE /api/enrollments/:enrollmentId
// @desc    Cancel enrollment
// @access  Private
router.delete('/:enrollmentId', protect, async (req, res) => {
    try {
        const enrollment = await Enrollment.findById(req.params.enrollmentId);

        if (!enrollment) {
            return res.status(404).json({ message: 'Enrollment not found' });
        }

        // Check if user owns this enrollment
        if (enrollment.student.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        // Remove course from user's enrolled courses
        const user = await User.findById(req.user.id);
        user.enrolledCourses = user.enrolledCourses.filter(
            courseId => courseId.toString() !== enrollment.course.toString()
        );
        await user.save();

        // Remove student from course's enrolled students
        const course = await Course.findById(enrollment.course);
        if (course) {
            course.enrolledStudents = course.enrolledStudents.filter(
                studentId => studentId.toString() !== req.user.id
            );
            await course.save();
        }

        await enrollment.remove();

        res.json({ message: 'Enrollment cancelled' });
    } catch (error) {
        console.error(error.message);
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ message: 'Enrollment not found' });
        }
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router; 