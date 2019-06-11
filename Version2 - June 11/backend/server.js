const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var Users =  require('./models/users');
var genres =  require('./models/genres');
const cors = require('cors');
const app = express();
const router = express.Router();
app.use(cors());
const connection = mongoose.connection;

var guestOrUser = "guest";
var id = '';

var request = require('request');
var url = "http://vakacharlaswapnika.pythonanywhere.com/";
app.use(bodyParser.json());
mongoose.connect('mongodb+srv://Anisha:Anisha@2@cluster0-nunvr.mongodb.net/books?retryWrites=true&w=majority',{ useNewUrlParser: true });
connection.once('open', function() {
    console.log("MongoDB Connection Established Successfully");
});

router.route('/user/add').post((req, res) => {
    // console.log(req.body.type);
    Users.findOne({email : req.body.person.email},function(err, result){
        if(err) {
            throw err;
        } 

        if(result) {
        	res.send(true);
        } else {
            Users.findOne({phone : req.body.person.phone},function(err, result) {
                if(err) {
                    throw err;
                }

                if (result) {
                    res.send(true);
                    
                } else {
                    let user = new Users(req.body.person);
                    let genre = new genres(req.body.type);
                    // console.log(genre);
                    genre.save()
                        .then(() => {
                            // res.status(200).json({'user': 'Added successfully'});
                            console.log("success");
                        })
                        .catch(() => {
                            // res.status(400).send('Failed to create new record');
                            console.log("failed");
                        });
                    user.save()
                        .then(() => {
                                // res.status(200).json({'user': 'Added successfully'});
                                console.log("user success");
                        })
                        .catch(() => {
                            // res.status(400).send('Failed to create new record');
                            console.log("user failed");
                        });
                    res.send(false);
                }
            });
        }
    });
    
});

router.route('/user/login').post((req,res) => {
    Users.findOne({email : req.body.uname, password : req.body.pwd},function(err, result){
        if(err) {
            throw err;
        }

        // console.log(result);
        if (result) {
            guestOrUser = result._id;
            // console.log(guestOrUser);
        	res.send(true);
        } else {
            Users.findOne({phone : req.body.uname, password : req.body.pwd},function(err, result) {
                if(err) {
                    throw err;
                } if (result) {
                    guestOrUser = result._id;
                
                	res.send(true);
                }
                 else {
                    res.send(false);
                }
            });
        }
    });
});

router.route('/user').get(function(req, res){
    res.json(guestOrUser);
})

router.route('/logout').get(function(req, res){
    guestOrUser = "guest";
    res.json("success");
})

router.route('/genre').get(function(req,res) {
    Users.findById(guestOrUser, function(err, data){
        if (err) {
            throw err;
        }
        genres.findOne({phonenum: data.phone},function(err, data) {
            if (err) {
                throw err;
            }
            request({
                url:url + 'getBooksByGenre/' + data.G1 + '/start/0/end/10',
                json:true//,
                // headers: {'Authorization': auth}
            }, function(error, response, body){
                if (!error && response.statusCode === 200) {
                    console.log(body);
                    res.json(body);
                }
            });
            
           
        })
    }) 
})

// var auth = 'Basic ' + Buffer.from('swapnika' + ':' + 'swapnika').toString('base64');
router.route('/profile/:id').get(function(req, res){
    id = req.params.id;
    Users.findById(id, function(err, data){
        if (err) {
            throw err;
        }
        res.send(data);
    })
})
// router.route('/home/:id').get(function(req, res){
//     id = req.params.id;
//     Users.findById(id, function(err, data){
//         if (err) {
//             throw err;
//         }
//         res.send(data);
//     })
// })
request({
    url:url,
    json:true//,
    // headers: {'Authorization': auth}
}, function(error, response, body){
    if (!error && response.statusCode === 200) {
        // console.log(bookData);
    }
});




app.use('/', router);

app.listen(4000, function() {
    console.log("Running on port 4000");
});

