const express = require('express');
var http = require('http');
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
        if (result) {
            guestOrUser = result._id;
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

router.route('/user/reset').post((req,res) => {
    Users.findOne({email : req.body.uname},function(err, result){
        if(err) {
            throw err;
        }
        if (result) {
            guestOrUser = result._id;
            Users.updateOne({_id : result._id},{ password : req.body.pwd}, function(err, data){
               res.send(true);
        	});
        	
        } else {
        	Users.findOne({phone : req.body.email},function(err, result) {
                if(err) {
                    throw err;
                } if (result) {
                    guestOrUser = result._id;
                	Users.updateOne({_id : result._id},{ password : req.body.pwd}, function(err, data){
		               res.send(true);
		        	});
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

var arr= [];
var arr1 = [];
router.route('/genre').get(function(req,res) {
    var comp_req = 0;
    Users.findById(guestOrUser, function(err, data){
        if (err) {
            throw err;
        }
        genres.findOne({phonenum: data.phone},function(err, data) {
            if (err) {
                throw err;
            }
            arr = ['getBooksByGenre/' + data.G1 + '/start/0/end/9', 'getBooksByGenre/' + data.G2 + '/start/0/end/9',
            'getBooksByGenre/' + data.G3 + '/start/0/end/9', 'getBooksByGenre/' + data.G4 + '/start/0/end/9',
            'getBooksByGenre/' + data.G5 + '/start/0/end/9'];
            for (var i = 0; i < arr.length; i++) {
                request({
                    url:url + arr[i],
                    json:true//,
                    // headers: {'Authorization': auth}
                }, function(error, response, body){
                    if (!error && response.statusCode === 200) {
                        arr1.push(body);
                    }
                })
            }
            res.send(arr1);
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

var arr2 = [];
router.route('/user/addBook').post((req,res) => {
    Users.findById(guestOrUser, function(err, data){
        if (err) {
            throw err;
        }
        Users.updateOne({_id : data.id}, {$push: {books : req.body.name}}, function(err, data) {
            request({
                url:url + "/recommend/genre/" + req.body.name,
                json:true//,
                // headers: {'Authorization': auth}
            }, function(error, response, body){
                if (!error && response.statusCode === 200) {
                    // arr2 = json.parse(body);
                    for (var i = 0; i < body.length; i++) {
                        // console.log(body[i].title);
                        request({
                            url:url + "/getBookByTitle/" + body[i].title,
                            json:true//,
                            // headers: {'Authorization': auth}
                        }, function(error, response, body){
                            if (!error && response.statusCode === 200) {
                                var x = body;
                                arr2.push(x);
                                // console.log(arr2);
                                // console.log(body);
                            }
                        })
                        // console.log(body[i]);
                    }
                    console.log(arr2);
                    res.send(arr2);
                }
            })
        });
    })
});


app.use('/', router);

app.listen(4000, function() {
    console.log("Running on port 4000");
});
