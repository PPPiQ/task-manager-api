const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const User = require('../models/user');
const auth = require('../middleware/auth');
const router = new express.Router();

router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.remove();
        res.send(user)
    } catch (error) {
        res.status(400).send(error);
    }
})

router.post('/users', async (req, res) => {
    const user = new User(req.body);
    // user.save().then(() => {
    //     res.status(201).send(user);
    // }).catch((e) => {
    //     res.status(400).send(e);
    // })
    try {
        await user.save();
        const token = await user.generateAuthToken();
        res.send({ user, token });
    } catch (error) {
        console.log("Save user failed.");
        res.status(400).send(error);
    }
});

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();

        res.send({ user, token })
    } catch (error) {
        res.status(400).send(error);
    }
})

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save()

        res.status(200).send()
    } catch (error) {
        res.status(500).send();
    }
})

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        })
        await req.user.save()

        res.send()
    } catch (error) {
        res.status(500).send();
    }
})

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})

router.get('/users/:id', auth, async (req, res) => {
    const _id = req.params.id;
    try {
        const user = await User.findById(_id);
        if (!user) {
            return res.status(404).send('Error! No users');
        }
        res.status(201).send(user);
    } catch (error) {
        res.status(500).send();
    }
    // User.findById(_id).then((users) => {
    //     if (!users) {
    //         return res.status(404).send('Error! No users');
    //     }
    //     res.status(201).send(users);
    // }).catch((e) => {
    //     res.status(400).send(e)
    // })
})



router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const isValidOpeatiton = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOpeatiton) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }
    try {

        updates.forEach(update => req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user);
    } catch (error) {
        res.status(400).send(error)
    }
})

const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload a picture in jpg or jpeg or png'));
        }
        cb(undefined, true);
        // cb( new Error ('File must be a PDF'))
        // cb(undefined, true),
        // cb(undefined, false)
    }
});

router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer();
    req.user.avatar = buffer;

    await req.user.save();
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

router.delete('/users/me/avatar', auth, async (req, res) => {
    req.user.avatar = undefined;
    await req.user.save();
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

router.get('/users/:id/avatar', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if(!user || !user.avatar) {
            throw new Error()
        }

        res.set('Content-Type', 'image/png');
        res.send(user.avatar);
    } catch (e) {
        res.status(404).send()
    }
})


// const multer = require('multer');
// const upload = multer({ dest: 'images' });
// app.post('/upload', upload.single('upload'), (req, res) => {
//     res.send()
// });


module.exports = router;

