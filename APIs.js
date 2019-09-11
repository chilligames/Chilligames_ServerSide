﻿var Express = require('express');
var app_api = Express();


app_api.get("/APIs", (req, res) => {
    var DB = new DB_model();
    var pipe_line = req.header("Pipe_line");
    var _id = req.header("_id");
    var _id_server = req.header("_id_Server");
    var _id_other_player = req.header("_id_other_player");
    var _id_message = req.header("_id_message");
    var leader_board_name = req.header("Leader_board");
    var Count_search = req.header("Count");
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
    var Coin = req.header("Coin");

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

            DB.Recive_leader_board(leader_board_name, Count_search).then((result) => {

                res.send(result);
                res.end();

            });
        } break;
        case "RLBNU": {

            DB.Recive_leader_board_near_by_user(_id, leader_board_name, Count_search).then((result) => {
                res.send(result);
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
            DB.Recive_info_user(_id).then((result) => {
                res.send(result);
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
        case "CNN": {
            DB.Cheack_Nick_name(Nickname).then((result) => {
                res.send(result);
                res.end();
            });
        } break;
        case "CUN": {
            DB.Cheack_User_name(Username).then(result => {
                res.send(result);
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
            DB.Recive_all_Servers(Name_App, Count_search).then((result) => {
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
        case "RCM": {
            DB.Recive_Chatroom_Messages(Name_App).then((Result) => {
                res.send(Result);
                res.end();
            });
        } break;
        case "RM": {
            DB.Report_message(_id_message, Name_App).then(() => {
                res.end();
            });
        } break;
        case "RMU": {
            DB.Recive_Messeges_User(_id).then((result) => {
                res.send(result);
                res.end();
            });
        } break;
        case "RMEU": {

            DB.Recive_messge_each_user(_id, _id_other_player).then(result => {
                res.send(result);
                res.end();
            });
        } break;
        case "RN": {

            DB.Recive_notifactions(_id, Name_App).then((result) => {
                res.send(result);
                res.end();
            });

        } break;
        case "RNU": {

            DB.Remove_Notifaction_User(_id, Name_App).then(() => {

                res.end();
            });

        } break;
        case "SU": {
            DB.Search_User(Nickname).then((result) => {
                res.send(result);
                res.end();
            });
        } break;
        case "CI": {
            DB.insert_coin(_id, Coin).then(() => {
                res.send();
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
            'Message': [],
            'Notifaction': {}
        },
        "Teams": [],
        "Wallet": {
            "Coin": 0,
            "Mony": 0

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
        'Postion': '',
        'ID': '',
        'Nick_Name': '',
        'Message': '',
        'Time': '',
        'Report': 0
    }

    Raw_model_each_message = {
        'PM': '',
        'Time': '',
        'ID': '',
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
        if (result_search != null) {

            Connection.close();
            return "1";
        } else {
            Connection.close();
            return "0";
        }
    }


    async Send_Score_to_leader_board(incoming_id, incoming_leaderboard_name, incoming_Score) {
        var connection = await new mongo_raw.MongoClient(Mongo_string, { useNewUrlParser: true }).connect();

        this.Raw_Model_User.Leader_board[incoming_leaderboard_name] = Number(incoming_Score);

        await connection.db("Chilligames").collection("Users").updateOne({ '_id': new mongo_raw.ObjectId(incoming_id) }, { $set: { 'Leader_board': this.Raw_Model_User.Leader_board } });

        connection.close();
    }


    async Recive_leader_board(incoming_name_leader_board, incoming_count) {

        var Pipe_leader_board = "Leader_board." + incoming_name_leader_board;

        var Connection = await new mongo_raw.MongoClient(Mongo_string, { useNewUrlParser: true }).connect();
        var result_search = await Connection.db("Chilligames").collection("Users").find({}, { limit: Number(incoming_count), projection: { [Pipe_leader_board]: 1, 'Info.Nickname': 1 } }).toArray();
        var result = [];
        for (var i = 0; i < result_search.length; i++) {
            result[i] = {
                '_id': result_search[i]._id,
                'Nickname': result_search[i].Info.Nickname,
                'Score': result_search[i].Leader_board[incoming_name_leader_board]
            }
        }

        Connection.close(result);
        return result;
    }


    async Recive_leader_board_near_by_user(incoming_id, Incoming_leader_board_name, Incoming_Count) {
        var connection = await new mongo_raw.MongoClient(Mongo_string, { useNewUrlParser: true }).connect();
        this.Raw_Model_User = await connection.db("Chilligames").collection("Users").findOne({ '_id': new mongo_raw.ObjectID(incoming_id) });

        var Score_player = Number(this.Raw_Model_User.Leader_board[Incoming_leader_board_name]);

        var result_recive_leader_board = await connection.db("Chilligames").collection("Users").find({ ['Leader_board.' + Incoming_leader_board_name]: { $lt: Score_player } }, { limit: Number(Incoming_Count), projection: { ['Leader_board.' + Incoming_leader_board_name]: 1, 'Info': 1 }, sort: { ['Leader_board.' + Incoming_leader_board_name]: -1 } }).toArray();

        var result = [];

        for (var i = 0; i < result_recive_leader_board.length; i++) {
            result[i] = {
                '_id': result_recive_leader_board[i]._id,
                'Nickname': result_recive_leader_board[i].Info.Nickname,
                'Score': result_recive_leader_board[i].Leader_board[Incoming_leader_board_name]
            };
        }

        connection.close();
        return result;
    }


    async Recive_ranking_posion(Incomin_id, Incomin_leader_board_name) {
        var connection = await new mongo_raw.MongoClient(Mongo_string, { useNewUrlParser: true }).connect();

        this.Raw_Model_User = await connection.db("Chilligames").collection("Users").findOne({ '_id': new mongo_raw.ObjectId(Incomin_id) });

        var Count = await connection.db("Chilligames").collection("Users").find({ ["Leader_board." + Incomin_leader_board_name]: { $gt: Number(this.Raw_Model_User.Leader_board[Incomin_leader_board_name]) } }).count();
        connection.close();
        return Count;
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
        var Schema_info_user;

        Schema_info_user = await connection.db("Chilligames").collection("Users").findOne({ '_id': _id }, { projection: { 'Info': 1 } });
        connection.close();
        return Schema_info_user.Info;
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


    async Cheack_Nick_name(Incomin_Nickname) {
        var Connection = await new mongo_raw.MongoClient(Mongo_string, { useNewUrlParser: true }).connect();
        var result_find = await Connection.db("Chilligames").collection("Users").findOne({ 'Info.Nickname': Incomin_Nickname });

        if (result_find != null) {
            Connection.close();
            return "0";
        } else {
            Connection.close();
            return "1";
        }
    }


    async Cheack_User_name(Incoming_User_name) {
        var Connection = await new mongo_raw.MongoClient(Mongo_string, { useNewUrlParser: true }).connect();
        var result_finder = await Connection.db("Chilligames").collection("Users").findOne({ 'Info.Username': Incoming_User_name });
        if (result_finder != null) {
            Connection.close();
            return "0";
        } else {
            Connection.close();
            return "1";
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
                break;
            }
        }

        var server = [];

        for (var i = 0; i < this.Raw_Model_User.Servers[Incoming_name_app].length; i++) {
            if (this.Raw_Model_User.Servers[Incoming_name_app][i] != null) {

                for (var a = 0; a < this.Raw_Model_User.Servers[Incoming_name_app].length; a++) {
                    if (server[a] == undefined) {
                        server[a] = this.Raw_Model_User.Servers[Incoming_name_app][i];
                        break;
                    }
                }

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
        var result = 0;

        for (var _id_profile of this.Raw_Model_User.Servers[Incoming_name_app]) {

            if (_id_profile == Incoming_id_server) {
                Connection.close();
                return 1;
            }
        }

        if (result == 0) {
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
        this.Raw_Model_User = await Connection.db("Chilligames").collection("Users").findOne({ '_id': new mongo_raw.ObjectID(Incoming_ID) });

        var postion = await Connection.db("Chilligames_Chat").collection(Incoming_name_app).find({}, { sort: { 'Postion': -1 } }).toArray();


        this.Raw_model_messegae_chatroom.Postion = postion[0].Postion + 1;

        this.Raw_model_messegae_chatroom.ID = Incoming_ID;
        this.Raw_model_messegae_chatroom.Nick_Name = this.Raw_Model_User.Info.Nickname;
        this.Raw_model_messegae_chatroom.Message = Incoming_message;
        this.Raw_model_messegae_chatroom.Report = 0;
        this.Raw_model_messegae_chatroom.Time = new Date().toUTCString();

        await Connection.db("Chilligames_Chat").collection(Incoming_name_app).insertOne(this.Raw_model_messegae_chatroom);

        Connection.close();
    }


    async Recive_Chatroom_Messages(Incoming_Name_App) {

        var Connections = await new mongo_raw.MongoClient(Mongo_string, { useNewUrlParser: true }).connect();
        var Count_call_back = await Connections.db("Chilligames_Chat").collection(Incoming_Name_App).countDocuments() - 10;

        var result_find = await Connections.db("Chilligames_Chat").collection(Incoming_Name_App).find({ 'Postion': { $gte: Count_call_back } }, { sort: { 'Postion': 1 } }).toArray();
        Connections.close();
        return result_find;
    }


    async Report_message(Incoming_message_id, Incoming_name_app, ) {

        var Connection = await new mongo_raw.MongoClient(Mongo_string, { useNewUrlParser: true }).connect();

        this.Raw_model_messegae_chatroom = await Connection.db("Chilligames_Chat").collection(Incoming_name_app).findOne({ '_id': new mongo_raw.ObjectId(Incoming_message_id) });

        if (this.Raw_model_messegae_chatroom.Report + 1 > 3) {

            await Connection.db("Chilligames_Chat").collection(Incoming_name_app).deleteOne({ '_id': new mongo_raw.ObjectId(Incoming_message_id) });
        } else {
            this.Raw_model_messegae_chatroom.Report = this.Raw_model_messegae_chatroom.Report + 1;

            await Connection.db("Chilligames_Chat").collection(Incoming_name_app).updateOne({ '_id': new mongo_raw.ObjectId(Incoming_message_id) }, { $set: { 'Report': this.Raw_model_messegae_chatroom.Report } });
        }

        Connection.close();

    }


    async Send_messege_to_users(Incoming_id, Incoming_id_other_player, _incoming_message_body) {

        var Connection = await new mongo_raw.MongoClient(Mongo_string, { useNewUrlParser: true }).connect();
        this.Raw_model_messages.ID = Incoming_id_other_player;
        this.Raw_model_messages.Last_Date = new Date().toUTCString();
        this.Raw_model_messages.Status = 0;

        var other_player;


        this.Raw_model_each_message.ID = Incoming_id;
        this.Raw_model_each_message.PM = _incoming_message_body;
        this.Raw_model_each_message.Time = new Date().toUTCString();

        this.Raw_Model_User = await Connection.db("Chilligames").collection("Users").findOne({ '_id': new mongo_raw.ObjectId(Incoming_id) });

        if (this.Raw_Model_User.Notifactions.Message.length >= 1) {

            let status = 0;

            for (var i = 0; i < this.Raw_Model_User.Notifactions.Message.length; i++) {

                if (this.Raw_Model_User.Notifactions.Message[i].ID == Incoming_id_other_player) {


                    this.Raw_Model_User.Notifactions.Message[i].Message.push(this.Raw_model_each_message);
                    this.Raw_Model_User.Notifactions.Message[i].Last_Date = new Date().toUTCString();
                    this.Raw_Model_User.Notifactions.Message[i].Status = 0;

                    await Connection.db("Chilligames").collection("Users").findOneAndUpdate({ '_id': new mongo_raw.ObjectId(Incoming_id) }, { $set: { 'Notifactions.Message': this.Raw_Model_User.Notifactions.Message } });
                    status = 1;
                    break;
                } else {
                    status = 0
                }
            }

            if (status != 1) {
                this.Raw_model_messages.Message.push(this.Raw_model_each_message);
                await Connection.db("Chilligames").collection("Users").findOneAndUpdate({ '_id': new mongo_raw.ObjectId(Incoming_id) }, { $push: { 'Notifactions.Message': this.Raw_model_messages } });
            }


        } else {

            this.Raw_model_messages.Message.push(this.Raw_model_each_message);

            await Connection.db("Chilligames").collection("Users").findOneAndUpdate({ '_id': new mongo_raw.ObjectId(Incoming_id) }, { $push: { 'Notifactions.Message': this.Raw_model_messages } });
        }



        other_player = await Connection.db("Chilligames").collection("Users").findOne({ '_id': new mongo_raw.ObjectId(Incoming_id_other_player) });

        let status = 0;

        this.Raw_model_messages.ID = Incoming_id;

        if (other_player.Notifactions.Message.length >= 1) {


            for (var i = 0; i < other_player.Notifactions.Message.length; i++) {

                if (other_player.Notifactions.Message[i].ID == Incoming_id) {

                    other_player.Notifactions.Message[i].Message.push(this.Raw_model_each_message);
                    other_player.Notifactions.Message[i].Last_Date = new Date().toUTCString();
                    other_player.Notifactions.Message[i].Status = 0;

                    await Connection.db("Chilligames").collection("Users").updateOne({ '_id': new mongo_raw.ObjectId(Incoming_id_other_player) }, { $set: { 'Notifactions.Message': other_player.Notifactions.Message } })
                    status = 1;
                    break;

                } else {
                    status = 0;
                }
            }


            if (status != 1) {

                console.log("not fide");
                await Connection.db("Chilligames").collection("Users").updateOne({ '_id': new mongo_raw.ObjectId(Incoming_id_other_player) }, { $push: { 'Notifactions.Message': this.Raw_model_messages } });
            }


        } else {

            this.Raw_model_messages.Message.push(this.Raw_model_each_message);
            await Connection.db("Chilligames").collection("Users").findOneAndUpdate({ '_id': new mongo_raw.ObjectId(Incoming_id_other_player) }, { $push: { 'Notifactions.Message': this.Raw_model_messages } });
        }

        Connection.close();
    }


    async Recive_Messeges_User(Incoming_id) {

        var Connection = await new mongo_raw.MongoClient(Mongo_string, { useNewUrlParser: true }).connect();
        this.Raw_Model_User = await Connection.db("Chilligames").collection("Users").findOne({ '_id': new mongo_raw.ObjectId(Incoming_id) });
        Connection.close();
        return this.Raw_Model_User.Notifactions.Message;
    }


    async Recive_messge_each_user(Incoming_id, Incoming_id_other_uer) {
        var Connection = await new mongo_raw.MongoClient(Mongo_string, { useNewUrlParser: true }).connect();
        this.Raw_Model_User = await Connection.db("Chilligames").collection("Users").findOne({ '_id': new mongo_raw.ObjectId(Incoming_id) });
        var result = [];

        for (var i = 0; i < this.Raw_Model_User.Notifactions.Message.length; i++) {

            if (this.Raw_Model_User.Notifactions.Message[i].ID == Incoming_id_other_uer) {

                result = this.Raw_Model_User.Notifactions.Message[i].Message;

            }

        }
        Connection.close();
        return result;

    }


    async Recive_notifactions(Incoming_id, Incoming_name_App) {
        var Connection = await new mongo_raw.MongoClient(Mongo_string, { useNewUrlParser: true }).connect();
        this.Raw_Model_User = await Connection.db("Chilligames").collection("Users").findOne({ '_id': new mongo_raw.ObjectId(Incoming_id) });
        Connection.close();
        return this.Raw_Model_User.Notifactions.Notifaction[Incoming_name_App];
    }


    async Remove_Notifaction_User(Incoming_id, Incoming_name_app) {

        var Connection = await new mongo_raw.MongoClient(Mongo_string, { useNewUrlParser: true }).connect();

        this.Raw_Model_User = await Connection.db("Chilligames").collection("Users").findOne({ '_id': new mongo_raw.ObjectId(Incoming_id) });

        this.Raw_Model_User.Notifactions.Notifaction[Incoming_name_app] = {};
        Connection.db("Chilligames").collection("Users").updateOne({ '_id': new mongo_raw.ObjectId(Incoming_id) }, { $set: { 'Notifactions.Notifaction': this.Raw_Model_User.Notifactions.Notifaction } });

        Connection.close();
    }


    async Search_User(Incoming_Nick_name) {
        var Connection = await new mongo_raw.MongoClient(Mongo_string, { useNewUrlParser: true }).connect();
        var finder = await Connection.db("Chilligames").collection("Users").findOne({ 'Info.Nickname': Incoming_Nick_name }, { projection: { 'Info.Nickname': 1 } });

        if (finder == null) {
            finder = "0";
        }
        Connection.close();
        return finder;
    }


    async insert_coin(Incoming_ID, Coin) {
        var Connection = await new mongo_raw.MongoClient(Mongo_string, { useNewUrlParser: true }).connect();
        this.Raw_Model_User = await Connection.db("Chilligames").collection("Users").findOne({ '_id': new mongo_raw.ObjectID(Incoming_ID) });
        this.Raw_Model_User.Wallet.Coin = (this.Raw_Model_User.Wallet.Coin + Number(Coin));
        await Connection.db("Chilligames").collection("Users").updateOne({ '_id': new mongo_raw.ObjectId(Incoming_ID) }, { $set: { 'Wallet.Coin': this.Raw_Model_User.Wallet.Coin }});
        Connection.close();
    }

}
