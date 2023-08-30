import {Sequelize} from "sequelize";
import db from "../../config/Database.js";
 
const {DataTypes} = Sequelize;
const Member = db.define('member',{
    id: {
        type: Sequelize.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey : true
    },
    code: {
        type: Sequelize.STRING,
        unique: true
    },
    name: Sequelize.STRING,
    count_book: { type : Sequelize.INTEGER, defaultValue:0 },
    is_penalty: { type : Sequelize.STRING, defaultValue:"FALSE" }
},{
    freezeTableName:true
});
 
export default Member;
 
(async()=>{
    await db.sync();
})();