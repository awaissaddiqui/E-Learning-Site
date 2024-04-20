import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import crypto from "crypto";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select:false,
  },
  role: {
    type: String,
    enum: ['Admin', 'Student'],
    default:"Student",
  },
  studentNumber:{
    type: Number,
    required:true,
  },
  semester: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  registeredCourses: [
    {
      course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
      userId: String,
      courseId: String,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const hashedPassword = await bcrypt.hash(this.password, 12);
  this.password = hashedPassword;
  next();
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
userSchema.methods.getJWTToken = function () {
  //send to utility function
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });
};
//reset token //same as the otp, dont get confused with cookie token.
userSchema.methods.getResetToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");
  this.resetPasswordToken = crypto
    .createHash("sha256") //sha256 is some algorithm
    .update(resetToken)
    .digest("hex");
  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // 15 minutes
  return resetToken;
};
export const User = mongoose.model("User", userSchema);
