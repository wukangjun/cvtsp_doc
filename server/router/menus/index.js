var express = require('express')
var router = express.Router()
var utils = require('../../utils')
var model = require('../../database')

router.post('/', utils.isPermission, (req, res) => {
    model.menus.find(function(err, data){
        if(err) {
            res.send({
                flag: false,
                errorCode: 500
            })
        }else {
            res.send({
                flag: true,
                data
            }); 
        }
    });
});

module.exports = router;