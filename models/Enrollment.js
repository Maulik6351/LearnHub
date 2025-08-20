const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    enrolledAt: {
        type: Date,
        default: Date.now
    },
    completedLessons: [{
        lessonId: {
            type: mongoose.Schema.Types.ObjectId
        },
        completedAt: {
            type: Date,
            default: Date.now
        }
    }],
    progress: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    completedAt: Date,
    certificate: {
        issued: {
            type: Boolean,
            default: false
        },
        issuedAt: Date,
        certificateId: String
    }
}, {
    timestamps: true
});

// Ensure unique enrollment per student per course
enrollmentSchema.index({ student: 1, course: 1 }, { unique: true });

// Calculate progress
enrollmentSchema.methods.calculateProgress = function() {
    if (this.course && this.course.lessons) {
        const totalLessons = this.course.lessons.length;
        const completedLessons = this.completedLessons.length;
        this.progress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
        
        if (this.progress === 100 && !this.isCompleted) {
            this.isCompleted = true;
            this.completedAt = new Date();
        }
    }
    return this.save();
};

module.exports = mongoose.model('Enrollment', enrollmentSchema); 