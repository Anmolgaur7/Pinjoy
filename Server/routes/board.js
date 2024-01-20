const express = require('express');
const User = require('../models/User')
const Board = require('../models/Board')
const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const boards = await Board.find()
        res.json(boards)
    } catch (error) {
        console.error(error)
    }
})
router.get('/search', async (req, res) => {
    try {
        const boards = await Board.find()
        const search = req.query.search
        const filteredBoards = boards.filter(board => board.Description.includes(search))
        console.log(filteredBoards)
        res.json(filteredBoards)
    } catch (error) {
        console.error(error)
    }
})

router.post('/create', async (req, res) => {
    try {
        console.log(req.body)
        const { Userid, Description, Imageurl } = req.body;
        if (!Userid || !Description || !Imageurl) {
            return res.status(400).json({ msg: "Please enter all fields" })
        }
        const newboard = new Board({
            Userid,
            Description,
            Imageurl
        })
        const savedboard = await newboard.save();
        res.json({
            id: savedboard.id,
            Userid: savedboard.Userid,
            Description: savedboard.Description,
            Imageurl: savedboard.Imageurl
        });
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

module.exports = router;