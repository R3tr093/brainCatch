
// Env fundamentals dependencies
var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;
var USERS_COLLECTION = "users";
var app = express();

// Hash dependencies
const bcrypt = require('bcrypt');


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


app.get("/api/users", function(req, res) {
  
 
  
  db.collection(USERS_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get contacts.");
    } else {
      res.status(200).json(docs);
    }
  });
});


// -- > get an user selected by his name.

app.get("/api/users/:name", function(req, res) {
  
 

  let param = String(req.params.name);

  
  db.collection(USERS_COLLECTION).find({name: param}).toArray(function(err, docs) {
    
    // Credentials not found in the DB.
    if (err) 
    {
      handleError(res, err.message, "Failed to get user credentials...");
    } 
    
    // Compare hash.
    else 
     {
        res.status(200).json(docs);      
     }
   });
});



//  -- > LogIn.

app.post("/api/users/logIn", function(req, res) {
  



  if (!req.body.name)
  {
    handleError(res, "Invalid user input", "Must provide a name.", 400);
  }

  if (!req.body.password)
  {
    handleError(res, "Invalid user input", "Must provide a password.", 400);
  }

    db.collection(USERS_COLLECTION).find({name: req.body.name}).toArray(function(err, docs) {
    
    // Credentials not found in the DB.
    if (err) 
    {
      handleError(res, err.message, "Failed to get user credentials...");
      
    } 
    
    // Compare hash..
    else 
    {

      if(bcrypt.compareSync(req.body.password, docs[0].password))
      {
        // Passwords match
        res.status(200).json(docs);
      } 

      else
      {
        res.send({ report: 'Password not match.' });
      }
    }
  
  });
  
});


// -- > Add a new user

app.post("/api/users", function(req, res) {


 
  
  var newUser = req.body;

  newUser.createDate = new Date();
  
  let hash = bcrypt.hashSync(req.body.password, 10);

  newUser.password = hash;
  newUser.logic = 0;
  newUser.memory = 0;
  newUser.mathScore = 0;
  newUser.score = 0;
  

  if (!req.body.name)
  {
    handleError(res, "Invalid user input", "Must provide a name.", 400);
  }

  if (!req.body.password)
  {
    handleError(res, "Invalid user input", "Must provide a password.", 400);
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




// -- > Update fields mathematic

app.put("/api/users/math/update", function(req, res) {

  if(!req.body.score)
  {
    handleError(res, "Missing score value ", "Must provide a value to increment.", 400);
  }

  if(!req.body.name)
  {
    handleError(res, "Missing name credentials. ", "Must provide an user name .", 400);
  }

  db.collection(USERS_COLLECTION).find({name: req.body.name}).toArray(function(err, docs) {
    
    // Credentials not found in the DB.
    if (err) 
    {
      handleError(res, err.message, "Failed to get user credentials...");
    } 
    
  
    else 
     {
        res.status(200).json(docs);  

        let current = req.body.score + Number(docs[0].mathScore); 

        let global = (Number(docs[0].score) + req.body.score);


        db.collection(USERS_COLLECTION).update({ "name": req.body.name},
        {$set: {"score": global, "mathScore": current}},
        { upsert: true });
       
     }
   });

      

});


// -- > Update fields memory

app.put("/api/users/memory/update", function(req, res) {

  if(!req.body.score)
  {
    handleError(res, "Missing score value ", "Must provide a value to increment.", 400);
  }

  if(!req.body.name)
  {
    handleError(res, "Missing name credentials. ", "Must provide an user name .", 400);
  }

  db.collection(USERS_COLLECTION).find({name: req.body.name}).toArray(function(err, docs) {
    
    // Credentials not found in the DB.
    if (err) 
    {
      handleError(res, err.message, "Failed to get user credentials...");
    } 
    
  
    else 
     {
        res.status(200).json(docs);  

        let current = req.body.score + Number(docs[0].memory); 

        let global = (Number(docs[0].score) + req.body.score);


        db.collection(USERS_COLLECTION).update({ "name": req.body.name},
        {$set: {"score": global, "memory": current}},
        { upsert: true });
       
     }
   });

      

});


// -- > Placeholder delete request
app.delete("/api/users/:id", function(req, res) {
});
