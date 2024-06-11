const mongoose = require('mongoose')

const HistorySchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    query:{
        type:String,
    }

},{timestamps:true})

module.exports = mongoose.model("History",HistorySchema);