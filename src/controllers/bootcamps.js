const Bootcamp = require("../models/Bootcamp");
const ErrorResponse = require("../utils/ErrorResponse");
const geocoder = require("../utils/geocoder");
const asyncHandler = require("../middlewares/async");

// @desc    - Read all bootcamps.
// @route   - GET /api/v1/bootcamps
// @access - Public
exports.readAllBootcamps = asyncHandler(async (req, res, next) => {
  let query;
  let queryString = JSON.stringify(req.query);
  queryString = queryString.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    match => `$${match}`,
  );
  query = Bootcamp.find(JSON.parse(queryString));
  const bootcamps = await query;

  res.status(200).json({
    success: true,
    message: "Successfully read all bootcamps",
    data: {
      count: bootcamps.length,
      bootcamps,
    },
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
// @access - Public
exports.createNewBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.create(req.body);
  res.status(201).json({
    success: true,
    message: "Successfully created new bootcamp",
    data: { bootcamp },
  });
});

// @desc    - Update bootcamp by id.
// @route   - PUT /api/v1/bootcamps/:id
// @access - Public
exports.updateBootcampById = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!bootcamp) {
    const errorMessage = `Bootcamp not found based on provided id: ${req.params.id}`;
    return next(new ErrorResponse(errorMessage, 404));
  }

  res.status(200).json({
    success: true,
    message: `Successfully updated bootcamp by id: ${req.params.id}`,
    data: { bootcamp },
  });
});

// @desc    - Delete bootcamp by id.
// @route   - DELETE /api/v1/bootcamps/:id
// @access - Public
exports.deleteBootcampById = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

  if (!bootcamp) {
    const errorMessage = `Bootcamp not found based on provided id: ${req.params.id}`;
    return next(new ErrorResponse(errorMessage, 404));
  }

  res.status(200).json({
    success: true,
    message: `Successfully deleted bootcamp by id: ${req.params.id}`,
  });
});
