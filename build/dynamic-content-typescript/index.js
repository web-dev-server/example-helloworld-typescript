Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var fs_1 = tslib_1.__importDefault(require("fs"));
var WebDevServer = tslib_1.__importStar(require("web-dev-server"));
var App = (function (_super) {
    tslib_1.__extends(App, _super);
    function App(httpServer, expressApp, sessionParser, request, response) {
        var _this = _super.call(this, httpServer, expressApp, sessionParser, request, response) || this;
        _this.counter = 0;
        expressApp.get("/build/dynamic-content-typescript/special", function (req, res) {
            console.log("Something special has been requested:-)");
        });
        return _this;
    }
    App.prototype.HandleHttpRequest = function (request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var requestInfo, staticHtmlFileFullPath, data;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("Application has been requested.");
                        return [4, this.completeWholeRequestInfo(request)];
                    case 1:
                        requestInfo = _a.sent();
                        this.counter++;
                        staticHtmlFileFullPath = __dirname + '/../../static-content/index.html';
                        return [4, new Promise(function (resolve, reject) {
                                fs_1.default.readFile(staticHtmlFileFullPath, 'utf8', function (err, data) {
                                    if (err)
                                        return reject(err);
                                    resolve(data);
                                });
                            })];
                    case 2:
                        data = _a.sent();
                        response.send(data.replace(/%requestPath/g, requestInfo.requestPath + " (" + this.counter.toString() + "×)"));
                        return [2];
                }
            });
        });
    };
    App.prototype.completeWholeRequestInfo = function (request) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var baseUrl, domainUrl, queryString, delim, paramName, reqInfo, _a;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        baseUrl = request.baseUrl ? request.baseUrl : '', domainUrl = request.protocol + '://' + request.hostname, queryString = '', delim = '?';
                        for (paramName in request.query) {
                            queryString += delim + paramName + '=' + request.query[paramName];
                            delim = '&';
                        }
                        reqInfo = {
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
                        _a = reqInfo;
                        return [4, new Promise(function (resolve, reject) {
                                var bodyArr = [];
                                request.on('error', function (err) {
                                    reject(err);
                                }).on('data', function (chunk) {
                                    bodyArr.push(chunk);
                                }).on('end', function () {
                                    resolve(Buffer.concat(bodyArr).toString());
                                }.bind(_this));
                            })];
                    case 1:
                        _a.textBody = _b.sent();
                        return [2, reqInfo];
                }
            });
        });
    };
    return App;
}(WebDevServer.Application.Abstract));
exports.default = App;
//# sourceMappingURL=index.js.map