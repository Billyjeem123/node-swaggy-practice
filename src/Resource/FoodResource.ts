export class FoodResource {
  static toJson(food) {
    return {
      type: "food items",
      id: food._id,
      attributes: {
        name: food.name,
        created_at: new Date(food.createdAt).toLocaleDateString('en-US', {
          month: 'short',
          day: '2-digit',
          year: 'numeric',
        }),
      },
    };
  }

  static collection(foods) {
    return foods.map(food => this.toJson(food));
  }
}
