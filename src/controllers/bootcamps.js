const Bootcamp = require("../models/Bootcamp");
const ErrorResponse = require("../utils/ErrorResponse");

// @desc    - Read all bootcamps.
// @route   - GET /api/v1/bootcamps
// @access - Public
exports.readAllBootcamps = async (req, res, next) => {
  try {
    const bootcamps = await Bootcamp.find();

    if (!bootcamps || bootcamps.length === 0) {
      const errorMessage = "Bootcamps list is empty";
      return next(new ErrorResponse(errorMessage, 404));
    }

    res.status(200).json({
      success: true,
      message: "Successfully read all bootcamps",
      data: { count: bootcamps.length, bootcamps },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    - Read bootcamp by id.
// @route   - GET /api/v1/bootcamps/:id
// @access - Public
exports.readBootcampById = async (req, res, next) => {
  try {
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
  } catch (error) {
    next(error);
  }
};

// @desc    - Create new bootcamp.
// @route   - POST /api/v1/bootcamps/
// @access - Public
exports.createNewBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.create(req.body);
    res.status(201).json({
      success: true,
      message: "Successfully created new bootcamp",
      data: { bootcamp },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    - Update bootcamp by id.
// @route   - PUT /api/v1/bootcamps/:id
// @access - Public
exports.updateBootcampById = async (req, res, next) => {
  try {
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
  } catch (error) {
    next(error);
  }
};

// @desc    - Delete bootcamp by id.
// @route   - DELETE /api/v1/bootcamps/:id
// @access - Public
exports.deleteBootcampById = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

    if (!bootcamp) {
      const errorMessage = `Bootcamp not found based on provided id: ${req.params.id}`;
      return next(new ErrorResponse(errorMessage, 404));
    }

    res.status(200).json({
      success: true,
      message: `Successfully deleted bootcamp by id: ${req.params.id}`,
    });
  } catch (error) {
    next(error);
  }
};
