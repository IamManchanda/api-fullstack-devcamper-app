const Bootcamp = require("../models/Bootcamp");

// @desc    - Read all bootcamps.
// @route   - GET /api/v1/bootcamps
// @access - Public
exports.readAllBootcamps = async (req, res, next) => {
  try {
    const bootcamps = await Bootcamp.find();
    if (!bootcamps || bootcamps.length === 0) {
      return res.status(400).json({
        success: false,
        error: {
          message: "Bootcamps list is empty",
        },
      });
    }

    res.status(200).json({
      success: true,
      message: "Successfully read all bootcamps",
      data: { bootcamps },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
};

// @desc    - Read bootcamp by id.
// @route   - GET /api/v1/bootcamps/:id
// @access - Public
exports.readBootcampById = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id);
    if (!bootcamp) {
      return res.status(400).json({
        success: false,
        error: {
          message: "Bootcamp not found",
        },
      });
    }

    res.status(200).json({
      success: true,
      message: "Successfully read bootcamp by id",
      data: { bootcamp },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
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
    res.status(400).json({
      success: false,
      error,
    });
  }
};

// @desc    - Update bootcamp by id.
// @route   - PUT /api/v1/bootcamps/:id
// @access - Public
exports.updateBootcampById = async (req, res, next) => {
  res.status(200).json({
    success: true,
    message: `Update bootcamp by id: ${req.params.id}.`,
  });
};

// @desc    - Delete bootcamp by id.
// @route   - DELETE /api/v1/bootcamps/:id
// @access - Public
exports.deleteBootcampById = async (req, res, next) => {
  res.status(200).json({
    success: true,
    message: `Delete bootcamp by id: ${req.params.id}.`,
  });
};
