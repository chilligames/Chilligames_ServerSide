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
    switch (Pipe_line) {
        case "": {

            Server_manager.Push_data_to_server();
        } break;

    }



}).listen("3334", "0.0.0.0")



