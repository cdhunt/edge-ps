var edge = require('edge');
var express = require('express');

var app = express();
var port = process.env.PORT || 8081;

function wrapScript(script) {
	return '..\\edge-ps\\samples\\tryPowerShell\\' + script + '.ps1';
}

app.get('/powershell/:script', function(req,res) {

	var payload = {
		source: wrapScript(req.params.script),
		inputFromJs: req.query
		//request: req,
		//response: res,
	}
	
	edge.func('ps', payload, function (error, results) {
		if (error) return console.log(error);
		console.log(results.Result);
		res.send(results.Result);
	});
});

app.listen(port);
console.log("Server listening on port " + port);
