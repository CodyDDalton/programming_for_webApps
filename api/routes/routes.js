const express = require('express');
const routes = express.Router();
const User = require('../model/user');
const bcrypt = require('bcrypt');

routes.post('/signup', (req, res) => {
    const hash = bcrypt.hash(req.body.password, 10, (err, hash) =>{
        if(err){
            res.status(500).json({
                message:err.message,
            })
        }
        else{
            console.log(hash)
            const hashpass = hash

    User.find({email: req.body.email})
        .exec()
        .then(result => {
            if(result.length > 0){
                return res.status(409).json({
                    message: 'There is already a user from that email. Try logging in.'
                })
            } else {
                
                
                const newUser = new User({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    address: req.body.address,
                    city: req.body.city,
                    state: req.body.state,
                    zip: req.body.zip,
                    email: req.body.email,
                    password: hashpass,
                })

                newUser.save()
                    .then(result => {
                        console.log(result);
                        res.status(200).json({
                            message: "You're all signed up, "+result.firstName+"! You may now log in.",
                            user:{
                                firstName: result.firstName,
                                lastName: result.lastName,
                                address: result.address,
                                city: result.city,
                                state: result.state,
                                zip: result.zip,
                                email: result.email,
                                password: result.password,
                            
                            },
                            metadata:{
                                method: req.method,
                            },
                        })
                    })
                    .catch(err => {
                        console.error(err.message);
                        res.status(500).json({
                            error:{
                                message: 'Unable to complete signup. Sorry for the inconvenience.',
                            }
                        })
                    })
                }
                })
            }
        })

});

routes.post('/login', (req, res) => {

    User.find({email:req.body.email})
        .exec()
            .then(result => {
            if(result.length > 0){
                const userPass = result[0].password;
                console.log(userPass)
                bcrypt.compare(req.body.password, userPass, (err, result)=>{
                    if(err){
                        return res.status(501).json({
                            message:err.message
                        })
                    }
                    if(result){
                        res.status(200).json({
                            message: "Authorization Successful",
                            result: result,
                        });
                    }
                    else {
                        res.status(401).json({
                            message:"Authorization Failed",
                            result: result,
                        });
                    }
                })
            } else {
                res.status(400).json({
                    message:'No account is registered under the email: '+req.body.email+" ",
                })
            }
        })
});

routes.get('/profile', (req, res, next) => {
    User.find()
        .exec()
        .then(result => {
            res.status(200).json({
                result:result
        })
        })
});

module.exports = routes;