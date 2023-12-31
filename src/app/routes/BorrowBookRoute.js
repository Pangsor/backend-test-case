import express from "express";
import { findAllBorrow,borrowBook } from "../controllers/borrowBookController.js";
import * as dotenv from 'dotenv';

dotenv.config();
const router = express.Router();
const api = process.env.API_URL; 
 
router.get(`${api}/borrow`, findAllBorrow);
router.post(`${api}/borrow`, borrowBook);
 
export default router;