import express from "express";
import { findAllBook,  createBook, updateDataBook, deleteDataBook } from "../controllers/bookController.js";
import * as dotenv from 'dotenv';

dotenv.config();
const router = express.Router();
const api = process.env.API_URL; 
 
router.get(`${api}/book`, findAllBook);
router.post(`${api}/book`, createBook);
router.put(`${api}/book/:id`, updateDataBook);
router.delete(`${api}/book/:id`, deleteDataBook);
 
export default router;