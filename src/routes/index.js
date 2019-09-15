const express = require('express');
const router = express.Router();
const { getReposList, deleteRepoById, getCommits, getDiffCommit, getTree, getFileContent } = require('../controllers');

router.get('/repos', getReposList);

router.get('/repos/:repositoryId/commits/:commitHash', getCommits);

router.get('/repos/:repositoryId/commits/:commitHash/diff', getDiffCommit);

router.get('/repos/:repositoryId', getTree);

router.get('/repos/:repositoryId/tree/:commitHash?/:path([^/]*)', getTree);

router.get('/repos/:repositoryId/blob/:commitHash/:pathToFile([^/]*)', getFileContent);

router.delete('/repos/:repositoryId', deleteRepoById);

module.exports = router;
