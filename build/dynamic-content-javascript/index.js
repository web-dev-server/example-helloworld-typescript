var fs = require("fs");
module.exports = (function () {
    function App() {
        this.server = null;
        this.counter = 0;
    }
    App.prototype.Start = function (server, firstRequest, firstResponse) {
        this.server = server;
        console.log("App start.");
    };
    App.prototype.Stop = function (server) {
        console.log("App stop.");
    };
    App.prototype.HttpHandle = function (request, response) {
        return new Promise(function (resolve, reject) {
            console.log("App http handle.", request.GetFullUrl());
            this.counter++;
            var staticHtmlFileFullPath = this.server.GetDocumentRoot() + '/static-content/index.html';
            this.loadHtmlFile(staticHtmlFileFullPath, function (data) {
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
                resolve();
            }.bind(this), reject);
        }.bind(this));
    };
    App.prototype.loadHtmlFile = function (fullPath, resolve, reject) {
        fs.readFile(fullPath, 'utf8', function (err, data) {
            try {
            }
            catch (e) {
                err = e;
            }
            if (err)
                return reject(err);
            resolve(data);
        });
    };
    return App;
}());
//# sourceMappingURL=index.js.map