export declare class CategoryResource {
    static toJson(category: any): {
        type: string;
        id: any;
        attributes: {
            name: any;
            created_at: string;
        };
    };
    static collection(categories: any): any;
}
