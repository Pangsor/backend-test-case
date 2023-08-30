import express from "express";
import { findAllReturn,returnBook } from "../controllers/returnBookController.js";
import * as dotenv from 'dotenv';

dotenv.config();
const router = express.Router();
const api = process.env.API_URL; 
 
router.get(`${api}/return`, findAllReturn);
router.post(`${api}/return`, returnBook);
 
export default router;