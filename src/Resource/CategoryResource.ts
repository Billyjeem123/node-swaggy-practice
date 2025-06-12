export class CategoryResource {
  static toJson(category) {
    return {
      type: "Categories",
      id: category._id,
      attributes: {
        name: category.name ?? '',
        user: category.user_id
          ? {
              id: category.user_id._id,
              name: category.user_id.name,
            }
          : null,
        created_at: new Date(category.createdAt).toLocaleDateString('en-US', {
          month: 'short',
          day: '2-digit',
          year: 'numeric',
        }),
      },
    };
  }

  static collection(categories) {
    return categories.map(category => this.toJson(category));
  }
}
