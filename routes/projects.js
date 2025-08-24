const express = require('express');
const { body, validationResult } = require('express-validator');
const Project = require('../models/Project');
const { adminAuth } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/projects
// @desc    Get all projects with filters
// @access  Public
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const category = req.query.category;
    const status = req.query.status;
    const featured = req.query.featured;
    const search = req.query.search;

    let query = {};

    if (category) {
      query.category = category;
    }

    if (status) {
      query.status = status;
    }

    if (featured === 'true') {
      query.featured = true;
    }

    if (search) {
      query.$text = { $search: search };
    }

    const skip = (page - 1) * limit;

    const projects = await Project.find(query)
      .sort({ featured: -1, createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Project.countDocuments(query);

    res.json({
      projects,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalProjects: total
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/projects/:id
// @desc    Get single project
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json(project);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/projects
// @desc    Create a new project
// @access  Private (Admin)
router.post('/', [adminAuth, [
  body('title', 'Title is required').not().isEmpty(),
  body('description', 'Description is required').not().isEmpty(),
  body('shortDescription', 'Short description is required').not().isEmpty(),
  body('category', 'Category is required').not().isEmpty(),
  body('technologies', 'Technologies are required').isArray({ min: 1 }),
  body('featuredImage', 'Featured image is required').not().isEmpty()
]], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const {
      title,
      description,
      shortDescription,
      technologies,
      category,
      images,
      featuredImage,
      liveUrl,
      githubUrl,
      demoUrl,
      featured,
      status,
      startDate,
      endDate,
      difficulty,
      highlights,
      challenges,
      solutions
    } = req.body;

    const project = new Project({
      title,
      description,
      shortDescription,
      technologies,
      category,
      images: images || [],
      featuredImage,
      liveUrl,
      githubUrl,
      demoUrl,
      featured: featured || false,
      status: status || 'completed',
      startDate,
      endDate,
      difficulty: difficulty || 'Intermediate',
      highlights: highlights || [],
      challenges,
      solutions
    });

    await project.save();
    res.json(project);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/projects/:id
// @desc    Update a project
// @access  Private (Admin)
router.put('/:id', adminAuth, async (req, res) => {
  try {
    const {
      title,
      description,
      shortDescription,
      technologies,
      category,
      images,
      featuredImage,
      liveUrl,
      githubUrl,
      demoUrl,
      featured,
      status,
      startDate,
      endDate,
      difficulty,
      highlights,
      challenges,
      solutions
    } = req.body;

    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    if (title) project.title = title;
    if (description) project.description = description;
    if (shortDescription) project.shortDescription = shortDescription;
    if (technologies) project.technologies = technologies;
    if (category) project.category = category;
    if (images) project.images = images;
    if (featuredImage) project.featuredImage = featuredImage;
    if (liveUrl !== undefined) project.liveUrl = liveUrl;
    if (githubUrl !== undefined) project.githubUrl = githubUrl;
    if (demoUrl !== undefined) project.demoUrl = demoUrl;
    if (featured !== undefined) project.featured = featured;
    if (status) project.status = status;
    if (startDate) project.startDate = startDate;
    if (endDate) project.endDate = endDate;
    if (difficulty) project.difficulty = difficulty;
    if (highlights) project.highlights = highlights;
    if (challenges !== undefined) project.challenges = challenges;
    if (solutions !== undefined) project.solutions = solutions;

    await project.save();
    res.json(project);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/projects/:id
// @desc    Delete a project
// @access  Private (Admin)
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    await project.remove();
    res.json({ message: 'Project removed' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/projects/categories
// @desc    Get all project categories
// @access  Public
router.get('/categories', async (req, res) => {
  try {
    const categories = await Project.distinct('category');
    res.json(categories);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 