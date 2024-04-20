import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ratingSchema = new Schema({
  user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
  },
  course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true
  },
  rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
  }
});

export const Rating = mongoose.model('Rating', ratingSchema);

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
  ratings: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Rating" 
  }],
  averageRating: {
    type: Number,
    default: 0,
  },
  totalReviews: {
    type: Number,
    default: 0,
  },
  enrolledUsers: [
    {
       type: mongoose.Schema.Types.ObjectId,
        ref: "User" 
      }
    ],
  totalRegisteredUsers: {
    type: Number,
    default: 0,
  },
  paragraphs: {
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


