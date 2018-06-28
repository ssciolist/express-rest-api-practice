var express = require('express');
var router = express.Router();
const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

/* GET secrets page. */
router.get('/secrets/:id', function(req, res, next) {
  var id = req.params.id;
  database.raw('SELECT * FROM secrets WHERE secrets.id = ?;', id)
    .then((data) => {
      res.json(data.rows[0]);
    })
});

// POST /api/secrets returns the newly created object as JSON

router.post('/secrets', function(req, res, next) {
  database.raw('INSERT INTO secrets (message, created_at) VALUES (?, ?) RETURNING *',
    [req.body.message, new Date])
    .then((data) => {
      res.json(data.rows);
    })
});

module.exports = router;
