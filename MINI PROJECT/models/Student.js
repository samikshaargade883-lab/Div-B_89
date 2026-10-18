const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    rollNumber: {
      type: String,
      required: true,
      unique: true
    },

    department: {
      type: String,
      required: true
    },

    subject: {
      type: String,
      required: true
    }
  },
  {
  timestamps: false
}
);

module.exports = mongoose.model("Student", studentSchema);