const express = require('express');
const router = express.Router();
const { getReposList, deleteRepoById, getCommits, getDiffCommit, getTree, getFileContent, addRepo } = require('../controllers');

router.get('/repos', getReposList);

router.get('/repos/:repositoryId/commits/:commitHash', getCommits);

router.get('/repos/:repositoryId/commits/:commitHash/diff', getDiffCommit);

router.get('/repos/:repositoryId', getTree);

router.get('/repos/:repositoryId/tree/:commitHash?/:path([^/]*)', getTree);

router.get('/repos/:repositoryId/blob/:commitHash/:pathToFile([^/]*)', getFileContent);

router.post('/repos', addRepo);

router.delete('/repos/:repositoryId', deleteRepoById);

module.exports = router;
