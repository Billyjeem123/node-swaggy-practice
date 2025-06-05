export interface Environment {
    db_uri: string;
}
export declare function getEnvironmentVariables(): Environment;
