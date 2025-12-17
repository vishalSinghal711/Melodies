// DB Connection
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://vishalsinghal741_db_user:imZCfYzxLwoxvXUk@cluster0.70qlnkv.mongodb.net/music_app?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  poolSize:5
},(err=>{
    if(err){
        console.log('Problem in DB Connection');
    }
    else{
        console.log('DB Connection Created....');
    }
}));
module.exports = mongoose;
