import mongoose from "mongoose";

const seminarSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  // username: {
  //   type: String,
  //   required: true,
  // },
  seminarDate: {
    type: String,
    required: true,
  },
  seminarTime: {
    type: String,
    required: true,
  },
  seminarLocation: {
    type: String,
    required: true,
  },
  seminarLocationDis: {
    type: String,
    required: true,
  },
  seminarDescription: {
    type: String,
    required: true,
  },


});

const seminarModel = mongoose.model("Seminar", seminarSchema);

export default seminarModel;
