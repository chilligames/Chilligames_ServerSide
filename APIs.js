var Express = require('express');
var app_api = Express();


app_api.get("/APIs", (req, res) => {
    var DB = new DB_model();
    var pipe_line = req.header("Pipe_line");
    var _id = req.header("_id");
    var _id_other_player = req.header("_id_other_player");
    var leader_board_name = req.header("Leader_board");
    var leader_board_count = req.header("Leader_board_count")
    var Score = req.header("Score");
    var Data_user = req.header("Data_user");
    var Name_App = req.header("Name_App");
    var Nickname = req.header("Nickname");
    var Username = req.header("Username");
    var Email = req.header("Email");
    var Password = req.header("Password");
    var Status = req.header("Status");
    var Message = req.header("Message");
    var Setting_server = req.header("Setting_Server");
    var _id_server = req.header("_id_Server");
    var Count_server = req.header("Count_servers");

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

            DB.Recive_leader_board(leader_board_name, leader_board_count).then((result) => {

                res.send(result);
                res.end();

            });
        } break;
        case "SLBNBY": {

            DB.Recive_leader_board_near_by_user(_id, leader_board_name).then(() => {

                res.end();
            });

        } break;
        case "RSU": {

            DB.Recive_Score_Player(_id, leader_board_name).then(() => {
                res.end();
            });
        } break;
        case "RIOU": {

            DB.Recive_Info_other_user(_id).then((result) => {

                res.send(result);
                res.end();
            });

        } break;
        case "RIU": {
            DB.Recive_info_user(_id).then(() => {

                res.end();
            });
        } break;
        case "SDU": {

            DB.Send_data_user(_id, Data_user, Name_App).then(() => {
                res.end();

            });

        } break;
        case "RDU": {
            DB.recive_data_user(_id, Name_App).then(() => {
                res.end();
            });
        } break;
        case "RRP": {
            DB.Recive_ranking_posion(_id, leader_board_name).then(Rank => {

                res.send(Rank.toString());
                res.end();
            });
        } break;
        case "UUI": {

            DB.Update_User_Info(_id, Nickname, Username, Email, Password, Status).then(() => {

                res.end();

            });
        } break;
        case "CSF": {
            DB.Cheack_status_friend(_id, _id_other_player).then((result) => {
                var Change_value = String(result);
                res.send(Change_value);
                res.end();
            });
        } break;
        case "SFR": {

            DB.Send_friend_requst(_id, _id_other_player).then(() => {

                res.end();

            });
        } break;
        case "CFR": {
            DB.Cancel_friend_requst(_id, _id_other_player).then(() => {
                res.end();
            });

        } break;
        case "SMTU": {

            DB.Send_messege_to_users(_id, _id_other_player, Message).then(() => {

                res.end();

            });

        } break;
        case "CS": {
            DB.Creat_server(_id, Name_App, Setting_server).then(() => {
                res.end();
            });
        } break;
        case "RLSU": {
            DB.Recive_List_Servers_User(_id, Name_App).then((result) => {
                res.send(result);
                res.end();
            });
        } break;
        case "RDS": {
            DB.Recive_data_Server(_id_server, Name_App).then((result) => {
                res.send(result);
                res.end()
            });
        } break;
        case "ES": {
            DB.Exit_Server(_id, Name_App, _id_server).then(() => {
                res.end();
            });
        } break;
        case "RAS": {
            DB.Recive_all_Servers(Name_App, Count_server).then((result) => {
                res.send(result);
                res.end();
            });
        } break;
        case "CSIP": {
            DB.Cheack_server_in_profile(_id, Name_App, _id_server).then((result) => {
                res.send(result.toString());
                res.end();
            });
        } break;
        case "ETS": {

            DB.Enter_To_Server(_id, Name_App, _id_server).then(() => {
                res.end();
            });
        } break;
        case "SMTC": {
            DB.Send_message_to_chatroom(_id, Name_App, Message).then(() => {
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
            'Status': ''
        },
        "Ban": [],
        "Friends": [],
        "Avatar": '',
        "Log": [],
        "Files": [],
        "Data": {},
        "Inventory": [],
        "Notifactions": {
            'Message': {
                'Recive': [],
                'Send': []
            },
            'Notifaction': {}
        },
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
    Raw_model_Friend = {
        'ID': '',
        'Status': ''
    }

    Raw_model_messages = {
        'Message': [],
        'ID': '',
        'Last_Date': '',
        'Status': 0
    }

    Raw_model_insert_server = {
        'Setting': {},
        'ID': {}
    }


    Raw_model_messegae_chatroom = {
        'ID': '',
        'Message': '',
        'Time': '',
        'Report': 0
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


    async Recive_leader_board(incoming_name_leader_board, incoming_count) {

        var count = Number(incoming_count);
        var Connection = await new mongo_raw.MongoClient(Mongo_string, { useNewUrlParser: true }).connect();
        var result_search = await Connection.db("Chilligames").collection(incoming_name_leader_board).find({}, { limit: count, sort: { 'Score': -1 } }).toArray();
        Connection.close();
        return result_search;
    }


    async Recive_leader_board_near_by_user(incoming_id, Incoming_leader_board_name) {
        var connection = await new mongo_raw.MongoClient(Mongo_string, { useNewUrlParser: true }).connect();
        var _id = new mongo_raw.ObjectId(incoming_id);
        this.Raw_Model_User = await connection.db("Chilligames").collection("Users").findOne({ '_id': _id });
        var Score_player = Number(this.Raw_Model_User.Leader_board[Incoming_leader_board_name]);
        var result_recive_leader_board = await connection.db("Chilligames").collection(Incoming_leader_board_name).find({ 'Score': { $lt: Score_player } }, { limit: 5 }).toArray();
        connection.close();
        return result_recive_leader_board;
    }


    async Recive_Score_Player(Incomin_id, Incomin_leader_board_name) {
        var connection = await new mongo_raw.MongoClient(Mongo_string, { useNewUrlParser: true }).connect();
        var _id = new mongo_raw.ObjectID(Incomin_id);
        this.Raw_Model_User = await connection.db("Chilligames").collection("Users").findOne({ '_id': _id });
        connection.close();
        return this.Raw_Model_User.Leader_board[Incomin_leader_board_name];
    }


    async Recive_Info_other_user(Incomin_id) {
        var Connection = await new mongo_raw.MongoClient(Mongo_string, { useNewUrlParser: true }).connect();
        var _id = new mongo_raw.ObjectId(Incomin_id);
        var search_user = await Connection.db("Chilligames").collection("Users").findOne({ '_id': _id });
        Connection.close();
        return search_user;
    }


    async Recive_info_user(Incoming_id) {
        var connection = await new mongo_raw.MongoClient(Mongo_string, { useNewUrlParser: true }).connect();
        var _id = new mongo_raw.ObjectId(Incoming_id);
        var result_find_user = await connection.db("Chilligames").collection("Users").findOne({ '_id': _id });
        connection.close();
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

        Connection.close();
        return this.Raw_Model_User.Data[Incoming_name_app];
    }


    async Update_User_Info(Incoming_id, Incoming_nickname = String(), Incoming_username = String(), Incoming_Email = String(), Incoming_password = String(), Incoming_status = String()) {
        var connection = await new mongo_raw.MongoClient(Mongo_string, { useNewUrlParser: true }).connect();
        var _id = new mongo_raw.ObjectId(Incoming_id);

        if (Incoming_nickname.length > 1) {

            var result_search_nickname = await connection.db("Chilligames").collection("Users").findOne({ "Info.Nickname": Incoming_nickname });

            if (result_search_nickname == null) {

                await connection.db("Chilligames").collection("Users").findOneAndUpdate({ '_id': _id }, { $set: { "Info.Nickname": Incoming_nickname } });
            }

        }

        if (Incoming_username.length > 1) {

            var result_search_user_name = await connection.db("Chilligames").collection("Users").findOne({ "Info.Username": Incoming_username });
            if (result_search_user_name == null) {

                await connection.db("Chilligames").collection("Users").findOneAndUpdate({ '_id': _id }, { $set: { 'Info.Username': Incoming_username } });
            }

        }

        if (Incoming_Email.length > 1) {

            var result_search_Email = await connection.db("Chilligames").collection("Users").findOne({ "Info.Email": Incoming_Email });

            if (result_search_Email == null) {
                await connection.db("Chilligames").collection("Users").findOneAndUpdate({ '_id': _id }, { $set: { "Info.Email": Incoming_Email } });

            }

        }

        if (Incoming_password.length > 1) {
            await connection.db("Chilligames").collection("Users").findOneAndUpdate({ '_id': _id }, { $set: { "Info.Password": Incoming_password } });
        }
        if (Incoming_status.length > 1) {
            await connection.db("Chilligames").collection("Users").findOneAndUpdate({ '_id': _id }, { $set: { "Info.Status": Incoming_status } });
        }

        connection.close();
    }


    async Recive_ranking_posion(Incomin_id, Incomin_leader_board_name) {

        var postion;

        var connection = await new mongo_raw.MongoClient(Mongo_string, { useNewUrlParser: true }).connect();
        this.Raw_model_leader_board = await connection.db("Chilligames").collection(Incomin_leader_board_name).findOne({ 'ID': Incomin_id });

        if (this.Raw_model_leader_board != null) {
            postion = await connection.db("Chilligames").collection(Incomin_leader_board_name).find({ "Score": { $gt: this.Raw_model_leader_board.Score } }, { sort: { "Score": -1 } }).toArray();

            connection.close();
            return postion.length;
        } else {

            postion = "N/A";
            connection.close()
            return postion;
        }

    }


    async Cheack_status_friend(Incoming_id_player, Incoming_id_other_player) {
        var Connection = await new mongo_raw.MongoClient(Mongo_string, { useNewUrlParser: true }).connect();

        var _id = new mongo_raw.ObjectId(Incoming_id_player);
        this.Raw_Model_User = await Connection.db("Chilligames").collection("Users").findOne({ '_id': _id });

        var result;

        await this.Raw_Model_User.Friends.find((fild) => {

            if (fild.ID == Incoming_id_other_player) {
                result = fild.Status;
            }

        });

        if (result == undefined) {
            result = 0;
        }

        Connection.close();
        return result;
    }


    async Send_friend_requst(Incoming_id, Incoming_id_other_player) {

        var Connection = await new mongo_raw.MongoClient(Mongo_string, { useNewUrlParser: true }).connect();

        var _id = new mongo_raw.ObjectId(Incoming_id);

        this.Raw_model_Friend.ID = Incoming_id_other_player;
        this.Raw_model_Friend.Status = 1;

        await Connection.db("Chilligames").collection("Users").findOneAndUpdate({ '_id': _id }, { $push: { "Friends": this.Raw_model_Friend } });

        console.log("send notifaction to other player for alarm send req");
        Connection.close();
    }


    async Cancel_friend_requst(Incoming_id, Incoming_id_other_player) {

        var Connection = await new mongo_raw.MongoClient(Mongo_string, { useNewUrlParser: true }).connect();
        var _id = new mongo_raw.ObjectID(Incoming_id);
        this.Raw_Model_User = await Connection.db("Chilligames").collection("Users").findOne({ '_id': _id });

        for (var postion in this.Raw_Model_User.Friends) {
            if (this.Raw_Model_User.Friends[postion].ID == Incoming_id_other_player) {

                delete this.Raw_Model_User.Friends[postion];
            }

        }
        var new_friend = [];
        for (var pos_fill in this.Raw_Model_User.Friends) {

            if (this.Raw_Model_User.Friends[pos_fill] != null) {

                new_friend.push(this.Raw_Model_User.Friends[pos_fill]);
            }
        }

        await Connection.db("Chilligames").collection("Users").findOneAndUpdate({ '_id': _id }, { $set: { 'Friends': new_friend } });

        Connection.close();
    }


    async Send_messege_to_users(Incoming_id, Incoming_id_other_player, _incoming_message_body) {

        var other_player;

        var Connection = await new mongo_raw.MongoClient(Mongo_string, { useNewUrlParser: true }).connect();

        var _id_other_player = new mongo_raw.ObjectId(Incoming_id_other_player);
        var _id = new mongo_raw.ObjectId(Incoming_id);

        this.Raw_model_messages.ID = Incoming_id;
        this.Raw_model_messages.Last_Date = new Date().toUTCString();
        this.Raw_model_messages.Message.push(_incoming_message_body);
        this.Raw_model_messages.Status = 0;


        other_player = await Connection.db("Chilligames").collection("Users").findOne({ '_id': _id_other_player });

        if (other_player.Notifactions.Message.Recive.length == 0) {
            await Connection.db("Chilligames").collection("Users").findOneAndUpdate({ '_id': _id_other_player }, { $push: { 'Notifactions.Message.Recive': this.Raw_model_messages } });

        } else {

            for (var Users = Number(); Users < other_player.Notifactions.Message.Recive.length; Users++) {

                if (other_player.Notifactions.Message.Recive[Users].ID == Incoming_id) {

                    other_player.Notifactions.Message.Recive[Users].Message.push(_incoming_message_body);
                    await Connection.db("Chilligames").collection("Users").findOneAndUpdate({ '_id': _id_other_player }, { $set: { 'Notifactions.Message.Recive': other_player.Notifactions.Message.Recive } });
                }
                else {
                    console.log("creat message");
                }

            }
        }

        this.Raw_model_messages.ID = Incoming_id_other_player;
        this.Raw_Model_User = await Connection.db("Chilligames").collection("Users").findOne({ '_id': _id });

        if (this.Raw_Model_User.Notifactions.Message.Send.length == 0) {

            await Connection.db("Chilligames").collection("Users").findOneAndUpdate({ '_id': _id }, { $push: { 'Notifactions.Message.Send': this.Raw_model_messages } });
        }
        else {

            for (var other_users = Number(); other_users < this.Raw_Model_User.Notifactions.Message.Send.length; other_users++) {

                if (this.Raw_Model_User.Notifactions.Message.Send[other_users].ID == Incoming_id_other_player) {

                    this.Raw_Model_User.Notifactions.Message.Send[other_users].Message.push(_incoming_message_body);
                    await Connection.db("Chilligames").collection("Users").findOneAndUpdate({ '_id': _id }, { $set: { 'Notifactions.Message.Send': this.Raw_Model_User.Notifactions.Message.Send } });
                }

            }

        }

        Connection.close();

    }


    async Creat_server(Incoming_id, Incoming_name_app, Incoming_Setting_server) {

        var _id = new mongo_raw.ObjectId(Incoming_id);

        var Connection = await new mongo_raw.MongoClient(Mongo_string, { useNewUrlParser: true }).connect();
        var Parse_to_json = JSON.parse(Incoming_Setting_server);
        this.Raw_model_insert_server.ID = Incoming_id;
        this.Raw_model_insert_server.Setting = Parse_to_json;

        var Result_insert = await Connection.db("Chilligames_Servers").collection(Incoming_name_app).insertOne(this.Raw_model_insert_server);

        this.Raw_Model_User = await Connection.db("Chilligames").collection("Users").findOne({ '_id': _id });


        if (this.Raw_Model_User.Servers[Incoming_name_app] == undefined) {

            this.Raw_Model_User.Servers[Incoming_name_app] = [];
            this.Raw_Model_User.Servers[Incoming_name_app].push(Result_insert.insertedId.toHexString());
        } else {
            this.Raw_Model_User.Servers[Incoming_name_app].push(Result_insert.insertedId.toHexString());
        }

        await Connection.db("Chilligames").collection("Users").findOneAndUpdate({ '_id': _id }, { $set: { 'Servers': this.Raw_Model_User.Servers } });

        Connection.close();
    }


    async Recive_List_Servers_User(Incomin_id, Incoming_name_app) {

        var Connection = await new mongo_raw.MongoClient(Mongo_string, { useNewUrlParser: true }).connect();
        var _id = new mongo_raw.ObjectId(Incomin_id);

        this.Raw_Model_User = await Connection.db("Chilligames").collection("Users").findOne({ '_id': _id });

        Connection.close();

        return this.Raw_Model_User.Servers[Incoming_name_app];

    }


    async Recive_data_Server(Incomin_id_server, Incoming_name_app) {

        var connection = await new mongo_raw.MongoClient(Mongo_string, { useNewUrlParser: true }).connect();
        var _id_server = new mongo_raw.ObjectId(Incomin_id_server);

        var result_search = await connection.db("Chilligames_Servers").collection(Incoming_name_app).findOne({ '_id': _id_server });
        connection.close();
        return result_search;
    }


    async Exit_Server(IncomingID, Incoming_name_app, Incoming_id_server) {

        var _id = new mongo_raw.ObjectId(IncomingID);

        var Connection = await new mongo_raw.MongoClient(Mongo_string, { useNewUrlParser: true }).connect();

        this.Raw_Model_User = await Connection.db("Chilligames").collection("Users").findOne({ '_id': _id });


        for (var i in this.Raw_Model_User.Servers[Incoming_name_app]) {

            if (this.Raw_Model_User.Servers[Incoming_name_app][i] == Incoming_id_server) {
                delete this.Raw_Model_User.Servers[Incoming_name_app][i];
            }

        }
        var server = [];

        for (var i = 0; i < this.Raw_Model_User.Servers[Incoming_name_app].length; i++) {
            if (this.Raw_Model_User.Servers[Incoming_name_app][i] != null) {
                server[i] = this.Raw_Model_User.Servers[Incoming_name_app][i];
            }
        }
        this.Raw_Model_User.Servers[Incoming_name_app] = server;

        await Connection.db("Chilligames").collection("Users").findOneAndUpdate({ '_id': _id }, { $set: { 'Servers': this.Raw_Model_User.Servers } });

        Connection.close();
    }


    async Recive_all_Servers(Incoming_name_app, Incoming_count_server) {

        var Connection = await new mongo_raw.MongoClient(Mongo_string, { useNewUrlParser: true }).connect();
        var result = await Connection.db("Chilligames_Servers").collection(Incoming_name_app).find({}, { limit: Number(Incoming_count_server) }).toArray();
        Connection.close();
        return result;
    }


    async Cheack_server_in_profile(Incoming_ID, Incoming_name_app, Incoming_id_server) {

        var Connection = await new mongo_raw.MongoClient(Mongo_string, { useNewUrlParser: true }).connect();
        var _id = new mongo_raw.ObjectId(Incoming_ID);

        this.Raw_Model_User = await Connection.db("Chilligames").collection("Users").findOne({ '_id': _id });
        var result;

        for (var _id_profile of this.Raw_Model_User.Servers[Incoming_name_app]) {

            if (_id_profile == Incoming_id_server) {
                Connection.close();
                return 1;
            }
        }

        if (result == undefined) {
            Connection.close();

            return 0;
        }


    }


    async Enter_To_Server(Incomng_ID, Incoming_name_app, Incoming_id_server) {

        var Connection = await new mongo_raw.MongoClient(Mongo_string, { useNewUrlParser: true }).connect();
        var _id = new mongo_raw.ObjectID(Incomng_ID);

        this.Raw_Model_User = await Connection.db("Chilligames").collection("Users").findOne({ '_id': _id });
        this.Raw_Model_User.Servers[Incoming_name_app].push(Incoming_id_server);

        await Connection.db("Chilligames").collection("Users").updateOne({ '_id': _id }, { $set: { 'Servers': this.Raw_Model_User.Servers } });
        Connection.close();
    }


    async Send_message_to_chatroom(Incoming_ID, Incoming_name_app, Incoming_message) {

        var Connection = await new mongo_raw.MongoClient(Mongo_string, { useNewUrlParser: true }).connect();
        this.Raw_model_messegae_chatroom.ID = Incoming_ID;
        this.Raw_model_messegae_chatroom.Message = Incoming_message;
        this.Raw_model_messegae_chatroom.Report = 0;
        this.Raw_model_messegae_chatroom.Time = new Date().toUTCString();
        console.log(this.Raw_model_messegae_chatroom);

        await Connection.db("Chilligames_Chat").collection(Incoming_name_app).insertOne(this.Raw_model_messegae_chatroom);
        
        Connection.close();
    }


}