import express from "express";
const router = express.Router();

import book from "./BookRoute.js";
import member from "./MemberRoute.js";
import borrowBook from "./BorrowBookRoute.js";

router.use(book)
router.use(member)
router.use(borrowBook)

export default router;