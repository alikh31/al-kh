
/*
 * GET home page.
 */

var geoip = require('geoip-lite');

exports.index = function (req, res) {
	var geo = geoip.lookup(req.connection.remoteAddress);
	console.log(geo);

    res.sendfile('views/index.html');
};