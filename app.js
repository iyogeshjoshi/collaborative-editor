/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path'),
    fs = require('fs'),
    everyauth = require('everyauth');

var app = express();
var server = http.createServer(app);
// var connect = require('connect');
var io = require('socket.io').listen();

var sharejs = require('share').server,
    sharejs_client = require('share').client,
    serverIp = '192.168.2.106';         //Change to your IP Address


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').__express);
app.set('view engine', 'html');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session({secret: 'RealTimeTextEdit'}));
app.use(everyauth.middleware());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));    //folder where your static file reside

var options = {
    db: {type: 'none'},
    browserChannel: {cors: '*'}
};

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

sharejs.attach(app, options);
var path = './public';                                      //path to your static folder

app.get('/', routes.index);
app.post('/file', function (req, res) {
    //file name to open
    var file = req.body.file;
    //relative file path
    var filename = path + '/' + file;
    if (!filename) {
        throw new Error('file name not specified!');
    }
    //checks if file exists
    fs.exists(filename, function (exists) {
        if (exists) {
            fs.readFile(filename, function (err, data) {
                if (err) res.send(500, err);
                console.log(data.toString());
                res.send(data.toString());
            });
        } else {
            var response = {
                flag: false,
                message: file+' file not found!'
            }
            res.json(response);
        }
    })
});
//to get contents of the directory
app.get('/directory', function (req, res) {
    // reads contents of the directory
    fs.readdir(path, function (err, files) {
        if (err) res.send(500, err);
        res.send(files);
    })
});
//to get contents of the specific directory
app.get('/directory/:dir', function (req, res) {
    // Relative path to directory
    var dirpath = path + '/' + req.params.dir;
    // Reads directory Content
    fs.readdir(dirpath, function (err, files) {
        if (err) res.send(500, err);
        res.send(files);
    })
});
// Server listen on the ServerIP and defined port
server.listen(app.get('port'), serverIp, function () {
    console.log('Express server listening on ' + serverIp + ':' + app.get('port'));
});
// For colaborative editing on server
sharejs_client.open('test', 'text', 'http://192.168.2.106:3000/channel', function (error, doc) {
    console.log('version: ' + doc.version + ' content: ' + doc.snapshot);
});
/*var conn = new sharejs_client.Connection('http://192.168.2.106:3000/channel');
 conn.openExisting('test', function (err, doc) {
 if (err) console.log(err);
 console.log(doc);
 })*/
