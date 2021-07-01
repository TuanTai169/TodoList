const express = require('express')
const mongoose = require('mongoose')

const connectDB = async () =>{
    try {
        await mongoose.connect("mongodb+srv://react:react@fristappmearn.jwhoj.mongodb.net/FistAppMERN?retryWrites=true&w=majority",{
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });

        console.log('MongoDB connected')
    } catch (error) {
        console.log(error.message)
        process.exit(1)
    }
}

connectDB()
const app = express()

app.get('/', function(req, res){
    res.send("Hello world")
});

const POST = 5000;

app.listen(POST, ()=> console.log(`Sever started on post ${POST}`))