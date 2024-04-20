import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { Course , Rating } from "../models/Course.js";
import { User } from "../models/User.js";
import errorHandler from "../utils/errorHandler.js";

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

    let existingCourse = await Course.findOne({ courseId });
    if (existingCourse) {
        return next(new errorHandler("Course already exists", 400));
    }

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

    await newCourse.save();

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

// Rating a course
export const ratingStar = async(req,res,next)=>{

  try {
    const { courseId, userId, ratingValue } = req.body; 
   
    // think about this part
    const registeredUser = await User.findById(userId).populate('courses');
    if (!registeredUser) {
        return res.status(404).json({ error: 'User not found' });
    }
    if(registeredUser.role === "admin"){
      return res.status(401).json({ error: 'Admin cannot rate a course' });
  }
    if (ratingValue < 1 || ratingValue > 5) {
        return res.status(400).json({ error: 'Invalid rating value. Rating value must be between 1 and 5.' });
    }

    const existingRating = await Rating.findOne({ user: userId, course: courseId });
    if (existingRating) {
        return res.status(400).send('You have already rated this course');
    }

    const newRating = new Rating({
        user: userId,
        course: courseId,
        rating: ratingValue
    });
   

    await newRating.save();
    const course = await Course.findById(courseId);

     course.ratings.push(newRating._id);

    const existingRatings = await Rating.find({ course: courseId });
    const totalRatings = existingRatings.length;
    let totalRatingValue = 0;
    for (let i = 0; i < totalRatings; i++) {
        totalRatingValue += existingRatings[i].rating;
    }
    const averageRating = totalRatingValue / totalRatings;
    
    course.averageRating = averageRating;

    const totalReviews = course.ratings.length;
    course.totalReviews = totalReviews;
    await course.save();

    return res.status(200).send('Rating submitted successfully');
} catch (error) {
    console.error(error);
    return res.status(500).send(error.message+ 'Internal server error');
    // json({ error: 'Internal server error' });
}

};