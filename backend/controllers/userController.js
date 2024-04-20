import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import errorHandler from "../utils/errorHandler.js";
import { User } from "../models/User.js";
import { sendToken } from "../utils/sendToken.js";
import { Course } from "../models/Course.js";

//register user
export const register = catchAsyncError(async (req, res, next) => {
  const { name, email, password,  studentNumber, department, semester } = req.body;
  if (!name || !email || !password || !studentNumber || !department || !semester)
    return next(new errorHandler("Required Fields cannot be empty", 400));
  let user = await User.findOne({
    email,
  });
  if (user) return next(new errorHandler("User already Exist", 409));
  user = await User.create({
    name, email, password, studentNumber, semester, department
  });
  sendToken(res, user, "registered successfully", 201);
});

//login user
export const login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(new errorHandler("Required fields cannot be empty", 400));
  const user = await User.findOne({ email }).select("+password");
  if (!user) return next(new errorHandler("Incorrect Email or  Password", 401));
  if(user.role === "admin"){
    return next(new errorHandler("You are an admin", 401));
  }
  const isMatch = await user.comparePassword(password);
  if (!isMatch)
    return res.status(401).send("Incorrect Email or  Password");
  sendToken(res, user, `Welcome back ${user.name}`, 200);
});

export const adminlogin = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(new errorHandler("Required fields cannot be empty", 400));
  const user = await User.findOne({ email }).select("+password");
  if (!user) return next(new errorHandler("Incorrect Email or  Password", 401));
  const isMatch = await user.comparePassword(password);
  if (!isMatch)
    return next(new errorHandler("Incorrect Email or  Password", 401));
  if(user.role !== "admin"){
    return next(new errorHandler("You are not an admin", 401));
  } 
  sendToken(res, user, `Welcome back ${user.name}`, 200);
});


//logout user
export const logout = catchAsyncError(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
      secure: true,
      sameSite: "none",
    })
    .json({
      success: true,
      message: "Logged Out Successfully",
    });
});

//register user in different courses
export const registerCourse = catchAsyncError(async (req, res, next) => {

try {
  const { userId, courseId } = req.body; // Assuming userId and courseId are sent in the request body
  console.log(userId, courseId);
  // Fetch user and course from the database
  const user = await User.findById(userId);
  const course = await Course.findById(courseId);

  if (!user) {
      return res.status(404).json({ error: 'User not found' });
  }

  if (!course) {
      return res.status(404).json({ error: 'Course not found' });
  }
  if(user.role === "admin"){
    return res.status(401).json({ error: 'Admin cannot register in course' });
  }

  // Check if the user is already registered in the course
  if (user.courses.includes(courseId)) {
      return res.status(400).json({ error: 'User is already registered in the course' });
  }

  // Add the course to the user's list of registered courses
  user.courses.push(courseId);
  await user.save();

  // Optionally, you can also add the user to the course's list of enrolled users
  course.enrolledUsers.push(userId);
  const totalNumberOfUsers = course.enrolledUsers.length;
  user.totalRegisteredUsers = totalNumberOfUsers;
  await course.save();

  return res.status(200).json({ message: 'User registered in the course successfully' });
} catch (error) {
  console.error(error);
  return res.status(500).json({ error: 'Internal server error' });
}
});
//get profile
export const profile = catchAsyncError(async (req, res, next) => {
  const {userId} = req.body;
  const user = await User.findById(userId);
  res.status(200).json({ success: true, data: user});
});

export const deleteUserAccount = catchAsyncError(async (req, res, next) => {
  const userId = req.params.userId;
  const user = await User.findByIdAndDelete(userId);
  if(!user){
    return next(new errorHandler("User not found....", 404));
  }
  res.status(200).json({ success: true, data: user});
});

