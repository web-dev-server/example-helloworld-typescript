var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var WebDevServer = tslib_1.__importStar(require("../../web-dev-server/build/lib/Server"));
var logger = WebDevServer.Tools.Logger.CreateNew(__dirname + '/..', __dirname)
    .SetStreamWriting(true)
    .SetAllowedLevels([WebDevServer.Tools.Logger.LEVEL.ERROR, WebDevServer.Tools.Logger.LEVEL.CRITICIAL])
    .SetMaxLogFileSize('100M')
    .SetStackTraceWriting(true, true);
WebDevServer.Server.CreateNew()
    .SetDocumentRoot(__dirname + '/..')
    .SetPort(8000)
    .SetHostname('127.0.0.1')
    .SetErrorHandler(function (err, code, req, res) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    return tslib_1.__generator(this, function (_a) {
        console.log(err);
        logger.Error(err);
        return [2];
    });
}); })
    .AddPreHandler(function (req, res, event) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    return tslib_1.__generator(this, function (_a) {
        if (req.GetPath() == '/health') {
            res.SetCode(200).SetBody('1').Send();
            event.PreventDefault();
        }
        return [2];
    });
}); })
    .Start(function (success, err) {
    if (!success)
        return console.error(err);
    console.log("Server is running.");
});
//# sourceMappingURL=run-server.js.map