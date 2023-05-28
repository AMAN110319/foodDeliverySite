const mongoose = require('mongoose')
const mongoURI = "mongodb://amantiwari:2020543479@ac-e1a0rce-shard-00-00.jshxlry.mongodb.net:27017,ac-e1a0rce-shard-00-01.jshxlry.mongodb.net:27017,ac-e1a0rce-shard-00-02.jshxlry.mongodb.net:27017/?ssl=true&replicaSet=atlas-7x8u64-shard-0&authSource=admin&retryWrites=true&w=majority"
const mongoDB = async () => {
    await mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, async (e, result) => {
        if (e) {
            console.log(e);
        }
        else { 
            console.log("connected successfully")
            // reading from database
            const fetched_data = await mongoose.connection.db.collection("food_items")
            // for getting the data
            fetched_data.find({}).toArray(async function (err, data) {
                const foodCategory = await mongoose.connection.db.collection("foodCategory");
                foodCategory.find({}).toArray(function (err, catData) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        // creating a global data
                        global.food_items = data;
                        global.food_category = catData;
                        // console.log(global.food_items);
                    }
                })

                // if(err){
                //     console.log(err);
                // }
                // else{
                //     // creating a global data
                //     global.food_items = data;
                //     // console.log(global.food_items);
                // }
            })
        }
    });
}
module.exports = mongoDB;

