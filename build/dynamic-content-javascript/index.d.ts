export = App;
declare class App {
    server: any;
    counter: number;
    public Start(server: any, firstRequest: any, firstResponse: any): Promise<void>;
    public Stop(server: any): Promise<void>;
    public HttpHandle(request: any, response: any): Promise<void>;
    loadHtmlFile(fullPath: any, resolve: any, reject: any): void;
}
