export declare class UserResource {
    static toJson(user: any): {
        type: string;
        id: any;
        attributes: {
            name: any;
            email: any;
            is_verified: boolean;
            created_at: string;
        };
    };
    static collection(users: any): any;
}
