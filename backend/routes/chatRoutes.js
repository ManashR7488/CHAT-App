const express = require("express");
const { isLoggedIn } = require("../middleware/isLoggedIn");
const {
  accessChat,
  fetchChat,
  createGroupChat,
  renameGroup,
  addToGroup,
  removeFromGroup,
} = require("../controllers/chatControllers");

const router = express.Router();

router.route("/").post(isLoggedIn, accessChat).get(isLoggedIn, fetchChat);
// .get(isLoggedIn,fetchChat);
router.route("/group").post(isLoggedIn, createGroupChat);
router.route("/rename").put(isLoggedIn, renameGroup);
router.route('/groupAdd').put(isLoggedIn, addToGroup);
router.route('/groupRemove').put(isLoggedIn, removeFromGroup);

module.exports = router;
