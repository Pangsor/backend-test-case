import {QueryTypes} from "sequelize";
import db from "../../config/Database.js";
import Book from "../../domain/book/Book.js";

export const findAll = async(req, res) =>{
    try {
        const query = `SELECT code,title,author,stock FROM book WHERE stock > 0`;
        const result = await db.query(query, { type: QueryTypes.SELECT });
        return result;
    } catch (error) {
        return res.status(400).json({
            message: error
        });
    }
}

export const findBookByCode = async(req, res) =>{
    try {
        const code = req;
        const result = await db.query(`SELECT * FROM book WHERE code = (:code)`,
            { 
                replacements: { code: code },
                type: QueryTypes.SELECT 
            }
        );
        return result;
    } catch (error) {
        return res.status(400).json({
            message: error
        });
    }
}

export const findByCode = async(req, res) =>{
    try {
        const code = req;
        const result = await db.query(`SELECT * FROM book WHERE code = (:code)`,
            { 
                replacements: { code: code },
                type: QueryTypes.SELECT 
            }
        );
        return result;
    } catch (error) {
        return res.status(400).json({
            message: error
        });
    }
}

export const persistBook = async(req, res) =>{
    try {
        const { code, title, author } = req;
        let result = await Book.create({
            code: code,
            title: title,
            author: author,
            stock: 1
        });
        const response ={
            code: result.code,
            title: result.title,
            author: result.author,
            stock: result.stock
        };
        return response;
    } catch (error) {
        return res.status(400).json({
            message: error
        });
    }
}

export const updateBook = async(req, res) =>{
    try {
        const { code, title, author } = req;
        const query = `UPDATE book SET title = '${title}',author = '${author}' WHERE code = '${code}'`
        const result = await db.query(query, { type: QueryTypes.UPDATE });
        const response ={
            code: code,
            title: title,
            author: author,
            stock: result.stock
        };
        return response;
    } catch (error) {
        return res.status(400).json({
            message: error
        });
    }
}

export const deleteBook = async(req, res) =>{
    try {
        const code = req;
        const query = `DELETE FROM book WHERE code = '${code}'`
        await db.query(query, { type: QueryTypes.DELETE });
    } catch (error) {
        return res.status(400).json({
            message: error
        });
    }
}