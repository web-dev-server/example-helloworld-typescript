Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var WebDevServer = tslib_1.__importStar(require("web-dev-server"));
var logger = WebDevServer.Logger.CreateNew(__dirname + '/..', __dirname)
    .SetStreamWriting(true)
    .SetAllowedLevels([WebDevServer.Logger.LEVEL.ERROR, WebDevServer.Logger.LEVEL.CRITICIAL])
    .SetMaxLogFileSize('100M')
    .SetStackTraceWriting(true, true);
WebDevServer.Server.CreateNew()
    .SetDocumentRoot(__dirname + '/..')
    .SetPort(8000)
    .SetErrorHandler(function (err, code, req, res) {
    logger.Error(err);
})
    .AddHandler(function (req, res, evnt, cb) {
    if (req.url == '/health') {
        res.writeHead(200);
        res.end('1');
        evnt.PreventDefault();
    }
    cb();
})
    .Run(function (success, err) {
    if (!success)
        console.error(err);
    console.log("Server is running.");
});
//# sourceMappingURL=run-server.js.map