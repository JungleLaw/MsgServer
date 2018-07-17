const Net = require('net');
const Constants = require('../constants.local');

let server = Net.createServer();

let clients = [];

server.on('connection', function (client) {
    console.log('connected');

    client.write('Hi!\n'); // 服务端向客户端输出信息，使用 write() 方法
    client.write('Bye!\n');

    clients.push(client);
    console.log(clients.length);

    // client.end(); // 服务端结束该次会话
    client.on('data', function (buffer) {
        console.log('data');
        console.log(buffer.toString());
        for (let c of clients) {
            if (c.ended) {
                c.write(buffer)
            } else {
                clients.splice(clients.indexOf(c), 1);
            }
        }
    });
    client.on('close', function () {
        console.log('close');
    });

    client.on('end', function () {
        console.log('end');
        client.end();
        for (let c of clients) {
            if (c === client) {
                clients.splice(clients.indexOf(c), 1);
                break;
            }
        }
    });
});
server.on('error', function (error) {
    console.error(error.toString())
})
server.listen(Constants.IM.port);
console.log('start');
