const express = require('express');
const router = express.Router();
const User = require('../model/User');

router.get('/', async (req,res) => {
    try {
        const data = await User.find();
        res.json(data);
    }
    catch (e) {
        res.status(500).json({ error: e.message });
    }
})
router.get('/:id', async (req,res) => {
    try {
        const data = await User.findById(req.params.id);
        res.json(data);
    }
    catch (e) {
        res.status(500).json({ error: e.message });
    }
})

router.post('/', async (req, res) => {
    const newUser = new User({
        uname: req.body.uname,
        batch: req.body.batch,
        domain: req.body.domain,
        active: req.body.active
    });
    try {
        const data = await newUser.save();
        res.json(data);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
})

router.patch('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        Object.assign(user, req.body);
        const data = await user.save();
        res.json(data);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        await user.deleteOne();
        res.json({ message: 'User deleted successfully' });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
})

module.exports = router;