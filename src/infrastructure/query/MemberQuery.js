import Member from "../../domain/member/Member.js";
import { QueryTypes } from "sequelize";
import db from "../../config/Database.js";

export const findAll = async(req, res) =>{
    try {
        const query = `SELECT code,name,count_book FROM member`;
        const result = await db.query(query, { type: QueryTypes.SELECT });
        return result;
    } catch (error) {
        return res.status(400).json({
            message: error
        });
    }
}

export const findMemberByCode = async(req, res) =>{
    try {
        const code = req;
        const result = await db.query(`SELECT * FROM member WHERE code = (:code)`,
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
        const result = await db.query(`SELECT * FROM member WHERE code = (:code)`,
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

export const persistMember = async(req, res) =>{
    try {
        const { code,name } = req;
        let result = await Member.create({
            code: code,
            name: name
        });
        const response ={
            code: result.code,
            name: result.name
        };
        return response;
    } catch (error) {
        return res.status(400).json({
            message: error
        });
    }
}

export const updateMember = async(req, res) =>{
    try {
        const { code,name } = req;
        const query = `UPDATE member SET name = '${name}' WHERE code = '${code}'`
        const result = await db.query(query, { type: QueryTypes.UPDATE });
        const response ={
            code: code,
            name: name
        };
        return response;
    } catch (error) {
        return res.status(400).json({
            message: error
        });
    }
}

export const deleteMember = async(req, res) =>{
    try {
        const code = req;
        const query = `DELETE FROM member WHERE code = '${code}'`
        await db.query(query, { type: QueryTypes.DELETE });
    } catch (error) {
        return res.status(400).json({
            message: error
        });
    }
}