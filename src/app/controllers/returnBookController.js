import Joi from "joi";
import { findAll, persistReturnBook, findBookExist } from "../../infrastructure/query/ReturnQuery.js";

export const findAllReturn = async(req, res) =>{
    try {
        const result = await findAll();
        res.send(result);
    } catch (error) {
        return res.status(400).json({
            message: error
        });
    }
}

export const returnBook = async(req, res) =>{
    try {
        const schema = Joi.object().keys({
            memberCode: Joi.string().required(),
            bookCode: Joi.string().required()
        }).required();
        if (schema.validate(req.body).error) {
            return res.status(400).json({
                message:schema.validate(req.body).error.message
            });
        }

        // Check Book
        const isBookExist = await findBookExist(req.body);
        if (isBookExist.length == 0){
            return res.status(400).json({
                message:"Book not found!"
            });
        }


        const payload = {
            memberCode: req.body.memberCode,
            bookCode: req.body.bookCode,
            dueDate: isBookExist[0].dueDate,
            borrowBookId: isBookExist[0].id
        }
        
        const saveReturnBook = await persistReturnBook(payload);
        res.send(saveReturnBook);
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
}