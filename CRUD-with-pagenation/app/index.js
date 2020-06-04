const express = require('express');
const app = express();
const mongoose = require ('mongoose');
const path = require('path')
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser');
mongoose.connect('mongodb://localhost:27017/Practice',{useNewUrlParser:true,useUnifiedTopology:true},(err)=>{
    if(!err){
        console.log('Connection with MongoDB succeded..!')
    }else{
        console.log('error in DB connectivity..!')
    }
})
require('./model/users');
app.set('view engine','ejs');
app.set('views','app/views');
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static('./public/'))
require('./routes')(app)
app.listen(port,()=>{
    console.log('server is running on port '+port)
})