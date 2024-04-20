import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { Course } from "../models/Course.js";
import errorHandler from "../utils/errorHandler.js";

// Register a new course
export const create = catchAsyncError(async (req, res, next) => {
    const {
      courseId,
      title,
      subjectArea,
      description,
      preRequisites,
      toolsOrSoftwares,
      externalMaterial,
      paragraphs,
    } = req.body;
   if (
      !courseId ||
      !title ||
      !subjectArea ||
      !description ||
      !preRequisites ||
      !toolsOrSoftwares ||
      !externalMaterial ||
      !paragraphs
    ) {
        return next(new errorHandler("Required Fields cannot be empty", 400));
    }

    // Check if the course already exists
    let existingCourse = await Course.findOne({ courseId });
    if (existingCourse) {
        return next(new errorHandler("Course already exists", 400));
    }

    // Create the new course
    const newCourse = new Course({
      courseId,
      title,
      subjectArea,
      description,
      preRequisites,
      toolsOrSoftwares,
      externalMaterial,
      paragraphs,
    });

    // Save the course to the database
    await newCourse.save();

    // Return success response
    res.status(201).json({ success: true, data: newCourse });
});

export const get = catchAsyncError(async(req,res,next)=>{
   const courses = await Course.find();
   res.status(200).json({ success: true, data: courses });
})

export const getSingleCourse = catchAsyncError(async(req,res,next)=>{

  const course = await Course.findById(req.params._id);
  if(!course){
    return next(new errorHandler("Course not found", 404));
  }
  res.status(200).json({ success: true, data: course });
})