const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  skills: {
    type: [String],
    default: []
  },
  projects: {
    type: Array,
    default: []
  }
});

module.exports = mongoose.model("Profile", ProfileSchema); //creating Profile model and exporting it
