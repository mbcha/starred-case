var express = require('express');
var router = express.Router();
var db = require('../db/db.js');
const crypto = require('crypto');

/* GET users listing. */
router.get('/', function(req, res, next) {
  db.all("SELECT * FROM user", (error, rows) => {
    if (error) {
      return res.status(400).json({error: error.message})
    }
  
    res.json({
      data: rows,
      error: {}
    });
  })
});

router.post('/login', function(req, res, next) {
  const { email, password } = req.body;

  db.get("SELECT * FROM user WHERE email = ?", [email], (error, row) => {
    if (!row) {
      return res.status(401).json({
        message: 'Invalid username or password',
        error: {}
      });
    }

    if (error) {
      return res.status(400).json({
        message: error.message
      });
    }

    const hashedPassword = crypto.pbkdf2Sync(password, row.salt, 1000, 64, 'sha512').toString('hex');
    if (row.password === hashedPassword) {
      return res.json({
        message: 'Sign in successful',
        data: row,
        error: {}
      });
    } else {
      return res.status(401).json({
        message: 'Invalid username or password',
        error: {}
      });
    }
  })
});

router.get('/:id/favorite-jobs', function(req, res, next) {
  const { id } = req.params;

  const sql = "SELECT job.* FROM favoriteJobs JOIN job ON favoriteJobs.jobId = job.id WHERE favoriteJobs.userId = ?"

  db.all(sql, [id], (error, rows) => {
    if (error) {
      return res.status(400).json({error: error.message})
    }

    res.json({
      data: rows,
      error: {}
    });
  })
});

module.exports = router;
