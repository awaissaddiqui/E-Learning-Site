import mongoose from "mongoose";
const Schema = mongoose.Schema;
const courseSchema = new Schema({
  courseId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  subjectArea: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  preRequisites: {
    type: String,
    required: true,
  },
  toolsOrSoftwares: {
    type: String,
    required: true,
  },
  externalMaterial: {
    type: String,
    required: true,
  },

  paragraphs:{
    type: [String],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});
export const Course = mongoose.model("Course", courseSchema);