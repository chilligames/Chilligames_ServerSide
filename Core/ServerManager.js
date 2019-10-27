var DB = require('./DB/DB');


module.exports.Push_data_string_to_arry_server = async (DB_name, Collection_name, _id_doc, Pipe_line, Data) => {

    await DB.Push_data_String(DB_name, Collection_name, _id_doc, Pipe_line, Data);

};