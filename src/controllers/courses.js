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
  let query;
  if (bootcampId) {
    query = Course.find({
      bootcamp: bootcampId,
    });
  } else {
    query = Course.find().populate({
      path: "bootcamp",
      select: "name description",
    });
  }
  const courses = await query;

  res.status(200).json({
    success: true,
    message: bootcampId
      ? `Successfully read all courses`
      : `Successfully read all courses by bootcamp id : ${bootcampId}`,
    data: {
      count: courses.length,
      courses,
    },
  });
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
// @route   - POST /api/v1/courses/:bootcampId/courses
// @access - Private
exports.createNewCourseByBootcampId = asyncHandler(async (req, res, next) => {
  req.body.bootcamp = req.params.bootcampId;
  const bootcamp = await Bootcamp.findById(req.params.bootcampId);

  if (!bootcamp) {
    const errorMessage = `Bootcamp not found based on provided id: ${req.params.bootcampId}`;
    return next(new ErrorResponse(errorMessage, 404));
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
// @route   - PUT /api/v1/courses/:id
// @access - Private
exports.deleteCourseById = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    const errorMessage = `Course not found based on provided id: ${req.params.id}`;
    return next(new ErrorResponse(errorMessage, 404));
  }

  await course.remove();

  res.status(200).json({
    success: true,
    message: `Successfully deleted course by id: ${req.params.id}`,
  });
});
