var http = require('http')

var messages = [
    { message: "HEY YOU GUYS"},
    { message: "Hiello"}

]

var onRequest = (function (req, res) {



    if (req.method == 'POST') {
        var postData = '';
        req.on('data', function (chunk) {
            postData += chunk.toString();
        });

        req.on('end', function () {
            console.log("Got POST data:");
            console.log(JSON.parse(postData));
            messages.push(JSON.parse(postData))
            res.writeHead(200, {
                'content-type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            });
            res.end(JSON.stringify(messages));
            console.log(req.method);
        })
    }

    if (req.method == 'GET') {
        console.log('serving......');
        console.log(req.method);
        res.writeHead(200, {
            'content-type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        });
        res.end(JSON.stringify(messages));
        console.log(req.method);
    }


});

//var chunky = (function (chunk,postData) {
//
//    if (req.method == 'POST') {
//        var postData = '';
//        req.on('data', function (chunk) {
//            postData += chunk.toString();
//        });
//        req.on('end', function () {
//            console.log("Got POST data:");
//            console.log(JSON.parse(postData));
//        });
//    }
//});

var server = http.createServer(onRequest);

server.listen(3000);