const express = require('express');

const router = express.Router();

// Audio Model
const Audio = require('../../models/Audio.js');

// @route 	GET api/audio
// @desc 	Get all audio
// @access	Public
router.get('/', (req, res) => {
	Audio.find()
		.then(docs => res.json(docs))
});

// @route 	POST api/audio
// @desc 	Create an Audio
// @access	Public
router.post('/', (req, res) => {
	const newAudio = new Audio({
		name: req.body.name
	});

	newAudio.save().then(doc => res.json(doc));
	console.log("Success");
});

// @route 	DELETE api/audio/:id
// @desc 	Delete an Audio
// @access	Public
router.delete('/:id', (req, res) => {
	Audio.findById(req.params.id)
	.then(doc => doc.remove().then(() => res.json({ success: true })))
	.catch(err => res.status(404).json({ success: false }))
});

module.exports = router;