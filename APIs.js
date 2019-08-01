var Express = require('express');
var app_api = Express();

app_api.get("/APIs", (req, res) => {
    var DB = new DB_model();
    var pipe_line = req.header("Pipe_line");
    var Token_application = req.header("Token");

    var ID = req.header("ID");
    var User_name = req.header("User_name");
    var Password = req.header("Password");
    var Tabel_name = req.header("Tabel_name");
    var Tabel_data = req.header("Data_Tabel");

    switch (pipe_line) {
        case "RUP": {

            DB.register_user_pass(Token_application, User_name, Password).then((result_inject) => {

                if (result_inject == 0) {
                    res.send("Not_creat");
                    res.end();
                } else {
                    res.send(result_inject);
                    res.end();
                }
            });
        }
            break;
        case "QR": {
            DB.Register_quick(Token_application, ID).then((result_inject) => {
                res.send(result_inject);
                res.end();
            });

        } break;
        case "SDTT": {

            DB.send_data_to_tabel(Tabel_name, Token_application, ID).then(() => {



            });

        } break;
    }

}).listen("3333", "127.0.0.1")


//database



var mongo_raw = require('mongodb');
var Mongo_string = "mongodb://localhost:27017/admin";
var Client_mongo = new mongo_raw.MongoClient(Mongo_string, { useNewUrlParser: true });
class DB_model {

    Model_Application = {
        "Quick_viwe": [],
        "Users": [],
        "Economy": [],
        "Tabels": {},
        "Real_Data": [],
        "Teams": [],
        "Real_content": [],
        "Automation": [],
        "Analytics": [],
        "ADD_on": [],
        "Setting": [],
        "Admins": [],
    }

    Raw_Model_User = {
        'ID': '',
        "Identities": {
            "Frist_Login": '',
            "Password": '',
            "Username": '',
            "Chilligames_user": '',
            "Contact_Email": '',
            "Display_name": '',
            "Email": '',
            "Facebook_ACC": { "User_name": '', "password": '' },
            "google_ACC": { "User_name": '', "Password": '' },
            "Language": '',
            "Last_login": ''
        },
        "ban": [],
        "policy": [],
        "Friends": [],
        "Avatar": '',
        "Clud_Scripts": [],
        "Log": [],
        "Files": [],
        "Data": {
            "Public": [],
            "Internal": []
        },
        "Inventory": [],
        "Notifaction": [],
        "Segment": [],
        "Logins": [],
        "Teams": [],
        "Wallet": [],
        "Servers": []
    }

    async register_user_pass(Incoming_Token, Incoming_User_name, Incoming_Password) {

        await Client_mongo.connect();
        var Collection = await Client_mongo.db("Chilligames").collection("Applications");
        var result;


        var Token = new mongo_raw.ObjectId(Incoming_Token);
        this.Model_Application = await Collection.findOne({ "_id": Token });

        this.Raw_Model_User.ID = new mongo_raw.ObjectID();
        this.Raw_Model_User.Identities.Username = Incoming_User_name;
        this.Raw_Model_User.Identities.Password = Incoming_Password;

        this.Model_Application.Users.push(this.Raw_Model_User);


        var Result_inject = await Collection.updateOne({ "_id": Token }, { $set: { "Users": this.Model_Application.Users } });
        if (Result_inject.result.ok === 1) {

            result = this.Raw_Model_User.ID;
            console.log(result);
            return result;
        } else {
            result = 0;
            return result;
        }
    }


    async Register_quick(Incomin_Token) {

        var result;
        await Client_mongo.connect();
        var Token = new mongo_raw.ObjectId(Incomin_Token);
        this.Model_Application = await Client_mongo.db("Chilligames").collection("Applications").findOne({ '_id': Token });

        var ID_player = new mongo_raw.ObjectId();
        this.Raw_Model_User.ID = ID_player;

        this.Model_Application.Users.push(this.Raw_Model_User);

        var Result_insert = await Client_mongo.db("Chilligames").collection("Applications").updateOne({ '_id': Token }, { $set: { 'Users': this.Model_Application.Users } });

        if (Result_insert.result.ok === 1) {
            result = this.Raw_Model_User.ID.toString();
            return result;
        } else {
            result = 0;

            return result;
        }

    }


    async send_data_to_tabel(incomin_name_tabel, Incoming_token_app, Incoming_token_player) {


        var Token = new mongo_raw.ObjectId(Incoming_token_app);
        await Client_mongo.connect();

        this.Model_Application = await Client_mongo.db("Chilligames").collection("Applications").findOne({ '_id': Token });

        var a = this.Model_Application.Tabels.T_1;

        console.log(a);
    }

}
