var mongose = require('mongoose');
mongose.connect('mongodb://localhost/facebooktool');
var Schema = mongose.Schema;

var schema = new Schema({
    usertoken : {type : String, required : true},
    status : {type : String, required : true}
});

module.exports  = mongose.model('Token',schema);