const { Router } = require("express");
const Song = require('../models/Song');
const auth = require('../middleware/auth.middleware');

const router = Router();

// GET Songs for you
router.get('/recomendation', async (req, res) => {
    try {
        const songs = await Song.find();
        res.json(songs);
    }
    catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так...' });
    }
});

// GET my songs
router.get('/my', auth, async (req, res) => {
    try {
        const songs = await Song.find({ owner: req.user.userId });
        res.json(songs);
    }
    catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так...' });
    }
});

// POST save songs
router.post('/save/:id', auth, async (req, res) => {
    try {
        const song = await Song.findById(req.params.id);

        const userId = req.user.userId;

        let check = await song.owner.map(item => {
            if (item === userId) {
                return true;
            }
            return false;
        });

        if (check) {
            song.owner = song.owner.filter(item => item !== userId);
        }
        song.owner.push(userId);
        
        await song.save();
        
        res.json({ saved: check})
    }
    catch (e) {
        res.status(500).json({ message: 'Что-то пошло не так...' });
    }
});

module.exports = router;