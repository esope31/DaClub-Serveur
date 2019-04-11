const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;
// test
let Users = new Schema({
    
    Nom: String,
    Prenom: String,
    coordX:String,
    coordY:String,
 
});


module.exports = mongoose.model('Users', Users);
