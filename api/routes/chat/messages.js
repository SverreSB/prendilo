const express = require('express');
const router = express.Router();
const app = express();

const asyncMiddleware = require('../../../middleware/async');



router.get('/', asyncMiddleware( async(req, res) =>{

}))

module.exports = router;