const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;

let Users = require('./model/user.model');

app.use(cors());
app.use(bodyParser.json());


mongoose.connect('mongodb://127.0.0.1:27017/DaClub', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");  
})

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
    
});


const DaClubRoutes = express.Router();
app.use('/DaClub', DaClubRoutes);


//////////////
//Utilisateurs 
//

DaClubRoutes.route('/user').get(function(req, res) {
    Users.find(req.query, function(err, user){
        if (err) {
            console.log(err)
        } else {
            res.json(user)
        }
    });
});

DaClubRoutes.route('/user').post(function(req, res) {
    if(req.query._id === null || req.query._id === undefined){
        let user = new Users(req.body);
        user.save()
            .then(user => {
                res.status(200).json({'user': 'Utilisateurs added successfully'});
            })
            .catch(err => {
                res.status(400).send('adding new Utilisateurs failed');
            });
    }
    else
    Users.findById(req.query._id, function(err, user) {
            if (!user)
                res.status(404).send("data is not found");
            else
            user.Nom = req.body.Nom;
            user.Prenom = req.body.Prenom;
            user.coordX = req.body.coordX;
            user.coordY = req.body.coordY;
            
    
            user.save().then(user => {
                    res.json('Utilisateurs updated!');
                })
                .catch(err => {
                    res.status(400).send("Update not possible");
                });
        });
    
   
});

