const express = require('express');
const router = express.Router();
const Model = require('../models/UserModel');

const jwt = require('jsonwebtoken');
require('dotenv').config();

router.post('/add', (req, res) => {
    console.log(req.body);
    new Model(req.body).save()
        .then((result) => {
            res.json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err)
        });
})

//getall
router.get('/getall', (req, res) => {

    Model.find()
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
})

// : denotes url parameter
router.get('/getbyemail/:email', (req, res) => {

    console.log(req.params.email);
    Model.find({ email: req.params, email })
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

//getbycity
router.get('/getbycity/:city', (req, res) => {

    Model.find({ city: req.params.city })
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);

        });
});

router.get('/getbyid/:id', (req, res) => {
    Model.findById(req.params.id)
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        })
});

router.put('/update/:id', (req, res) => {
    Model.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.delete('/delete/:id', (req, res) => {
    Model.findByIdAndDelete(req.params.id)
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/authenticate', (req, res) => {
    Model.findOne(req.body)
        .then((result) => {

            if (result) {
                // generate token
                const { _id, email, password } = result;
                const payload = { _id, email, password };

                jwt.sign(
                    payload,
                    process.env.JWT_SECRET,
                    { expiresIn: 3600 },
                    (err, token) => {
                        if (err) {
                            console.log(err);
                            res.status(500).json({ message: 'Token Generation Failed' });
                        } else {
                            res.status(200).json({ token: token });
                        }
                    }
                )
            } else {
                res.status(401).json({ message: 'Invalid Credentials' });
            }

        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
})

module.exports = router;