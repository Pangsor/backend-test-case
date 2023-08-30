import Joi from "joi";
import { findAll, persistBorrowBook } from "../../infrastructure/query/BorrowQuery.js";
import { findMemberByCode } from "../../infrastructure/query/MemberQuery.js";
import { findBookByCode } from "../../infrastructure/query/BookQuery.js";

export const findAllBorrow = async(req, res) =>{
    try {
        const result = await findAll();
        res.send(result);
    } catch (error) {
        return res.status(400).json({
            message: error
        });
    }
}

export const borrowBook = async(req, res) =>{
    try {
        const schema = Joi.object().keys({
            memberCode: Joi.string().required(),
            bookCode: Joi.string().required()
        }).required();
        if (schema.validate(req.body).error) {
            return res.status(400).json({
                message:schema.validate(req.body).error.message,
                data:[]
            });
        }

        const { memberCode, bookCode, date } = req.body;
        
        // Check Member
        const isMemberNotBeingPenalized = await findMemberByCode(memberCode);
        if (isMemberNotBeingPenalized.length == 0){
            return res.status(400).json({
                message:"Member not found!"
            });
        }else{
            if(isMemberNotBeingPenalized[0].is_penalty == "TRUE"){
                return res.status(400).json({
                    message:"Member is currently being penalized!"
                });
            }
            if(isMemberNotBeingPenalized[0].count_book >= 2){
                return res.status(400).json({
                    message:"Member may not borrow more than 2 books!"
                });
            }
        }

        // Check Book
        const isBookExist = await findBookByCode(bookCode);
        if (isBookExist.length == 0){
            return res.status(400).json({
                message:"Book not found!"
            });
        }else{
            if (isBookExist[0].stock <= 0){
                return res.status(400).json({
                    message:"Book is borrowed by other member!"
                });
            }
        }

        const saveBorrowBook = await persistBorrowBook(req.body);
        res.send(saveBorrowBook);
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
}