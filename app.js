var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var ws = require('nodejs-websocket');
var fs = require('fs');
var exec = require('child_process').exec;

var app = express();

// all environments
app.set('port', 8080);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.use(express.favicon(path.join(__dirname, 'public/images/favicon.ico')));
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
//app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});


var server = ws.createServer(function (conn) {

    console.log("New connection");
    conn.on("text", function (str) {

        //console.log("Received " + str);
        try {

            var obj = JSON.parse(str);

            fs.writeFile(path.join(__dirname 'public/temp') + "/test.tmp", obj.body, function (err) {
                if (err) {
                    return console.log(err);
                }
                
                var cmd = 'pandoc -f ' + obj.from + ' -t ' + obj.to + ' -s test.tmp' + ' -o test2.tmp';
                
                console.log(cmd);
                var child = exec(cmd);
                
                child.on('exit', function () {
                    
                    fs.readFile(path.join(__dirname 'public/temp') + "/test2.tmp", 'utf8', function (err, data) {
                        if (err) {
                            return console.log(err);
                        }
                        
                        conn.sendText(data);
                    });
                });
            });


        } catch (e) {

            conn.sendText(e.message);
        }
    });
    conn.on("close", function(code, reason) {
        console.log("Connection closed");
    });
}).listen(8001)