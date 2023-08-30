import express from "express";
const router = express.Router();

import book from "./BookRoute.js";
import member from "./MemberRoute.js";
import borrowBook from "./BorrowBookRoute.js";
import returnBook from "./ReturnBookRoute.js";

router.use(book)
router.use(member)
router.use(borrowBook)
router.use(returnBook)

export default router;