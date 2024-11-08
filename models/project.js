const mongoose = require("mongoose");

const { taskSchema } = require("./task");
const schema = mongoose.Schema;

const projectSchema = new schema({
  title: {
    type: String,
    required: true,
  },
  pid: {
    type: String,
    required: true,
  },
  tasks: {
    type: [String],
    default: [],
  },
});

module.exports = mongoose.model("projectSchema", projectSchema);
