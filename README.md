# MERN Blog & Portfolio

A full-stack blog and portfolio application built with the MERN stack (MongoDB, Express.js, React.js, Node.js). This application features a modern, responsive design with both blog and portfolio functionality.

## 🚀 Features

### Blog Features
- **Rich Text Blog Posts**: Create and manage blog posts with markdown support
- **Categories & Tags**: Organize posts with categories and tags
- **Search & Filter**: Search posts by title, content, and filter by categories
- **Comments & Likes**: Interactive features for reader engagement
- **SEO Optimized**: Meta tags, structured data, and SEO-friendly URLs
- **Admin Panel**: Full CRUD operations for blog management

### Portfolio Features
- **Project Showcase**: Display projects with detailed descriptions
- **Technology Stack**: Highlight technologies used in each project
- **Live Demos**: Links to live projects and GitHub repositories
- **Project Categories**: Filter projects by type (Web, Mobile, API, etc.)
- **Featured Projects**: Highlight your best work

### User Features
- **Authentication**: JWT-based authentication system
- **User Profiles**: Customizable user profiles with social links
- **Admin Dashboard**: Protected admin area for content management
- **Contact Form**: Integrated contact form with email notifications

### Technical Features
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Modern UI/UX**: Beautiful animations and smooth interactions
- **Image Upload**: Cloudinary integration for image management
- **Security**: Rate limiting, input validation, and security headers
- **Performance**: Optimized loading and caching strategies

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Cloudinary** - Image upload and management
- **Multer** - File upload handling
- **Express Validator** - Input validation
- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing

### Frontend
- **React.js** - Frontend framework
- **React Router** - Client-side routing
- **React Query** - Data fetching and caching
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Hook Form** - Form handling
- **React Hot Toast** - Toast notifications
- **Lucide React** - Icon library
- **React Markdown** - Markdown rendering
- **React Syntax Highlighter** - Code syntax highlighting

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)
- Cloudinary account (for image uploads)

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mern-blog-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   ```bash
   cp env.example .env
   ```
   
   Update the `.env` file with your configuration:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/mern-blog-portfolio
   JWT_SECRET=your_jwt_secret_key_here
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

4. **Start the backend server**
   ```bash
   npm run server
   ```

### Frontend Setup

1. **Navigate to client directory**
   ```bash
   cd client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

### Running Both Servers

From the root directory:
```bash
npm run dev
```

This will start both the backend (port 5000) and frontend (port 3000) servers concurrently.

## 🗄️ Database Setup

The application uses MongoDB. Make sure you have MongoDB installed and running locally, or use a cloud service like MongoDB Atlas.

### Initial Admin User

After starting the application, you'll need to create an admin user. You can do this by:

1. Register a new user through the application
2. Manually update the user's role to 'admin' in the database:
   ```javascript
   // In MongoDB shell or MongoDB Compass
   db.users.updateOne(
     { email: "your-email@example.com" },
     { $set: { role: "admin" } }
   )
   ```

## 📁 Project Structure

```
mern-blog-portfolio/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── contexts/       # React contexts
│   │   ├── pages/          # Page components
│   │   ├── utils/          # Utility functions
│   │   └── index.js        # Entry point
│   └── package.json
├── models/                 # MongoDB models
├── routes/                 # API routes
├── middleware/             # Custom middleware
├── server.js              # Express server
└── package.json
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/user` - Get current user
- `PUT /api/auth/profile` - Update user profile

### Blog Posts
- `GET /api/posts` - Get all posts (with pagination and filters)
- `GET /api/posts/:slug` - Get single post
- `POST /api/posts` - Create new post (admin only)
- `PUT /api/posts/:id` - Update post (admin only)
- `DELETE /api/posts/:id` - Delete post (admin only)
- `POST /api/posts/:id/like` - Like/unlike post
- `POST /api/posts/:id/comments` - Add comment

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get single project
- `POST /api/projects` - Create new project (admin only)
- `PUT /api/projects/:id` - Update project (admin only)
- `DELETE /api/projects/:id` - Delete project (admin only)

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all messages (admin only)
- `PUT /api/contact/:id/status` - Update message status (admin only)

### Upload
- `POST /api/upload/image` - Upload image to Cloudinary (admin only)
- `DELETE /api/upload/image/:public_id` - Delete image (admin only)

## 🎨 Customization

### Styling
The application uses Tailwind CSS for styling. You can customize the design by:
- Modifying `client/tailwind.config.js` for theme customization
- Updating `client/src/index.css` for custom styles
- Modifying component classes for layout changes

### Content
- Update the homepage content in `client/src/pages/Home.js`
- Modify the navigation in `client/src/components/Navbar.js`
- Update footer links in `client/src/components/Footer.js`

### Configuration
- Update environment variables in `.env`
- Modify API endpoints in `client/src/utils/api.js`
- Update Cloudinary configuration for image uploads

## 🚀 Deployment

### Backend Deployment (Heroku)
1. Create a Heroku account and install Heroku CLI
2. Create a new Heroku app
3. Add MongoDB addon (MongoDB Atlas)
4. Set environment variables in Heroku dashboard
5. Deploy using Git:
   ```bash
   git add .
   git commit -m "Deploy to Heroku"
   git push heroku main
   ```

### Frontend Deployment (Netlify/Vercel)
1. Build the React app:
   ```bash
   cd client
   npm run build
   ```
2. Deploy the `build` folder to your preferred hosting service

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) for animations
- [Lucide React](https://lucide.dev/) for beautiful icons
- [React Query](https://tanstack.com/query) for data fetching
- [Cloudinary](https://cloudinary.com/) for image management

## 📞 Support

If you have any questions or need help with the application, please open an issue on GitHub or contact me directly.

---

**Happy Coding! 🚀** 