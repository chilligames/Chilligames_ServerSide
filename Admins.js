var express = require('express');
var app = express();


var host_reg = "127.0.0.1";
var port_reg = 3332;

app.listen(port_reg, host_reg);

app.get('/admin/register', function (req, res) {


    var Email = req.header("Email");
    var Password = req.header("Password");


    var DB = new Database().register_new_admin(Email, Password);
    DB.then((call_back_Unity) => {

        console.log(call_back_Unity.ID);
        res.send(call_back_Unity);

        res.end();
    })


});


app.get('/admin/login', function (req, res) {

    var Email = req.header("Email");
    var Password = req.header("Password");
    var login = async () => {
        var database = new Database().Admin_login(Email, Password);
        await database.then((result_login) => {
            console.log(result_login);
            res.send(result_login);

            res.end();
        });
    }

    login();
})


app.get('/API', function (req, res) {

    var TOK_app = req.header("Token_App");
    var TOK_admin = req.header("Token_Admin");
    var req_token = new Database().AccessToken(TOK_admin, TOK_app).then((result_token) => {
        if (result_token == null) {
            res.send(result_token);
            res.end();
        } else {
            res.send(result_token);
            res.end();
        }
    });



})


/*DB area*/

var model_admin = {
    "_id": '',
    "ID": '',
    "result": '',
    "Password": '',
    "Email": '',
    "Tier": '',
    "Setting": [],
    "Users": [],
    "Rolls": [],
    "Application": []
}
class Database {

    async register_new_admin(Email_Incoming, Password_Incomin) {
        var mongoraw = require('mongodb');


        var string_mongo = "mongodb://localhost:27017/admin";

        var mongoclient = new mongoraw.MongoClient(string_mongo, { useNewUrlParser: true });

        var data_access = await mongoclient.connect();

        var result_serch = await data_access.db("Chilligames").collection("Users").find({ 'Email': Email_Incoming }).count();

        var Callback = await function () {

            var callback_model = {
                "ID": "",
                "result": Boolean(true),
                "Password": Password_Incomin,
                "Email": Email_Incoming,
                "Tier": 0,
                "Setting": [{ "Short_valid": "" }],
                "Users": [{ "Admin": [Email_Incoming, Password_Incomin] }],
                "Rolls": [{ "Admin": [] }, { "Dashboard": {} }],
                "Application": []
            };
            var Model_Application = {
                "Quick_viwe": [],
                "Users": [],
                "Economy": [],
                "Tabels": [],
                "Real_Data": [],
                "Teams": [],
                "Real_content": [],
                "Automation": [],
                "Analytics": [],
                "ADD_on": [],
                "Setting": [],
                "Admins": [],
            }


            if (result_serch > 0) {
                callback_model.result = false;

                mongoclient.close();
                return callback_model;

            } else {

                var install = async function () {

                    await mongoclient.db("Chilligames").collection("Applications").insertOne(Model_Application).then((result_insert_app) => {

                        callback_model.Application[0] = result_insert_app.insertedId;
                    });
                    await mongoclient.db("Chilligames").collection("Users").insertOne(callback_model).then((result) => {
                        callback_model.ID = result.insertedId;
                        callback_model.result = true;
                        mongoclient.close();
                    });

                    return await callback_model;
                }

                return install();
            }
        }


        return await Callback();

    }

    async Admin_login(Email_Incomin, Password_Incoming) {

        var mongo_raw = require("mongodb");

        var string_mongo = "mongodb://localhost:27017/admin/";

        var Mongo_client = new mongo_raw.MongoClient(string_mongo, { useNewUrlParser: true });

        var result_login = async () => {

            await Mongo_client.connect();
            var callbak;
            var result_serch = await Mongo_client.db("Chilligames").collection("Users");
            return await result_serch.findOne({ 'Email': Email_Incomin, 'Password': Password_Incoming });
        }


        return result_login();

    }

    async AccessToken(incoming_Token_admin, incomin_token_App) {

        var mongo_raw = require('mongodb');

        var string_mongo = "mongodb://localhost:27017/admin";
        var mongo_client = new mongo_raw.MongoClient(string_mongo, { useNewUrlParser: true });

        await mongo_client.connect();

        var Token = new mongo_raw.ObjectId(incoming_Token_admin);

        model_admin = await mongo_client.db("Chilligames").collection("Users").findOne({ '_id': Token });

        var result_token_model = { "Token_app": "", "Token_admin": "" };

        for (var i = 0; i <= model_admin.Application.length; i++) {

            if (model_admin.Application[i] == incomin_token_App) {
                result_token_model.Token_app = model_admin.Application[i];
                result_token_model.Token_admin = model_admin._id;
            }
        }
        return result_token_model;
    }



}


