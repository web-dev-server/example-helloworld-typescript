export default class App {
    server: any;
    counter: number;
    Start(server: any, firstRequest: any, firstResponse: any): Promise<void>;
    Stop(server: any): Promise<void>;
    HttpHandle(request: any, response: any): Promise<void>;
}
