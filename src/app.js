import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

// app.use(
//   cors({
//     origin: process.env.CORS_ORIGIN
//   })
// )


app.use(cors({
  origin: 'http://localhost:5173', // Your frontend's origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
}));

app.use(express.json());
app.use(express.urlencoded({ extende: true, limit: "16kb" }));
app.use(cookieParser())
app.use(express.static("public"));

// import routes
import userRouter from "../src/routes/user.routes.js";



// routes   
app.use(userRouter);



export { app }