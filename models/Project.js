const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  description: {
    type: String,
    required: true,
    maxlength: 1000
  },
  shortDescription: {
    type: String,
    required: true,
    maxlength: 200
  },
  technologies: [{
    type: String,
    trim: true
  }],
  category: {
    type: String,
    required: true,
    enum: ['Web Development', 'Mobile App', 'Desktop App', 'API', 'Game', 'Other']
  },
  images: [{
    type: String
  }],
  featuredImage: {
    type: String,
    required: true
  },
  liveUrl: {
    type: String
  },
  githubUrl: {
    type: String
  },
  demoUrl: {
    type: String
  },
  featured: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['completed', 'in-progress', 'planned'],
    default: 'completed'
  },
  startDate: {
    type: Date
  },
  endDate: {
    type: Date
  },
  difficulty: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
    default: 'Intermediate'
  },
  highlights: [{
    type: String,
    maxlength: 200
  }],
  challenges: {
    type: String,
    maxlength: 500
  },
  solutions: {
    type: String,
    maxlength: 500
  }
}, {
  timestamps: true
});

// Index for search
projectSchema.index({ title: 'text', description: 'text', technologies: 'text' });

module.exports = mongoose.model('Project', projectSchema); 