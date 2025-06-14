export class RestaurantResource {
    static toJson(restaurant) {
        return {
            type: "Restaurant",
            id: restaurant._id,
            attributes: {
                name: restaurant.name ?? '',
                user: restaurant.user_id ? {
                    id: restaurant.user_id._id,
                    name: restaurant.user_id.name,
                } : null,
                city: restaurant.city_id ? {
                    name: restaurant.city_id.name,
                } : null,
                created_at: new Date(restaurant.createdAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: '2-digit',
                    year: 'numeric',
                })
            }
        };
    }

    static collection(restaurants) {
        return restaurants.map(restaurant => this.toJson(restaurant));
    }
}
