const mongoose = require("mongoose");


const dataSchema = new mongoose.Schema({
  User_name: {
    type: String,
    require: true,
  },
  userId: {
    type: String,
    require: true,
  },
 
  profile_image: {
    type: String,
    require: true,
    default:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
  },
  userEmail: {
    type: String,
    require:true,
    
  },
  attendence:{
    type:String,
    require:true,
    default:"A"

  }

  
});


const user = mongoose.model("Users", dataSchema);

module.exports = user;