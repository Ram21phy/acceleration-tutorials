# Acceleration Tutorials

A full-stack web application built with Express.js, EJS, Bootstrap, and MongoDB. Features user authentication, dashboard, course management, and more.

## Features

- ✅ User Registration & Login (with bcrypt password hashing)
- ✅ User Dashboard
- ✅ Course Management
- ✅ Batch Information
- ✅ Results Tracking
- ✅ Contact & Blog Pages
- ✅ Responsive Bootstrap UI
- ✅ Session Management
- ✅ MongoDB Database Integration

## Tech Stack

- **Backend**: Node.js, Express.js
- **Frontend**: EJS, Bootstrap 5, CSS3
- **Database**: MongoDB
- **Authentication**: express-session, bcrypt
- **Desktop**: Electron (optional)

## Installation

### Prerequisites
- Node.js (v14+)
- MongoDB (running on localhost:27017)
- npm or yarn

### Setup

1. Clone the repository:
```bash
git clone <your-repo-url>
cd acceleration-tutorials
```

2. Install dependencies:
```bash
npm install
```

3. Start MongoDB:
```bash
mongod
```

4. Run the application:
```bash
# Development mode
npm run dev

# Production mode
npm start

# As Desktop App (Electron)
npm start
```

The app will be available at `http://localhost:3000`

## Environment Variables

Create a `.env` file (optional):
```
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/acceleration_tutorials
SESSION_SECRET=your-secret-key
```

## Deployment

### Option 1: Vercel (Recommended for Node.js)
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

### Option 2: Render.com
1. Connect GitHub repository
2. Create new Web Service
3. Set Build Command: `npm install`
4. Set Start Command: `npm start`

### Option 3: Heroku
1. Install Heroku CLI
2. Run: `heroku login`
3. Run: `heroku create your-app-name`
4. Run: `git push heroku main`

## Project Structure

```
├── app.js                 # Express server
├── main.js               # Electron entry point
├── models/               # Database models
│   └── User.js
├── routes/               # Route handlers
│   ├── auth.js
│   └── dashboard.js
├── views/                # EJS templates
│   ├── authentication/
│   ├── partials/
│   └── *.ejs
├── public/               # Static assets
│   ├── css/
│   ├── js/
│   └── images/
└── package.json
```

## API Endpoints

### Authentication
- `GET /login` - Login page
- `POST /login` - Process login
- `GET /register` - Register page
- `POST /register` - Process registration
- `GET /logout` - Logout user

### Dashboard
- `GET /dashboard` - User dashboard (protected)

### Public Routes
- `GET /` - Home page
- `GET /about` - About page
- `GET /courses` - Courses page
- `GET /batches` - Batches page
- `GET /results` - Results page
- `GET /blog` - Blog page
- `GET /contact` - Contact page

## Scripts

- `npm start` - Run as desktop app (Electron) or web server
- `npm run dev` - Run in development mode with nodemon
- `npm run server` - Run as web server only
- `npm run build` - Build Electron app

## License

MIT

## Author

Your Name

## Support

For issues and questions, please open an issue on GitHub.
