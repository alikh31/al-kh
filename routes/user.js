var geoip = require('geoip-lite');
var path = require('path');

exports.list = function (req, res) {
    var geo = geoip.lookup(req.connection.remoteAddress);
    
    var date = new Date();

    console.log(date);

    console.log(req.headers);
    console.log(req.connection.remoteAddress);
    console.log(geo);

    res.sendfile(path.join(__dirname,'../views/textconvert.html'));
};