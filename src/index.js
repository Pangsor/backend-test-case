import express from "express";
import cors from "cors";

import indexRoutes from "../src/app/routes/index.js";

import * as dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use(indexRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, ()=> console.log(`Server up and running on port ${PORT} ...`));
