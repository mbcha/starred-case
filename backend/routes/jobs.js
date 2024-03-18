
var express = require('express');
var router = express.Router();
var db = require('../db/db.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  db.all("SELECT * FROM job", (error, rows) => {
    if (error) {
      return res.status(400).json({error: error.message})
    }
  
    res.json({
      data: rows,
      error: {}
    });
  })
});

router.post('/favorite', function(req, res, next) {
  const { userId, jobId } = req.body;

  const sql = "INSERT INTO favoriteJobs (userId, jobId) VALUES (?, ?)";
  db.run(sql, [userId, jobId], (error, _result) => {
    if (error) {
      return res.status(400).json({error: error.message})
    }

    res.json({
      message: "success",
      data: req.body
    })
  });
});

router.delete('/favorite', function(req, res, next) {
  const { userId, jobId } = req.body;

  const sql = "DELETE FROM favoriteJobs WHERE userId = ? AND jobId = ?";
  db.run(sql, [userId, jobId], (error, _result) => {
    if (error) {
      return res.status(400).json({error: error.message})
    }

    res.json({
      message: "success",
      data: req.body
    })
  });
});

module.exports = router;
  