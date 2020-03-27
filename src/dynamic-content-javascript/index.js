//var fs = require('fs');
import fs from "fs";

/** 
 * @summary Application constructor, which is executed only once, 
 * 			when there is a request to directory with default index.js 
 * 			script inside. Then it's automatically created an instance 
 * 			of `module.exports` content. Then it's executed 
 * 			`handleHttpRequest` method on that instance. 
 * 			This is the way, how is directory request handled with 
 * 			default `index.js` file inside. 
 * 			If there is detected any file change inside this file 
 * 			(or inside file included in this file), the module 
 * 			`web-deb-server` automaticly reloads all necesssary 
 * 			dependent source codes and creates this application 
 * 			instance again. The same realoding procedure is executed, 
 * 			if there is any unhandled error inside method 
 * 			`handleHttpRequest` (to develop more comfortably).
 * @param {http}			http 			Used node http module instance.
 * @param {express}			express 		Used node express module instance.
 * @param {expressSession}	expressSession	Used node expressSession module instance.
 * @param {request}			request			Current http request object.
 * @param {response}		response		Current http response object.
 * @return void
 */
var App = function (http, express, expressSession, request, response) {
	// Any initializations:

	express.get("/build/dynamic-content-javascript/special", (req, res) => {
		console.log("Something special has been requested:-)");
	});
};
App.prototype = {
	/**
	 * @summary Requests counter.
	 * @var {number}
	 */
	counter: 0,
	
	/**
	 * @summary This method is executed each request to directory with 
	 * 			`index.js` script inside (also executed for first time 
	 * 			immediately after constructor).
	 * @param {request}		request		Current http request object.
	 * @param {response}	response 	Current http response object.
	 * @return {Promise}
	 */
	handleHttpRequest: function (request, response) {
		// Called every request:
		console.log("Application has been requested.");
		
		return new Promise(function (resolve, reject) {
			this.completeWholeRequestInfo(request, function (requestInfo) {
			
				// increase request counter:
				this.counter++;

				// some demo operation to say hallo world:
				var staticHtmlFileFullPath = __dirname + '/../../static-content/index.html';
				
				// try to uncomment line bellow to see rendered error in browser:
				//throw new Error("Uncatched test error.");

				fs.readFile(staticHtmlFileFullPath, 'utf8', function (err, data) {
					
					// try to uncomment line bellow to see rendered error in browser:
					//throw new Error("Uncatched test error.");
					
					if (err) {
						console.log(err);
						return reject();
					}
					response.send(data.replace(
						/%requestPath/g, 
						requestInfo.requestPath + " (" + this.counter.toString() + "×)"
					));
					resolve();
				}.bind(this));
				
				
				
				
			}.bind(this));
		}.bind(this));
	},
	/**
	 * @summary	This method completes whole request body to operate with it 
	 * 			later properly (to encode json data or anything more).
	 * @param	{request}	request		Current http request.
	 * @param	{function}	callback	Callback to execute after whole request body is loaded or request loading failed.
	 * @return	{void}
	 */
	completeWholeRequestInfo: function (request, callback) {
		var baseUrl = request.baseUrl === null ? '' : request.baseUrl,
			domainUrl = request.protocol + '://' + request.hostname,
			queryString = '', 
			delim = '?';
		for (var paramName in request.query) {
			queryString += delim + paramName + '=' + request.query[paramName];
			delim = '&';
		}
		var reqInfo = {
			baseUrl: baseUrl,
			path: request.path,
			requestPath: baseUrl + request.path,
			domainUrl: domainUrl,
			fullUrl: domainUrl + baseUrl + request.path + queryString,
			method: request.method,
			headers: request.headers,
			statusCode: request.statusCode,
			textBody: ''
		};
		var bodyArr = [];
		request.on('error', function (err) {
			console.error(err);
		}).on('data', function (chunk) {
			bodyArr.push(chunk);
		}).on('end', function () {
			reqInfo.textBody = Buffer.concat(bodyArr).toString();
			reqInfo.request = request;
			callback(reqInfo);
		}.bind(this));
	}
};

module.exports = App;
