var express = require('express')
var router = express.Router()
var utils = require('../../utils')
var model = require('../../database')

router.post('/', utils.isPermission, (req, res) => {
    const { version, content } = req.query;

    model.update({version}, {$set: req.query}, (err, doc) => {

    })
})

module.exports = router;