export declare class Server {
    app: import("express-serve-static-core").Express;
    constructor();
    setConfigs(): void;
    setRoutes(): void;
    configureBodyParser(): void;
    allowCors(): void;
    error404Handler(): void;
    handleErrors(): void;
}
