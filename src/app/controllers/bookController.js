import Joi from "joi";
import { findAll,findByCode, persistBook, updateBook, deleteBook } from "../../infrastructure/query/BookQuery.js";

export const findAllBook = async(req, res) =>{
    try {
        const result = await findAll();
        res.send(result);
    } catch (error) {
        return res.status(400).json({
            message: error
        });
    }
}

export const createBook = async(req, res) =>{
    try {
        const schema = Joi.object().keys({
            code: Joi.string().required(),
            title: Joi.string().required(),
            author: Joi.string().required()
        }).required();
        if (schema.validate(req.body).error) {
            return res.status(400).json({
                message:schema.validate(req.body).error.message,
                data:[]
            });
        }

        const code = req.body.code;
        const isReady = await findByCode(code);
        if (isReady.length > 0){
             return res.status(400).json({
                message:"Code already exists!"
            });
        }
        
        const saveMember = await persistBook(req.body);
        res.send(saveMember);
    } catch (error) {
        return res.status(400).json({
            message: error
        });
    }
}

export const updateDataBook = async(req, res) =>{
    try {
        const schema = Joi.object().keys({
            title: Joi.string().required(),
            author: Joi.string().required()
        }).required();
        if (schema.validate(req.body).error) {
            return res.status(400).json({
                statusCode:"200",
                message:schema.validate(req.body).error.message,
                data:[]
            });
        }
        const code = req.params.id;
        const title = req.body.title;
        const author = req.body.author;
        const isReady = await findByCode(code);
        if (isReady.length == 0){
             return res.status(400).json({
                message:"Code not found!"
            });
        }
        
        const paraData = {
            code : code,
            title : title,
            author : author
        }
        const saveBook = await updateBook(paraData);
        res.send(saveBook);
    } catch (error) {
        return res.status(400).json({
            message: error
        });
    }
}

export const deleteDataBook = async(req, res) =>{
    try {
        const code = req.params.id;
        const isReady = await findByCode(code);
        if (isReady.length == 0){
             return res.status(400).json({
                message:"Code not found!"
            });
        }
        
        await deleteBook(code);
        res.send("Book succesfully deleted");
    } catch (error) {
        return res.status(400).json({
            message: error
        });
    }
}