const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let adminModel = new Schema ({
    email: {type: String, unique: true},
    adminName: String,
    password: String,
});

let userModel = new Schema ({
    email: {type: String, unique: true},
    userName: String,
    password: String,
});


let AdminModel = mongoose.model("admins", adminModel);
let UserModel = mongoose.model("users", userModel);

module.exports = {
    AdminModel: AdminModel,
    UserModel: UserModel
};