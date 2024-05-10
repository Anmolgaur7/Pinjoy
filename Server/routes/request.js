const express = require('express');
const router = express.Router();

const User = require('../models/User');
const FriendRequest = require('../models/Friendrequest');


router.post('/send-request', async (req, res) => {
    try {
        const { senderId, receiverId } = req.body;
        console.log(senderId, receiverId);
        // Create a new friend request
        const friendRequest = new FriendRequest({
            sender: senderId,
            receiver: receiverId,
            action: 'pending'
        });

        await friendRequest.save();

        res.status(201).json({ message: 'Friend request sent', friendRequest });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Route to get all friend requests for a user

router.post('/get-requests', async (req, res) => {

    try {
        const { userId } = req.body;

        // Find all friend requests where the user is the receiver
        const requests = await FriendRequest.find({ receiver: userId });

        res.status(200).json({ requests });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});
// Route to respond to a friend request
router.post('/respond-request', async (req, res) => {
    try {
        const { requestId, action } = req.body; // `action` should be either 'accept' or 'decline'

        // Find the friend request by ID
        const friendRequest = await FriendRequest.findById(requestId);

        if (!friendRequest) {
            return res.status(404).json({ message: 'Friend request not found' });
        }

        // // Check if the user responding to the request is the receiver
        // if (friendRequest.receiver!== userId) {
        //     return res.status(403).json({ message: 'You are not authorized to respond to this request' });
        // }

        // Handle the action (accept or decline)
        if (action === 'accept') {
            // Update the friend request status to accepted
            friendRequest.status = 'accepted';
            await friendRequest.save();

            // Add each user's ID to the other's friends list
            await User.updateOne(
                { _id: friendRequest.sender },
                { $addToSet: { friends: friendRequest.receiver } }
            );
            
            await User.updateOne(
                { _id: friendRequest.receiver },
                { $addToSet: { friends: friendRequest.sender } }
            );

            res.status(200).json({ message: 'Friend request accepted and friendship established' });
        } else if (action === 'decline') {
            // Update the friend request status to declined
            friendRequest.status = 'declined';
            await friendRequest.save();

            res.status(200).json({ message: 'Friend request declined' });
        } else {
            res.status(400).json({ message: 'Invalid action. Use "accept" or "decline".' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});



module.exports = router;