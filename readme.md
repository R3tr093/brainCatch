https://braincatch.herokuapp.com/ | https://git.heroku.com/braincatch.git



Try to look how to use the docs parameters 

then ensure the username is not already ued by others user and kill code input 



- First games

--- > Decrypt 


--- > Math exposant


--- > Flag or not flag ?  


  let isAlreadyUsed = false;
  

  db.collection(USERS_COLLECTION).find({name: req.body.name}).toArray(function(err, docs) {
    
    // Credentials not found in the DB.
    if (err) 
    {
      isAlreadyUsed = false;
    } 
    
    // This user name already exist.
    else 
    {
      isAlreadyUsed = true;
      res.send({ report: "Ce nom d'utilisateur est déjà pris, désolé."});
    }
  });