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
  const isMatch = await user.comparePassword(password);
  if (!isMatch)
    return next(new errorHandler("Incorrect Email or  Password", 401));
  if(user.role === "admin"){
    return next(new errorHandler("You are an admin", 401));
  }
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

//register user
export const registerCourse = catchAsyncError(async (req, res, next) => {
  const { _id, uuid } = req.body;
  // console.log(uuid);
  const {user} = req;

  
  let course = await Course.findOne({
    _id,
  });
  if (!course)  
  return next(new errorHandler("Course does not exist", 404));

  let registerUserInCourse = await User.findOne({
    registeredCourses: {
      $elemMatch: {
        userId: uuid,
      },
    },
  });

  if (registerUserInCourse === null) {
    return next(new errorHandler("You have already registered for this course", 400));
  }

  const newUser = {
    course: course._id,
    userId: uuid,
  };
  user.registeredCourses.push(newUser);
  console.log(newUser);

  // user.registeredCourses.push({
  //   course: course._id,
  //   userId: uuid,
  // });
  // console.log(user.registeredCourses);
  sendToken(res, user, " course registered successfully", 201);
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

