import {Sequelize} from "sequelize";
import db from "../config/Database.js";
 
const {DataTypes} = Sequelize;
const ReturnBook = db.define('return_book',{
    id: {
        type: Sequelize.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey : true
    },
    date: DataTypes.DATEONLY,
    memberCode: Sequelize.STRING,
    bookCode: Sequelize.STRING,
    borrowBookId: Sequelize.STRING
},{
    freezeTableName:true
});
 
export default ReturnBook;
 
(async()=>{
    await db.sync();
})();