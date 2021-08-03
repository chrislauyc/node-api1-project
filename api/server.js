// BUILD YOUR SERVER HERE
const model = require("./users/model");
const express = require("express");

const app = express();
app.use(express.json())
app.get("/",(req,res)=>{
    res.send("server is running");
});

app.get("/api/users",(req,res)=>{
    model.find()
    .then((users)=>{
        res.status(200).json(users);
    })
    .catch(()=>{
        res.status(500).json({ message: "The users information could not be retrieved" });
    })
});

app.post("/api/users",(req,res)=>{
    const {name, bio } = req.body;
    if(name&&bio){
        model.insert(req.body)
        .then((newUser)=>res.status(201).json(newUser))
        .catch(()=>res.status(500).json({ message: "There was an error while saving the user to the database" }));
    }
    else{
        res.status(400).json({ message: "Please provide name and bio for the user" });
    }
});

app.get("/api/users/:id",(req,res)=>{
    model.findById(req.params.id)
    .then((user)=>{
        if(user){
            res.status(200).json(user);
        }
        else{
            res.status(404).json({ message: "The user with the specified ID does not exist" });
        }
    })
    .catch(()=>res.status(500).json({ message: "The user information could not be retrieved" }));
});

app.delete("/api/users/:id",(req,res)=>{
    model.remove(req.params.id)
    .then((users)=>{
        if(users){
            res.status(200).json(users);
        }
        else{
            res.status(404).json({ message: "The user with the specified ID does not exist" });
        }
    })
    .catch(()=>{
        res.status(500).send({ message: "The user could not be removed" });
    })
});

app.put("/api/users/:id",(req,res)=>{
    const {name,bio} = req.body;
    if(name&&bio){
        model.update(req.params.id,req.body)
        .then((user)=>{
            if(user){
                res.status(200).json(user);
            }
            else{
                res.status(404).json({ message: "The user with the specified ID does not exist" });
            }
        })
        .catch(()=>{
            res.status(500).json( {message: "The user information could not be modified" });
        });
    }
    else{
        res.status(400).json({ message: "Please provide name and bio for the user" });
    }
});

module.exports = app; // EXPORT YOUR SERVER instead of {}
