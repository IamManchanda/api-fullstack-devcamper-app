const Course = require("../models/Course");
const Bootcamp = require("../models/Bootcamp");
const ErrorResponse = require("../utils/ErrorResponse");
const asyncHandler = require("../middlewares/async");

// @desc    - Read all courses or Read all courses by bootcamp id.
// @route   - GET /api/v1/courses
// @route   - GET /api/v1/bootcamps/:bootcampId/courses
// @access - Public
exports.readAllCourses = asyncHandler(async (req, res, next) => {
  const { bootcampId } = req.params;
  if (bootcampId) {
    const courses = await Course.find({
      bootcamp: bootcampId,
    });
    res.status(200).json({
      success: true,
      message: `Successfully read all courses by bootcamp id : ${bootcampId}`,
      data: {
        count: courses.length,
        courses,
      },
    });
  } else {
    res.status(200).json({
      message: "Successfully read all courses",
      ...res.advancedResults,
    });
  }
});

// @desc    - Read course by id.
// @route   - GET /api/v1/courses/:id
// @access - Public
exports.readCourseById = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id).populate({
    path: "bootcamp",
    select: "name description",
  });

  if (!course) {
    const errorMessage = `Course not found based on provided id: ${req.params.id}`;
    return next(new ErrorResponse(errorMessage, 404));
  }

  res.status(200).json({
    success: true,
    message: `Successfully fetched course by id: ${req.params.id}`,
    data: { course },
  });
});

// @desc    - Create new course by bootcamp id.
// @route   - POST /api/v1/bootcamps/:bootcampId/courses
// @access - Private
exports.createNewCourseByBootcampId = asyncHandler(async (req, res, next) => {
  req.body.bootcamp = req.params.bootcampId;
  req.body.user = req.user.id;
  const bootcamp = await Bootcamp.findById(req.params.bootcampId);

  if (!bootcamp) {
    const errorMessage = `Bootcamp not found based on provided id: ${req.params.bootcampId}`;
    return next(new ErrorResponse(errorMessage, 404));
  }

  if (bootcamp.user.toString() !== req.user.id && req.user.role !== "admin") {
    const errorMessage = `User: ${req.user.id} is not authorized to add a course to ${bootcamp._id}`;
    return next(new ErrorResponse(errorMessage, 401));
  }

  const course = await Course.create(req.body);

  res.status(201).json({
    success: true,
    message: `Successfully created new course by bootcamp id : ${req.params.bootcampId}`,
    data: { course },
  });
});

// @desc    - Update course by id.
// @route   - PUT /api/v1/courses/:id
// @access - Private
exports.updateCourseById = asyncHandler(async (req, res, next) => {
  let course = await Course.findById(req.params.id);

  if (!course) {
    const errorMessage = `Course not found based on provided id: ${req.params.id}`;
    return next(new ErrorResponse(errorMessage, 404));
  }

  if (course.user.toString() !== req.user.id && req.user.role !== "admin") {
    const errorMessage = `User: ${req.user.id} is not authorized to update this course`;
    return next(new ErrorResponse(errorMessage, 401));
  }

  course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    message: `Successfully updated course by id: ${req.params.id}`,
    data: { course },
  });
});

// @desc    - Delete course by id.
// @route   - DELETE /api/v1/courses/:id
// @access - Private
exports.deleteCourseById = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    const errorMessage = `Course not found based on provided id: ${req.params.id}`;
    return next(new ErrorResponse(errorMessage, 404));
  }

  if (course.user.toString() !== req.user.id && req.user.role !== "admin") {
    const errorMessage = `User: ${req.user.id} is not authorized to delete this course`;
    return next(new ErrorResponse(errorMessage, 401));
  }

  await course.remove();

  res.status(200).json({
    success: true,
    message: `Successfully deleted course by id: ${req.params.id}`,
  });
});
