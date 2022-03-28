const userControllerMethods = {
  async register(request, response) {
    // extracting request body where user details are posted
    //automatically converts json to obj if required json
    let userObject = request.body;

    //requring useroperations which controls the functionalites related to user
    const userOperations = require("../db/services/useroperations");

    // passed userObject to register function using async Because Nodejs in Single threaded and Db operations are time consuming
    // await to stop flow till didn't got response
    // result is result object
    let result = await userOperations.register(userObject);

    // if valid result is arrived and it has truthy id then send Success in json form else Not added
    if (result && result._id) {
      response.status(201).json({ message: "Record added SuccessFully" });
    } else {
      response.status(400).json({ message: `Record Not added due to ${result}` });
    }
  },
  async login(request, response) {
    // extracting request body where user details are posted
    let userObject = request.body;
    console.log(userObject);
    //requring useroperations which controls the functionalites related to user
    const userOperations = require("../db/services/useroperations");

    // passed userObject to login function using async Because Nodejs in Single threaded and Db operations are time consuming
    // await to stop flow till didn't got response
    //returns result obj
    let result = await userOperations.login(userObject);

    // if result is truthy and have a id then message to Welcoms
    if (result && result._id) {
      response.status(200).json({ message: JSON.stringify(result) });
    } else {
      // else message invalid credentials
      response.status(401).json({ message: `Cannot SignIn due to ${result}` });
    }
  },
};

module.exports = userControllerMethods;