const mongoose = require("../connect.mongodb");
const { Schema } = mongoose;
const UserSchema = new Schema({
  userid: { type: Schema.Types.String, required: true, unique: true },
  password: { type: Schema.Types.String, required: true, min: 8, max: 25 },
  name: { type: Schema.Types.String },
  role: { type: Schema.Types.String, default: "User" },
});
const UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;
