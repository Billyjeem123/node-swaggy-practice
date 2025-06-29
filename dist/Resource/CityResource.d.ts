export declare class CityResource {
    static toJson(city: any): {
        type: string;
        id: any;
        attributes: {
            name: any;
            created_at: string;
        };
    };
    static collection(cities: any): any;
}
