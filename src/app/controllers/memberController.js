import Joi from "joi";
import { findAll,findByCode, persistMember, updateMember, deleteMember } from "../../infrastructure/query/MemberQuery.js";

export const findAllMember = async(req, res) =>{
    try {
        const result = await findAll();
        res.send(result);
    } catch (error) {
        return res.status(400).json({
            message: error
        });
    }
}

export const createMember = async(req, res) =>{
    try {
        const schema = Joi.object().keys({
            code: Joi.string().required(),
            name: Joi.string().required()
        }).required();
        if (schema.validate(req.body).error) {
            return res.status(400).json({
                message:schema.validate(req.body).error.message
            });
        }

        const code = req.body.code;
        const isReady = await findByCode(code);
        if (isReady.length > 0){
             return res.status(400).json({
                message:"Code already exists!"
            });
        }
        
        const saveMember = await persistMember(req.body);
        res.send(saveMember);
    } catch (error) {
        return res.status(400).json({
            message: error
        });
    }
}

export const updateDataMember = async(req, res) =>{
    try {
        const schema = Joi.object().keys({
            name: Joi.string().required()
        }).required();
        if (schema.validate(req.body).error) {
            return res.status(400).json({
                statusCode:"200",
                message:schema.validate(req.body).error.message,
                data:[]
            });
        }
        const code = req.params.id;
        const name = req.body.name;
        const isReady = await findByCode(code);
        if (isReady.length == 0){
             return res.status(400).json({
                message:"Code not found!"
            });
        }
        
        const paraData = {
            code : code,
            name : name
        }
        const saveMember = await updateMember(paraData);
        res.send(saveMember);
    } catch (error) {
        return res.status(400).json({
            message: error
        });
    }
}

export const deleteDataMember = async(req, res) =>{
    try {
        const code = req.params.id;
        const isReady = await findByCode(code);
        if (isReady.length == 0){
             return res.status(400).json({
                message:"Code not found!"
            });
        }
        
        await deleteMember(code);
        res.send("Member succesfully deleted");
    } catch (error) {
        return res.status(400).json({
            message: error
        });
    }
}