var express = require('express');
var app = express();
var request = require('request');
var router = express.Router();
var morgan = require('morgan');
var bodyParser = require('body-parser');
require('request-debug')(request);
var fetchAction =  require('node-fetch');

var hasuraExamplesRouter = require('./hasuraExamples');

var server = require('http').Server(app);

router.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/',(req,res) => res.send('Hello World'));

app.post('/dbupdate', (req,res) => {

		var url = "https://data.arisen52.hasura-app.io/v1/query";

		var requestOptions = {
		    "method": "POST",
		    "headers": {
		        "Content-Type": "application/json",
		        "Authorization": "Bearer 1f5686df68a21e8561e899013e40293b4b1b43a53bff2397"
		    }
		};

		var body = {
		    "type": "update",
		    "args": {
		        "table": "students",
		        "where": {
		            "prn_no": {
		                "$eq": req.body.prn
		            }
		        },
		        "$set": {
		            "college": req.body.college,
		            "branch": req.body.branch,
		            "year": req.body.year,
		            "roll_no": req.body.roll,
		            "name": req.body.name
		        }
		    }
		};

		requestOptions.body = JSON.stringify(body);

		fetchAction(url, requestOptions)
		.then(function(response) {
			return response.json();
		})
		.then(function(result) {
			console.log(JSON.stringify(result));
		})
		.catch(function(error) {
			console.log('Request Failed:' + error);
		});

		
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});