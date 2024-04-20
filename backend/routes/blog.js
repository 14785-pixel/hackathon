const express = require("express");
const db = require("../db");
const utils = require("../utils");
const config = require("../config");
const router = express.Router();

router.post("/add", (req, res) => {
  const { title, categoryId, description } = req.body;
  const query =
    "Insert into blogs(title,category_id,user_id,contents) values(?,?,?,?)";
  db.pool.execute(
    query,
    [title, categoryId, req.userId, description],
    (err, result) => {
      console.log(err);
      res.send(utils.createResult(err, result));
    }
  );
});

router.get("/list", (req, res) => {
  const query = `select blogs.id,blogs.title title,contents,categories.title category,user.full_name author,user_id,date_format(blogs.created_time,"'%D %M %Y' %H:%i:%s") date,categories.id catId
  from blogs,categories,user 
  where blogs.category_id = categories.id and blogs.user_id = user.id and blogs.isDeleted = 0`;
  db.pool.execute(query, (err, result) => {
    res.send(utils.createResult(err, result));
  });
});

router.delete("/delete/:id", (req, res) => {
    const {id} = req.params;
    const query = "Update blogs set isDeleted = 1 where id = ?"
    db.pool.execute(query, [id],(err, result) => {
      res.send(utils.createResult(err, result));
    });
  });
  router.put("/update", (req, res) => {
    const {id,title,categoryId,description} = req.body;
    const query = "Update blogs set title = ?,category_id=?,contents = ? where id = ?"
    db.pool.execute(query, [title,categoryId,description,id],(err, result) => {
        console.log(err);
      res.send(utils.createResult(err, result));
    });
  });
  router.get("/search/:string", (req, res) => {
    const{string} = req.params ;
    const query = `select blogs.id,blogs.title title,contents,categories.title category,user.full_name author,user_id,date_format(blogs.created_time,"'%D %M %Y' %H:%i:%s") date,categories.id catId
    from blogs,categories,user 
    where blogs.category_id = categories.id and blogs.user_id = user.id and blogs.isDeleted = 0 and (blogs.title like ? or blogs.contents like ?)`;
    const str = '%' + string + '%'
    db.pool.execute(query,[str, str],(err, result) => {
      res.send(utils.createResult(err, result));
    });
  });

module.exports = router;
