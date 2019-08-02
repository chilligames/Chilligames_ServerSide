var Express = require('express');
var app_api = Express();

app_api.get("/APIs", (req, res) => {
    var DB = new DB_model();
    var pipe_line = req.header("Pipe_line");
    var _id = req.header("_id");
    var leader_board = req.header("Leader_board");
    var Score = req.header("Score");
    var Nick_name = req.header("Nick_name");
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
        case "SSTLB": {

            DB.Send_data_to_leader_board(_id, leader_board, Score, Nick_name).then(() => { });

        } break;

    }


}).listen("3333", "127.0.0.1")


//database



var mongo_raw = require('mongodb');
var Mongo_string = "mongodb://localhost:27017/admin";

class DB_model {



    Raw_Model_User = {
        "Identities": [
            'Enter_user_name',
            'password',
            'Email',
            'Nickname',
        ],
        "Ban": [],
        "Friends": [],
        "Avatar": '',
        "Log": [],
        "Files": [],
        "Data": [
            [],
            []
        ],
        "Inventory": [],
        "Notifactions": [],
        "Teams": [],
        "Wallet": [],
        "Servers": []
    }

    Raw_model_leader_board = {
        ID: '',
        Nick_name: '',
        Score: ''
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


    async Send_data_to_leader_board(incoming_id, incoming_leaderboard_name, incoming_Score, Incoming_nick_name) {

        var connection = await new mongo_raw.MongoClient(Mongo_string, { useNewUrlParser: true }).connect();
        this.Raw_model_leader_board= await connection.db("Chilligames").collection(incoming_leaderboard_name).findOne({ 'Nick_name': Incoming_nick_name });

        if (this.Raw_model_leader_board.Nick_name==Incoming_nick_name) {

            if (incoming_Score  > this.Raw_model_leader_board.Score) {

                this.Raw_model_leader_board.Score = incoming_Score;
                await connection.db("Chilligames").collection(incoming_leaderboard_name).updateOne({ 'Nick_name': Incoming_nick_name }, { $set: { "Score": incoming_Score } });//cheack last edit
            }

        }

        console.log(this.Raw_model_leader_board.Nick_name);



    }
}
