const express = require('express');
const cors = require('cors');
const User = require('../models/User');
const Board = require('../models/Board');

const router = express.Router();

// Allow requests from all origins
router.use(cors());

router.get('/', async (req, res) => {
    try {
        const boards = await Board.find();
        res.json(boards);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
});

router.get('/search', async (req, res) => {
    try {
        const boards = await Board.find();
        const search = req.query.search;
        const filteredBoards = boards.filter(board => board.Description.includes(search));
        console.log(filteredBoards);
        res.json(filteredBoards);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
});

router.post('/create', async (req, res) => {
    try {
        console.log(req.body);
        const { Userid, Description, Imageurl } = req.body;
        if (!Userid || !Description || !Imageurl) {
            return res.status(400).json({ msg: 'Please enter all fields' });
        }
        const newboard = new Board({
            Userid,
            Description,
            Imageurl
        });
        const savedboard = await newboard.save();
        res.json({
            id: savedboard.id,
            Userid: savedboard.Userid,
            Description: savedboard.Description,
            Imageurl: savedboard.Imageurl
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
});

router.post('/update', async (req, res) => {
    try {
        const { id, Comments } = req.body;
        // Find the board by its ID
        const board = await Board.findOne({ _id: id });
        if (!board) {
            return res.status(404).json({ msg: 'Board not found' });
        }
        // Update the comments of the board
        board.Comments = Comments;
        // Save the updated board
        const updatedBoard = await board.save();

        res.json(updatedBoard);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
});



router.delete('/delete', async (req, res) => {
    try {
        const { id } = req.body;

        // Find the board by its ID and uploader ID
        const board = await Board.findOne({ _id: id });

        // Check if the board exists
        if (!board) {
            return res.status(404).json({ msg: 'Board not found or unauthorized' });
        }

        // Remove the board
        await board.deleteOne();

        res.status(200).json({ msg: 'Board removed' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' + error });
    }
});


module.exports = router;
