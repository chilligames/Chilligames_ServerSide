var db = require('mongodb');
var mongostring = "mongodb://localhost:27017/admin";

var Client = new db.MongoClient(mongostring, { useUnifiedTopology: true, useNewUrlParser: true });


module.exports.Insert_doc = async (DB, Collection, Doc) => {
    var result = "";

    while (result.length < 1) {

        if (await Client.isConnected()) {
            var id = await Client.db(DB).collection(Collection).insertOne(Doc);
            result = await id.insertedId.toHexString();
        } else {
            await Client.connect();
        }
        if (result.length > 1) {
            break;
        }
    }
    return result;
}

