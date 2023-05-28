const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const mongoDB = require('./db');
// middleware
app.use((req,res,next)=>{
    // giving access for the front end
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type,Accept"
    );next();
});
mongoDB();
app.get('/', (req, res) =>{
    res.send('hello world');
})
// middlewares 
app.use(express.json());
app.use('/api',require("./Routes/CreateUser"));
app.use('/api',require("./Routes/DisplayData"));
app.use('/api',require("./Routes/OrderData"));

app.listen(port,()=>{
    console.log(`listening on port ${port}`)
});