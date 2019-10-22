var DB = require('./DB/DB');
var Models = require('./Models');

module.exports.Quick_Register = async () => {

    var result = await DB.Insert_doc("Chilligames", "Users", Models.Model_user);
    console.log("add nickname ");
    return result;

};

Models.exports.Register_Username_email_password = async (Username, Email, Password, ) => {


};