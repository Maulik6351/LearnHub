const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Course title is required'],
        trim: true,
        maxlength: 100
    },
    description: {
        type: String,
        required: [true, 'Course description is required'],
        maxlength: 1000
    },
    category: {
        type: String,
        required: [true, 'Course category is required'],
        enum: ['html', 'css', 'javascript', 'react', 'node', 'python', 'java', 'other']
    },
    price: {
        type: Number,
        required: [true, 'Course price is required'],
        min: 0
    },
    image: {
        type: String,
        required: [true, 'Course image is required']
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    duration: {
        type: String,
        required: [true, 'Course duration is required']
    },
    level: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced'],
        required: [true, 'Course level is required']
    },
    lessons: [{
        title: {
            type: String,
            required: true
        },
        description: String,
        videoUrl: String,
        duration: String,
        isPreview: {
            type: Boolean,
            default: false
        }
    }],
    requirements: [{
        type: String
    }],
    learningOutcomes: [{
        type: String
    }],
    enrolledStudents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    ratings: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        rating: {
            type: Number,
            min: 1,
            max: 5
        },
        review: String,
        date: {
            type: Date,
            default: Date.now
        }
    }],
    averageRating: {
        type: Number,
        default: 0
    },
    totalRatings: {
        type: Number,
        default: 0
    },
    isPublished: {
        type: Boolean,
        default: false
    },
    tags: [{
        type: String
    }]
}, {
    timestamps: true
});

// Calculate average rating
courseSchema.methods.calculateAverageRating = function() {
    if (this.ratings.length === 0) {
        this.averageRating = 0;
        this.totalRatings = 0;
    } else {
        const total = this.ratings.reduce((sum, rating) => sum + rating.rating, 0);
        this.averageRating = total / this.ratings.length;
        this.totalRatings = this.ratings.length;
    }
    return this.save();
};

module.exports = mongoose.model('Course', courseSchema); 