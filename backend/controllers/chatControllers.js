const asyncHandler = require("express-async-handler");
const chatModel = require("../models/chatModel");
const userModel = require("../models/userModel");

const accessChat = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    console.log("userId param not send with request");
    return res.status(400).json({ message: "userId param is required" });
  }

  var isChat = await chatModel
    .find({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: req.user._id } } },
        { users: { $elemMatch: { $eq: userId } } },
      ],
    })
    .populate("users", "-password")
    .populate("latestMessage");

  isChat = await userModel.populate(isChat, {
    path: "latestMessage.sender",
    select: "name pic email",
  });

  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],
    };

    try {
      const createdChat = await chatModel.create(chatData);

      const fullChat = await chatModel
        .findOne({ _id: createdChat._id })
        .populate("users", "-password");

      res.status(200).send(fullChat);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  }
});

const fetchChat = asyncHandler(async (req, res) => {
  // .populate("users","-password")
  try {
    chatModel
      .find({ users: { $elemMatch: { $eq: req.user._id } } })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await userModel
          .populate(results, {
            path: "latestMessage.sender",
            select: "name pic email",
          })
          .then((data) => {
            res.status(200).send(data);
            process.exit(1);
          });
      });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const createGroupChat = asyncHandler(async (req, res) => {
  if (!req.body.users || !req.body.name) {
    return res
      .status(400)
      .json({ message: "please fill all the required fields" });
  }

  var users = JSON.parse(req.body.users);

  if (users.length < 2) {
    return res
      .status(400)
      .json({ message: "Group chat should have at least 2 members" });
  }
  users.push(req.user);

  try {
    const groupChat = await chatModel.create({
      chatName: req.body.name,
      isGroupChat: true,
      users: users,
      groupAdmin: req.user._id,
    });

    const fullGroupChat = await chatModel
      .findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).send(fullGroupChat);
  } catch (error) {
    res.status(400);
    throw new Error("Error: " + error.message);
  }
});

const renameGroup = asyncHandler(async (req, res) => {
  const { chatId, chatName } = req.body;

  const updateChat = await chatModel
    .findOneAndUpdate({ _id: chatId }, { chatName }, { new: true })
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!updateChat) {
    return res.status(400).json({ message: "Chat not found" });
  } else {
    res.json(updateChat);
  }
});

const addToGroup = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;

  const added = await chatModel
    .findOneAndUpdate(
      { _id: chatId },
      { $push: { users: userId } },
      { new: true }
    )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!added) {
    return res.status(400).json({ message: "Chat not found" });
  } else {
    res.json(added);
  }
});

const removeFromGroup = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;

  const removed = await chatModel
    .findOneAndUpdate(
      { _id: chatId },
      { $pull: { users: userId } },
      { new: true }
    )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!removed) {
    return res.status(400).json({ message: "Chat not found" });
  } else {
    res.json(removed);
  }
});

module.exports = {
  accessChat,
  fetchChat,
  createGroupChat,
  renameGroup,
  addToGroup,
  removeFromGroup,
};
