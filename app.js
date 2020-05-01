 //
 // ─── REQUIREMENTS ───────────────────────────────────────────────────────────────

 const express = require('express');
 const cat = require('cat-me');
 const colors = require('colors');
 const dotenv = require('dotenv').config();
 const path = require('path');
 const bodyParser = require('body-parser');
 const cors = require('cors');
 const helmet = require('helmet');
 const cookieParser = require('cookie-parser');


 // Mongoose user model
 const User = require('./models/User');
 //
 // ─── APP ────────────────────────────────────────────────────────────────────────     
 const app = express();

 //
 // ─── MONGO CONNECTION ───────────────────────────────────────────────────────────

 const connectDB = require('./config/db');
 connectDB();

 //
 // ─── MIDDLEWARE ─────────────────────────────────────────────────────────────────
 app.use(bodyParser.urlencoded({
     extended: false
 }));
 app.use(bodyParser.json());

 //
 // ─── STATIC ─────────────────────────────────────────────────────────────────────

 app.use(express.static(path.join(__dirname, 'public')));
 // React front end

 //
 // ─── Cors Helmet ───────────────────────────────────────────────────────────────────
 app.use(cors());
 app.use(helmet());
 // Next, we disable 'x-powered-by', this makes it more difficult for users to see that we are using Express. Why is that a good thing? The less hackers know about our stack the better.
 app.disable('x-powered-by');
 app.use(cookieParser());

 //
 // ─── EXTERNALS ROUTES ───────────────────────────────────────────────────────────
 let index = require('./routes/index');
 let users = require('./routes/users');

 app.use('/user', users);
 app.use('/', index);

 // catch 404 and forward to error handler
 app.use(function(req, res, next) {
     res.status(404).json({
         success: false,
         msg: '404 not found 🥺'
     });
 });

 //
 // ─── LISTEN ─────────────────────────────────────────────────────────────────────

 let PORT = process.env.PORT || 3001
 app.listen(PORT, () => {
     console.log(cat())
     console.log(`Server beating 💓 on PORT ${PORT}`.green);
 });