export declare class FoodResource {
    static toJson(food: any): {
        type: string;
        id: any;
        attributes: {
            name: any;
            price: string;
            created_at: string;
        };
        restaurant: {
            restaurant: {
                id: any;
                name: any;
            };
        };
    };
    static collection(foods: any): any;
}
