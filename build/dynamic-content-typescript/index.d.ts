/// <reference types="node" />
import http from "http";
import * as core from "express-serve-static-core";
import * as WebDevServer from "web-dev-server";
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
declare class App extends WebDevServer.Application.Abstract {
    counter: number;
    constructor(httpServer: http.Server, expressApp: core.Express, sessionParser: core.RequestHandler<core.ParamsDictionary>, request: core.Request<core.ParamsDictionary, any, any>, response: core.Response<any>);
    handleHttpRequest(request: core.Request<core.ParamsDictionary, any, any>, response: core.Response<any>): Promise<void>;
    protected completeWholeRequestInfo(request: core.Request<core.ParamsDictionary, any, any>): Promise<RequestInfo>;
}
export default App;
