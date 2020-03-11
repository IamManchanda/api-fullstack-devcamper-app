const { Router } = require("express");

const {
  readAllUsers,
  readUserById,
  createNewUser,
  updateUserById,
  deleteUserById,
} = require("../controllers/users");

const User = require("../models/User");
const advancedResults = require("../middlewares/advanced-results");
const { protect, authorize } = require("../middlewares/auth");

const usersRoute = Router({ mergeParams: true });
usersRoute.use(protect);
usersRoute.use(authorize("admin"));

usersRoute
  .route("/")
  .get(advancedResults(User), readAllUsers)
  .post(createNewUser);

usersRoute
  .route("/:id")
  .get(readUserById)
  .put(updateUserById)
  .delete(deleteUserById);

module.exports = usersRoute;
