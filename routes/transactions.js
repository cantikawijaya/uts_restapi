// routes/transactions.js
const express = require('express');
const router = express.Router();
const transactions = require('../services/transactions');

/* GET transactions. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await transactions.getTransactions(req.query.page));
  } catch (err) {
    console.error(`Error while getting transactions `, err.message);
    next(err);
  }
});

/* POST a new menu */
router.post('/', async function(req, res, next) {
  try {
    res.json(await transactions.createMenu(req.body));
  } catch (err) {
    console.error(`Error while creating menu`, err.message);
    next(err);
  }
});

/* PUT an existing menu */
router.put('/:id', async function(req, res, next) {
  try {
    res.json(await transactions.updateMenu(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating menu`, err.message);
    next(err);
  }
});

/* DELETE an existing menu */
router.delete('/:id', async function(req, res, next) {
  try {
    res.json(await transactions.deleteMenu(req.params.id));
  } catch (err) {
    console.error(`Error while deleting menu`, err.message);
    next(err);
  }
});

module.exports = router;
