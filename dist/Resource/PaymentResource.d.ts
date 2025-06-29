export declare class PaymentResource {
    static toJson(payment: any): {
        type: string;
        id: any;
        attributes: {
            user: any;
            order: {
                id: any;
            };
            restaurant: {
                id: any;
                city: any;
            };
            transaction_ref: any;
            status: any;
            amount: any;
            channel: any;
            currency: any;
            gateway_response: any;
            paid_at: string;
            created_at: string;
        };
    };
    static collection(payments: any): any;
}
