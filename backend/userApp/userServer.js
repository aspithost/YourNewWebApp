require('dotenv').config();

// Express
const express = require('express');
const app = express();


// Connect to DB
const { connectToMongoose } = require('./helpers/mongoose');
connectToMongoose();


// Connect to Redis
const { connectToRedis } = require('./helpers/redis');
connectToRedis();


// Timeout Error handling
app.use((req, res, next) => {
    res.setTimeout(2000, () => {
        const error = new Error('Request timed out');
        error.status = 408
        next(error);
    })
    next();
});


// Compression 
const compression = require('compression');
app.use(compression());


// Middleware
const helmet = require('helmet');

app.use(helmet.expectCt());
app.use(helmet.frameguard());
app.use(helmet.hsts());
app.use(helmet.noSniff());
app.use(helmet.permittedCrossDomainPolicies());

app.use('/avatars', express.static('public/avatars'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));


// Headers 
const cookieParser = require('cookie-parser');

app.use((req, res, next) => {

    const allowedOrigins = `${process.env.ALLOWED_ORIGIN_HOSTS}`
    const origin = req.headers.origin

    if (allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Origin', origin)
    } 
    
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});

app.use(cookieParser());

// Routes
const imageRoutes = require('./routes/imageRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/userapi/images', imageRoutes);
app.use('/userapi/users', userRoutes);


// Error Handling
app.use((err, req, res, next) => {
    return res.status( err.status || 500 ).json({ message: err.message })
});

app.use((req, res) => {
  return res.status(404).json({ message: '404 Error' });
});


// End
app.listen(process.env.APP_PORT, () => { 
    console.log(`now listening to user on ${process.env.APP_PORT}`)
});