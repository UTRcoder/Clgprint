const express = require('express')
const app = express()
const port = 5000;
const mongoDB = require("./db")
const cors=require("cors");
const corsOptions ={
    origin:'*', 
    credentials:true,            
    optionSuccessStatus:200,
}
mongoDB();

app.use(cors(corsOptions))
app.get('/', (req, res) => {
    res.send("Hello World");

})
app.use(express.json())
app.use('/api', require("./Routes/CreatUser"))
app.use('/api',require("./Routes/Loginuser"))
app.use('/api',require("./Routes/DisplayData"))
app.use('/api',require("./Routes/OrderData"))
app.listen(port, () => {
    console.log(`Running Succesfully at port ${port}`)
})