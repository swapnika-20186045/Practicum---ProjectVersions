const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var Users =  require('./models/users');
var books = require('./models/books');
const cors = require('cors');
const urlencodedParser = bodyParser.urlencoded({extended:false});
const app = express();
const router = express.Router();
app.use(cors());
const connection = mongoose.connection;

var guestOrUser = "guest";

var request = require('request');
var url = "http://vakacharlaswapnika.pythonanywhere.com/recommend/author/The Hobbit/";
var bookData;
var books = [];
app.use(bodyParser.json());
mongoose.connect('mongodb+srv://Anisha:Anisha@2@cluster0-nunvr.mongodb.net/books?retryWrites=true&w=majority',{ useNewUrlParser: true });
connection.once('open', function() {
    console.log("MongoDB Connection Established Successfully");
});

router.route('/user/add').post((req, res) => {
    Users.findOne({email : req.body.email},function(err, result){
        if(err) {
            throw err;
        } 

        if(result) {
        	res.send(true);
        } else {
            Users.findOne({phone : req.body.phone},function(err, result) {
                if(err) {
                    throw err;
                }

                if (result) {
                    res.send(true);
                    
                } else {
                    let user = new Users(req.body);
                    user.save()
                        .then(user => {
                                res.status(200).json({'user': 'Added successfully'});
                        })
                        .catch(err => {
                            res.status(400).send('Failed to create new record');
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

// var auth = 'Basic ' + Buffer.from('swapnika' + ':' + 'swapnika').toString('base64');
router.route('/profile/:id').get(function(req, res){
    var id = req.params.id;
    Users.findById(id, function(err, data){
        if (err) {
            throw err;
        }
        res.send(data);
    })
})
request({
    url:url,
    json:true//,
    // headers: {'Authorization': auth}
}, function(error, response, body){
    if (!error && response.statusCode === 200) {
        // console.log(body)
        bookData = body;
        console.log(bookData);
    }
});

router.route('/recommend').get(function(req, res){
    res.send(bookData);
});

app.use('/', router);

app.listen(4000, function() {
    console.log("Running on port 4000");
});

