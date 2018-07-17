//引入redis
var redis = require("redis");
//创建redis客户端
var client = redis.createClient("6379", "127.0.0.1");
//连接错误处理
client.on("error", function (error) {
    console.log(error);
});
//redis验证 （如果redis没有开启验证，此配置可以不写）
client.auth("12345");
//查找

client.select("15", function (error) {
    if (error) {
        console.log(error);
    } else {
        client.set("node_redis_key", JSON.stringify({ "name": "wolfy", age: 28 }), function (error, res) {
            if (error) {
                console.log(error);
            } else {
                console.log(res);
            };
            //操作完成，关闭redis连接
            client.end(true);

        });
    };
});