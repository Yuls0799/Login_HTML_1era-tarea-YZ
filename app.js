const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('./user');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname,'public')));

const mongo_uri = "mongodb+srv://yzam:pHuUZ4mzc9neeSSZ@cluster0.e0wrryr.mongodb.net/sample_airbnb?retryWrites=true&w=majority";

mongoose.connect(mongo_uri, function(err) {
    if (err) {
        throw err;
    } else {
       console.log(`You have succesfully been connected`)
    }
});

app.post('/Registro.html', (req,res) => {

    const {email, password} = req.body;
 
    const user = new User({email, password});
 
    user.save(err =>{
 
       if(err){
         res.status(500).send('We are sorry, the system failed to register your information');
       }else {
         res.status(200).send('You have been registered, WELCOME!');
       }
    });
 
});

app.post('/index.html', (req,res) => {

    const {email, password} = req.body;

    User.findOne({email}, (err, user)=> {
        if(err){
            res.status(500).send('ERROR TO AUTHENTICATE');
        }else if(!user){
            res.status(500).send('You have no register yet')
        }else{
         user.Authenticate(password, (err, result) =>{
            if (err){
                 res.status(500).send('ERROR TO AUTHENTICATE');
             }else if(result){

                res.status(500).send('USER AUTHENTICATED');
            }else{
                res.status(500).send('User or password incorrect');
            }
                    
         });
      }

    });
});

app.listen(5000, () =>{
    console.log('server started');
});

module.exports = app;
