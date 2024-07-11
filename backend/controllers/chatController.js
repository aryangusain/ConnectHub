const expressAsyncHandler = require('express-async-handler');
const Chat = require('../models/chatModel');
const User = require('../models/userModel');

const accessChat = expressAsyncHandler( async(req, res) => {
    const { userId } = req.body;

    if(!userId) {
        console.log("userId not sent with request");
        return res.sendStatus(400);
    }

    let isChat = await Chat.find({
        $and: [
            {users: {$elemMatch: {$eq: req.user._id}}},
            {users: {$elemMatch: {$eq: userId}}},
        ],
    }).populate("users", "-password").populate("lastMessage");

    isChat = await User.populate(isChat, {
        path: 'lastMessage.sender',
        select: 'name image email',
    });

    if(isChat.length > 0) {
        res.send(isChat[0]);
    }
    else {
        let chatData = {
            chatName: "sender",
            users: [req.user._id, userId],
        };

        try {
            const createdChat = await Chat.create(chatData);

            const FullChat = await Chat.findOne({_id: createdChat._id}).populate(
                "users",
                "-password"
            )

            res.status(200).json(FullChat);
        }
        catch(err) {
            throw new Error(err);
        }
    }
})


const fetchChats = expressAsyncHandler( async(req, res) => {
    try {
        Chat.find({users: {$elemMatch: {$eq: req.user._id}}})
        .populate("users", "-password")
        .populate("lastMessage")
        .sort({updatedAt: -1})
        .then(async (results) => {
            results = await User.populate(results, {
                path: "lastMessage.sender",
                select: "name image email",
            });

            res.status(200).send(results);
        });
    }
    catch(err) {
        res.status(400);
        throw new Error(err);
    }
})


module.exports = { accessChat, fetchChats };