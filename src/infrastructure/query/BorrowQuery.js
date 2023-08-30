import BorrowBook from "../../domain/BorrowBook.js";
import {QueryTypes} from "sequelize";
import db from "../../config/Database.js";
import { dateNow } from "../../helper/ConvertDate.js";
import moment from 'moment';

export const findAll = async(req, res) =>{
    try {
        const query = `SELECT 
                        r.date,r.dueDate,r.memberCode,r.bookCode,r.stock ,
                        m.name AS memberName,b.title,b.author
                        FROM borrow_book r LEFT JOIN member m
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

export const persistBorrowBook = async(req, res) =>{
    try {
        const { memberCode, bookCode } = req;
        let dateBorrow = dateNow();
        let dueDate = moment(dateBorrow, "YYYY-MM-DD").add(7,'days');
        let result = await BorrowBook.create({
            date: dateBorrow,
            dueDate: dueDate,
            memberCode: memberCode,
            bookCode: bookCode,
            stock: 1
        });
        const qUpdateStock = `UPDATE book SET stock = '0' WHERE code = '${bookCode}'`
        await db.query(qUpdateStock, { type: QueryTypes.UPDATE });

        const qUpdateMember = `UPDATE member SET count_book = count_book + '1' WHERE code = '${memberCode}'`
        await db.query(qUpdateMember, { type: QueryTypes.UPDATE });

        const response ={
            date: result.date,
            dueDate: result.dueDate,
            memberCode: result.memberCode,
            bookCode: result.bookCode,
            stock: result.stock
        };
        return response;
    } catch (error) {
        return res.status(400).json({
            message: error
        });
    }
}