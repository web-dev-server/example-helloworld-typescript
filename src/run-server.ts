//import * as WebDevServer from "web-dev-server";
import * as WebDevServer from "../../web-dev-server/build/lib/Server";


// Create logger for any uncatched error (optional):
var logger = WebDevServer.Tools.Logger.CreateNew(__dirname + '/..', __dirname)
	.SetStreamWriting(true)
	.SetAllowedLevels([WebDevServer.Tools.Logger.LEVEL.ERROR, WebDevServer.Tools.Logger.LEVEL.CRITICIAL])
	.SetMaxLogFileSize('100M')
	.SetStackTraceWriting(true, true);


// Create web server instance.
WebDevServer.Server.CreateNew()
	// Required.
	.SetDocumentRoot(__dirname + '/..')
	// Optional, 8000 by default.
	.SetPort(8000)
	// Optional, '127.0.0.1' by default.
	.SetHostname('127.0.0.1')
	// Optional, `true` by default to display Errors and directories.
	//.SetDevelopment(false)
	// Optional, `null` by default, useful for apache proxy modes.
	//.SetBasePath('/node')
	// Optional, custom place to log any unhandled errors.
	.SetErrorHandler(async (
		err: Error,
		code: number,
		req: WebDevServer.Request, 
		res: WebDevServer.Response
	) => {
		console.log(err);
		logger.Error(err);
	})
	// Optional, to prepend any execution before `web-dev-server` module execution.
	.AddPreHandler(async (
		req: WebDevServer.Request, 
		res: WebDevServer.Response, 
		event: WebDevServer.Event
	) => {
		if (req.GetPath() == '/health') {
			res.SetCode(200).SetBody('1').Send();
			// Do not anything else in `web-dev-server` module for this request:
			event.PreventDefault();
		}
		/*setTimeout(() => {
			throw new RangeError("Uncatched test error.");
		}, 1000);*/
	})
	// Callback param is optional. called after server has been started or after error ocured.
	.Start((success?: boolean, err?: Error) => {
		if (!success) return console.error(err);
		console.log("Server is running.");
	});