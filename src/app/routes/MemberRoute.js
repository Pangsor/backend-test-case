import express from "express";
import { findAllMember,createMember, updateDataMember, deleteDataMember } from "../controllers/memberController.js";
import * as dotenv from 'dotenv';

dotenv.config();
const router = express.Router();
const api = process.env.API_URL; 
 
router.get(`${api}/member`, findAllMember);
router.post(`${api}/member`, createMember);
router.put(`${api}/member/:id`, updateDataMember);
router.delete(`${api}/member/:id`, deleteDataMember);
 
export default router;