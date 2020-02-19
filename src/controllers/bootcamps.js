const Bootcamp = require("../models/Bootcamp");

// @desc    - Read all bootcamps.
// @route   - GET /api/v1/bootcamps
// @access - Public
exports.readAllBootcamps = async (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "Read all bootcamps.",
  });
};

// @desc    - Read bootcamp by id.
// @route   - GET /api/v1/bootcamps/:id
// @access - Public
exports.readBootcampById = async (req, res, next) => {
  res.status(200).json({
    success: true,
    message: `Read bootcamp by id: ${req.params.id}.`,
  });
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
  } catch ({ errmsg }) {
    res.status(400).json({
      success: false,
      message: errmsg,
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
