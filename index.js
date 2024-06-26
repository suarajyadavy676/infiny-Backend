const express = require('express');
const path = require('path');
const dbConnection = require('./src/config/db');
const userRouter = require('./src/routes/user.routes');
const cors = require('cors');
const productRouter = require('./src/routes/product.routes');
const app = express();
require('dotenv').config();

let port = process.env.PORT || 4000;

// Allowed origins for production
const allowedOrigins = [
  'https://www.infinyschool.com',
  'https://infiny-school.netlify.app',
  'https://frontend-git-main-suraj-yadavs-projects.vercel.app',
  'http://localhost:5173'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

// Apply CORS configuration based on environment
if (process.env.NODE_ENV === 'production') {
  app.use(cors(corsOptions));
} else {
  app.use(cors());
}

// for ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// for tailwind css
app.use(express.static(path.join(__dirname, 'public')));

// Middleware
app.use(express.json());

// Home route
app.get('/', (req, res) => {
  return res.render('index', { name: 'Home' });
});

// All routes
app.use('/user', userRouter);
app.use('/products', productRouter);

app.listen(port, async () => {
  try {
    await dbConnection();
    console.log(`Server is running on port ${port}`);
  } catch (error) {
    console.log('Error in listening port:', error);
  }
});
