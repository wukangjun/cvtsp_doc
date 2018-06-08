var express = require('express')
var router = express.Router()
var model = require('../../database')
var utils = require('../../utils')

router.get('/', utils.isPermission, (req, res) => {
    const { token } = req.headers;
    const user = token.replace(/^(\w+)_(\d+)/, '$1');

    model.login_user.findOne({user}, (err, doc) => {
        if(doc) {
            res.send({
                flag: true,
                data: doc
            })
        }else {
            res.send({
                flag: false,
                data: {}
            })
        }
    })
})

module.exports = router;