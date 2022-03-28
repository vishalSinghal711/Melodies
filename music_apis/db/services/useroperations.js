// this file contains main logic which talks with data base and return result so that router sed responses

// UserModel (instance of Schema) and have a model that will be matched with passed obj fields
const UserModel = require("../models/user.model");
const userOperations = {
  // Register a user functionality

  // params - userObject passed through register request
  async register(userObject) {
    // calling db functions asyncly becoz. db operations are time consuming and nodejs is single threaded
    // used await to stop flow till db not returns response

    // create function return obj that is created in Db
    // create function is from Schema i.e from mongoose
    const result = await UserModel.create(userObject);

    // returning result
    return result;
  },

  //   Login a user functionality
  async login({ userid, password }) {
    // calling db functions asyncly becoz. db operations are time consuming and nodejs is single threaded
    // used await to stop flow till db not returns response

    // findOne function return first matched obj that is present in Db
    // findOne function is from Schema i.e from mongoose
    const result = await UserModel.findOne({
      userid: userid,
      password: password,
    });
    return result;
  },
};
module.exports = userOperations;
