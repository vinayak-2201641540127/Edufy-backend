import express from 'express';
import dotenv from 'dotenv';
// import { connect } from 'http2';
import { connectDb } from './database/db.js';
import Razorpay from 'razorpay';
import cors from 'cors';

dotenv.config();

export const instance = new Razorpay({
    key_id: process.env.Razorpay_Key,
    key_secret: process.env.Razorpay_Secret,
});

const app = express();
//usig middlewares
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT;

app.get("/",(req, res) => {
    res.send("Server is Working");
})

app.use('/uploads',express.static('uploads'))

//importing routes
import userRoutes from './routes/user.js';
import courseRoutes from './routes/course.js';
import adminRoutes from './routes/admin.js';



app.use('/api', userRoutes);
app.use('/api', courseRoutes);
app.use('/api', adminRoutes);



app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`);
    connectDb();
})