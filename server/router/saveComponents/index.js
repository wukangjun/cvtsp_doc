const express = require('express')
const router = express.Router()
const model = require('../../database')

router.post('/', (req, res) => {
    const insertData = req.body;

    
    model.save_components.update(
        { router: insertData.router}, 
        {$set: insertData}, 
        {upsert: true }, 
        err => {
            err 
            ? res.send({ flag: false, msg: '保存失败'}) 
            : res.send({ flag: true, msg: '保存成功'});
    })
})

/**
 * 查询数据
 */
router.post('/find', (req, res) => {
    const { router } = req.query;
    
    model.save_components.findOne({ router }, (err, result) => {
        if(!result) {
            res.send({ flag: false, msg: '查询失败'});
        }else {
            res.send({
                flag: true,
                data: result
            })
        }
    })
})

module.exports = router;