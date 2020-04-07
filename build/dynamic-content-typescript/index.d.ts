import * as WebDevServer from "../../../web-dev-server/build/lib/Server";
export default class App implements WebDevServer.IApplication {
    protected server?: WebDevServer.Server;
    protected counter: number;
    Start(server: WebDevServer.Server, firstRequest: WebDevServer.Request, firstResponse: WebDevServer.Response): Promise<void>;
    Stop(server: WebDevServer.Server): Promise<void>;
    HttpHandle(request: WebDevServer.Request, response: WebDevServer.Response): Promise<void>;
}
