const mongoose = require("mongoose");

const projectsSchema = new mongoose.Schema({
  name: String,
  description: String,
  completed: {
    type: Boolean,
    default: false,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

// projects Schema model
const Projects = new mongoose.model("projects", projectsSchema);

module.exports = Projects;
