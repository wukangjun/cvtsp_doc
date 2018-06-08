const fs = require('fs')
const ejs = require('ejs')
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const io = require('./socket')
const URL = process.env.URL = '10.10.12.207';   //10.10.12.207 //192.168.199.247
const PORT = process.env.PORT || '8088';

app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.header("Access-Control-Allow-Headers", "content-type, token");
    res.header("Access-Control-Allow-Methods","GET,POST,OPTIONS");

    if(req.method === 'OPTIONS') {
        res.sendStatus(200);
    }else {
        next();
    }
   
});

app.set('view engine', 'ejs')
app.use( bodyParser.urlencoded({ extended: true }) );
app.use( bodyParser.json() );

/**
 * 路由配置
 */
var node_api = path.resolve(__dirname, './router');
fs.readdir(node_api, function(err, files) {
    if(err) console.log(err)
  
    files && files.forEach(function(filename) {
        var detailFileName = '/' + filename.split('.')[0].replace(/-/g, '/');
        // mac的垃圾文件
        if(filename !== '.DS_Store') {
            app.use(detailFileName, require('./router/' + filename));
        }
    })
});

app.listen(PORT, URL, function() {
    console.log('server is started at:' + PORT)
})
