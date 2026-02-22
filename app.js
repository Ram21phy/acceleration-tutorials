// const express = require('express');
// const expressLayouts = require('express-ejs-layouts');
// const path = require('path');

// const app = express();

// // EJS setup
// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));
// app.use(expressLayouts);

// // Static files
// app.use(express.static(path.join(__dirname, 'public')));

// // Routes
// app.get('/', (req, res) => {
//   res.render('home', {
//     layout: 'layout',
//     pageTitle: 'Home',
//     site: { title: 'Acceleration Tutorials' }
//   });
// });

// // Start Server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));

const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const User = require('./models/User'); // import user model

const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');

const app = express();

// ✅ Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'layout'); // default layout file

// ✅ MongoDB connection
const MONGO_URI = 'mongodb://127.0.0.1:27017/acceleration_tutorials';

mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch(err => console.error('❌ MongoDB connection error:', err));


// NOTE: `currentUser` is set after session middleware is configured below

// ✅ Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ✅ Session setup
app.use(session({
  secret: 'supersecret',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: MONGO_URI })
}));

// ✅ Make user info available to all EJS views
app.use(async (req, res, next) => {
  res.locals.currentUser = null;
  if (req.session.userId) {
    try {
      res.locals.currentUser = await User.findById(req.session.userId);
    } catch (err) {
      console.error('Error fetching user for session:', err);
    }
  }
  next();
});

// ✅ Routes
app.use('/', authRoutes);
app.use('/', dashboardRoutes);

// ✅ Home route
app.get('/', (req, res) => res.render('home', { pageTitle: 'Home', site: { title: 'Acceleration Tutorials' } }));

// ✅ Static Page Routes
app.get('/about', (req, res) => res.render('about', { pageTitle: 'About Us', site: { title: 'Acceleration Tutorials' } }));
app.get('/courses', (req, res) => res.render('courses', { pageTitle: 'Our Courses', site: { title: 'Acceleration Tutorials' } }));
app.get('/batches', (req, res) => res.render('batches', { pageTitle: 'Upcoming Batches', site: { title: 'Acceleration Tutorials' } }));
app.get('/results', (req, res) => res.render('results', { pageTitle: 'Our Results', site: { title: 'Acceleration Tutorials' } }));
app.get('/blog', (req, res) => res.render('blog', { pageTitle: 'Blog', site: { title: 'Acceleration Tutorials' } }));
app.get('/contact', (req, res) => res.render('contact', { pageTitle: 'Contact Us', site: { title: 'Acceleration Tutorials' } }));

// ✅ 404 fallback
app.use((req, res) => {
  res.status(404).render('404', { pageTitle: 'Page Not Found' });
});

// ✅ Start server
const PORT = 3000;
const HOST = '0.0.0.0'; // Bind to all interfaces
app.listen(PORT, HOST, () => console.log(`🚀 Server running at http://${HOST}:${PORT}`));
