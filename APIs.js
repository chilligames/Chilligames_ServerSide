var Express = require('express');
var app_api = Express();

app_api.get("/APIs", (req, res) => {
    var DB = new DB_model();
    var pipe_line = req.header("Pipe_line");
    var _id = req.header("_id");
    var leader_board_name = req.header("Leader_board");
    var leader_board_count = req.header("Leader_board_count")
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

            DB.Send_data_to_leader_board(_id, leader_board_name, Score, Nick_name).then(() => { });

        } break;
        case "RLB": {

            DB.Recive_leader_board(leader_board_name, leader_board_count).then(() => { });
        } break;
        case "SLBNBY": {

            DB.Recive_leader_board_near_by_user(_id, leader_board_name);

        } break;
        case "RSU": {

            DB.Recive_Score_Player(_id, leader_board_name);
        } break;
        case "RIOU": {

            DB.Recive_Info_other_user(_id);
        } break;
        case "RIU": {
            DB.Recive_info_user(_id);
        }
    }


}).listen("3333", "127.0.0.1")


//database



var mongo_raw = require('mongodb');
var Mongo_string = "mongodb://localhost:27017/admin";

class DB_model {



    Raw_Model_User = {
        "Info": {
            "Username": '',
            'Password': '',
            'Email': '',
            'Nickname': '',
        },
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
        "Servers": [],
        "Leader_board": {}
    }

    Raw_model_leader_board = {
        ID: '',
        Nick_name: 0,
        Score: ''
    }


    async Quick_register() {

        var connected = await new mongo_raw.MongoClient(Mongo_string, { useNewUrlParser: true }).connect();

        var Result_insert = await connected.db("Chilligames").collection("Users").insertOne(this.Raw_Model_User);

        var _id = new mongo_raw.ObjectId(Result_insert.insertedId);

        this.Raw_Model_User.Info.Nickname = _id.toHexString();

        await connected.db("Chilligames").collection("Users").updateOne({ '_id': _id }, { $set: { "Info.Nickname": this.Raw_Model_User.Info.Nickname } });

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


    async Send_data_to_leader_board(incoming_id = String, incoming_leaderboard_name, incoming_Score = Int32Array, Incoming_nick_name = String) {


        if (Incoming_nick_name.length > 2) {
            var connection = await new mongo_raw.MongoClient(Mongo_string, { useNewUrlParser: true }).connect();
            this.Raw_model_leader_board = await connection.db("Chilligames").collection(incoming_leaderboard_name).findOne({ 'Nick_name': Incoming_nick_name });

            if (this.Raw_model_leader_board.Nick_name == Incoming_nick_name && incoming_Score > this.Raw_model_leader_board.Score) {

                this.Raw_model_leader_board.Score = incoming_Score;

                await connection.db("Chilligames").collection(incoming_leaderboard_name).updateOne({ 'Nick_name': Incoming_nick_name }, { $set: { "Score": incoming_Score } });

                this.Raw_Model_User = await connection.db("Chilligames").collection("Users").findOne({ 'Info.Nickname': Incoming_nick_name });

                this.Raw_Model_User.Leader_board[incoming_leaderboard_name] = incoming_Score;

                await connection.db("Chilligames").collection("Users").updateOne({ 'Info.Nickname': Incoming_nick_name }, { $set: { "Leader_board": this.Raw_Model_User.Leader_board } });
            }
        }
        else {

            var Connection_2 = await new mongo_raw.MongoClient(Mongo_string, { useNewUrlParser: true }).connect();

            this.Raw_model_leader_board = await Connection_2.db("Chilligames").collection(incoming_leaderboard_name).findOne({ 'ID': incoming_id });

            if (this.Raw_model_leader_board.ID == incoming_id && incoming_Score > this.Raw_model_leader_board.Score) {

                await Connection_2.db("Chilligames").collection(incoming_leaderboard_name).updateOne({ 'ID': incoming_id }, { $set: { "Score": incoming_Score } });


                var _id = new mongo_raw.ObjectId(incoming_id);

                this.Raw_Model_User = await Connection_2.db("Chilligames").collection("Users").findOne({ '_id': _id });

                this.Raw_Model_User.Leader_board[incoming_leaderboard_name] = incoming_Score;

                await Connection_2.db("Chilligames").collection("Users").updateOne({ '_id': _id }, { $set: { "Leader_board": this.Raw_Model_User.Leader_board } });
            }

        }



    }


    async Recive_leader_board(incoming_name_leader_board, incoming_count = Number()) {

        var count = Number(incoming_count);
        var Connection = await new mongo_raw.MongoClient(Mongo_string, { useNewUrlParser: true }).connect();
        var result_search = await Connection.db("Chilligames").collection(incoming_name_leader_board).find({}, { limit: count, sort: { 'Score': -1 } }).toArray();
        return result_search;
    }


    async Recive_leader_board_near_by_user(incoming_id, Incoming_leader_board_name) {
        var connection = await new mongo_raw.MongoClient(Mongo_string, { useNewUrlParser: true }).connect();
        var _id = new mongo_raw.ObjectId(incoming_id);
        this.Raw_Model_User = await connection.db("Chilligames").collection("Users").findOne({ '_id': _id });
        var Score_player = Number(this.Raw_Model_User.Leader_board[Incoming_leader_board_name]);
        console.log(Score_player);
        var result_recive_leader_board = await connection.db("Chilligames").collection(Incoming_leader_board_name).find({ 'Score': { $lt: Score_player } }, { limit: 5 }).toArray();
        console.log(result_recive_leader_board);

    }


    async Recive_Score_Player(Incomin_id, Incomin_leader_board_name) {
        var connection = await new mongo_raw.MongoClient(Mongo_string, { useNewUrlParser: true }).connect();
        var _id = new mongo_raw.ObjectID(Incomin_id);
        this.Raw_Model_User = await connection.db("Chilligames").collection("Users").findOne({ '_id': _id });
        console.log(this.Raw_Model_User.Leader_board[Incomin_leader_board_name]);
        return this.Raw_Model_User.Leader_board[Incomin_leader_board_name];
    }


    async Recive_Info_other_user(Incomin_id) {
        var Connection = await new mongo_raw.MongoClient(Mongo_string, { useNewUrlParser: true }).connect();
        var _id = new mongo_raw.ObjectId(Incomin_id);
        var search_user = await Connection.db("Chilligames").collection("Users").findOne({ '_id': _id });
        return search_user;
    }

    async Recive_info_user(Incoming_id) {
        var connection = await new mongo_raw.MongoClient(Mongo_string, { useNewUrlParser: true }).connect();
        var _id = new mongo_raw.ObjectId(Incoming_id);
        var result_find_user = await connection.db("Chilligames").collection("Users").findOne({ '_id': _id });
        return result_find_user;
    }
}
