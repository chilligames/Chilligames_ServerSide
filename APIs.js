var Express = require('express');
var app_api = Express();

app_api.get("/APIs", (req, res) => {
    var DB = new DB_model();
    var pipe_line = req.header("Pipe_line");
    var ID = req.header("ID");


    switch (pipe_line) {
        case "QR": {

            DB.Quick_register().then((result) => {
                res.send(result);
                res.end();
            });


        } break;

    }


}).listen("3333", "127.0.0.1")


//database



var mongo_raw = require('mongodb');
var Mongo_string = "mongodb://localhost:27017/admin";

class DB_model {



    Raw_Model_User = {
        "Identities": {
            "Frist_Login": '',
            "Password": '',
            "Username": '',
            "Display_name": '',
            "Email": '',
            "Language": '',
            "Last_login": ''
        },
        "Ban": [],
        "Friends": [],
        "Avatar": '',
        "Log": [],
        "Files": [],
        "Data": {
            "Public": [],
            "Internal": []
        },
        "Inventory": [],
        "Notifactions": [],
        "Teams": [],
        "Wallet": [],
        "Servers": []
    }


    async Quick_register() {

        var connected = await new mongo_raw.MongoClient(Mongo_string, { useNewUrlParser: true }).connect();

        var Result_insert = await connected.db("Chilligames").collection("Users").insertOne(this.Raw_Model_User);

        connected.close();

        console.log(Result_insert.insertedId);

        return Result_insert.insertedId.toHexString();
    }


}
