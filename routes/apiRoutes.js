const app = require("express").Router()
const fs = require('fs');
let db = require("../db/db.json")



app.get("/notes",function(req,res){
    db = JSON.parse(fs.readFileSync("./db/db.json")) || []
    console.log("get db",db)
    res.json(db)
})

app.post("/notes",function(req,res){
    const note = {
        title: req.body.title,
        text: req.body.text,
        id: Math.floor(Math.random() *  19209)
    }
    db.push(note)
    fs.writeFileSync("./db/db.json",JSON.stringify(db),function(req,res){
        if(err) throw err;
    })
    console.log("post db",db)
    res.json(db)
})

app.delete("/notes/:id",function(req,res){
    const note = []
    db.forEach(singleNote => {
        if(singleNote.id != req.params.id){
            note.push(singleNote)
        }
    })
    db = note
    fs.writeFileSync("./db/db.json",JSON.stringify(db),function(req,res){
        if(err) throw err;
    })
    console.log("delete db",db)
    res.json(db)
})

module.exports = app;