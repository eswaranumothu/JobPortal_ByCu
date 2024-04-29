const mongoose = require("mongoose");
const jobSchema = new mongoose.Schema({
  jobtitle: {
    type: String,
    required: true,
  },
  companyname: {
    type: String,
    required: true,
  },
  stipend: {
    type: Number,
    required: true,
  },
});

const Job = new mongoose.model("Job", jobSchema);

module.exports = Job;
