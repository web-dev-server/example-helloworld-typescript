var fs = require("fs");


/**
 * @summary 
 * Exported class to handle directory requests.
 * 
 * When there is first request to directory with default 
 * `index.js` script inside, this class is automatically 
 * created and method `Start()` is executed.
 * All request are normally handled by method `HttpHandle()`.
 * If there is detected any file change inside this file 
 * or inside file included in this file (on development server 
 * instance), the module `web-dev-server` automaticly reloads 
 * all necesssary dependent source codes, stops previous instance 
 * by method `Stop`() and recreates this application instance again
 * by `Start()` method. The same realoding procedure is executed, 
 * if there is any unhandled error inside method `HttpHandle()` 
 * (to develop more comfortably).
 */
module.exports = class App {
	
	constructor () {
		/**
		 * @summary WebDevServer server instance.
		 * @var {WebDevServer.Server}
		 */
		this.server = null;
		/**
		 * @summary Requests counter. 
		 * @var {number}
		 */
		this.counter = 0;
	}

	/** 
	 * @summary Application start point.
	 * @public
	 * @param {WebDevServer.Server}   server
	 * @param {WebDevServer.Request}  firstRequest
	 * @param {WebDevServer.Response} firstResponse
	 * @return {Promise<void>}
	 */
	Start (server, firstRequest, firstResponse) {
		this.server = server;
		// Any initializations:
		console.log("App start.");

		//return new Promise(function (resolve, reject) { resolve(); });
	}

	/** 
	 * @summary Application end point, called on unhandled error 
	 * (on development server instance) or on server stop event.
	 * @public
	 * @param {WebDevServer.Server} server
	 * @return {Promise<void>}
	 */
	Stop (server) {
		// Any destructions:
		console.log("App stop.");

		//return new Promise(function (resolve, reject) { resolve(); });
	}

	/**
	 * @summary 
	 * This method is executed each request to directory with 
	 * `index.js` script inside (also executed for first time 
	 * immediately after `Start()` method).
	 * @public
	 * @param {WebDevServer.Request}  request
	 * @param {WebDevServer.Response} response
	 * @return {Promise<void>}
	 */
	HttpHandle (request, response) {
		return new Promise(function (resolve, reject) { 
			console.log("App http handle.", request.GetFullUrl());

			// increase request counter:
			this.counter++;

			// try to uncomment line bellow to see rendered error in browser:
			//throw new Error("Uncatched test error 1.");

			// say hallo world with html template:
			var staticHtmlFileFullPath = this.server.GetDocumentRoot() + '/static-content/index.html';
		
			this.loadHtmlFile(staticHtmlFileFullPath, function (data) {
				response.SetBody(data.replace(
					/%code%/g, JSON.stringify({
						basePath: request.GetBasePath(),
						path: request.GetPath(),
						domainUrl: request.GetDomainUrl(),
						baseUrl: request.GetBaseUrl(),
						requestUrl: request.GetRequestUrl(),
						fullUrl: request.GetFullUrl(),
						params: request.GetParams(false, false),
						appRequests: this.counter
					}, null, "\t")
				)).Send();
	
				resolve();
			}.bind(this), reject);
			
		}.bind(this));
	}

	loadHtmlFile (fullPath, resolve, reject) {
		fs.readFile(fullPath, 'utf8', function (err, data) {
			// try to uncomment line bellow to see rendered error in browser:
			try {
				//throw new Error("Uncatched test error 2.");
			} catch (e) {
				err = e;
			}
			if (err) return reject(err);
			resolve(data);
		});
	}
}