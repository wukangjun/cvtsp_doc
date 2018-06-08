const io = require('socket.io')(3000)
const model = require('./database')

io.sockets.on('connection', socket => {
    console.log('sokcet连接')
    socket.on('chat_clientsend', data => {
        // 1. 先广播发布到客户端
        socket.broadcast.emit('chat_serversend', data);
        // 2. 将信息存储到数据库
        const insertData = new model.chat(Object.assign(data, {
            time: new Date().getTime()
        }));
        insertData.save();
    })
})

module.exports = io;