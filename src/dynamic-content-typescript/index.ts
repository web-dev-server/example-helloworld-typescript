import fs from "fs";

import * as WebDevServer from "web-dev-server";
//import * as WebDevServer from "../../../web-dev-server/build/lib/Server";


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
export default class App implements WebDevServer.IApplication {
	
	/** @summary WebDevServer server instance. */
	protected server?: WebDevServer.Server;

	/** @summary Requests counter. */
	protected counter: number = 0;
	
	/** @summary Application start point. */
	public async Start (server: WebDevServer.Server, firstRequest: WebDevServer.Request, firstResponse: WebDevServer.Response): Promise<void> {
		this.server = server;
		// Any initializations:
		console.log("App start.");

	}

	/** 
	 * @summary Application end point, called on unhandled error 
	 * (on development server instance) or on server stop event.
	 */
	public async Stop (server: WebDevServer.Server): Promise<void> {
		// Any destructions:
		console.log("App stop.");

	}

	/**
	 * @summary 
	 * This method is executed each request to directory with 
	 * `index.js` script inside or into any non-existing directory,
	 * inside directory with this script.
	 */
	public async HttpHandle (request: WebDevServer.Request, response: WebDevServer.Response): Promise<void> {
		console.log("App http handle.");
		
		// increase request counter:
		this.counter++;
		
		// try to uncomment line bellow to see rendered error in browser:
		//throw new Error("Uncatched test error.");
		
		if (!request.IsCompleted()) await request.GetBody();

		// say hallo world with html template:
		var staticHtmlFileFullPath = this.server.GetDocumentRoot() + '/static-content/index.html';
		
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
	}
}