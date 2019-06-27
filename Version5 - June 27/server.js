const express = require('express');
const session = require('express-session');
const redis = require('redis');
const redisStore = require('connect-redis')(session);
const client = redis.createClient();
const fetch = require("node-fetch");
var http = require('http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var Users =  require('./models/users');
var genres =  require('./models/genres');
const cors = require('cors');
const app = express();
var cookieParser = require('cookie-parser')
const router = express.Router();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());
const connection = mongoose.connection;
app.use(cookieParser());
app.use(session({secret: "ssshhhh", store: new redisStore({host : 'localhost', port: 6379, client: client,ttl: 260}),saveUninitialized: true, resave: false}));

app.use('/', router);
app.get('/', function(req, res, next) {
    var sess = req.session;
})
var guestOrUser = "guest";
var id = '';

var request = require('request');
var url = "http://vakacharlaswapnika.pythonanywhere.com/";

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
    guestOrUser = 'guest';
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
            var content = {};
            content["genres"] = data;
            content["recommendation"] = arr1;
            res.send(content);
        })
    }) 
})

router.route('/increment').post(function(req,res) {
    var value = req.body.val;
    var end = req.body.count;
    var start = end - 10;
    var content = "";
    // console.log(req.body);
    Users.findById(guestOrUser, function(err, data){
        if (err) {
            throw err;
        }
        // console.log(data.phone);
        genres.findOne({phonenum: data.phone},function(err, data) {
            
            if (err) {
                throw err;
            }
            // console.log(data);
            if(value == 1) {
                console.log("I am here");
                // console.log(arr[0]);
                request({
                    url:url + 'getBooksByGenre/' + data.G1 + '/start/' + start + '/end/' + end,
                    json :true//,
                    // headers: {'Authorization': auth}
                }, function(error, response, body){
                    if (!error && response.statusCode === 200) {
                        // console.log(body);
                        res.send(body);
                    }
                })
            }

            if(value == 2) {
                // console.log(arr[0]);
                request({
                    url:url + 'getBooksByGenre/' + data.G2 + '/start/' + start + '/end/' + end,
                    json :true//,
                    // headers: {'Authorization': auth}
                }, function(error, response, body){
                    if (!error && response.statusCode === 200) {
                        res.send(body);
                    }
                })
            }

            if(value == 3) {
                // console.log(arr[0]);
                request({
                    url:url + 'getBooksByGenre/' + data.G3 + '/start/' + start + '/end/' + end,
                    json :true//,
                    // headers: {'Authorization': auth}
                }, function(error, response, body){
                    if (!error && response.statusCode === 200) {
                        res.send(body);
                    }
                })
            }

            if(value == 4) {
                // console.log(arr[0]);
                request({
                    url:url + 'getBooksByGenre/' + data.G4 + '/start/' + start + '/end/' + end,
                    json :true//,
                    // headers: {'Authorization': auth}
                }, function(error, response, body){
                    if (!error && response.statusCode === 200) {
                        res.send(body);
                    }
                })
            }

            if(value == 5) {
                // console.log(arr[0]);
                request({
                    url:url + 'getBooksByGenre/' + data.G5 + '/start/' + start + '/end/' + end,
                    json :true//,
                    // headers: {'Authorization': auth}
                }, function(error, response, body){
                    if (!error && response.statusCode === 200) {
                        res.send(body);
                    }
                })
            }
        })
    }) 
})

router.route('/decrement').post(function(req,res) {
    var value = req.body.val;
    var end = req.body.count;
    var start = end - 10;
    console.log(start);
    Users.findById(guestOrUser, function(err, data){
        if (err) {
            throw err;
        }
        // console.log(data.phone);
        genres.findOne({phonenum: data.phone},function(err, data) {
            
            if (err) {
                throw err;
            }
            // console.log(data);
            if(value == 1) {
                console.log("I am here");
                // console.log(arr[0]);
                request({
                    url:url + 'getBooksByGenre/' + data.G1 + '/start/' + start + '/end/' + end,
                    json :true//,
                    // headers: {'Authorization': auth}
                }, function(error, response, body){
                    if (!error && response.statusCode === 200) {
                        // console.log(body);
                        res.send(body);
                    }
                })
            }

            if(value == 2) {
                // console.log(arr[0]);
                request({
                    url:url + 'getBooksByGenre/' + data.G2 + '/start/' + start + '/end/' + end,
                    json :true//,
                    // headers: {'Authorization': auth}
                }, function(error, response, body){
                    if (!error && response.statusCode === 200) {
                        res.send(body);
                    }
                })
            }

            if(value == 3) {
                // console.log(arr[0]);
                request({
                    url:url + 'getBooksByGenre/' + data.G3 + '/start/' + start + '/end/' + end,
                    json :true//,
                    // headers: {'Authorization': auth}
                }, function(error, response, body){
                    if (!error && response.statusCode === 200) {
                        res.send(body);
                    }
                })
            }

            if(value == 4) {
                // console.log(arr[0]);
                request({
                    url:url + 'getBooksByGenre/' + data.G4 + '/start/' + start + '/end/' + end,
                    json :true//,
                    // headers: {'Authorization': auth}
                }, function(error, response, body){
                    if (!error && response.statusCode === 200) {
                        res.send(body);
                    }
                })
            }

            if(value == 5) {
                // console.log(arr[0]);
                request({
                    url:url + 'getBooksByGenre/' + data.G5 + '/start/' + start + '/end/' + end,
                    json :true//,
                    // headers: {'Authorization': auth}
                }, function(error, response, body){
                    if (!error && response.statusCode === 200) {
                        res.send(body);
                    }
                })
            }
        })
    }) 
})

