var db = require('mongodb');
var mongostring = "mongodb://localhost:27017/admin";

var Client = new db.MongoClient(mongostring, { useUnifiedTopology: true, useNewUrlParser: true });


module.exports.Connect = async () => {

    await Client.connect();

}

module.exports.Disconnect = async () => {

    await Client.close();
}

module.exports.Status_server = async () => {
    if (await Client.isConnected()) {
        return true
    } else {
        
        return false
    }
}

module.exports.Insert_doc = async (DB, Collection, Doc) => {
    var result = '';

    if (this.Status_server) {

        Client.db("Chilligames");
    } else {


    }

}