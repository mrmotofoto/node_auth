var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

mongoose.connect('mongodb://localhost/nodeauth');

var db = mongoose.connection;

//USER SCHEMA---------------------------
var UserSchema = mongoose.Schema({
    username: {
        type: String,
        index: true
    },
    password: {
        type: String
    },
    email: {
        type: String
    },
    name: {
        type: String
    },
    profileImage: {
        type: String
    }
});

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function(id, callback) {
    User.findById(id, callback);
}

module.exports.getUserByUsername = function(username, callback){
    var query = {username: username};
    User.findOne(query, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	callback(null, isMatch);
	});
}

module.exports.createUser = function(newUser, callback) {
    bcrypt.genSalt(10, function(err, salt) {
        if(err) {
            console.log("Error");
        } else {
            bcrypt.hash(newUser.password, salt, function(err, hash) {
                if(err) {
                    console.log('Error');
                } else {
                    newUser.password = hash;   
                    newUser.save(callback);                 
                }
            });           
        }
    });
}


