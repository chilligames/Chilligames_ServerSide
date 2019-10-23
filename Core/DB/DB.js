var db = require('mongodb');
var mongostring = "mongodb://localhost:27017/admin";

var Client = async () => { return await new db.MongoClient(mongostring, { useNewUrlParser: true, useUnifiedTopology: true }).connect() };

module.exports.Insert_doc = async (DB, Collection, Doc) => {

    Doc._id = new db.ObjectId();
    var connection = await Client();

    var id = await connection.db(DB).collection(Collection).insertOne(Doc);

    return id.insertedId.toHexString();
}
