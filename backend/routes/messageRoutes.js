const express = require("express");
const {allMessagesController, sendMessageController} = require("../controllers/messageController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/:chatId").get(protect, allMessagesController);
router.route("/").post(protect, sendMessageController);

module.exports = router;