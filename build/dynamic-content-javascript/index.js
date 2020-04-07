Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var fs_1 = tslib_1.__importDefault(require("fs"));
var App = (function () {
    function App() {
        this.server = null;
        this.counter = 0;
    }
    App.prototype.Start = function (server, firstRequest, firstResponse) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.server = server;
                console.log("App start.");
                return [2];
            });
        });
    };
    App.prototype.Stop = function (server) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                console.log("App stop.");
                return [2];
            });
        });
    };
    App.prototype.HttpHandle = function (request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var staticHtmlFileFullPath, data;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("App http handle.", request.GetFullUrl());
                        this.counter++;
                        if (!!request.IsCompleted()) return [3, 2];
                        return [4, request.GetBody()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        staticHtmlFileFullPath = this.server.GetDocumentRoot() + '/static-content/index.html';
                        return [4, new Promise(function (resolve, reject) {
                                fs_1.default.readFile(staticHtmlFileFullPath, 'utf8', function (err, data) {
                                    try {
                                    }
                                    catch (e) {
                                        err = e;
                                    }
                                    if (err)
                                        return reject(err);
                                    resolve(data);
                                });
                            })];
                    case 3:
                        data = _a.sent();
                        response.SetBody(data.replace(/%code%/g, JSON.stringify({
                            basePath: request.GetBasePath(),
                            path: request.GetPath(),
                            domainUrl: request.GetDomainUrl(),
                            baseUrl: request.GetBaseUrl(),
                            requestUrl: request.GetRequestUrl(),
                            fullUrl: request.GetFullUrl(),
                            params: request.GetParams(false, false),
                            appRequests: this.counter
                        }, null, "\t"))).Send();
                        return [2];
                }
            });
        });
    };
    return App;
}());
exports.default = App;
//# sourceMappingURL=index.js.map