export interface Environment {
    db_uri: string;
    jwt_secret_key: string;
    paystack_secret_key: string;
}
export declare function getEnvironmentVariables(): Environment;
