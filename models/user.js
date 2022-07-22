var mongoose = require("mongoose");

var messageSchema = mongoose.Schema({
  message: String,
});

var userSchema = mongoose.Schema({
  userName: String,
  mail: String,
  tel: String, 
  userMessage: [messageSchema],
});

var userModel = mongoose.model("users", userSchema);

module.exports = userModel;
