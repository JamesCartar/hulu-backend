if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}
const express = require('express');
const cors = require('cors');
const path = require('path');


const authRouter = require('./routes/authRoute.js');
const userRouter = require('./routes/userRoute.js');
const movieRouter = require('./routes/movieRoute.js');
const listRouter = require('./routes/listRoute.js')
const screenPlayRouter = require('./routes/screenPlayRoute.js');
const trailerRouter = require('./routes/screenPlayTrailer.js');
const watchListRouter = require('./routes/watchListRoute.js');

const connectDB = require("./config/connectDb.js");

const { authMiddleware } = require('./middlewares/authMiddleware.js')

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: "https://arjun-hulu-clone.netlify.app"
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));


//when you run npm build the output will go to the ./public directory
app.use(express.static(path.join(__dirname, 'public')))

// routes
app.get('/', (req, res) => {
    res.status(200).json({ success: true, msg: 'you made it to the route' });
})

app.use('/auth', authRouter);
app.use('/users', authMiddleware, userRouter);
app.use('/movies', authMiddleware, movieRouter);
app.use('/lists', authMiddleware, listRouter)
app.use('/screenplay', screenPlayRouter);
app.use('/trailer', authMiddleware, trailerRouter);
app.use('/watch_list', authMiddleware, watchListRouter);

const start = async () => {
    let server;
    try {
        // connecting to Mongodb
        connectDB(process.env.MONGO_URI);

        server = app.listen(PORT, () => {
            console.log(`Server is listening on port http://www.localhost:${PORT}`);
        });
    } catch (error) {
        server.close();
    }
}

start();


