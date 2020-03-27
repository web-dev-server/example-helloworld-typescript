Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var fs_1 = tslib_1.__importDefault(require("fs"));
var App = function (http, express, expressSession, request, response) {
    express.get("/build/dynamic-content-javascript/special", function (req, res) {
        console.log("Something special has been requested:-)");
    });
};
App.prototype = {
    counter: 0,
    handleHttpRequest: function (request, response) {
        console.log("Application has been requested.");
        return new Promise(function (resolve, reject) {
            this.completeWholeRequestInfo(request, function (requestInfo) {
                this.counter++;
                var staticHtmlFileFullPath = __dirname + '/../../static-content/index.html';
                fs_1.default.readFile(staticHtmlFileFullPath, 'utf8', function (err, data) {
                    if (err) {
                        console.log(err);
                        return reject();
                    }
                    response.send(data.replace(/%requestPath/g, requestInfo.requestPath + " (" + this.counter.toString() + "×)"));
                    resolve();
                }.bind(this));
            }.bind(this));
        }.bind(this));
    },
    completeWholeRequestInfo: function (request, callback) {
        var baseUrl = request.baseUrl === null ? '' : request.baseUrl, domainUrl = request.protocol + '://' + request.hostname, queryString = '', delim = '?';
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
//# sourceMappingURL=index.js.map