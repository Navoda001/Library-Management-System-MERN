const mongoose = require('mongoose');
const {v4: uuidv4} = require('uuid')

const bookSchema = new mongoose.Schema({
    bookId:{type:String, default:uuidv4,required:true,unique:true},
    bookName:{type:String,required:true},
    author: {type:String,required:true},
    edition: {type:String,required:true},
    publisher: {type:String,required:true},
    isbn: {type:String,required:true},
    price: {type:Number,required:true},
    totalQty: {type:Number},
    avilableQty : {type:Number}
});

module.exports - mongoose.model("Book",bookSchema);