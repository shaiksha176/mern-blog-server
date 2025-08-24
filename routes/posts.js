const express = require("express");
const { body, validationResult } = require("express-validator");
const Post = require("../models/Post");
const { adminAuth } = require("../middleware/auth");

const router = express.Router();

// @route   GET /api/posts
// @desc    Get all posts with pagination and filters
// @access  Public
router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const category = req.query.category;
    const search = req.query.search;
    const status = req.query.status;

    // Build query object
    let query = {};

    // Handle status filtering
    if (status === "all") {
      // Return all posts (published and drafts) - for admin use
      // Don't add status filter
    } else if (status) {
      // Filter by specific status
      query.status = status;
    } else {
      // By default, only show published posts for public access
      query.status = "published";
    }

    if (category) {
      query.category = category;
    }

    if (search) {
      query.$text = { $search: search };
    }

    const skip = (page - 1) * limit;

    const posts = await Post.find(query)
      .populate("author", "name avatar")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Post.countDocuments(query);
    res.json({
      posts,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalPosts: total,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   GET /api/posts/slug/:slug
// @desc    Get single post by slug (admin - includes drafts)
// @access  Private (Admin)
router.get("/slug/:slug", adminAuth, async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug }).populate(
      "author",
      "name avatar bio socialLinks"
    );

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(post);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   GET /api/posts/:slug
// @desc    Get single post by slug (public - published only)
// @access  Public
router.get("/:slug", async (req, res) => {
  try {
    const post = await Post.findOne({
      slug: req.params.slug,
      status: "published",
    }).populate("author", "name avatar bio socialLinks");

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(post);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   PUT /api/posts/:id/view
// @desc    Increment post view count
// @access  Public
router.put("/:id/view", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Increment views
    post.views += 1;
    await post.save();

    res.json({ views: post.views });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   POST /api/posts
// @desc    Create a new post
// @access  Private (Admin)
router.post(
  "/",
  [
    adminAuth,
    [
      body("title", "Title is required").not().isEmpty(),
      body("content", "Content is required").not().isEmpty(),
      body("category", "Category is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { title, content, excerpt, category, tags, featuredImage, status } =
        req.body;

      // Generate slug from title
      let slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

      if (slug.length === 0) {
        slug = "untitled-post";
      }

      const post = new Post({
        title,
        slug,
        content,
        excerpt,
        category,
        tags: tags || [],
        featuredImage,
        status: status || "draft",
        author: req.user.id,
      });

      await post.save();
      await post.populate("author", "name avatar");

      res.json(post);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// @route   PUT /api/posts/:id
// @desc    Update a post
// @access  Private (Admin)
router.put("/:id", adminAuth, async (req, res) => {
  try {
    const { title, content, excerpt, category, tags, featuredImage, status } =
      req.body;

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (title) post.title = title;
    if (content) post.content = content;
    if (excerpt !== undefined) post.excerpt = excerpt;
    if (category) post.category = category;
    if (tags) post.tags = tags;
    if (featuredImage !== undefined) post.featuredImage = featuredImage;
    if (status) post.status = status;

    await post.save();
    await post.populate("author", "name avatar");

    res.json(post);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   DELETE /api/posts/:id
// @desc    Delete a post
// @access  Private (Admin)
router.delete("/:id", adminAuth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Use deleteOne() instead of deprecated remove()
    await Post.deleteOne({ _id: req.params.id });

    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Delete post error:", error);
    res.status(500).json({ message: "Server error while deleting post" });
  }
});

module.exports = router;
