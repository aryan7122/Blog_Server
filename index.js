// index.js
import express from 'express';
import cors from 'cors';
import connectToMongo from './config/db.js';
import dotenv from 'dotenv';
import postRoutes from './routes/postRoutes.js';
import userRoutes from './routes/userRoutes.js';
const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());

connectToMongo(); // Call the function to connect to MongoDB

app.get('/', (req, res) => {
    res.send('<h1>Welcome to the Blog MERN Stack Application</h1>');
});

// Use post routes
app.use('/api', postRoutes);
//use register
app.use('/api/users', userRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
