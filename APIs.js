var Express = require('express');
var app_api = Express();

app_api.get("/APIs", (req, res) => {
    var DB = new DB_model();
    var pipe_line = req.header("Pipe_line");
    var _id = req.header("_id");


    switch (pipe_line) {
        case "QR": {

            DB.Quick_register().then((result) => {
                res.send(result);
                res.end();
            });


        } break;
        case "QL": {

            DB.Quick_login(_id).then(result => {

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
        "Identities": [
            0 = '',
            1 = ''
        ],
        "Ban": [],
        "Friends": [],
        "Avatar": '',
        "Log": [],
        "Files": [],
        "Data": [
            0 = '',
            1 = ''
        ],
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

        return Result_insert.insertedId.toHexString();
    }


    async Quick_login(Incoming_id) {

        var _id = new mongo_raw.ObjectId(Incoming_id);
        var Connection = await new mongo_raw.MongoClient(Mongo_string, { useNewUrlParser: true }).connect();
        var result_search = await Connection.db("Chilligames").collection("Users").findOne({ '_id': _id });
        Connection.close();
        return result_search;
    }


}
