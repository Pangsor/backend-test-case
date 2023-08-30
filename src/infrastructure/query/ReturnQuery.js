import ReturnBook from "../../domain/ReturnBook.js";
import {QueryTypes} from "sequelize";
import db from "../../config/Database.js";
import { dateNow } from "../../helper/ConvertDate.js";

export const findAll = async(req, res) =>{
    try {
        const query = `SELECT 
                        r.date,r.memberCode,r.bookCode,
                        m.name AS memberName,b.title,b.author
                        FROM return_book r LEFT JOIN member m
                        ON r.memberCode = m.code
                        LEFT JOIN book b
                        ON r.bookCode = b.code`;
        const result = await db.query(query, { type: QueryTypes.SELECT });
        return result;
    } catch (error) {
        return res.status(400).json({
            message: error
        });
    }
}

export const persistReturnBook = async(req, res) =>{
    try {
        const { memberCode, bookCode, dueDate, borrowBookId } = req;
        let returnDate = dateNow();
        let result = await ReturnBook.create({
            date: returnDate,
            memberCode: memberCode,
            bookCode: bookCode,
            borrowBookId: borrowBookId
        });
        
        const qUpdateStock = `UPDATE book SET stock = '1' WHERE code = '${bookCode}'`
        await db.query(qUpdateStock, { type: QueryTypes.UPDATE });

        const qUpdateMember = `UPDATE member SET count_book = count_book - '1' WHERE code = '${memberCode}'`
        await db.query(qUpdateMember, { type: QueryTypes.UPDATE });

        if(dueDate < returnDate){
            let isPenalty = "TRUE";
            const qUpdatePenalty = `UPDATE member SET is_penalty = '${isPenalty}' WHERE code = '${memberCode}'`
            await db.query(qUpdatePenalty, { type: QueryTypes.UPDATE });
        }

        let statusOpen = "OPEN";
        let statusClose = "CLOSE";
        const qUpdateBorrowBook = `UPDATE borrow_book SET status = '${statusClose}'
                                 WHERE memberCode = '${memberCode}'
                                 AND bookCode = '${bookCode}'
                                 AND status = '${statusOpen}'`
        await db.query(qUpdateBorrowBook, { type: QueryTypes.UPDATE });

        const response ={
            date: result.date,
            memberCode: result.memberCode,
            bookCode: result.bookCode
        };
        return response;
    } catch (error) {
        return res.status(400).json({
            message: error
        });
    }
}

export const findBookExist = async(req, res) =>{
    try {
        const { memberCode, bookCode } = req;
        const query = `SELECT * FROM borrow_book 
                        WHERE memberCode = '${memberCode}' AND bookCode = '${bookCode}'
                        AND status = 'OPEN'`;
        const result = await db.query(query, { type: QueryTypes.SELECT });
        return result;
    } catch (error) {
        return res.status(400).json({
            message: error
        });
    }
}
