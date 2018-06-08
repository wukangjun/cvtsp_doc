var express = require('express')
var router = express.Router()
var utils = require('../../utils')
var model = require('../../database')

router.get('/', utils.isPermission, (req, res) => {
    model.chat.find({time: {$gt: new Date().getTime()-1000*60*60*24}}).exec((err, doc) => {
        if(!doc) {
            res.send({flag: false})
        }else {
            res.send({flag: true, data: doc});
        }
    })
})

module.exports = router;
