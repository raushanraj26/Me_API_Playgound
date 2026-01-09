const mongoose = require("mongoose");

const WorkSchema = new mongoose.Schema({
  company: String,
  role: String,
  duration: String
});

const ProjectSchema = new mongoose.Schema({
  title: String,
  description: String,
  links: [String]
});

const ProfileSchema = new mongoose.Schema({
  name: String,
  email: String,
  education: String,

  skills: {
    type: [String],
    default: []
  },

  projects: {
    type: [ProjectSchema],
    default: []
  },

  work: {
    type: [WorkSchema],
    default: []
  },

  links: {
    github: String,
    linkedin: String,
    portfolio: String
  }
});

module.exports = mongoose.model("Profile", ProfileSchema);
