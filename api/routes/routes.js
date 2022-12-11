const express = require('express');
const routes = express.Router();
const User = require('../model/user');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const { findUser, saveUser } = require('../db/db');
const jwt = require('jsonwebtoken');

routes.post('/signup', (req, res) => {
findUser(req.body.email)
    .then(result => {
        if(result.length > 0){
        return res.status(409).json({
            message:"An account belonging to "+req.body.email+" already exists. Try logging in."
        })
    }
    else {
        const password = bcrypt.hash(req.body.password, 10, (err, hash) => {
            if(err){
                res.status(500).json({
                    message:err.message,
                })
            }
            else{
                const newUser = new User({
                    _id:mongoose.Types.ObjectId(),
                    firstName:req.body.firstName,
                    lastName:req.body.lastName,
                    address:req.body.address,
                    city:req.body.city,
                    state:req.body.state,
                    zip:req.body.zip,
                    email:req.body.email,
                    password:hash,
                });
                saveUser(newUser)
                .then(result => {
                    res.status(200).json({
                        user: result
                    });
                    console.log(result);
                })
                .catch(err => {
                    if(err){
                        res.status(500).json({
                            message:err.message,
                        })
                    }
                });
            }
        })
        
    }
}) 

});

routes.post('/login', (req, res) => {

    findUser(req.body.email)
            .then(result => {
                if(result.length >! 0){
                    res.status(500).json({
                        message:'We could not find an account belonging to email: '+req.body.email,
                    });
                }
                else {
                    bcrypt.compare(req.body.password, result[0].password, (err, result)=>{
                        if(err){
                            return res.status(501).json({
                                message:err.message
                            });
                        }
                        if(result){
                            const token = jwt.sign({ 
                                email:result.email,
                                password:result.password,
                            })
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
                    });
                }
            })
            .catch(err => {
                if(err){
                    res.status(500).json({
                        message:err.message,
                    })
                }
            })
});

routes.get('/profile', (req, res, next) => {

    try{
        const token = req.headers.authorization.split(' ')[0];
        const decoded = jwt.verify(token, process.env.jwt_key, (err, verified)=>{
            if(err){
                res.status(500).json({
                    message:err.message,
                });
            } else{
                res.status(200).json({
                    verified:verified,
                });
            }
        });
        User.find()
            .exec()
            .then(result => {
                res.status(200).json({
                    message: 'Verified',
                    decoded: decoded, 
                    result:result
            })
        })

    }
    catch(error){
        res.status(401).json({
            message:error.message,
        });
    }
    
});

module.exports = routes;