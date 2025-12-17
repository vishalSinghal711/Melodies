// DB Connection
const mongoose = require('mongoose');
const uri = "mongodb+srv://vishalsinghal741_db_user:<db_password>@cluster0.70qlnkv.mongodb.net/?appName=Cluster0";
mongoose.connect(uri,
{poolSize:5}, (err=>{
    if(err){
        console.log('Problem in DB Connection');
    }
    else{
        console.log('DB Connection Created....');
    }
}));
module.exports = mongoose;
