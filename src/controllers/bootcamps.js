const path = require("path");
const Bootcamp = require("../models/Bootcamp");
const ErrorResponse = require("../utils/ErrorResponse");
const geocoder = require("../utils/geocoder");
const asyncHandler = require("../middlewares/async");

const { FILE_UPLOAD_PATH, MAX_FILE_UPLOAD_SIZE } = process.env;

// @desc    - Read all bootcamps.
// @route   - GET /api/v1/bootcamps
// @access - Public
exports.readAllBootcamps = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    message: "Successfully read all bootcamps",
    ...res.advancedResults,
  });
});

// @desc    - Read all bootcamps by distance.
// @route   - GET /api/v1/bootcamps/radius/:zipcode/:distance
// @access - Public
exports.readAllBootcampsByDistance = asyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.params;
  const loc = await geocoder.geocode(zipcode);
  const { latitude: lat, longitude: lng } = loc[0];
  // Earth Radius: 3958.8 mi / 6371 km
  const radius = distance / 3958.8;
  const bootcamps = await Bootcamp.find({
    location: {
      $geoWithin: {
        $centerSphere: [[lng, lat], radius],
      },
    },
  });
  res.status(200).json({
    success: true,
    message: `Successfully read all bootcamps by zipcode: ${zipcode} & distance: ${distance}`,
    data: {
      count: bootcamps.length,
      bootcamps,
    },
  });
});

// @desc    - Read bootcamp by id.
// @route   - GET /api/v1/bootcamps/:id
// @access - Public
exports.readBootcampById = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);

  if (!bootcamp) {
    const errorMessage = `Bootcamp not found based on provided id: ${req.params.id}`;
    return next(new ErrorResponse(errorMessage, 404));
  }

  res.status(200).json({
    success: true,
    message: `Successfully fetched bootcamp by id: ${req.params.id}`,
    data: { bootcamp },
  });
});

// @desc    - Create new bootcamp.
// @route   - POST /api/v1/bootcamps/
// @access - Private
exports.createNewBootcamp = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.id;
  const publishedBootcamp = await Bootcamp.findOne({ user: req.user.id });

  if (publishedBootcamp && req.user.role !== "admin") {
    const errorMessage = `User with id ${req.user.id} has already published a bootcamp`;
    return next(new ErrorResponse(errorMessage, 400));
  }

  const bootcamp = await Bootcamp.create(req.body);
  res.status(201).json({
    success: true,
    message: "Successfully created new bootcamp",
    data: { bootcamp },
  });
});

// @desc    - Update bootcamp by id.
// @route   - PUT /api/v1/bootcamps/:id
// @access - Private
exports.updateBootcampById = asyncHandler(async (req, res, next) => {
  let bootcamp = await Bootcamp.findById(req.params.id);

  if (!bootcamp) {
    const errorMessage = `Bootcamp not found based on provided id: ${req.params.id}`;
    return next(new ErrorResponse(errorMessage, 404));
  }

  bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    message: `Successfully updated bootcamp by id: ${req.params.id}`,
    data: { bootcamp },
  });
});

// @desc    - Upload photo for bootcamp by id.
// @route   - PUT /api/v1/bootcamps/:id/photo
// @access - Private
exports.uploadPhotoForBootcampById = asyncHandler(async (req, res, next) => {
  let bootcamp = await Bootcamp.findById(req.params.id);

  if (!bootcamp) {
    const errorMessage = `Bootcamp not found based on provided id: ${req.params.id}`;
    return next(new ErrorResponse(errorMessage, 404));
  }

  if (!req.files) {
    const errorMessage = `Please upload a file to a bootcamp with id: ${req.params.id}`;
    return next(new ErrorResponse(errorMessage, 400));
  }

  const { file } = req.files;

  if (!file.mimetype.startsWith("image")) {
    const errorMessage = "Please upload an image file";
    return next(new ErrorResponse(errorMessage, 400));
  }

  if (file.size > MAX_FILE_UPLOAD_SIZE) {
    const errorMessage = `Please upload an image less than ${MAX_FILE_UPLOAD_SIZE}`;
    return next(new ErrorResponse(errorMessage, 400));
  }

  const date = new Date();
  const timestamp = date.getTime();

  file.name = `photo_${bootcamp._id}_${timestamp}${path.parse(file.name).ext}`;
  file.mv(
    `${FILE_UPLOAD_PATH}/${file.name}`,
    async function fileUploadErrorHandler(error) {
      if (error) {
        console.error(error);
        const errorMessage =
          "Server Error: Problem with file upload. Please try again.";
        return next(new ErrorResponse(errorMessage, 500));
      }

      await Bootcamp.findByIdAndUpdate(req.params.id, {
        photo: file.name,
      });

      res.status(200).json({
        success: true,
        message: `Photo Successfully uploaded to bootcamp by id: ${req.params.id}`,
        data: { photo: file.name },
      });
    },
  );

  console.log(file);
});

// @desc    - Delete bootcamp by id.
// @route   - DELETE /api/v1/bootcamps/:id
// @access - Private
exports.deleteBootcampById = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);

  if (!bootcamp) {
    const errorMessage = `Bootcamp not found based on provided id: ${req.params.id}`;
    return next(new ErrorResponse(errorMessage, 404));
  }

  bootcamp.remove();

  res.status(200).json({
    success: true,
    message: `Successfully deleted bootcamp by id: ${req.params.id}`,
  });
});
