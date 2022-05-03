const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes');

// Create A Note
router.post('/addnote', fetchuser, async (req, res) => {
    if (!req.body.title || !req.body.description) {
        res.status(400).send("Title And Description Cannot Be Empty!!!");
    }
    else {
        try {
            const { title, description, tag } = req.body;
            const note = await Notes.create({
                user: req.user,
                title: title,
                description: description,
                tag: tag
            });
            res.status(200).json(note);
        } catch (error) {
            res.status(400).send(error.message);
        }
    }
})

// Read All Note
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user });
        res.status(200).json(notes);
    } catch (error) {
        res.status(400).send(error.message);
    }
})


// Update a Note
router.patch('/updatenote/:id', fetchuser, async (req, res) => {
    try {
        const note = await Notes.findOneAndUpdate({ _id: req.params.id, user: req.user }, req.body, { new: true, runValidators: true });
        if (!note) {
            res.status(400).send("Some Internal Error Occured!!!");
        }
        else {
            res.status(200).json(note);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
})


// Delete a Note
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        const note = await Notes.findOneAndDelete({ _id: req.params.id, user: req.user });
        if (!note) {
            res.status(400).send("Some Internal Error Occured!!!");
        }
        else {
            res.status(200).json(note);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
})


module.exports = router;