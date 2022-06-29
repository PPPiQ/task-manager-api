// CRUD create read update delete

// const mongodb = require('mongodb');
// const ObjectID = mongodb.ObjectId;
// const MongoClient = mongodb.MongoClient;

const { ObjectID } = require('bson');
const { MongoClient, ObjectId } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

// const id = new ObjectId();
// console.log(id);

// console.log(id.getTimestamp());

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!');
    }

    const db = client.db(databaseName);
    const col = db.collection("users");

    // col.findOne({ _id: new ObjectId("62ab3b51fcf7b2e5c841e5e7")}, (err, items) => {
    //     if (err) {
    //         return console.log("No records")
    //     }
    //     console.log(items);

    // });
    // col.findOne({ name: "Jane"}, (err, items) => {
    //     if (err) { return console.log("No record");}
    //     console.log(items);
    // })
    // col.find({ completed: false}).toArray((error, users) => {
    //     console.log(users);
    // })


    // const updatePromise =  col.updateOne(
    //     { name: "Jen" },
    //     {
    //         $inc: {
    //             age: 1
    //         }
    //     });
    
    //     updatePromise.then( (result) => {
    //         console.log(result);
    //     }).catch((err) => {
    //         console.log(err);
    //     })

    // const colTasks = db.collection("tasks");
    // colTasks.updateMany(
    //     { completed: true},
    //     {
    //         $set: {
    //             completed: false
    //         }
    //     }
    // ).then((result) => {
    //     console.log(result.modifiedCount);
    // }).catch((err)=> {
    //     console.log(err);
    // })


    // col.deleteMany({
    //     age: 39
    // }).then((result)=> {
    //     console.log(result);
    // }).catch((err) => {
    //     console.log(err);
    // })


    
    // col.deleteOne({
    //     age: 27
    // }).then((result)=> {
    //     console.log(result);
    // }).catch((err) => {
    //     console.log(err);
    // })

});