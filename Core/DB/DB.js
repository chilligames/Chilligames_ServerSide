var db = require('mongodb');
var mongostring = "mongodb://localhost:27017/admin";

var Client = async () => { return await new db.MongoClient(mongostring, { useNewUrlParser: true, useUnifiedTopology: true }).connect() };


//insert raw doc to collection db
module.exports.Insert_doc = async (DB, Collection, Doc) => {

    Doc._id = new db.ObjectId();
    var connection = await Client();

    var id = await connection.db(DB).collection(Collection).insertOne(Doc);

    await connection.close();
    return id.insertedId.toHexString();
}

//push data type string to pipeline db
module.exports.Push_data_String = async (DB, Collection, _id_doc, Pipe_line_data, Data) => {
    var Connection = await Client();
    await Connection.db(DB).collection(Collection).updateOne({ '_id': new db.ObjectID(_id_doc) }, { $push: { [Pipe_line_data]: Data } });

    await Connection.connect();
}


