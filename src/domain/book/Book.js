import {Sequelize} from "sequelize";
import db from "../../config/Database.js";
 
const {DataTypes} = Sequelize;
const Book = db.define('book',{
    id: {
        type: Sequelize.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey : true
    },
    code: {
        type: Sequelize.STRING,
        unique: true
    },
    title: Sequelize.STRING,
    author: DataTypes.STRING,
    stock: { type: DataTypes.INTEGER, defaultValue:0 }
},{
    freezeTableName:true
});
 
export default Book;
 
(async()=>{
    await db.sync();
})();