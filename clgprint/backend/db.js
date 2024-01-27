const mongoose = require('mongoose')
const mongoURI = "mongodb://clgprint:XSWqaz@ac-51wepjx-shard-00-00.cpiplsm.mongodb.net:27017,ac-51wepjx-shard-00-01.cpiplsm.mongodb.net:27017,ac-51wepjx-shard-00-02.cpiplsm.mongodb.net:27017/ClgPrint?ssl=true&replicaSet=atlas-qiuiqp-shard-0&authSource=admin&retryWrites=true&w=majority"
const mongoDB = async () => {
    try {
        mongoose.set('strictQuery', false)
        await mongoose.connect(mongoURI)
        console.log('Database connected')

        const fetched_data = await mongoose.connection.db.collection("food_items");
        const data = await fetched_data.find({}).toArray();
        const foodCategory = await mongoose.connection.db.collection("foodCategory");
        const catData=await foodCategory.find({}).toArray();
        global.foodCategory=catData;
        global.food_items = data;
    }
    catch (error) {
        console.log(error)
        process.exit()
    }
    // await mongoose.connect(mongoURI, { useNewUrlParser: true }, async (err, result) => {
    //     if (err) console.log("---", err);
    //     else {
    //         console.log("connected");
    //         const fetched_data = await mongoose.connection.db.collection("food_items");
    //         fetched_data.find({}).toArray(async function (err, data) {
    //             const foodCategory=await mongoose.connection.db.collection("foodCategory");
    //             foodCategory.find({}).toArray(function(err,catData){
    //                 global.food_items=data;
    //             })
    //         })
    //     }
    // })
}

module.exports = mongoDB;