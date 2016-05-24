var http = require("http"),
    fs = require('fs'),
    querystring = require("querystring"),
    mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/ResumeLogIn");
//handle open error
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
var userSchema = mongoose.Schema({
    name: String,
    password: String
});
var pepole = mongoose.model('USER', userSchema);
//read file 
var readFileAsync = function(response, fileName, contentType) {
        fs.readFile(fileName, function(err, data) {
            if (err) {
                response.writeHead(404);
                response.write("file Not Found!");
                response.end();
            } else {
                response.writeHead(200);
                response.writeHead({ "Content-Type": contentType });
                response.end(data);
            }
        });
    }
    // creat server to handle http request
http.createServer(function(request, response) {
    if (request.method == "GET") {
        // console.log(request.url);
        // var objectUrl = url.parse(request.url);
        if (request.url == "/") {
            console.log("this is root request", request.url);
            var index = fs.readFileSync("./index.html");
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.write(index);
            response.end();
        } else if (/^\/css\/.+/.test(request.url)) {
            var cssName = request.url;
            console.log("this is a get css request", cssName);
            readFileAsync(response, "." + request.url, 'text/css');

        } else if (/^\/img\/\w+\.\w+/.test(request.url)) {
            var imgName = request.url;
            console.log("this is a get image request", imgName);
            readFileAsync(response, "." + request.url, 'image/*');

        } else if (/^\/js\/.+\.js/.test(request.url)) {
            var jsName = request.url;
            console.log("this is a get js request", jsName);
            readFileAsync(response, "." + request.url, 'text/js');

        } else {
            console.log("get 404 not found");
            readFileAsync(response, "./errorPage/404.html", 'text/html');
            // response.writeHead(404,{"content-type":"text/html"});
            // response.write()
            // response.end();s
        }
    }


    if (request.method == "POST") {
        console.log("this is a post request:", request.url);
        var postData = "";

        var responseString = "";

        response.writeHead(200, {
            "content-type": "text/html"
        });
        request.setEncoding("utf8");

        // 因为nodejs在处理post数据的时候，会将数据分成小包来序列处理
        // 所以必须监听每一个数据小包的结果
        request.addListener("data", function(postDataChunk) {
            postData += postDataChunk;
        });


        // 所有数据包接收完毕
        request.addListener("end", function() {
            console.log("post body:", postData);
            // 解析post数据
            var objectPostData = querystring.parse(postData);

            for (var i in objectPostData) {
                responseString += i + " => " + objectPostData[i] + "<br>";
            }
            console.log("post data", objectPostData);

            var user = new pepole({ name: objectPostData.userName, password: objectPostData.password });
            user.save(function(err, user) {
                if (err) return console.error(err);
            });

            response.write("注册成功");

            response.end();
        });
    }
}).listen(2016);
