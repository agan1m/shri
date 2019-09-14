const express = require('express');
const router = express.Router();
const { getReposList, deleteRepoById } = require('../controllers');

router.get('/repos', getReposList);

router.delete('/repos/:repositoryId', deleteRepoById);

module.exports = router;
