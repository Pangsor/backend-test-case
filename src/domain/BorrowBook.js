import {Sequelize} from "sequelize";
import db from "../config/Database.js";
 
const {DataTypes} = Sequelize;
const BorrowBook = db.define('borrow_book',{
    id: {
        type: Sequelize.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey : true
    },
    date: DataTypes.DATEONLY,
    dueDate: DataTypes.DATEONLY,
    memberCode: Sequelize.STRING,
    bookCode: Sequelize.STRING,
    stock: { type: DataTypes.INTEGER, defaultValue:0 }
},{
    freezeTableName:true
});
 
export default BorrowBook;
 
(async()=>{
    await db.sync();
})();