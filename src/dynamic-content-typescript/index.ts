import fs from "fs";
import http from "http";
import * as core from "express-serve-static-core";

import * as WebDevServer from "web-dev-server";
//import * as WebDevServer from "../../../web-dev-server/build/server";

/**
 * @summary Nested class for more detailed request object.
 */
interface RequestInfo extends ObjectConstructor {
	request: core.Request<core.ParamsDictionary, any, any>;
	baseUrl: string;
	path: string;
	requestPath: string;
	domainUrl: string;
	fullUrl: string;
	method: string;
	headers: http.IncomingHttpHeaders;
	statusCode: number;
	textBody: string;
}

/**
 * @summary Exported class to handle directory requests.
 */
class App extends WebDevServer.Application.Abstract {
	
	/** @summary Requests counter. */
	counter: number = 0;
	
	/** 
	 * @summary Application constructor, which is executed only once, 
	 * 			when there is a request to directory with default `index.js`
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
	 */
	public constructor (
		httpServer: http.Server, 
		expressApp: core.Express, 
		sessionParser: core.RequestHandler<core.ParamsDictionary>, 
		request: core.Request<core.ParamsDictionary, any, any>, 
		response: core.Response<any>
	) {
		super(httpServer, expressApp, sessionParser, request, response);
		// Any initializations:

		expressApp.get("/build/dynamic-content-typescript/special", (req, res) => {
			console.log("Something special has been requested:-)");
		});
		
	}

	/**
	 * @summary This method is executed each request to directory with 
	 * 			`index.js` script inside (also executed for first time 
	 * 			immediately after constructor).
	 */
	public async HandleHttpRequest(
		request: core.Request<core.ParamsDictionary, any, any>, 
		response: core.Response<any>
	): Promise<void> {
		// Called every request:
		console.log("Application has been requested.");

		var requestInfo: RequestInfo = await this.completeWholeRequestInfo(request);
		
		// increase request counter:
		this.counter++;
		
		// some demo operation to say hallo world:
		var staticHtmlFileFullPath = __dirname + '/../../static-content/index.html';
		
		// try to uncomment line bellow to see rendered error in browser:
		//throw new Error("Uncatched test error.");
		
		//var data: string = await fs.promises.readFile(staticHtmlFileFullPath, 'utf8'); // experimental
		var data: string = await new Promise<string>((
			resolve: (data: string) => void, reject: (err: Error) => void
		) => {
			fs.readFile(staticHtmlFileFullPath, 'utf8', (err: Error, data: string) => {
				// try to uncomment line bellow to see rendered error in browser:
				//throw new Error("Uncatched test error.");
				if (err) return reject(err);
				resolve(data);
			});
		});

		response.send(data.replace(
			/%requestPath/g, 
			requestInfo.requestPath + " (" + this.counter.toString() + "×)"
		));
	}

	/**
	 * @summary	This method completes whole request body to operate with it 
	 * 			later properly (to encode json data or anything more).
	 */
	protected async completeWholeRequestInfo (
		request: core.Request<core.ParamsDictionary, any, any>
	): Promise<RequestInfo> {
		var baseUrl = request.baseUrl ? request.baseUrl : '',
			domainUrl = request.protocol + '://' + request.hostname,
			queryString = '', 
			delim = '?';
		for (var paramName in request.query) {
			queryString += delim + paramName + '=' + request.query[paramName];
			delim = '&';
		}
		var reqInfo = <RequestInfo>{
			request: request,
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
		reqInfo.textBody = await new Promise<string>((
			resolve: (textBody: string) => void, reject: (err: Error) => void
		) => {
			var bodyArr: any = [];
			request.on('error', function (err: Error) {
				reject(err);
			}).on('data', function (chunk: any) {
				bodyArr.push(chunk);
			}).on('end', function () {
				resolve(Buffer.concat(bodyArr).toString());
			}.bind(this));
		});
		return reqInfo;
	}
}

export default App;