var Express = require('express');
var app_api = Express();

app_api.get("/APIs", (req, res) => {
    var DB = new DB_model();
    var pipe_line = req.header("Pipe_line");
    var _id = req.header("_id");
    var leader_board_name = req.header("Leader_board");
    var leader_board_count = req.header("Leader_board_count")
    var Score = req.header("Score");
    var Data_user = req.header("Data_user");
    var Name_App = req.header("Name_App");

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

            DB.Send_Score_to_leader_board(_id, leader_board_name, Score).then(() => {
                res.end();
            });

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
        } break;
        case "SDU": {

            DB.Send_data_user(_id, Data_user, Name_App).then(() => {
                res.end();

            });

        } break;
        case "RDU": {
            DB.recive_data_user(_id, Name_App);
        } break;
        case "RRP": {
            DB.recive_ranking_posion(_id, leader_board_name).then(Rank => {

                res.send(Rank.toString());
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
        "Data": {},
        "Inventory": [],
        "Notifactions": [],
        "Teams": [],
        "Wallet": {
            "Coin": "",
            "Mony": ""

        },
        "Servers": [],
        "Leader_board": {}
    }

    Raw_model_leader_board = {
        'ID': '',
        'Nick_name': '',
        'Score': 0
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


    async Send_Score_to_leader_board(incoming_id, incoming_leaderboard_name, incoming_Score = Number()) {
        var connection = await new mongo_raw.MongoClient(Mongo_string, { useNewUrlParser: true }).connect();
        var _id = new mongo_raw.ObjectId(incoming_id);

        this.Raw_model_leader_board = await connection.db("Chilligames").collection(incoming_leaderboard_name).findOne({ 'ID': incoming_id });
        this.Raw_Model_User = await connection.db("Chilligames").collection("Users").findOne({ '_id': _id });

        if (this.Raw_model_leader_board == null) {

            var new_leader_board = {
                'ID': incoming_id,
                'Nick_name': this.Raw_Model_User.Info.Nickname,
                'Score': Number(incoming_Score)
            };
            await connection.db("Chilligames").collection(incoming_leaderboard_name).insertOne(new_leader_board);

            this.Raw_Model_User.Leader_board[incoming_leaderboard_name] = Number(incoming_Score);

            await connection.db("Chilligames").collection("Users").updateOne({ '_id': _id }, { $set: { "Leader_board": this.Raw_Model_User.Leader_board } });
            connection.close();

        } else {
            await connection.db("Chilligames").collection(incoming_leaderboard_name).updateOne({ 'ID': incoming_id }, { $set: { 'Score': Number(incoming_Score) } });
            this.Raw_Model_User.Leader_board[incoming_leaderboard_name] = Number(incoming_Score);

            await connection.db("Chilligames").collection("Users").updateOne({ '_id': _id }, { $set: { 'Leader_board': this.Raw_Model_User.Leader_board } });
            connection.close();
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


    async Send_data_user(Incoming_id, Incomin_data, Incoming_name_app) {

        var Connection = await new mongo_raw.MongoClient(Mongo_string, { useNewUrlParser: true }).connect();
        var _id = new mongo_raw.ObjectId(Incoming_id);

        this.Raw_Model_User = await Connection.db("Chilligames").collection("Users").findOne({ '_id': _id });
        var serilize_data = JSON.parse(Incomin_data);
        this.Raw_Model_User.Data[Incoming_name_app] = serilize_data;
        await Connection.db("Chilligames").collection("Users").updateOne({ '_id': _id }, { $set: { 'Data': this.Raw_Model_User.Data } });
        Connection.close();

    }


    async recive_data_user(Incoming_id, Incoming_name_app) {
        var Connection = await new mongo_raw.MongoClient(Mongo_string, { useNewUrlParser: true }).connect();
        var _id = new mongo_raw.ObjectId(Incoming_id);
        this.Raw_Model_User = await Connection.db("Chilligames").collection("Users").findOne({ '_id': _id });

        console.log(this.Raw_Model_User.Data[Incoming_name_app]);

        return this.Raw_Model_User.Data[Incoming_name_app];

    }


    async recive_ranking_posion(Incomin_id, Incomin_leader_board_name) {

        var connection = await new mongo_raw.MongoClient(Mongo_string, { useNewUrlParser: true }).connect();
        this.Raw_model_leader_board = await connection.db("Chilligames").collection(Incomin_leader_board_name).findOne({ 'ID': Incomin_id });
        var pos = await connection.db("Chilligames").collection(Incomin_leader_board_name).find({ "Score": { $gt: this.Raw_model_leader_board.Score } }, { sort: { "Score": -1 } }).toArray();
        connection.close();
        return pos.length;

    }


    async Change_info_user(Incoming_nickname, Incoming_username, Incoming_Email, Incoming_password, Incoming_status) {



    }
}
