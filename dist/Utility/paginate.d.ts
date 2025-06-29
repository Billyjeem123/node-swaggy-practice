export declare const paginate: (modelQuery: any, req: any) => Promise<{
    data: any;
    pagination: {
        total: any;
        per_page: number;
        current_page: number;
        last_page: number;
        from: number;
        to: any;
    };
}>;
