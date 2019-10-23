var DB = require('./DB/DB');
var Models = require('./Models');

module.exports.Quick_Register = async () => {

    var result = await DB.Insert_doc("Chilligames", "Users", Models.Model_user);
    console.log("add nickname ");//dont delete
    return result;

};

module.exports.Register_Username_email_password = async (Username, Email, Password, ) => {

    Models.Model_user.Info.Username = Username;
    Models.Model_user.Info.Email = Email;
    Models.Model_user.Info.Password = Password;
    Models.Model_user.Info.Nickname = Username;

    var result = await DB.Insert_doc("Chilligames", "Users", Models.Model_user);
    return result;

};