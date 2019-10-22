var DB = require('./DB/DB');


module.exports.Quick_Register = async () => {

    result = await DB.Insert_doc("Chilligames", "Users", {});

    return result;
};