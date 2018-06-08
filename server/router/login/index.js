var express = require('express')
var router = express.Router()
var utils = require('../../utils')
var model = require('../../database')

/**
 * 登陆token 存入数据库
 */
router.post('/', (req, res) => { 
    model.login_user.findOne(req.query, (err, doc) => {
       if(!doc) {
            res.send({ flag: false });
       }else {
           const { user } = req.query;
           const currentTime = new Date().getTime();
           const token = `${user}_${currentTime}`;
           model.token.update(
               {user}, 
               {$set: { token} },
               {upsert: true},
               err => {
                   err 
                   ? res.send( { flag: false})
                   : res.send( { flag: true, data: token });
               }
            );
       }
    })
});

/**
 * 退出登陆 将token去除
 */
router.post('/outlogin', (req, res) => {
    const { token } = req.headers;
    model.token.remove({token}, (err, result) => {
        if(err) {
            res.send({ flag: false });
        }else {
            res.send( { flag: true, msg: '退出登陆'})
        }
    });
});

module.exports = router;