// var auth = 'Basic ' + Buffer.from('swapnika' + ':' + 'swapnika').toString('base64');
router.route('/profile/:id').get(function(req, res){
    id = req.params.id;
    var user = "";
    var gen = "";
    Users.findById(id, function(err, data){
        if (err) {
            throw err;
        }
        user = data;
        genres.findOne({phonenum: data.phone},function(err, data) {
            if(err) {
                console.log(err);
            }
            gen = data;
            var userData = {};
            userData["user"] = user;
            userData["genre"] = gen;
            res.send(userData);
        })
        
    })
})

var arr2 = [];
router.route('/user/addBook').post((req,res) => {
    Users.findById(guestOrUser, function(err, details){
        if (err) {
            throw err;
        }
        var book  = req.body.name;
        (async () => {
            var data = await getdetails(book);
            // res.send(data);
            // console.log(data);
            Users.findOne({"books.bookId" : data.index}, function(err, result) {
                // console.log(result);
                if(result) {
                    res.json("book already exists in your list");
                } else {
                    Users.updateOne({_id : details.id}, {$push : {books : [{bookId : data.index, 
                                                                           title : req.body.name}]}}, function(err, data) {
                        var clickedTitle = req.body.name;
                        // var data = showAvatar(clickedTitle);
                        
                        (async () => {
                            var data = await showAvatar(clickedTitle);
                            res.send(data);
                        })()
                    });
                }
            })
        })()
    })
});

async function getdetails(title) {
    let respon = await fetch(url + "getBookByTitle/" + title);
    let data = await respon.json();
    return data;
}

async function showAvatar(clickedTitle) {
    let response = await fetch(url + "recommend/genre/" + clickedTitle);
    let user = await response.json();
    // // console.log(user);
    // multiple(user);
    var arr4 = [];
    for(var i = 0; i < user.length;i++) {
        let respon = await fetch(url + "getBookByTitle/" + user[i].title);
        let data = await respon.json();
        // console.log(data);
        arr4.push(data);
    }
    var recommendation = {};
    recommendation["recommendedFor"] = clickedTitle;
    recommendation["recommendations"] = arr4;
    arr2.push(recommendation);
    // console.log(arr2);
    return arr2;
}

router.route('/list').get(function(req, res){
    Users.findById(guestOrUser, function(err, data){
        if (err) {
            throw err;
        }
        // getbookdata(data.books);
        var book = data.books;
        (async () => {
            var data = await getbookdata(book);
            res.send(data);
        })()
    })
})

async function getbookdata(books) {
    // console.log(books);
    var arr5 = [];
    for(var i = 0; i < books.length;i++) {
        let respon = await fetch(url + "/getBookByTitle/" + books[i].title);
        let data = await respon.json();
        // console.log(user.title[i]);
        arr5.push(data);
    }
    // console.log(arr2);
    return arr5;
}

router.route('/updateName').post((req,res) => {
    console.log(req.body.personName);
    Users.findById(guestOrUser, function(err,data) {
        if(err) {
            console.log(err);
        }

        if(data) {
            guestOrUser = data._id;
            Users.updateOne({_id : data._id},{ name : req.body.personName}, function(err, result){
                if(result) {
                    res.send(true);
                } else {
                    res.send(false);
                }
               
        	});
        } 
    })
});

router.route('/updateEmail').post((req,res) => {
    console.log(req.body.personEmail);
    Users.findById(guestOrUser, function(err,data) {
        if(err) {
            console.log(err);
        }

        if(data) {
            guestOrUser = data._id;
            Users.updateOne({_id : data._id},{ email : req.body.personEmail}, function(err, result){
                if(result) {
                    res.send(true);
                } else {
                    res.send(false);
                }
               
        	});
        } 
    })
});

router.route('/updatePhone').post((req,res) => {
    console.log(req.body.personPhone);
    Users.findById(guestOrUser, function(err,data) {
        if(err) {
            console.log(err);
        }

        if(data) {
            guestOrUser = data._id;
            Users.updateOne({_id : data._id},{ phone : req.body.personPhone}, function(err, result){
                if(result) {
                    console.log(data.phone);
                    genres.findOne({"phonenum" : data.phone}, function(err, result) {
                        if (result) {
                            console.log(req.body.personPhone);
                            genres.updateOne({_id : result._id},{ phonenum : req.body.personPhone}, function(err, result){
                                if (result) {
                                    res.send(true);
                                } else {
                                    res.send(false);
                                }
                            })
                        }
                    })
                }
        	});
        } 
    })
});

router.route('/updateGen').post((req,res) => {
    // console.log(req.body.g1);
    Users.findById(guestOrUser, function(err,data) {
        if(err) {
            console.log(err);
        }

        if(data) {
            guestOrUser = data._id;
            genres.findOne({"phonenum" : data.phone}, function(err, result) {
                if (result) {
                    console.log(req.body.personPhone);
                    var myquery = {_id : result._id};
                    var newvalues = { $set: {G1: req.body.g1,G2: req.body.g2,  G3: req.body.g3, G4: req.body.g4,G5: req.body.g5  } };
                    genres.updateOne(myquery, newvalues, function(err, result){
                        if (result) {
                            res.send(true);
                        } else {
                            res.send(false);
                        }
                    })
                }
            })
        } 
    })
});

app.listen(4000, function() {
    console.log("Running on port 4000");
});
