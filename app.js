const express = require('express')

app = express()

app.get("/", (req, res)=>{
    res.send("working");
})

app.listen(8000, ()=>{
    console.log("Server started on port 8000");
})