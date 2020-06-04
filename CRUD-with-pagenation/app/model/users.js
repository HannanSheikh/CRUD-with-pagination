const mongoose = require('mongoose')
const schema = mongoose.Schema;

const userSchema = schema({
    fullname:{
        type:String
    },
    email:{
        type:String
    },
    mobile:{
        type:String
    },
    city:{
        type:String
    },
    image:{
        type:String
    }
})
mongoose.model('users',userSchema)