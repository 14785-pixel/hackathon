const express = require('express')
const db = require('../db')
const utils = require('../utils')
const config = require('../config')
const router = express.Router()

router.post("/add",(req,res)=>{
    const {title,description} = req.body;
    const query = 'Insert into categories(title,description) values(?,?)'
    db.pool.execute(query,[title,description],(err,result)=>{
        res.send(utils.createResult(err,result));
    })
})

router.get("/list",(req,res)=>{
    const query = 'Select id,title,description from categories'
    db.pool.execute(query,(err,result)=>{
        res.send(utils.createResult(err,result));
    })
})

router.delete("/remove/:id",(req,res)=>{
    const {id} = req.params;
    const query = 'Delete from categories where id = ?'
    db.pool.execute(query,[id],(err,result)=>{
        res.send(utils.createResult(err,result));
    })
})
module.exports = router