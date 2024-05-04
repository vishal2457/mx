declare namespace Express {
    export interface Request {
        user: import("../user").UserTokenPayload;
        modelOptions: import('../model-options').ModelOptionBuild
    }
}
