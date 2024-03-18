import express from "express";
import morgan from "morgan";
import cors from "cors";
import personRoutes from "./routes/person.routes.js";
import dotenv from 'dotenv';
dotenv.config();

const app = express();

// middlewares
app.use(morgan("dev")); 
// app.use(express.urlencoded({ extended: false }));
app.use(express.json()); // Parse JSON bodies
app.use(cors()); // Use cors middleware to handle CORS issues


// routes
app.use(personRoutes);

// starting the server
export default app;
