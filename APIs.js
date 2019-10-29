var Express = require('express');
var app_api = Express();
var Aut = require('./Core/UserManager');
var Server_manager = require('./Core/ServerManager');




app_api.put("/APIs/aut", (req, res) => {

    var pipe_line = req.header("Pipe_line");

    var Username = req.header("Username");
    var Email = req.header("Email");
    var Password = req.header("Password");

    switch (pipe_line) {
        case "QR": {
            Aut.Quick_Register().then((result) => {
                res.send(result);
                res.end();
            });
        } break;
        case "RUEP": {
            Aut.Register_Username_email_password(Username, Email, Password).then(result => {

                res.send(result);

                res.end();
            });
        } break;

    }


}).listen("3333", "0.0.0.0");



app_api.put("/APIs/Server_manager", (req, res) => {

    var Pipe_line = req.header("Pipe_line");
    var DB_name = req.header("DB_Name");
    var Collection_Name = req.header("Collection_Name");
    var _id_doc = req.header("_id_doc");
    var Pipe_line_data = req.header("Pipe_line_data");
    var Data = req.header("Data");

    switch (Pipe_line) {
        case "PDSTAS": {
            Server_manager.Push_data_string_to_arry_server(DB_name, Collection_Name, _id_doc, Pipe_line_data, Data).then(() => {

                res.end();
            });
        } break;

    }



}).listen("3334", "0.0.0.0");


app_api.put("/APIs/Data_manager", (req, res) => {

    

}).listen("3335", "0,0,0,0");



