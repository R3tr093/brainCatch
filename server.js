
// Env fundamentals dependencies
var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;
var USERS_COLLECTION = "users";
var app = express();

// Hash dependencies
const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';


app.use(bodyParser.json());



var distDir = __dirname + "/dist/brainCatch";
app.use(express.static(distDir));

var db;

mongodb.MongoClient.connect(process.env.MONGODB_URI, function (err, client) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = client.db();
  console.log("Database connection ready");

  // Initialize the app.
  var server = app.listen(process.env.PORT, function () {
    var port = server.address().port;
  });
});

function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}




/** ---- >  API ENDPOINTS  **/

// -- > get all users infos

app.get("/api/users", function(req, res) {
  db.collection(USERS_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get contacts.");
    } else {
      res.status(200).json(docs);
    }
  });
});


// -- > get an user selected by his ID.

app.get("/api/users/:id/:pass", function(req, res) {
  
  let param = String(req.params.id);
  let password = String(req.params.pass)


  // -> Find a way to export result of decrypt 

  // Then we can try to  resolve this way in front-end, or just try to look at how use the docs object in the front-end 
  
  db.collection(USERS_COLLECTION).find({name: param}).toArray(function(err, docs) {
    
    // Credentials not found in the DB.
    if (err) 
    {
      handleError(res, err.message, "Failed to get user credentials...");
    } 
    
    // Compare hash.
    else 
    {

      if(bcrypt.compareSync(password, docs[0].password))
      {
        // Passwords match
        res.status(200).json(docs);
      } 

      else
      {
        res.send({ hello: 'world' });
      }
      
     
      
    }
  });
});



//  -- > Submit a new user in API

app.post("/api/users", function(req, res) {
  
  var newUser = req.body;
  
  newUser.createDate = new Date();
  
  let hash = bcrypt.hashSync(req.body.password, 10);

  newUser.hash = hash;
  

  if (!req.body.name)
  {
    handleError(res, "Invalid user input", "Must provide a name.", 400);
  }
   else
    {
    db.collection(USERS_COLLECTION).insertOne(newUser, function(err, doc) {
      
      if (err) 
      {
        handleError(res, err.message, "Failed to create new contact.");
      }
       else
      {
        res.status(201).json(doc.ops[0]);
      }
    });
  }
});




// -- > Placeholder put and delete request

app.put("/api/users/:id", function(req, res) {
});

app.delete("/api/users/:id", function(req, res) {
});
