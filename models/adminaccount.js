var mongose = require('mongoose');
mongose.connect('mongodb://localhost/facebooktool');
var Schema = mongose.Schema;

var schema = new Schema({
    user : {type : String, required : true},
    pass : {type : String, required : true},
    type : {type : String, required:true}
});

schema.methods.validPassword = function (password) {
    console.log('login success');
    return (password === this.pass);
}
module.exports  = mongose.model('Admin',schema);

